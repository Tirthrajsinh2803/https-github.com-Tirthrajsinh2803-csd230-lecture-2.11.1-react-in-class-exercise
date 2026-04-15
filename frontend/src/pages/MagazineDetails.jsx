import { Link, useParams } from "react-router-dom"
import { useCart } from "../context/CartProvider"
import { toCartItem } from "../utils/productHelpers"

function MagazineDetails({ magazines }) {
  const { id } = useParams()
  const { addItem } = useCart()
  const magazine = magazines.find((item) => String(item.id) === id)

  if (!magazine) {
    return <div className="container"><div className="empty-state">Magazine not found.</div></div>
  }

  return (
    <div className="container">
      <div className="detail-card">
        <div className="detail-pill">Magazine</div>
        <h1>{magazine.title}</h1>
        <p className="page-subtitle">Expanded product details make this version stronger for portfolio review.</p>

        <div className="detail-grid">
          <div className="detail-item"><span>Price</span><strong>${Number(magazine.pubPrice ?? magazine.price ?? 0).toFixed(2)}</strong></div>
          <div className="detail-item"><span>Copies</span><strong>{magazine.copies}</strong></div>
          <div className="detail-item"><span>Order Qty</span><strong>{magazine.orderQty}</strong></div>
          <div className="detail-item"><span>Issue Date</span><strong>{magazine.currentIssue ? new Date(magazine.currentIssue).toLocaleDateString() : "N/A"}</strong></div>
        </div>

        <div className="button-row">
          <button type="button" onClick={() => addItem(toCartItem({ ...magazine, productType: "MAGAZINE" }))}>Add to Cart</button>
          <Link className="secondary-btn link-btn" to="/catalog">Back to Catalog</Link>
        </div>
      </div>
    </div>
  )
}

export default MagazineDetails
