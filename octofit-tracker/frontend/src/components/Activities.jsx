import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesApiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(activitiesApiUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalizeCollectionResponse(payload))
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Failed to load activities'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [])

  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Activities</h1>
        <p className="text-muted">Recent logged workouts and effort details.</p>
        {loading && <p className="mb-0">Loading activities...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Completed</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id ?? activity.id}>
                    <td>{activity.user?.displayName ?? activity.user?.username ?? '-'}</td>
                    <td>{activity.activityType ?? '-'}</td>
                    <td>{activity.durationMinutes ?? 0} min</td>
                    <td>{activity.caloriesBurned ?? 0}</td>
                    <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Activities
