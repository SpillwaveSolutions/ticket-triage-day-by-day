// Classifies a support ticket as damaged, refund, shipping, cancel, billing, or other.
export function classify(text) {
  const t = text.toLowerCase()
  if (t.includes("broken") || t.includes("damage") || t.includes("crushed")) return "damaged"
  if (t.includes("refund") || t.includes("money back") || t.includes("return")) return "refund"
  if (t.includes("shipping") || t.includes("delivery") || t.includes("package")) return "shipping"
  if (t.includes("cancel")) return "cancel"
  if (t.includes("charge") || t.includes("invoice")) return "billing"
  if (t.includes("unsubscribe")) return "cancel"
  return "other"
}
