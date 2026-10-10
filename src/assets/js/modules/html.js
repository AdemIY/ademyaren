export function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

export function numberLabel(index) {
  return String(index + 1).padStart(2, "0");
}

export function arrow(direction = "right") {
  return `<span aria-hidden="true">${direction === "external" ? "↗" : "→"}</span>`;
}
