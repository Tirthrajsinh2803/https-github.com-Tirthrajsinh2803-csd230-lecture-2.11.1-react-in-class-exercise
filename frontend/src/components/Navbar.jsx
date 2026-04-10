import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authProvider"

function Navbar() {
  const { isAuthenticated, isAdmin, username, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-block">
          <div className="brand-title">Bookstore Secure RBAC</div>
          <div className="brand-subtitle">Premium inventory dashboard</div>
        </div>

        <nav className="nav-links">
          {isAuthenticated && (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                Home
              </NavLink>

              <NavLink to="/books" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                Books
              </NavLink>

              <NavLink to="/magazines" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                Magazines
              </NavLink>

              {isAdmin && (
                <>
                  <NavLink to="/add-book" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                    Add Book
                  </NavLink>

                  <NavLink to="/add-magazine" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
                    Add Magazine
                  </NavLink>
                </>
              )}

              <span className="user-pill">{username}</span>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar