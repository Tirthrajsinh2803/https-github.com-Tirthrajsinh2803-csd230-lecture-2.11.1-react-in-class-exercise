import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { useCart } from "../context/CartProvider"

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-block">
          <div className="brand-title">Bookstore Portfolio Lab 8</div>
          <div className="brand-subtitle">Secure inventory, complete CRUD, and cart demo</div>
        </div>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
              <NavLink to="/catalog" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Catalog</NavLink>
              <NavLink to="/books" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Books</NavLink>
              <NavLink to="/magazines" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Magazines</NavLink>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Cart ({totalItems})</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>About</NavLink>
              {isAdmin && (
                <>
                  <NavLink to="/add-book" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Add Book</NavLink>
                  <NavLink to="/add-magazine" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Add Magazine</NavLink>
                </>
              )}
              <span className="user-pill">{user?.username}</span>
              <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
