// Pure Render-Funktionen: Build und Preview liefern vollständiges HTML, auch ohne JavaScript.
import { webServices } from "../../../data/services.js";
import { projects } from "../../../data/projects.js";
import { topics } from "../../../data/topics.js";
import { techStackGroups } from "../../../data/tech-stack.js";
import { socialLinks } from "../../../data/social-links.js";
import { offers } from "../../../data/offers.js";
import { coachingOffer, coachingFaqs, coachingSteps, savingPrinciples, savingSignals } from "../../../data/coaching.js";
import { contactTopics, contactHref } from "../../../data/contact.js";
import { arrow, escapeHtml as e, numberLabel } from "./html.js";
import { renderAccordionSection } from "./render-accordion.js";
import { renderTimeline } from "./render-timeline.js";
import { timelineConclusion } from "../../../data/timeline.js";

export function sectionHeading(number, label) {
  return `<p class="section-kicker"><span class="section-number">${e(number)}</span><span>${e(label)}</span></p>`;
}

export function textLink(href, label, className = "text-link") {
  return `<a class="${e(className)}" href="${e(href)}">${e(label)} ${arrow()}</a>`;
}

export function renderSocialLinks({ compact = false, scope } = {}) {
  return socialLinks.filter((link) => link.url && (!scope || link.scope === scope))
    .map((link) => `<li><a href="${e(link.url)}" class="${compact ? "footer-link" : "link-row"}" target="_blank" rel="noopener noreferrer" aria-label="${e(link.label)} – ${e(link.context || "mein Profil")} (öffnet in neuem Tab)"><span>${e(link.label)}</span>${compact ? "" : `<span class="link-context">${e(link.context)}</span>`}${arrow("external")}</a></li>`).join("");
}

export function renderOfferLinks() {
  return offers.map((offer) => textLink(offer.href, offer.cta || offer.label)).join("");
}

export function renderOffers() {
  return offers.map((offer, index) => {
    const saving = offer.variant === "saving";
    const number = numberLabel(index + 1);
    return renderAccordionSection({
      id: offer.id, number, label: offer.label,
      className: `offer-section${saving ? " saving-section" : ""}`,
      content: `<div>${sectionHeading(number, offer.label)}${saving ? `<p class="margin-note">Geld verstehen.<br />Bewusst entscheiden.</p>` : ""}</div>
        <div class="offer-content">
          <h2 class="section-title${saving ? " serif-title" : ""}">${e(offer.title)}</h2>
          <p class="section-lead">${e(offer.description)}</p>
          ${offer.variant === "web" ? `<ul class="service-preview">${webServices.map((service) => `<li><a href="${e(offer.href)}#${e(service.id)}">${e(service.title)} ${arrow()}</a></li>`).join("")}</ul>` : ""}
          ${offer.note ? `<p class="offer-note">${e(offer.note)}</p>` : ""}
          ${textLink(offer.href, offer.cta)}
        </div>
      `,
    });
  }).join("");
}

export function renderHomeSections() {
  const linksNumber = numberLabel(0);
  const aboutNumber = numberLabel(offers.length + 1);
  const contactNumber = numberLabel(offers.length + 2);
  return renderAccordionSection({
    id: "links", number: linksNumber, label: "Links", className: "section-shell border-section",
    content: `${sectionHeading(linksNumber, "Links")}<div><h2 class="section-title">Auch hier findest du mich.</h2><p class="section-lead">Gedanken, Einblicke und Austausch auf Social Media.</p><ul class="link-list" aria-label="Meine Social-Media-Profile">${renderSocialLinks()}</ul></div>`,
  }) + renderOffers() + renderAccordionSection({
    id: "ueber-mich", number: aboutNumber, label: "Über mich", className: "section-shell border-section",
    content: `${sectionHeading(aboutNumber, "Über mich")}<div><h2 class="section-title">Ich sehe ein Problem.<br /><span class="serif-line">Und möchte es lösen.</span></h2><p class="section-lead">Ich bin Entwickler, denke praktisch und baue eigene Ideen auf. Mich interessiert, wie Dinge funktionieren – von Software bis zu unseren Entscheidungen rund um Geld und Konsum.</p>${textLink("/ueber-mich/", "Mehr über mich")}</div>`,
  }) + renderAccordionSection({
    id: "kontakt", number: contactNumber, label: "Kontakt", className: "contact-section border-section",
    content: `${sectionHeading(contactNumber, "Kontakt")}<div><h2 class="section-title">Du hast ein Projekt oder möchtest mit mir arbeiten?</h2>${textLink("/kontakt/", "Kontakt aufnehmen")}</div>`,
  });
}

