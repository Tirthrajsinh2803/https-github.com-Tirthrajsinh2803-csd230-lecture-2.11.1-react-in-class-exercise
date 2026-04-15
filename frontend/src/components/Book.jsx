import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { useCart } from "../context/CartProvider"
import { toCartItem } from "../utils/productHelpers"

function Book({ book, onDelete, onEdit }) {
  const { isAdmin } = useAuth()
  const { addItem } = useCart()

  return (
    <div className="card">
      <div className="product-type-pill">Book</div>
      <h3>{book.title}</h3>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Author</span>
          <span className="info-value">{book.author}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">${Number(book.pubPrice ?? book.price ?? 0).toFixed(2)}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Copies</span>
          <span className="info-value">{book.copies}</span>
        </div>
      </div>

      <div className="button-row">
        <button type="button" onClick={() => addItem(toCartItem({ ...book, productType: "BOOK" }))}>Add to Cart</button>
        <Link className="secondary-btn link-btn" to={`/books/${book.id}`}>Details</Link>
        {isAdmin && (
          <>
            <button type="button" onClick={() => onEdit(book)}>Update</button>
            <button type="button" className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Book
