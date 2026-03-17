import { services } from "../../../data/services.js";
import { projects } from "../../../data/projects.js";
import { topics } from "../../../data/topics.js";
import { techStackGroups } from "../../../data/tech-stack.js";
import { socialLinks } from "../../../data/social-links.js";
import { setHTML } from "./dom-helpers.js";

function getRevealDelayClass(index) {
  const classes = ["", " reveal-delay-1", " reveal-delay-2", " reveal-delay-3"];
  return classes[index % classes.length];
}

function renderSocialIcon(linkId) {
  if (linkId === "instagram") {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5"></rect>
        <circle cx="12" cy="12" r="3.5"></circle>
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"></circle>
      </svg>
    `;
  }

  return "";
}

function renderServices() {
  return services
    .map(
      (service, index) => `
        <article class="editorial-entry reveal${getRevealDelayClass(index)}">
          <p class="panel-kicker">${service.label}</p>
          <h3 class="editorial-title">${service.title}</h3>
          <p class="editorial-copy">${service.description}</p>
          <ul class="editorial-list">
            ${service.useCases.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderProjects() {
  return projects
    .map(
      (project, index) => {
        const projectAction = project.url
          ? `
            <a
              href="${project.url}"
              class="button-secondary shrink-0"
              target="_blank"
              rel="noreferrer"
              aria-label="${project.title} extern aufrufen"
            >
              Extern
            </a>
          `
          : `
            <span class="tag shrink-0">Referenz auf Anfrage</span>
          `;

        return `
        <article class="editorial-entry reveal${getRevealDelayClass(index)}">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="panel-kicker">${project.purpose}</p>
              <h3 class="editorial-title">${project.title}</h3>
            </div>
            ${projectAction}
          </div>
          <p class="mt-4 text-sm font-medium text-stone-700">${project.shortContext}</p>
          <p class="editorial-copy">${project.description}</p>
          <p class="editorial-meta"><span class="font-medium text-stone-700">Schwerpunkte:</span> ${project.stack.join(", ")}</p>
        </article>
      `;
      },
    )
    .join("");
}

function renderTopics() {
  return topics
    .map(
      (topic, index) => `
        <article class="editorial-note reveal${getRevealDelayClass(index)}">
          <p class="panel-kicker">${topic.category}</p>
          <h3 class="editorial-subtitle">${topic.title}</h3>
          <p class="editorial-copy">${topic.description}</p>
          <p class="mt-5 text-sm font-medium text-stone-700">${topic.relevance}</p>
        </article>
      `,
    )
    .join("");
}

function renderTechStack() {
  return techStackGroups
    .map(
      (group, index) => `
        <article class="editorial-entry reveal${getRevealDelayClass(index)}">
          <p class="panel-kicker">${group.label}</p>
          <h3 class="editorial-title">${group.title}</h3>
          <p class="editorial-copy">${group.description}</p>
          <ul class="editorial-inline-list">
            ${group.items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderSocialLinks() {
  const publicLinks = socialLinks.filter((link) => link.url);

  if (!publicLinks.length) {
    return `<p class="text-sm leading-7 text-stone-600">Öffentliche Profile ergänze ich zeitnah.</p>`;
  }

  return publicLinks
    .map((link) => {
      const icon = renderSocialIcon(link.id);
      const labelMarkup = icon
        ? `<span class="sr-only">${link.label}</span>`
        : `<span class="social-link-fallback">${link.label}</span>`;

      return `
        <a
          href="${link.url}"
          class="social-link"
          target="_blank"
          rel="noreferrer"
          aria-label="${link.label} extern aufrufen"
        >
          <span class="social-link-mark" aria-hidden="true">${icon}</span>
          ${labelMarkup}
        </a>
      `;
    })
    .join("");
}

export function renderDynamicSections() {
  setHTML('[data-render="services"]', renderServices());
  setHTML('[data-render="projects"]', renderProjects());
  setHTML('[data-render="topics"]', renderTopics());
  setHTML('[data-render="tech-stack"]', renderTechStack());
  setHTML('[data-render="contact-social-links"]', renderSocialLinks());
  setHTML('[data-render="footer-social-links"]', renderSocialLinks());
  setHTML('[data-render="mobile-social-links"]', renderSocialLinks());
}
