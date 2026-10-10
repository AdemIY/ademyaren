import { siteConfig } from "../../../data/site.js";
import { numberLabel } from "./html.js";
import { renderAccordionSection } from "./render-accordion.js";
import {
  textLink, renderServices, renderProjects, renderTechStack,
  renderSavingSignals, renderCoachingSteps, renderPrinciples,
  renderCoachingFaqs, renderSocialLinks, renderContactTopics,
} from "./render-sections.js";

// Ein gemeinsamer Renderer: gleiche Bedienung und automatische Nummerierung.
function renderPageSections(sections) {
  return sections.map((section, index) => renderAccordionSection({
    ...section,
    number: numberLabel(index),
    heading: true,
    content: section.wide ? section.content : `<div aria-hidden="true"></div><div>${section.content}</div>`,
  })).join("");
}

export function renderWebSections() {
  return renderPageSections([
    {
      id: "leistungen", label: "Leistungen", wide: true,
      content: `<p class="section-title">Wobei ich dir helfen kann.</p><div class="service-list mt-10">${renderServices()}</div>`,
    },
    {
      id: "projekte", label: "Aus der Praxis",
      content: `<p class="section-title">Schon umgesetzt.</p><p class="section-lead">Projektfelder und Aufgaben aus meiner bisherigen Arbeit. Öffne einen Eintrag für mehr Einblick.</p><div class="project-list">${renderProjects()}</div>`,
    },
    {
      id: "tech-stack", label: "Technischer Hintergrund",
      content: `<p class="section-title">Das Werkzeug folgt der Aufgabe.</p><p class="section-lead">Erfahrung mit Shopify, Magento, PHP und Schnittstellen bringe ich mit. Welche Technik wir einsetzen, entscheidet dein Vorhaben.</p><div class="mt-8">${renderTechStack()}</div><p class="small-note">Auch bestehende Webseiten und Onlineshops entwickle ich weiter. Persönlich im Kontakt und mit Blick auf eine Zusammenarbeit, die über den Start hinausgeht.</p>`,
    },
    {
      id: "dein-vorhaben", label: "Dein Vorhaben", className: "contact-section border-section",
      content: `<p class="section-title">Du hast ein Problem, aber noch keine konkrete technische Lösung?</p><p class="section-lead">Beschreib mir kurz deine Idee oder was dich im Alltag ausbremst. Du brauchst weder ein fertiges Konzept noch eine Entscheidung für eine bestimmte Technologie.</p>${textLink("/kontakt/?anliegen=webloesungen", "Lass uns darüber sprechen")}`,
    },
  ]);
}

export function renderSavingSections() {
  return renderPageSections([
    {
      id: "fuer-wen", label: "Für wen?",
      content: `<p class="section-title">Ein regelmäßiges Einkommen.<br /><span class="serif-line">Trotzdem kaum Rücklagen.</span></p><p class="section-lead">Du verdienst beispielsweise 2.000–3.000 € netto oder mehr. Trotzdem ist am Monatsende kaum etwas übrig. Wenn du dich hier wiedererkennst, können wir gemeinsam ansetzen:</p><ul class="plain-list">${renderSavingSignals()}</ul>`,
    },
    {
      id: "die-begleitung", label: "Die Begleitung",
      content: `<p class="section-title">Mehr Überblick über dein Geld.<br /><span class="serif-line">Mit persönlicher Begleitung.</span></p><p class="section-lead">Wir ordnen deine Einnahmen und Ausgaben, hinterfragen Kaufentscheidungen und finden passende nächste Schritte. Im wöchentlichen Call, grundsätzlich am Wochenende, besprechen wir deinen Fortschritt. Dein persönliches Workbook hält alles zusammen – es ist unser Werkzeug, nicht das ganze Angebot.</p><div class="coaching-list">${renderCoachingSteps()}</div>`,
    },
    {
      id: "meine-grundgedanken", label: "Meine Grundgedanken", className: "section-shell saving-section",
      content: `<p class="section-title serif-title">Bewusster entscheiden.<br />Schritt für Schritt.</p><ol class="principle-list">${renderPrinciples()}</ol>`,
    },
    {
      id: "fragen-zur-begleitung", label: "Gut zu wissen",
      content: `<p id="coaching-faq-heading" class="section-title">So läuft deine Begleitung.</p><div class="coaching-list">${renderCoachingFaqs()}</div>`,
    },
    {
      id: "content-und-kontakt", label: "Content & Kontakt",
      content: `<p class="section-title">Zum Mitdenken.<br /><span class="serif-line">Und zum Anpacken.</span></p><p class="section-lead">Auf Social Media teile ich mit SparenMitAdem kostenlose Impulse über Geld, Sparen und Konsumverhalten. Du kannst dort mitlesen oder deine eigene Situation mit mir persönlich angehen.</p><ul class="link-list" aria-label="SparenMitAdem auf Social Media">${renderSocialLinks({ scope: "sparemitadem" })}</ul><p class="small-note">Im Mittelpunkt stehen finanzielle Organisation, Ausgabenkontrolle und Sparverhalten. Ich gebe keine Anlage-, Investment- oder Produktempfehlungen und verspreche keine Renditen.</p><p class="section-lead">Schreib mir kurz, was dich gerade beschäftigt und wobei du Unterstützung suchst. Du musst noch keinen fertigen Plan haben. Wir vereinbaren zunächst ein kostenloses Erstgespräch.</p>${textLink("/kontakt/?anliegen=sparemitadem", "Über deine Situation sprechen")}`,
    },
  ]);
}

export function renderContactSections() {
  return renderPageSections([
    {
      id: "kontakt-anliegen", label: "Worum geht es?",
      content: `<p id="contact-heading" class="section-title">Wähle dein Anliegen.</p><p class="section-lead">Dein E-Mail-Programm öffnet sich mit dem passenden Betreff.</p><ul class="contact-list mt-8">${renderContactTopics()}</ul>`,
    },
    {
      id: "direkter-kontakt", label: "Direkt schreiben",
      content: `<p class="section-title">Oder schreib mir direkt.</p>${textLink(`mailto:${siteConfig.email}`, siteConfig.email, "text-link mt-8")}<p class="small-note">Kein E-Mail-Programm eingerichtet? Kopiere die Adresse und schreibe mir über deinen gewohnten Mailanbieter.</p>`,
    },
  ]);
}

export function renderImprintSections() {
  return renderPageSections([
    {
      id: "benoetigte-angaben", label: "Benötigte Angaben",
      content: `<ul class="plain-list"><li>Name oder Firmenbezeichnung</li><li>ladungsfähige Anschrift</li><li>vertretungsberechtigte Person, falls nötig</li><li>weitere Pflichtangaben je nach Tätigkeit</li></ul>`,
    },
    {
      id: "aktueller-kontakt", label: "Aktueller Kontakt",
      content: `<p class="section-lead">Bis die finalen Angaben vorliegen, ist eine Rückfrage per E-Mail möglich.</p>${textLink(`mailto:${siteConfig.email}`, siteConfig.email)}`,
    },
  ]);
}

export function renderPrivacySections() {
  return renderPageSections([
    {
      id: "typische-inhalte", label: "Typische Inhalte",
      content: `<ul class="plain-list"><li>verantwortliche Stelle</li><li>Hosting und Server-Logs</li><li>Kontaktaufnahme per E-Mail</li><li>eingesetzte externe Dienste oder eingebettete Inhalte</li></ul>`,
    },
    {
      id: "aktueller-kontakt", label: "Aktueller Kontakt",
      content: `<p class="section-lead">Für Rückfragen ist bis zur finalen Fassung die Kontaktaufnahme per E-Mail möglich.</p>${textLink(`mailto:${siteConfig.email}`, siteConfig.email)}`,
    },
  ]);
}

export function renderPageContentTokens() {
  return {
    WEB_SECTIONS: renderWebSections,
    SAVING_SECTIONS: renderSavingSections,
    CONTACT_SECTIONS: renderContactSections,
    IMPRINT_SECTIONS: renderImprintSections,
    PRIVACY_SECTIONS: renderPrivacySections,
  };
}
