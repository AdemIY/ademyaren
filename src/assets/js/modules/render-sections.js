import { services } from "../../../data/services.js";
import { projects } from "../../../data/projects.js";
import { topics } from "../../../data/topics.js";
import { techStackGroups } from "../../../data/tech-stack.js";
import { socialLinks } from "../../../data/social-links.js";
import { setHTML } from "./dom-helpers.js";

function renderServices() {
  return services
    .map(
      (service) => `
        <article class="card-surface h-full">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">${service.label}</p>
          <h3 class="mt-4 text-2xl font-semibold tracking-tight text-ink">${service.title}</h3>
          <p class="mt-4 text-sm leading-7 text-stone-600">${service.description}</p>
          <ul class="mt-6 space-y-3 text-sm leading-7 text-stone-600">
            ${service.useCases
              .map(
                (item) => `
                  <li class="flex gap-3">
                    <span class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent"></span>
                    <span>${item}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderProjects() {
  return projects
    .map(
      (project) => {
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
        <article class="card-surface h-full">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">${project.purpose}</p>
              <h3 class="mt-3 text-2xl font-semibold tracking-tight text-ink">${project.title}</h3>
            </div>
            ${projectAction}
          </div>
          <p class="mt-4 text-sm font-medium text-stone-700">${project.shortContext}</p>
          <p class="mt-4 text-sm leading-7 text-stone-600">${project.description}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            ${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </article>
      `;
      },
    )
    .join("");
}

function renderTopics() {
  return topics
    .map(
      (topic) => `
        <article class="card-surface h-full">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">${topic.category}</p>
          <h3 class="mt-4 text-xl font-semibold tracking-tight text-ink">${topic.title}</h3>
          <p class="mt-4 text-sm leading-7 text-stone-600">${topic.description}</p>
          <p class="mt-6 text-sm font-medium text-stone-700">${topic.relevance}</p>
        </article>
      `,
    )
    .join("");
}

function renderTechStack() {
  return techStackGroups
    .map(
      (group) => `
        <article class="card-surface h-full">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">${group.label}</p>
          <h3 class="mt-4 text-2xl font-semibold tracking-tight text-ink">${group.title}</h3>
          <p class="mt-4 text-sm leading-7 text-stone-600">${group.description}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            ${group.items.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderSocialLinks(context) {
  const publicLinks = socialLinks.filter((link) => link.url);

  if (!publicLinks.length) {
    return `<p class="text-sm leading-7 text-stone-600">Öffentliche Profile ergänze ich zeitnah.</p>`;
  }

  return publicLinks
    .map(
      (link) => `
        <a
          href="${link.url}"
          class="${context === "footer" ? "footer-link" : "button-secondary"}"
          target="_blank"
          rel="noreferrer"
          aria-label="${link.label} extern aufrufen"
        >
          ${link.label}
        </a>
      `,
    )
    .join("");
}

export function renderDynamicSections() {
  setHTML('[data-render="services"]', renderServices());
  setHTML('[data-render="projects"]', renderProjects());
  setHTML('[data-render="topics"]', renderTopics());
  setHTML('[data-render="tech-stack"]', renderTechStack());
  setHTML('[data-render="contact-social-links"]', renderSocialLinks("contact"));
  setHTML('[data-render="footer-social-links"]', renderSocialLinks("footer"));
  setHTML('[data-render="mobile-social-links"]', renderSocialLinks("mobile"));
}
