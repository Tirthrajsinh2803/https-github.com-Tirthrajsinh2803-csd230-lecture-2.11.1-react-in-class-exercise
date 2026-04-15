function About() {
  return (
    <div className="container">
      <div className="detail-card">
        <div className="detail-pill">Lab 8</div>
        <h1>Refined Portfolio-Ready Application</h1>
        <p className="page-subtitle">
          This version builds on Lab 7 by improving the storefront design, expanding the visible product experience, adding product detail pages,
          keeping full CRUD for books and magazines, and introducing a cart that can be demonstrated easily during marking.
        </p>

        <div className="detail-grid">
          <div className="detail-item"><span>Backend</span><strong>Spring Boot + H2</strong></div>
          <div className="detail-item"><span>Frontend</span><strong>React + Vite</strong></div>
          <div className="detail-item"><span>Security</span><strong>JWT + RBAC</strong></div>
          <div className="detail-item"><span>Mobile</span><strong>Flutter starter included</strong></div>
        </div>
      </div>
    </div>
  )
}

export default About
