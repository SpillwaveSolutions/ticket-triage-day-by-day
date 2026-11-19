// src/classify.js
// Classifies a support ticket as refund, shipping, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("refund") || t.includes("money back")) return "refund"
  if (t.includes("crushed") || t.includes("broken") || t.includes("in pieces") || t.includes("dented") || t.includes("shattered") || t.includes("smashed") || t.includes("chipped")) return "shipping"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package") || t.includes("tracking")) return "shipping"
  return "other"
}
