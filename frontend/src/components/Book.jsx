import { useAuth } from "../context/authProvider"

function Book({ book, onDelete, onEdit }) {
  const { isAdmin } = useAuth()

  return (
    <div className="card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Copies:</strong> {book.copies}</p>

      {isAdmin && (
        <div className="button-row">
          <button onClick={() => onEdit(book)}>Update</button>
          <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Book
