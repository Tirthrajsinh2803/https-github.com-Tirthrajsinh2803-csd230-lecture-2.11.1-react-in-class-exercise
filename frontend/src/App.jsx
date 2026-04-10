import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"

import api from "./api/axiosConfig"
import Navbar from "./components/Navbar"
import Book from "./components/Book"
import BookForm from "./components/BookForm"
import Magazine from "./components/Magazine"
import MagazineForm from "./components/MagazineForm"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/authProvider"
import Login from "./pages/Login"

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
    try {
      const response = await api.get("/api/books")
      setBooks(response.data)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  async function fetchMagazines() {
    try {
      const response = await api.get("/api/magazines")
      setMagazines(response.data)
    } catch (error) {
      console.error("Error fetching magazines:", error)
    }
  }

  async function addBook(book) {
    try {
      await api.post("/api/books", book)
      await fetchBooks()
      navigate("/")
    } catch (error) {
      console.error("Error adding book:", error)
      alert("Book was not added.")
    }
  }

  async function addMagazine(magazine) {
    try {
      await api.post("/api/magazines", magazine)
      await fetchMagazines()
      navigate("/magazines")
    } catch (error) {
      console.error("Error adding magazine:", error)
      alert("Magazine was not added.")
    }
  }

  async function deleteBook(id) {
    try {
      await api.delete(`/api/books/${id}`)
      await fetchBooks()
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  async function deleteMagazine(id) {
    try {
      await api.delete(`/api/magazines/${id}`)
      await fetchMagazines()
    } catch (error) {
      console.error("Error deleting magazine:", error)
    }
  }

  async function updateBook(updatedBook) {
    try {
      await api.put(`/api/books/${editingBook.id}`, updatedBook)
      setEditingBook(null)
      await fetchBooks()
      navigate("/")
    } catch (error) {
      console.error("Error updating book:", error)
      alert("Book was not updated.")
    }
  }

  async function updateMagazine(updatedMagazine) {
    try {
      await api.put(`/api/magazines/${editingMagazine.id}`, updatedMagazine)
      setEditingMagazine(null)
      await fetchMagazines()
      navigate("/magazines")
    } catch (error) {
      console.error("Error updating magazine:", error)
      alert("Magazine was not updated.")
    }
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
    navigate("/")
  }

  function cancelMagazineEdit() {
    setEditingMagazine(null)
    navigate("/magazines")
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="container">
                <h2>Books</h2>
                <div className="grid">
                  {books.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      onDelete={deleteBook}
                      onEdit={handleEditBook}
                    />
                  ))}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute adminOnly>
              <BookForm
                onSave={editingBook ? updateBook : addBook}
                editingBook={editingBook}
                onCancelEdit={cancelBookEdit}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/magazines"
          element={
            <ProtectedRoute>
              <div className="container">
                <h2>Magazines</h2>
                <div className="grid">
                  {magazines.map((magazine) => (
                    <Magazine
                      key={magazine.id}
                      magazine={magazine}
                      onDelete={deleteMagazine}
                      onEdit={handleEditMagazine}
                    />
                  ))}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-magazine"
          element={
            <ProtectedRoute adminOnly>
              <MagazineForm
                onSave={editingMagazine ? updateMagazine : addMagazine}
                editingMagazine={editingMagazine}
                onCancelEdit={cancelMagazineEdit}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App