function Magazine({ magazine, onDelete, onEdit }) {
  const formattedIssue = magazine.currentIssue
    ? new Date(magazine.currentIssue).toLocaleDateString()
    : ""

  return (
    <div className="card">
      <h3>{magazine.title}</h3>
      <p><strong>Price:</strong> ${magazine.price}</p>
      <p><strong>Copies:</strong> {magazine.copies}</p>
      <p><strong>Order Qty:</strong> {magazine.orderQty}</p>
      <p><strong>Current Issue:</strong> {formattedIssue}</p>

      <div className="button-row">
        <button onClick={() => onEdit(magazine)}>Update</button>
        <button className="delete-btn" onClick={() => onDelete(magazine.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Magazine