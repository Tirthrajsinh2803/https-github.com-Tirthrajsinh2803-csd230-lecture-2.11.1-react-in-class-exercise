import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Bookstore CRUD</div>
      <div className="nav-links">
        <Link to="/">Books</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/magazines">Magazines</Link>
        <Link to="/add-magazine">Add Magazine</Link>
      </div>
    </nav>
  )
}

export default Navbar