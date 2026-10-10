import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { timelineEntries, timelineConclusion } from "../src/data/timeline.js";
import { socialLinks } from "../src/data/social-links.js";
import { renderAboutSections } from "../src/assets/js/modules/render-sections.js";
import { escapeHtml } from "../src/assets/js/modules/html.js";
import { renderTimeline } from "../src/assets/js/modules/render-timeline.js";
import { renderHtmlTemplate } from "./site-output.mjs";

const years = (html) => [...html.matchAll(/data-timeline-year="(\d+)"/g)].map((match) => Number(match[1]));
const original = timelineEntries.slice();
const output = renderTimeline();
assert.deepEqual(years(output), [...new Set(original.map((entry) => entry.year))].sort((a, b) => a - b));
assert.equal((output.match(/class="timeline-entry /g) ?? []).length, original.length);
assert.equal((output.match(/data-timeline-last/g) ?? []).length, 1);
assert.equal(output.includes("Platzhalter, kein tatsächlicher Lebenslauf"), original.some((entry) => entry.isExample));
assert(output.includes('href="https://www.youtube.com/@prodadam-nu1yu"'));
assert(output.includes('src="/assets/images/og/og-cover.png"'));
assert(output.includes('loading="lazy" decoding="async"'));

try {
  timelineEntries.push({ year: 1999, title: '<script>alert("test")</script>', description: "A & B" });
  timelineEntries.push({ year: 2022, title: "Weitere Station", description: "Noch ein Eintrag im selben Jahr." });
  const extended = renderTimeline();
  assert.equal(years(extended)[0], 1999, "Neue frühere Jahre müssen zuerst erscheinen");
  assert.equal(years(extended).filter((year) => year === 2022).length, 1, "Gleiche Jahre werden gruppiert");
  assert.equal((extended.match(/class="timeline-entry /g) ?? []).length, original.length + 2);
  assert(extended.includes("&lt;script&gt;"));
  assert(extended.includes("A &amp; B"));
  assert(!extended.includes("<script>"));
  assert.deepEqual(timelineEntries.slice(0, original.length), original, "Rendering darf die Eingabereihenfolge nicht ändern");

  timelineEntries.splice(0, timelineEntries.length, { year: 2025, title: "Echte Station", description: "Ohne Beispielmarkierung." });
  assert(!renderTimeline().includes("Beispiel-Timeline"));
  assert(!renderTimeline().includes("<img"), "Fehlendes Bild darf keinen Platzhalter erzeugen");
  timelineEntries[0].image = { src: "   ", alt: "" };
  assert(!renderTimeline().includes("<figure"), "Leerer Bildpfad muss das ganze Bild ausblenden");
  timelineEntries[0].image = { src: '/assets/icons/ui/favicon.svg?x="quoted"', alt: 'Ein Bild mit "Anführungszeichen"', width: 100, height: 80, caption: "A & B" };
  const withImage = renderTimeline();
  assert(withImage.includes('alt="Ein Bild mit &quot;Anführungszeichen&quot;"'));
  assert(withImage.includes('width="100" height="80"'));
  assert(withImage.includes('favicon.svg?x=&quot;quoted&quot;'));
  assert(withImage.includes("A &amp; B</figcaption>"));
  timelineEntries[0].link = { href: "", label: "Kein Link" };
  assert(!renderTimeline().includes("Kein Link"));
  timelineEntries[0].link = { href: "https://example.com/", label: "Mehr & Details" };
  assert(renderTimeline().includes('target="_blank" rel="noopener noreferrer"'));
  assert(renderTimeline().includes("Mehr &amp; Details"));
  timelineEntries[0].isExample = true;
  assert(renderTimeline().includes("Beispiel-Timeline"));
  timelineEntries[0].year = "kein Jahr";
  assert.throws(renderTimeline, /ganze Jahreszahl/);
  timelineEntries.length = 0;
  assert.deepEqual(years(renderTimeline()), []);
  assert(!renderTimeline().includes("data-timeline-last"));
} finally {
  timelineEntries.splice(0, timelineEntries.length, ...original);
}

for (const [file, pageId] of [["ueber-mich.html", "ueber-mich"], ["index.html", "home"]]) {
  const source = await readFile(new URL(`../src/${file}`, import.meta.url), "utf8");
  const built = await readFile(new URL(`../docs/${file === "index.html" ? file : file.replace(/\.html$/, "/index.html")}`, import.meta.url), "utf8");
  assert.equal(built, renderHtmlTemplate(source, pageId), `${file}: Build muss aktuell sein`);
  assert.equal((built.match(/<main\b/g) ?? []).length, 1, "Kein main innerhalb der Timeline");
  assert.equal((built.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((built.match(/<details class="section-accordion">/g) ?? []).length, 5);
  if (pageId === "ueber-mich") {
    assert.equal(built.match(/<section id="([^"]+)"/)?.[1], "wer-bin-ich");
    assert(built.includes('<h2 class="section-kicker"><span class="section-number">01</span><span>Wer bin ich?</span></h2>'));
    assert(built.includes('id="aktuelle-themen"'), "Vorhandenen Themenanker erhalten");
    assert(built.includes(escapeHtml(timelineConclusion.title)));
    for (const paragraph of timelineConclusion.paragraphs) assert(built.includes(escapeHtml(paragraph)));
    assert(built.indexOf("data-timeline-last") < built.indexOf("data-timeline-conclusion"), "Abschluss muss nach dem letzten Timeline-Eintrag stehen");
    assert(built.indexOf("data-timeline-conclusion") < built.indexOf('id="was-mich-antreibt"'), "Abschluss gehört in das erste Accordion");
  }
}

try {
  socialLinks.push({ id: "timeline-testprofil", label: "Zusätzliches Profil", url: "https://example.com/timeline-profile", context: "Testprofil", scope: "personal" });
  const about = renderAboutSections();
  const conclusion = about.slice(about.indexOf("data-timeline-conclusion"), about.indexOf('id="was-mich-antreibt"'));
  assert(conclusion.includes('href="https://example.com/timeline-profile"'), "Neue Social-Datensätze müssen automatisch auch im Abschluss erscheinen");
  assert(conclusion.includes('href="/kontakt/"'));
  assert(conclusion.indexOf("Meine Social-Media-Profile") < conclusion.indexOf("Kontakt aufnehmen"));
} finally {
  socialLinks.pop();
}

console.log("Timeline geprüft: Sortierung, Jahresgruppen, Erweiterung, Escaping, Beispielhinweis, leere Daten und beide Accordion-Seiten.");
