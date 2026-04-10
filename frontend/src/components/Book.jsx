import { useAuth } from "../context/authProvider"

function Book({ book, onDelete, onEdit }) {
  const { isAdmin } = useAuth()

  return (
    <div className="card">
      <h3>{book.title}</h3>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Author</span>
          <span className="info-value">{book.author}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">${book.pubPrice ?? book.price}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Copies</span>
          <span className="info-value">{book.copies}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="button-row">
          <button type="button" onClick={() => onEdit(book)}>
            Update
          </button>
          <button type="button" className="delete-btn" onClick={() => onDelete(book.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Book