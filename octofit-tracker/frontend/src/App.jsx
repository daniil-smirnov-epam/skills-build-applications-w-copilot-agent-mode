import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, isCodespaceConfigured } from './components/api.js'

const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/users">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <NavLink className={navLinkClass} to="/users">
              Users
            </NavLink>
            <NavLink className={navLinkClass} to="/teams">
              Teams
            </NavLink>
            <NavLink className={navLinkClass} to="/activities">
              Activities
            </NavLink>
            <NavLink className={navLinkClass} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={navLinkClass} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        {!isCodespaceConfigured && (
          <div className="alert alert-warning mb-4" role="alert">
            <strong>VITE_CODESPACE_NAME</strong> is not set. Using <code>{apiBaseUrl}</code>.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