function renderTimelineConclusion() {
  const profiles = renderSocialLinks();
  return `<section id="warum-ich-das-erzaehle" class="border-t border-[var(--line)] pt-10 sm:pt-12" aria-labelledby="timeline-why-title" data-timeline-conclusion>
    <div class="max-w-3xl [overflow-wrap:anywhere] lg:ml-[18rem]">
      <h3 id="timeline-why-title" class="section-title">${e(timelineConclusion.title)}</h3>
      <div class="prose-content">${timelineConclusion.paragraphs.map((paragraph) => `<p>${e(paragraph)}</p>`).join("")}</div>
      ${profiles ? `<ul class="link-list" aria-label="Meine Social-Media-Profile">${profiles}</ul>` : ""}
      ${textLink("/kontakt/", "Kontakt aufnehmen", "text-link mt-8")}
    </div>
  </section>`;
}

export function renderAboutSections() {
  return renderAccordionSection({
    id: "wer-bin-ich", number: "01", label: "Wer bin ich?", wide: true, heading: true,
    content: renderTimeline() + renderTimelineConclusion(),
  }) + renderAccordionSection({
    id: "was-mich-antreibt", number: "02", label: "Was mich antreibt", heading: true,
    content: `${sectionHeading("02", "Was mich antreibt")}<div class="prose-content"><h3 class="section-title">Eine Idee ist ein Anfang.</h3><p>Mich reizt es, daraus etwas zu bauen, das im Alltag funktioniert: eine Webseite, einen Shop oder eine individuelle Anwendung. Ich erkenne gern Probleme und entwickle Lösungen dafür. Dabei interessiert mich nicht nur die Technik, sondern auch das Vorhaben dahinter.</p><p>Ich baue eigene Ideen und Projekte auf und denke unternehmerisch mit. Mit Gründern, kleinen Unternehmen und Menschen, die etwas vorhaben, arbeite ich besonders gern zusammen.</p><p>Zu meiner bisherigen Praxis gehören eine Buchungsplattform mit PHP und PayPal, Frontends im Magento- und Hyvä-Umfeld, Shopify-Anpassungen mit Liquid und APIs sowie Funktionen mit PHP und Symfony. Privat vertiefe ich unter anderem meine Arbeit mit React.</p>${textLink("/webloesungen/#projekte", "Einblicke in meine Arbeit")}</div>`,
  }) + renderAccordionSection({
    id: "wie-ich-arbeite", number: "03", label: "Wie ich arbeite", heading: true,
    content: `${sectionHeading("03", "Wie ich arbeite")}<div class="prose-content"><h3 class="section-title">Direkt im Kontakt.<br /><span class="serif-line">Klar in der Umsetzung.</span></h3><p>Wenn wir zusammenarbeiten, sprichst du direkt mit mir. Ich höre zu, frage nach und möchte verstehen, was du brauchst. Daraus entwickeln wir eine Struktur und eine Lösung, die du nachvollziehen kannst.</p><p>Ich achte auf saubere Umsetzung, gute Pflege und sinnvolle Komplexität. Mir ist eine Zusammenarbeit wichtig, in der Vertrauen entsteht und die auch nach dem ersten Ergebnis weitergehen kann.</p></div>`,
  }) + renderAccordionSection({
    id: "geld-und-verhalten", number: "04", label: "Geld & Verhalten", heading: true,
    content: `${sectionHeading("04", "Geld & Verhalten")}<div class="prose-content"><h3 class="section-title">Andere Fragen.<br /><span class="serif-line">Derselbe Blick.</span></h3><p>Warum kaufen wir Dinge, die wir kaum nutzen? Warum bleibt trotz eines guten Einkommens so wenig übrig? Geld, Konsum und unsere Entscheidungen beschäftigen mich intensiv.</p><p>Mit SparenMitAdem bringe ich diesen Blick in die persönliche Begleitung ein: erst beobachten und verstehen, dann Struktur schaffen und Schritt für Schritt etwas verändern. Das verbindet meine beiden Bereiche – ein Problem erkennen und ein System entwickeln, das im Alltag hilft.</p>${textLink("/sparemitadem/", "SparenMitAdem kennenlernen")}</div>`,
  }) + renderAccordionSection({
    id: "aktuelle-themen", number: "05", label: "Weitere Gedanken", heading: true,
    content: `${sectionHeading("05", "Weitere Gedanken")}<div><h3 class="section-title">Was mich noch beschäftigt.</h3><details class="tech-details"><summary>Positionierung, E-Commerce und Zusammenarbeit <span class="details-marker" aria-hidden="true">+</span></summary><div>${renderTopics()}</div></details>${textLink("/kontakt/", "Lass uns austauschen")}</div>`,
  });
}

