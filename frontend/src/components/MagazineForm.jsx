import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MagazineForm({ onSave, editingMagazine, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    copies: "",
    orderQty: "",
    currentIssue: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (editingMagazine) {
      setFormData({
        title: editingMagazine.title || "",
        price: editingMagazine.price || "",
        copies: editingMagazine.copies || "",
        orderQty: editingMagazine.orderQty || "",
        currentIssue: editingMagazine.currentIssue
          ? editingMagazine.currentIssue.slice(0, 10)
          : "",
      })
    }
  }, [editingMagazine])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const magazinePayload = {
      ...formData,
      price: parseFloat(formData.price),
      copies: parseInt(formData.copies, 10),
      orderQty: parseInt(formData.orderQty, 10),
      currentIssue: formData.currentIssue + "T00:00:00",
    }

    onSave(magazinePayload)

    setFormData({
      title: "",
      price: "",
      copies: "",
      orderQty: "",
      currentIssue: "",
    })

    navigate("/magazines")
  }

  return (
    <div className="container">
      <h2>{editingMagazine ? "Update Magazine" : "Add Magazine"}</h2>

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

        <input
          type="number"
          name="orderQty"
          placeholder="Order Quantity"
          value={formData.orderQty}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="currentIssue"
          value={formData.currentIssue}
          onChange={handleChange}
          required
        />

        <div className="button-row">
          <button type="submit">
            {editingMagazine ? "Update Magazine" : "Save Magazine"}
          </button>

          {editingMagazine && (
            <button type="button" className="secondary-btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default MagazineForm