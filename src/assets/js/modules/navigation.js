import { query, queryAll } from "./dom-helpers.js";

export function initNavigation() {
  const menuButton = query("[data-menu-button]");
  const menuCloseButton = query("[data-menu-close]");
  const menuPanel = query("[data-mobile-menu]");
  if (!menuButton || !(menuPanel instanceof HTMLDialogElement)) return;

  let previousFocus = null;
  const closeMenu = () => { if (menuPanel.open) menuPanel.close(); };

  menuButton.addEventListener("click", () => {
    if (menuPanel.open) return;
    previousFocus = document.activeElement;
    menuPanel.showModal();
    menuButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
    menuCloseButton?.focus();
  });
  menuCloseButton?.addEventListener("click", closeMenu);
  queryAll("[data-mobile-nav-link]").forEach((link) => link.addEventListener("click", closeMenu));
  menuPanel.addEventListener("close", () => {
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  });
  // Das native Dialog übernimmt Hintergrund-Inertheit und Escape.
  // Die bisherige explizite Tab-Schleife bleibt auch am Rand des Dialogs erhalten.
  menuPanel.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = queryAll('a[href], button:not([disabled]), [tabindex="0"]', menuPanel);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  menuPanel.addEventListener("click", (event) => {
    if (event.target !== menuPanel) return;
    const rect = menuPanel.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMenu();
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

export function initHeaderState() {
  const header = query("[data-site-header]");
  if (!header) return;
  const update = () => header.toggleAttribute("data-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

export function initLegacyLinks() {
  if (document.body.dataset.page !== "home") return;
  const movedSections = {
    "#leistungen": "/webloesungen/#leistungen",
    "#projekte": "/webloesungen/#projekte",
    "#tech-stack": "/webloesungen/#tech-stack",
    "#aktuelle-themen": "/ueber-mich/#aktuelle-themen",
  };
  const resolveLegacyHash = () => {
    const destination = movedSections[window.location.hash];
    if (destination) window.location.replace(destination);
  };
  resolveLegacyHash();
  window.addEventListener("hashchange", resolveLegacyHash);
}

export function initContactContext() {
  const topic = new URLSearchParams(window.location.search).get("anliegen");
  queryAll("[data-contact-topic]").forEach((link) => {
    if (link.dataset.contactTopic === topic) {
      // Die vorausgewählte Anfrage bleibt trotz kompakter Seitenübersicht direkt erreichbar.
      const section = link.closest(".section-accordion");
      if (section) section.open = true;
      link.setAttribute("data-selected", "");
      const hint = document.createElement("span");
      hint.className = "sr-only";
      hint.textContent = " – Dein ausgewähltes Anliegen";
      link.append(hint);
    }
  });
}
