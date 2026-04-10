import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../api/axiosConfig"
import { useAuth } from "../context/authProvider"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const expired = new URLSearchParams(location.search).get("expired")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      })

      login(response.data.token)
      navigate("/")
    } catch (err) {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="page-shell">
      <div className="container">
        <div className="hero-card" style={{ marginBottom: "22px" }}>
          <h1>Elegant Bookstore Access</h1>
          <p>Secure role-based inventory management for books and magazines.</p>
        </div>

        <div className="auth-card">
          <h2>Login</h2>

          {expired && (
            <div className="banner warning">
              Session expired. Please login again.
            </div>
          )}

          {error && (
            <div className="banner error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" style={{ width: "100%" }}>
              Login
            </button>
          </form>

          <div className="credential-box">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>User:</strong> user / user123</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login