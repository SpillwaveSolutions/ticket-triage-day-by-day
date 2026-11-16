// Classifies a support ticket as damaged, refund, shipping, cancel, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("broken") || t.includes("damage") || t.includes("crushed")) return "damaged"
  if (t.includes("refund") || t.includes("money back")) return "refund"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package")) return "shipping"
  if (t.includes("cancel")) return "cancel"
  return "other"
}
