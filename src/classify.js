// Classifies a support ticket as refund, shipping, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("refund") || t.includes("money back")) return "refund"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package")) return "shipping"
  return "other"
}
