import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollectionResponse } from './api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getApiUrl('leaderboard'), { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`)
        }

        const payload = await response.json()
        setEntries(normalizeCollectionResponse(payload))
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Failed to load leaderboard'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [])

  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Leaderboard</h1>
        <p className="text-muted">Current rankings across users and teams.</p>
        {loading && <p className="mb-0">Loading leaderboard...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Team</th>
                  <th scope="col">Score</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id ?? entry.id ?? `${entry.rank}-${entry.user?._id ?? entry.user?.id ?? 'user'}`}>
                    <td>{entry.rank ?? '-'}</td>
                    <td>{entry.user?.displayName ?? entry.user?.username ?? '-'}</td>
                    <td>{entry.team?.name ?? '-'}</td>
                    <td>{entry.score ?? 0}</td>
                    <td>{entry.period ?? '-'}</td>
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

export default Leaderboard
