import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { useCart } from "../context/CartProvider"
import { toCartItem } from "../utils/productHelpers"

function Magazine({ magazine, onDelete, onEdit }) {
  const { isAdmin } = useAuth()
  const { addItem } = useCart()

  const formattedIssue = magazine.currentIssue
    ? new Date(magazine.currentIssue).toLocaleDateString()
    : ""

  return (
    <div className="card">
      <div className="product-type-pill">Magazine</div>
      <h3>{magazine.title}</h3>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">${Number(magazine.pubPrice ?? magazine.price ?? 0).toFixed(2)}</span>
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

      <div className="button-row">
        <button type="button" onClick={() => addItem(toCartItem({ ...magazine, productType: "MAGAZINE" }))}>Add to Cart</button>
        <Link className="secondary-btn link-btn" to={`/magazines/${magazine.id}`}>Details</Link>
        {isAdmin && (
          <>
            <button type="button" onClick={() => onEdit(magazine)}>Update</button>
            <button type="button" className="delete-btn" onClick={() => onDelete(magazine.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Magazine
