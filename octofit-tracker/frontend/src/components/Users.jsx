import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollectionResponse } from './api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getApiUrl('users'), { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`)
        }

        const payload = await response.json()
        setUsers(normalizeCollectionResponse(payload))
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name === 'AbortError') {
          return
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Failed to load users'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Users</h1>
        <p className="text-muted">Athlete profiles and account details from the API.</p>
        {loading && <p className="mb-0">Loading users...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Display Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id ?? user.id ?? user.username}>
                    <td>{user.displayName ?? '-'}</td>
                    <td>{user.username ?? '-'}</td>
                    <td>{user.email ?? '-'}</td>
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

export default Users
