import ProductCard from "../components/ProductCard"

function Catalog({ books, magazines, onEditBook, onEditMagazine, onDeleteBook, onDeleteMagazine }) {
  const products = [
    ...books.map((item) => ({ ...item, productType: "BOOK" })),
    ...magazines.map((item) => ({ ...item, productType: "MAGAZINE" })),
  ].sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="container">
      <div className="hero-card compact-hero">
        <h1 className="page-title">Portfolio Storefront</h1>
        <p className="page-subtitle">
          This Lab 8 version combines secure inventory management, complete CRUD pages, and a customer-facing cart experience.
        </p>
      </div>

      <div className="stats-grid">
        <div className="mini-stat"><strong>{books.length}</strong><span>Books</span></div>
        <div className="mini-stat"><strong>{magazines.length}</strong><span>Magazines</span></div>
        <div className="mini-stat"><strong>{products.length}</strong><span>Total products</span></div>
      </div>

      <h2 className="section-title">All Products</h2>
      <div className="grid">
        {products.map((product) => (
          <ProductCard
            key={`${product.productType}-${product.id}`}
            product={product}
            onEdit={product.productType === "BOOK" ? onEditBook : onEditMagazine}
            onDelete={product.productType === "BOOK" ? onDeleteBook : onDeleteMagazine}
          />
        ))}
      </div>
    </div>
  )
}

export default Catalog
