export function getProductPrice(product) {
  return Number(product.pubPrice ?? product.price ?? 0)
}

export function getProductTypeLabel(productType) {
  return productType === "MAGAZINE" ? "Magazine" : "Book"
}

export function getProductBadge(product) {
  if (product.productType === "MAGAZINE") {
    return `${product.orderQty} incoming`
  }
  return `${product.copies} in stock`
}

export function getProductSubtitle(product) {
  if (product.productType === "MAGAZINE") {
    return product.currentIssue ? `Issue date: ${new Date(product.currentIssue).toLocaleDateString()}` : "Current issue ready"
  }
  return product.author ? `By ${product.author}` : "Curated title"
}

export function toCartItem(product) {
  return {
    cartKey: `${product.productType}-${product.id}`,
    id: product.id,
    type: product.productType,
    title: product.title,
    price: getProductPrice(product),
    subtitle: getProductSubtitle(product),
  }
}
