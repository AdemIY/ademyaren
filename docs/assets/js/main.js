import { initNavigation, initHeaderState, initLegacyLinks, initContactContext } from "./modules/navigation.js";
import { initRevealAnimations } from "./modules/motion.js";
import { initThemeToggle } from "./modules/theme.js";
import { initSectionAccordions } from "./modules/accordions.js";
import { initTimelineAnimations } from "./modules/timeline.js";

initThemeToggle();
initNavigation();
initHeaderState();
initLegacyLinks();
initContactContext();
initSectionAccordions();
initRevealAnimations();
initTimelineAnimations();
