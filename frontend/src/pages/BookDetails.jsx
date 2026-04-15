import { Link, useParams } from "react-router-dom"
import { useCart } from "../context/CartProvider"
import { toCartItem } from "../utils/productHelpers"

function BookDetails({ books }) {
  const { id } = useParams()
  const { addItem } = useCart()
  const book = books.find((item) => String(item.id) === id)

  if (!book) {
    return <div className="container"><div className="empty-state">Book not found.</div></div>
  }

  return (
    <div className="container">
      <div className="detail-card">
        <div className="detail-pill">Book</div>
        <h1>{book.title}</h1>
        <p className="page-subtitle">A polished Lab 8 detail page for your portfolio presentation.</p>

        <div className="detail-grid">
          <div className="detail-item"><span>Author</span><strong>{book.author}</strong></div>
          <div className="detail-item"><span>Price</span><strong>${Number(book.pubPrice ?? book.price ?? 0).toFixed(2)}</strong></div>
          <div className="detail-item"><span>Copies</span><strong>{book.copies}</strong></div>
          <div className="detail-item"><span>Type</span><strong>Book</strong></div>
        </div>

        <div className="button-row">
          <button type="button" onClick={() => addItem(toCartItem({ ...book, productType: "BOOK" }))}>Add to Cart</button>
          <Link className="secondary-btn link-btn" to="/catalog">Back to Catalog</Link>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
