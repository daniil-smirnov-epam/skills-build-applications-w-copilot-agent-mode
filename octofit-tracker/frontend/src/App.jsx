import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <div className="row g-4 align-items-stretch">
      <div className="col-lg-8">
        <div className="card shadow-sm border-0 h-100 card-hover">
          <div className="card-body p-4">
            <p className="text-primary fw-semibold text-uppercase">Welcome back</p>
            <h1 className="display-6 fw-bold">Track workouts, grow with your team, and climb the leaderboard.</h1>
            <p className="lead text-muted mt-3">
              OctoFit Tracker brings your training, team goals, and progress insights into one modern experience.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a className="btn btn-primary" href="/leaderboard">View leaderboard</a>
              <a className="btn btn-outline-secondary" href="/workouts">See workout ideas</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm border-0 h-100 card-hover">
          <div className="card-body p-4">
            <h2 className="h5 fw-bold">Today at a glance</h2>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item px-0">4 team members active</li>
              <li className="list-group-item px-0">2 new personal records</li>
              <li className="list-group-item px-0">1 suggested recovery session</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeaderboardPage() {
  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Leaderboard</h1>
        <p className="text-muted">Your team’s most consistent contributors are highlighted here.</p>
        <ul className="list-group list-group-flush mt-4">
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>Mina</span>
            <span className="fw-semibold">1,420 pts</span>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>Jules</span>
            <span className="fw-semibold">1,360 pts</span>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>Sam</span>
            <span className="fw-semibold">1,280 pts</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function WorkoutsPage() {
  return (
    <div className="card shadow-sm border-0 card-hover">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold">Workout ideas</h1>
        <p className="text-muted">Personalized suggestions are ready for your next training session.</p>
        <div className="row g-3 mt-2">
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <h2 className="h6 fw-bold">Tempo run</h2>
              <p className="text-muted mb-0">A short interval session to build pace and endurance.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <h2 className="h6 fw-bold">Strength circuit</h2>
              <p className="text-muted mb-0">Target your upper body with controlled reps and recovery.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <h2 className="h6 fw-bold">Mobility flow</h2>
              <p className="text-muted mb-0">A lighter session to improve flexibility and recovery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            OctoFit Tracker
          </a>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
