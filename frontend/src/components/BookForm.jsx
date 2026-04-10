import { useEffect, useState } from "react"

function BookForm({ onSave, editingBook, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    copies: "",
  })

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || "",
        author: editingBook.author || "",
        price: editingBook.price || "",
        copies: editingBook.copies || "",
      })
    } else {
      setFormData({
        title: "",
        author: "",
        price: "",
        copies: "",
      })
    }
  }, [editingBook])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const bookPayload = {
      title: formData.title,
      author: formData.author,
      pubPrice: parseFloat(formData.price),
      copies: parseInt(formData.copies, 10)
    }

    await onSave(bookPayload)

    setFormData({
      title: "",
      author: "",
      price: "",
      copies: "",
    })
  }

  return (
    <div className="container">
      <h2>{editingBook ? "Update Book" : "Add Book"}</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="copies"
          placeholder="Copies"
          value={formData.copies}
          onChange={handleChange}
          required
        />

        <div className="button-row">
          <button type="submit">
            {editingBook ? "Update Book" : "Save Book"}
          </button>

          {editingBook && (
            <button type="button" className="secondary-btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default BookForm