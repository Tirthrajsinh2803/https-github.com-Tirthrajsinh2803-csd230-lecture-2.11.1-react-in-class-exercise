import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="nav-brand">Bookstore Secure RBAC</div>

      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/">Books</Link>
            <Link to="/magazines">Magazines</Link>
            {isAdmin && <Link to="/add-book">Add Book</Link>}
            {isAdmin && <Link to="/add-magazine">Add Magazine</Link>}
            <span className="nav-user">{user?.username}</span>
            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
