import { escapeHtml as e } from "./html.js";

// Gemeinsamer Baustein für alle Seiten. Native Bedienung ohne JS.
export function renderAccordionSection({ id, number, label, className = "section-shell border-section", content, wide = false, heading = false }) {
  const headingTag = heading ? "h2" : "span";
  return `<section id="${e(id)}" class="${e(className)}">
    <details class="section-accordion">
      <summary class="container-shell accordion-summary">
        <${headingTag} class="section-kicker"><span class="section-number">${e(number)}</span><span>${e(label)}</span></${headingTag}>
        <svg class="accordion-arrow" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </summary>
      <div class="container-shell${wide ? "" : " editorial-grid"} accordion-content">${content}</div>
    </details>
  </section>`;
}
