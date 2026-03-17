import { initNavigation, initSectionObserver, initHeaderState } from "./modules/navigation.js";
import { initRevealAnimations } from "./modules/motion.js";
import { initThemeToggle } from "./modules/theme.js";
import { renderDynamicSections } from "./modules/render-sections.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  renderDynamicSections();
  initRevealAnimations();
  initNavigation();
  initSectionObserver();
  initHeaderState();
});
