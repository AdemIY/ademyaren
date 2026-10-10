// Native details/summary behalten Tastaturbedienung und einen No-JS-Fallback.
export function initSectionAccordions() {
  const sections = [...document.querySelectorAll(".section-accordion")];
  if (!sections.length) return;

  const openHashTarget = () => {
    if (!window.location.hash) return;
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    const section = target?.closest(".section-accordion")
      ?? (target?.matches(".accordion-sections > section") ? target.querySelector(".section-accordion") : null);
    if (!section) return;
    section.open = true;
    target.scrollIntoView({ block: "start" });
  };

  openHashTarget();
  window.addEventListener("hashchange", openHashTarget);
}
