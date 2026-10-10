export function initTimelineAnimations() {
  const timeline = document.querySelector("[data-timeline]");
  if (!timeline) return;
  const accordion = timeline.closest(".section-accordion");
  const entries = [...timeline.querySelectorAll(".timeline-entry")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;

  const update = () => {
    frame = 0;
    if (!accordion?.open || reducedMotion.matches) return;
    const guide = window.innerHeight * 0.65;
    // Erst alle Positionen lesen, danach Styles schreiben (kein Layout-Thrashing).
    const positions = entries.map((entry) => entry.getBoundingClientRect());
    entries.forEach((entry, index) => {
      const rect = positions[index];
      const progress = Math.min(1, Math.max(0, (guide - rect.top) / Math.max(1, rect.height)));
      entry.style.setProperty("--timeline-progress", String(progress));
      entry.toggleAttribute("data-reached", guide >= rect.top);
    });
  };
  const schedule = () => {
    if (!frame && accordion?.open && !reducedMotion.matches) frame = requestAnimationFrame(update);
  };
  const updatePreference = () => {
    timeline.toggleAttribute("data-timeline-animate", !reducedMotion.matches);
    schedule();
  };

  updatePreference();
  reducedMotion.addEventListener("change", updatePreference);
  accordion?.addEventListener("toggle", schedule);
  timeline.querySelectorAll("img").forEach((image) => image.addEventListener("load", schedule));
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}