export function renderServices() {
  return webServices.map((service, index) => `<article id="${e(service.id)}" class="service-row">
    <span class="row-number" aria-hidden="true">${numberLabel(index)}</span>
    <h3>${e(service.title)}</h3><p>${e(service.description)}</p>
  </article>`).join("");
}

export function renderProjects() {
  return projects.map((project) => `<details class="project-row">
    <summary><span class="project-category">${e(project.purpose)}</span><span class="project-name">${e(project.title)}</span><span class="details-marker" aria-hidden="true">+</span></summary>
    <div class="project-content"><p>${e(project.shortContext)}</p><p>${e(project.description)}</p><p class="project-stack">${e(project.stack.join(" · "))}</p>
      ${project.url ? `<a href="${e(project.url)}" class="text-link" target="_blank" rel="noopener noreferrer">${e(project.title)} besuchen ${arrow("external")}<span class="sr-only"> (öffnet in neuem Tab)</span></a>` : ""}
    </div>
  </details>`).join("");
}

export function renderTechStack() {
  return techStackGroups.map((group) => `<div class="tech-row"><h3>${e(group.title)}</h3><p>${e(group.items.join(" · "))}</p></div>`).join("");
}

export function renderTopics() {
  return topics.map((topic) => `<article class="topic-row"><h3>${e(topic.title)}</h3><p>${e(topic.description)}</p></article>`).join("");
}

export function renderCoachingSteps() {
  return coachingSteps.map((step, index) => `<article class="coaching-step"><span class="row-number">${numberLabel(index)}</span><div><h3>${e(step.title)}</h3><p>${e(step.description)}</p><p class="step-detail">${e(step.detail)}</p></div></article>`).join("");
}

export function renderCoachingTerms() {
  return `${e(coachingOffer.monthlyPrice)} im Monat · ${e(coachingOffer.cancellation)} · ${e(coachingOffer.weeklyTime)} pro Woche · Erstgespräch ${e(coachingOffer.firstMeeting)}`;
}

export function renderCoachingFaqs() {
  return coachingFaqs.map((faq, index) => `<article class="coaching-step">
    <span class="row-number" aria-hidden="true">${numberLabel(index)}</span>
    <div><h3>${e(faq.question)}</h3>${faq.paragraphs.map((paragraph) => `<p>${e(paragraph)}</p>`).join("")}
      ${faq.bullets?.length ? `<ul class="plain-list">${faq.bullets.map((bullet) => `<li>${e(bullet)}</li>`).join("")}</ul>` : ""}
      ${faq.conclusion ? `<p>${e(faq.conclusion)}</p>` : ""}
    </div>
  </article>`).join("");
}

export function renderPrinciples() {
  return savingPrinciples.map((principle, index) => `<li><span class="row-number" aria-hidden="true">${numberLabel(index)}</span><p>${e(principle)}</p></li>`).join("");
}

export function renderSavingSignals() {
  return savingSignals.map((signal) => `<li>${e(signal)}</li>`).join("");
}

export function renderContactTopics() {
  return contactTopics.map((topic, index) => `<li><a href="${e(contactHref(topic))}" class="contact-row" data-contact-topic="${e(topic.id)}"><span class="row-number" aria-hidden="true">${numberLabel(index)}</span><span><span class="contact-label">${e(topic.label)}</span><span class="contact-description">${e(topic.description)}</span></span>${arrow()}</a></li>`).join("");
}

export function renderContentTokens() {
  return {
    OFFER_LINKS: renderOfferLinks,
    HOME_SECTIONS: renderHomeSections,
    ABOUT_SECTIONS: renderAboutSections,
    WEB_SERVICES: renderServices,
    PROJECTS: renderProjects,
    TECH_STACK: renderTechStack,
    TOPICS: renderTopics,
    SOCIAL_LINKS: renderSocialLinks,
    COACHING_STEPS: renderCoachingSteps,
    COACHING_TERMS: renderCoachingTerms,
    COACHING_FAQS: renderCoachingFaqs,
    SAVING_PRINCIPLES: renderPrinciples,
    SAVING_SIGNALS: renderSavingSignals,
    CONTACT_TOPICS: renderContactTopics,
    SAVING_SOCIAL_LINKS: () => renderSocialLinks({ scope: "sparemitadem" }),
  };
}
