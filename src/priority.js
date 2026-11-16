// Rates a support ticket's priority as high or normal.
export function priority(text) {
  const t = text.toLowerCase()
  if (t.includes("urgent") || t.includes("asap") || t.includes("immediately")) return "high"
  return "normal"
}
