// src/classify.js
// Classifies a support ticket as refund, shipping, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("refund") || t.includes("money back")) return "refund"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package") || t.includes("parcel") || t.includes("crushed") || t.includes("broken") || t.includes("in pieces")) return "shipping"
  return "other"
}
