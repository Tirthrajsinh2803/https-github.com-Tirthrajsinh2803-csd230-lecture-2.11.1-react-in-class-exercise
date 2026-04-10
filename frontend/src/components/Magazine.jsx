import { useAuth } from "../context/authProvider"

function Magazine({ magazine, onDelete, onEdit }) {
  const { isAdmin } = useAuth()

  const formattedIssue = magazine.currentIssue
    ? new Date(magazine.currentIssue).toLocaleDateString()
    : ""

  return (
    <div className="card">
      <h3>{magazine.title}</h3>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">${magazine.pubPrice ?? magazine.price}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Copies</span>
          <span className="info-value">{magazine.copies}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Order Quantity</span>
          <span className="info-value">{magazine.orderQty}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Current Issue</span>
          <span className="info-value">{formattedIssue}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="button-row">
          <button type="button" onClick={() => onEdit(magazine)}>
            Update
          </button>
          <button type="button" className="delete-btn" onClick={() => onDelete(magazine.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Magazine