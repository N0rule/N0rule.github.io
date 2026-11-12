import { applyTranslations } from "./i18n.js";
import { renderIcons } from "./icons.js";
import { reducedMotion } from "./environment.js";
import { initContent } from "./content.js";
import { initCards } from "./cards.js";
import { initTheme } from "./theme.js";
import { initRipples } from "./ripple.js";
import { initNav } from "./nav.js";
import { initGallery } from "./gallery.js";
import { initLanguageMenu } from "./language-menu.js";
import { initHoverUnstick } from "./hover-unstick.js";

// Startup: paint the static content top to bottom, then translate the
// page and let each module sync its dynamic text once — the same path a
// language change takes later.
renderIcons();
initContent();
initCards();
initTheme();
initRipples();
initNav();
initGallery();
initLanguageMenu();
initHoverUnstick();

// When the visitor asks for less motion, stop everything that is running.
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) document.getAnimations().forEach((a) => a.cancel());
});

applyTranslations();
window.dispatchEvent(new CustomEvent("portfolio:languagechange"));
