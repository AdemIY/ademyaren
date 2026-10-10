import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { coachingOffer, coachingFaqs } from "../src/data/coaching.js";
import { contactTopics, contactHref } from "../src/data/contact.js";
import { offers } from "../src/data/offers.js";
import { renderHtmlTemplate } from "./site-output.mjs";
import { escapeHtml } from "../src/assets/js/modules/html.js";

const source = await readFile(new URL("../src/sparemitadem.html", import.meta.url), "utf8");
const output = renderHtmlTemplate(source, "sparemitadem");
const built = await readFile(new URL("../docs/sparemitadem/index.html", import.meta.url), "utf8");
assert.equal(built, output, "Build der Angebotsseite muss aktuell sein");
assert.equal((output.match(/<h1\b/g) || []).length, 1);
assert(!output.includes("{{"), "Alle Angebotsdaten müssen ohne Browser-JavaScript gerendert sein");
for (const value of Object.values(coachingOffer)) assert(output.includes(escapeHtml(value)), `Angebotsdatum fehlt: ${value}`);
assert.equal(coachingOffer.monthlyPrice, "20 €");
assert.equal(coachingOffer.cancellation, "monatlich kündbar");
assert.equal(coachingOffer.weeklyTime, "2–3 Stunden");
assert.equal(coachingOffer.firstMeeting, "kostenlos");
for (const faq of coachingFaqs) {
  assert(output.includes(`<h3>${escapeHtml(faq.question)}</h3>`));
  for (const paragraph of faq.paragraphs) assert(output.includes(escapeHtml(paragraph)));
  for (const bullet of faq.bullets || []) assert(output.includes(`<li>${escapeHtml(bullet)}</li>`));
  if (faq.conclusion) assert(output.includes(escapeHtml(faq.conclusion)));
}
assert(output.includes("grundsätzlich am Wochenende"));
assert(output.includes("keine Anlage-, Investment- oder Produktempfehlungen"));
assert(output.includes("Kostenloses Erstgespräch anfragen"));
assert(output.includes('href="/kontakt/?anliegen=sparemitadem"'));

const topic = contactTopics.find((entry) => entry.id === "sparemitadem");
const mail = new URL(contactHref(topic));
assert(mail.searchParams.get("subject").includes("Kostenloses Erstgespräch"));
assert(mail.searchParams.get("body").includes("kostenloses Erstgespräch"));

const home = renderHtmlTemplate(await readFile(new URL("../src/index.html", import.meta.url), "utf8"));
assert(home.includes("Ich entwickle Webseiten und Software für dein Vorhaben."));
for (const offer of offers) assert(home.includes(`>${escapeHtml(offer.cta || offer.label)} `), `Hero-Link fehlt: ${offer.label}`);
assert.equal((home.match(/<details class="section-accordion">/g) || []).length, offers.length + 3);

// Weitere Fragen brauchen nur einen Datensatz; alle Freitextfelder werden escaped.
try {
  coachingFaqs.push({
    question: 'Weitere Frage <script>alert("test")</script>',
    paragraphs: ["Antwort & Hinweis"],
    bullets: ["<b>Kein Markup</b>"],
    conclusion: "Nächster Schritt >",
  });
  const extended = renderHtmlTemplate(source, "sparemitadem");
  assert(extended.includes(escapeHtml(coachingFaqs.at(-1).question)));
  assert(extended.includes("Antwort &amp; Hinweis"));
  assert(extended.includes("&lt;b&gt;Kein Markup&lt;/b&gt;"));
  assert(extended.includes("Nächster Schritt &gt;"));
  assert(!extended.includes('<script>alert("test")</script>'));
} finally {
  coachingFaqs.pop();
}

console.log("Begleitung geprüft: 20 €/Monat, Kündbarkeit, Zeitaufwand, kostenloses Erstgespräch, FAQ-Erweiterbarkeit, HTML-Escaping und Kontaktweg.");
