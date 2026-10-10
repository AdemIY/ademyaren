import { timelineEntries } from "../../../data/timeline.js";
import { arrow, escapeHtml as e } from "./html.js";

function renderImage(entry) {
  const image = entry.image;
  const src = image?.src?.trim();
  if (!src) return "";
  const dimensions = Number.isInteger(image.width) && image.width > 0 && Number.isInteger(image.height) && image.height > 0
    ? ` width="${image.width}" height="${image.height}"` : "";
  return `<figure class="mt-6 max-w-2xl"><img src="${e(src)}" alt="${e(image.alt?.trim() || entry.title)}"${dimensions} loading="lazy" decoding="async" class="h-auto w-full" />${image.caption ? `<figcaption class="mt-3 text-sm leading-relaxed text-muted">${e(image.caption)}</figcaption>` : ""}</figure>`;
}

function renderLink(link) {
  const href = link?.href?.trim();
  if (!href) return "";
  const external = /^https?:\/\//i.test(href);
  return `<a class="text-link mt-6" href="${e(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${e(link.label || "Mehr ansehen")} ${arrow(external ? "external" : undefined)}${external ? '<span class="sr-only"> (öffnet in neuem Tab)</span>' : ""}</a>`;
}

export function renderTimeline() {
  const grouped = new Map();
  for (const entry of timelineEntries.toSorted((a, b) => a.year - b.year)) {
    if (!Number.isInteger(entry.year)) throw new Error("Timeline: year muss eine ganze Jahreszahl sein.");
    if (!grouped.has(entry.year)) grouped.set(entry.year, []);
    grouped.get(entry.year).push(entry);
  }
  const lastYear = [...grouped.keys()].at(-1);
  const exampleNote = timelineEntries.some((entry) => entry.isExample)
    ? '<p class="small-note mt-0">Beispiel-Timeline: Die folgenden Jahreszahlen und Stationen sind Platzhalter, kein tatsächlicher Lebenslauf.</p>'
    : "";

  return `${exampleNote}<ol id="timeline" class="mt-10" data-timeline>${[...grouped].map(([year, entries]) => `<li class="grid grid-cols-[3.6rem_minmax(0,1fr)] items-start gap-x-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-12" data-timeline-year="${year}">
    <h3 class="sticky top-28 self-start whitespace-nowrap font-display text-[clamp(1.5rem,5vw,4.5rem)] leading-none tracking-[-0.05em]">${year}</h3>
    <ol>${entries.map((entry, index) => `<li class="timeline-entry relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 pb-12 sm:gap-x-8 sm:pb-16"${year === lastYear && index === entries.length - 1 ? " data-timeline-last" : ""}>
      <div class="timeline-marker relative" aria-hidden="true"><span class="timeline-dot"></span><span class="timeline-rail"><span class="timeline-progress"></span></span></div>
      <article class="timeline-copy reveal min-w-0 [overflow-wrap:anywhere]"><h4 class="max-w-3xl text-[clamp(1.25rem,3.2vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.04em]">${e(entry.title)}</h4><p class="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">${e(entry.description)}</p>${renderImage(entry)}${renderLink(entry.link)}</article>
    </li>`).join("")}</ol>
  </li>`).join("")}</ol>`;
}
