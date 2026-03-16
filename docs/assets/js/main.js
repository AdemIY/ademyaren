import { initNavigation, initSectionObserver, initHeaderState } from "./modules/navigation.js";
import { renderDynamicSections } from "./modules/render-sections.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDynamicSections();
  initNavigation();
  initSectionObserver();
  initHeaderState();
});
