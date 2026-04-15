import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { useCart } from "../context/CartProvider"
import { getProductBadge, getProductPrice, getProductSubtitle, getProductTypeLabel, toCartItem } from "../utils/productHelpers"

function ProductCard({ product, onEdit, onDelete }) {
  const { isAdmin } = useAuth()
  const { addItem } = useCart()
  const detailPath = product.productType === "MAGAZINE" ? `/magazines/${product.id}` : `/books/${product.id}`

  return (
    <div className="card product-card">
      <div className="product-type-pill">{getProductTypeLabel(product.productType)}</div>
      <h3>{product.title}</h3>
      <p className="product-subcopy">{getProductSubtitle(product)}</p>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">${getProductPrice(product).toFixed(2)}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Availability</span>
          <span className="info-value">{getProductBadge(product)}</span>
        </div>
      </div>

      <div className="button-row">
        <button type="button" onClick={() => addItem(toCartItem(product))}>Add to Cart</button>
        <Link className="secondary-btn link-btn" to={detailPath}>Details</Link>
        {isAdmin && (
          <>
            <button type="button" className="secondary-btn" onClick={() => onEdit(product)}>Update</button>
            <button type="button" className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCard
