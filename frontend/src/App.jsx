import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

import Navbar from "./components/Navbar"
import Book from "./components/Book"
import BookForm from "./components/BookForm"
import Magazine from "./components/Magazine"
import MagazineForm from "./components/MagazineForm"

function App() {
  const [books, setBooks] = useState([])
  const [magazines, setMagazines] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [editingMagazine, setEditingMagazine] = useState(null)

  useEffect(() => {
    fetchBooks()
    fetchMagazines()
  }, [])

  function fetchBooks() {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error))
  }

  function fetchMagazines() {
    fetch("/api/magazines")
      .then((response) => response.json())
      .then((data) => setMagazines(data))
      .catch((error) => console.error("Error fetching magazines:", error))
  }

  function addBook(book) {
    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then(() => fetchBooks())
      .catch((error) => console.error("Error adding book:", error))
  }

  function addMagazine(magazine) {
    fetch("/api/magazines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(magazine),
    })
      .then(() => fetchMagazines())
      .catch((error) => console.error("Error adding magazine:", error))
  }

  function deleteBook(id) {
    fetch(`/api/books/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchBooks())
      .catch((error) => console.error("Error deleting book:", error))
  }

  function deleteMagazine(id) {
    fetch(`/api/magazines/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchMagazines())
      .catch((error) => console.error("Error deleting magazine:", error))
  }

  function updateBook(updatedBook) {
    fetch(`/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then(() => {
        setEditingBook(null)
        fetchBooks()
      })
      .catch((error) => console.error("Error updating book:", error))
  }

  function updateMagazine(updatedMagazine) {
    fetch(`/api/magazines/${editingMagazine.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMagazine),
    })
      .then(() => {
        setEditingMagazine(null)
        fetchMagazines()
      })
      .catch((error) => console.error("Error updating magazine:", error))
  }

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h2>Books</h2>
              <div className="grid">
                {books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    onDelete={deleteBook}
                    onEdit={setEditingBook}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/add-book"
          element={
            <BookForm
              onSave={editingBook ? updateBook : addBook}
              editingBook={editingBook}
              onCancelEdit={() => setEditingBook(null)}
            />
          }
        />

        <Route
          path="/magazines"
          element={
            <div className="container">
              <h2>Magazines</h2>
              <div className="grid">
                {magazines.map((magazine) => (
                  <Magazine
                    key={magazine.id}
                    magazine={magazine}
                    onDelete={deleteMagazine}
                    onEdit={setEditingMagazine}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/add-magazine"
          element={
            <MagazineForm
              onSave={editingMagazine ? updateMagazine : addMagazine}
              editingMagazine={editingMagazine}
              onCancelEdit={() => setEditingMagazine(null)}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App