import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { legalContact, privacySections } from "../src/data/legal.js";
import { pages } from "../src/data/site.js";
import { renderHtmlTemplate } from "./site-output.mjs";
import { webServices } from "../src/data/services.js";
import { contactTopics } from "../src/data/contact.js";
import { offers } from "../src/data/offers.js";

const expected = {
  home: ["links", ...offers.map((offer) => offer.id), "ueber-mich", "kontakt"],
  webloesungen: ["leistungen", "projekte", "tech-stack", "dein-vorhaben"],
  sparemitadem: ["fuer-wen", "die-begleitung", "meine-grundgedanken", "fragen-zur-begleitung", "content-und-kontakt"],
  "ueber-mich": ["wer-bin-ich", "was-mich-antreibt", "wie-ich-arbeite", "geld-und-verhalten", "aktuelle-themen"],
  kontakt: ["kontakt-anliegen", "direkter-kontakt"],
  impressum: ["aktueller-kontakt"],
  datenschutz: privacySections.map((section) => section.id),
};

for (const page of pages) {
  const source = await readFile(new URL(`../src/${page.file}`, import.meta.url), "utf8");
  const built = await readFile(new URL(`../docs/${page.path === "/" ? "index.html" : `${page.path.slice(1)}index.html`}`, import.meta.url), "utf8");
  assert.equal(built, renderHtmlTemplate(source, page.id), `${page.file}: Build muss aktuell sein`);
  const sections = [...built.matchAll(/<section id="([^"]+)"[^>]*>\s*<details class="section-accordion">/g)];
  assert.deepEqual(sections.map((match) => match[1]), expected[page.id], `${page.file}: Accordion-Reihenfolge`);
  assert.equal((built.match(/<details class="section-accordion"[^>]*>/g) || []).length, sections.length);
  assert(!/<details class="section-accordion"[^>]*\bopen\b/.test(built), `${page.file}: zunächst geschlossen`);
  assert.equal((built.match(/class="container-shell accordion-summary"/g) || []).length, sections.length);
  assert.equal((built.match(/class="accordion-arrow"/g) || []).length, sections.length);
  assert.equal((built.match(/<h1\b/g) || []).length, 1);
  const ids = [...built.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${page.file}: eindeutige Anker`);
  assert(!built.includes("{{"));
  if (page.id === "webloesungen") {
    for (const service of webServices) assert(built.includes(`id="${service.id}"`), "Leistungsanker erhalten");
    assert(built.includes('class="project-row"'), "Projektdetails bleiben bedienbar");
  }
  if (page.id === "kontakt") {
    for (const topic of contactTopics) assert(built.includes(`data-contact-topic="${topic.id}"`));
    assert(built.includes("Direkt per E-Mail schreiben"), "Direkter Kontakt bleibt außerhalb der Accordions erreichbar");
  }
  if (page.id === "impressum" || page.id === "datenschutz") {
    assert(!built.includes("vorläufigen Stand"));
    assert(built.includes(legalContact.street));
    assert(built.includes(`${legalContact.postalCode} ${legalContact.city}`));
    const intro = built.slice(0, built.indexOf('class="accordion-sections"'));
    assert(intro.includes(legalContact.street), "Verantwortlicher muss ohne Öffnen eines Accordions sichtbar sein");
  }
}

console.log("Alle 7 Seiten geprüft: gemeinsame Accordions, geschlossene Startzustände, Reihenfolge, Anker, H1, Kontakt und Rechtstext-Hinweise.");
