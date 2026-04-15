import { useCart } from "../context/CartProvider"

function CartPage() {
  const { items, totalItems, totalPrice, increase, decrease, removeItem, clearCart } = useCart()

  return (
    <div className="container">
      <div className="hero-card compact-hero">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">This cart is stored in the browser so the project stays easy to run on your professor’s PC.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">Your cart is empty. Add a few books or magazines from the catalog.</div>
      ) : (
        <>
          <div className="cart-summary-row">
            <div className="mini-stat"><strong>{totalItems}</strong><span>Items</span></div>
            <div className="mini-stat"><strong>${totalPrice.toFixed(2)}</strong><span>Total</span></div>
            <div className="mini-stat"><strong>Ready</strong><span>Portfolio demo</span></div>
          </div>

          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-card" key={item.cartKey}>
                <div>
                  <div className="detail-pill small-pill">{item.type}</div>
                  <h3>{item.title}</h3>
                  <p className="product-subcopy">{item.subtitle}</p>
                </div>
                <div className="cart-side">
                  <div className="cart-price">${item.price.toFixed(2)}</div>
                  <div className="cart-qty-row">
                    <button type="button" className="secondary-btn" onClick={() => decrease(item.cartKey)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" className="secondary-btn" onClick={() => increase(item.cartKey)}>+</button>
                  </div>
                  <button type="button" className="delete-btn" onClick={() => removeItem(item.cartKey)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="button-row" style={{ marginTop: '24px' }}>
            <button type="button" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
