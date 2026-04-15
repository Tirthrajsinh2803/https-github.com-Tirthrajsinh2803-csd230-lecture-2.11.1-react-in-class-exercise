import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart-items")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items))
  }, [items])

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.cartKey === product.cartKey)
      if (existing) {
        return prev.map((item) => item.cartKey === product.cartKey ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function increase(cartKey) {
    setItems((prev) => prev.map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item))
  }

  function decrease(cartKey) {
    setItems((prev) => prev
      .map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeItem(cartKey) {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  function clearCart() {
    setItems([])
  }

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { items, totalItems, totalPrice, addItem, increase, decrease, removeItem, clearCart }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
