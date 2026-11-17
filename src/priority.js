export function isUrgent(text) {
  return priority(text) === "high"
}

// Rates a support ticket's priority as high or normal.
export function priority(text) {
  const t = text.toLowerCase()
  if (
    t.includes("urgent") ||
    t.includes("asap") ||
    t.includes("immediately") ||
    t.includes("critical") ||
    t.includes("emergency")
  )
    return "high"
  return "normal"
}
