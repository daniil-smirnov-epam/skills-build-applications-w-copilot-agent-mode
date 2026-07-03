import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsApiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(workoutsApiUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollectionResponse(payload))
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Failed to load workouts'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [])

  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Workouts</h1>
        <p className="text-muted">Suggested sessions and training plans.</p>
        {loading && <p className="mb-0">Loading workouts...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout._id ?? workout.id ?? workout.title} className="col-md-6 col-xl-4">
                <div className="border rounded p-3 h-100 bg-white">
                  <h2 className="h5 mb-1">{workout.title ?? 'Untitled workout'}</h2>
                  <p className="text-muted mb-2">{workout.description ?? 'No description provided.'}</p>
                  <p className="mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty ?? '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {workout.durationMinutes ?? 0} min
                  </p>
                  <p className="mb-0">
                    <strong>Suggested For:</strong> {Array.isArray(workout.suggestedFor) ? workout.suggestedFor.length : 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Workouts
