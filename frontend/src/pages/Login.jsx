import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../api/axiosConfig"
import { useAuth } from "../context/authProvider"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const expired = new URLSearchParams(location.search).get("expired") === "true"

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    try {
      const response = await api.post("/api/auth/login", { username, password })
      login(response.data.token)
      navigate("/")
    } catch {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="container auth-page">
      <div className="form-card auth-card">
        <h2>Login</h2>

        {expired && (
          <div className="expired-banner">
            Session expired. Please login again.
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="demo-users">
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>User:</strong> user / user123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
