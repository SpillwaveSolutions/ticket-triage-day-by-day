// src/classify.js
// Classifies a support ticket as refund, shipping, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("refund") || t.includes("money back")) return "refund"
  // Damage words mean the item arrived damaged, a shipping problem.
  if (t.includes("crushed") || t.includes("broken") || t.includes("in pieces")) return "shipping"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package")) return "shipping"
  return "other"
}
