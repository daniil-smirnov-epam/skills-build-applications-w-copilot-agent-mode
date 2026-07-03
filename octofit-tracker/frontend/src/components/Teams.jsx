import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollectionResponse } from './api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getApiUrl('teams'), { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalizeCollectionResponse(payload))
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Failed to load teams'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [])

  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Teams</h1>
        <p className="text-muted">Team setup, descriptions, and current membership.</p>
        {loading && <p className="mb-0">Loading teams...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team._id ?? team.id ?? team.name} className="col-lg-6">
                <div className="border rounded p-3 h-100 bg-white">
                  <h2 className="h5 mb-1">{team.name ?? 'Unnamed team'}</h2>
                  <p className="text-muted mb-2">{team.description ?? 'No description provided.'}</p>
                  <p className="mb-0">
                    <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}
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

export default Teams
