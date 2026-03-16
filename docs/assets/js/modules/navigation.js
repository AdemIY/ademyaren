import { query, queryAll } from "./dom-helpers.js";

export function initNavigation() {
  const menuButton = query("[data-menu-button]");
  const menuCloseButton = query("[data-menu-close]");
  const menuPanel = query("[data-mobile-menu]");
  const menuOverlay = query("[data-menu-overlay]");
  const mobileLinks = queryAll("[data-mobile-nav-link]");

  if (!menuButton || !menuPanel || !menuOverlay) {
    return;
  }

  let isMenuOpen = false;
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    queryAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      menuPanel,
    );

  const openMenu = () => {
    lastFocusedElement = document.activeElement;
    isMenuOpen = true;
    menuButton.setAttribute("aria-expanded", "true");
    menuOverlay.classList.remove("opacity-0", "pointer-events-none");
    menuPanel.classList.remove("translate-x-full");
    document.body.classList.add("overflow-hidden");
    menuCloseButton?.focus();
  };

  const closeMenu = () => {
    isMenuOpen = false;
    menuButton.setAttribute("aria-expanded", "false");
    menuOverlay.classList.add("opacity-0", "pointer-events-none");
    menuPanel.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const handleTabKey = (event) => {
    if (!isMenuOpen || event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  menuButton.addEventListener("click", openMenu);
  menuCloseButton?.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen) {
      closeMenu();
      return;
    }

    handleTabKey(event);
  });
}

export function initSectionObserver() {
  const sections = queryAll("main section[id]");
  const navigationLinks = queryAll("[data-nav-link]");

  if (!sections.length || !navigationLinks.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentHash = `#${entry.target.id}`;

        navigationLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === currentHash;

          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.15,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

export function initHeaderState() {
  const header = query("[data-site-header]");

  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    if (window.scrollY > 8) {
      header.classList.add("shadow-sm", "shadow-stone-950/5");
    } else {
      header.classList.remove("shadow-sm", "shadow-stone-950/5");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}
