import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import api from "./api/axiosConfig"
import Book from "./components/Book"
import BookForm from "./components/BookForm"
import Magazine from "./components/Magazine"
import MagazineForm from "./components/MagazineForm"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/authProvider"
import About from "./pages/About"
import BookDetails from "./pages/BookDetails"
import CartPage from "./pages/CartPage"
import Catalog from "./pages/Catalog"
import Login from "./pages/Login"
import MagazineDetails from "./pages/MagazineDetails"

function HomePage() {
  return (
    <div className="container">
      <div className="hero-card">
        <h1>Bookstore Portfolio Experience</h1>
        <p>
          Lab 8 refines the secure bookstore into a more complete showcase project with a storefront catalog,
          richer product pages, improved presentation, and a browser-based cart.
        </p>
      </div>

      <div className="stats-grid">
        <div className="mini-stat"><strong>JWT</strong><span>Secure login</span></div>
        <div className="mini-stat"><strong>CRUD</strong><span>Books + magazines</span></div>
        <div className="mini-stat"><strong>Cart</strong><span>Portfolio ready</span></div>
      </div>
    </div>
  )
}

function App() {
  const [books, setBooks] = useState([])
  const [magazines, setMagazines] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [editingMagazine, setEditingMagazine] = useState(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks()
      fetchMagazines()
    }
  }, [isAuthenticated])

  async function fetchBooks() {
    const response = await api.get("/api/books")
    setBooks(response.data)
  }

  async function fetchMagazines() {
    const response = await api.get("/api/magazines")
    setMagazines(response.data)
  }

  async function addBook(book) {
    await api.post("/api/books", book)
    await fetchBooks()
    navigate("/books")
  }

  async function addMagazine(magazine) {
    await api.post("/api/magazines", magazine)
    await fetchMagazines()
    navigate("/magazines")
  }

  async function deleteBook(id) {
    await api.delete(`/api/books/${id}`)
    await fetchBooks()
  }

  async function deleteMagazine(id) {
    await api.delete(`/api/magazines/${id}`)
    await fetchMagazines()
  }

  async function updateBook(updatedBook) {
    await api.put(`/api/books/${editingBook.id}`, updatedBook)
    setEditingBook(null)
    await fetchBooks()
    navigate("/books")
  }

  async function updateMagazine(updatedMagazine) {
    await api.put(`/api/magazines/${editingMagazine.id}`, updatedMagazine)
    setEditingMagazine(null)
    await fetchMagazines()
    navigate("/magazines")
  }

  function handleEditBook(book) {
    setEditingBook(book)
    navigate("/add-book")
  }

  function handleEditMagazine(magazine) {
    setEditingMagazine(magazine)
    navigate("/add-magazine")
  }

  function cancelBookEdit() {
    setEditingBook(null)
    navigate("/books")
  }

  function cancelMagazineEdit() {
    setEditingMagazine(null)
    navigate("/magazines")
  }

  return (
    <div className="page-shell">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/catalog" element={<ProtectedRoute><Catalog books={books} magazines={magazines} onEditBook={handleEditBook} onEditMagazine={handleEditMagazine} onDeleteBook={deleteBook} onDeleteMagazine={deleteMagazine} /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><div className="container"><h2 className="section-title">Book Collection</h2>{books.length === 0 ? <div className="empty-state">No books available right now.</div> : <div className="grid">{books.map((book) => <Book key={book.id} book={book} onDelete={deleteBook} onEdit={handleEditBook} />)}</div>}</div></ProtectedRoute>} />
        <Route path="/magazines" element={<ProtectedRoute><div className="container"><h2 className="section-title">Magazine Inventory</h2>{magazines.length === 0 ? <div className="empty-state">No magazines available right now.</div> : <div className="grid">{magazines.map((magazine) => <Magazine key={magazine.id} magazine={magazine} onDelete={deleteMagazine} onEdit={handleEditMagazine} />)}</div>}</div></ProtectedRoute>} />
        <Route path="/books/:id" element={<ProtectedRoute><BookDetails books={books} /></ProtectedRoute>} />
        <Route path="/magazines/:id" element={<ProtectedRoute><MagazineDetails magazines={magazines} /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/add-book" element={<ProtectedRoute adminOnly><div className="container"><BookForm onSave={editingBook ? updateBook : addBook} editingBook={editingBook} onCancelEdit={cancelBookEdit} /></div></ProtectedRoute>} />
        <Route path="/add-magazine" element={<ProtectedRoute adminOnly><div className="container"><MagazineForm onSave={editingMagazine ? updateMagazine : addMagazine} editingMagazine={editingMagazine} onCancelEdit={cancelMagazineEdit} /></div></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
