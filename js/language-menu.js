import { t, currentLanguage, setLanguage } from "./i18n.js";

const languageToggle = document.querySelector("#language-toggle");
const languageMenu = document.querySelector("#language-menu");

function closeLanguageMenu(refocus = false) {
  languageMenu.hidden = true;
  languageToggle.setAttribute("aria-expanded", "false");
  if (refocus) languageToggle.focus({ preventScroll: true });
}

// Mirror the active language into the toggle and the menu buttons.
function syncLanguageMenu() {
  document.querySelector("#language-code").textContent =
    currentLanguage() === "uk" ? "UA" : currentLanguage().toUpperCase();
  // Name the active language in the toggle's accessible name, so
  // screen readers don't have to open the menu to hear it.
  languageToggle.setAttribute(
    "aria-label",
    `${t("Language")}: ${{ en: "English", ru: "Русский", uk: "Українська" }[currentLanguage()]}`,
  );
  languageMenu.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === currentLanguage()),
    );
  });
}

export function initLanguageMenu() {
  syncLanguageMenu();
  window.addEventListener("portfolio:languagechange", syncLanguageMenu);

  languageToggle.addEventListener("click", () => {
    const open = languageMenu.hidden;
    languageMenu.hidden = !open;
    languageToggle.setAttribute("aria-expanded", String(open));
    if (open)
      languageMenu
        .querySelector(`[data-language="${currentLanguage()}"]`)
        .focus({ preventScroll: true });
  });

  languageMenu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");
    if (button) {
      setLanguage(button.dataset.language);
      closeLanguageMenu(true);
    }
  });

  // Close on outside clicks, Escape, and focus leaving the switcher.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".language-switcher")) closeLanguageMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !languageMenu.hidden) {
      closeLanguageMenu(true);
      event.preventDefault();
    }
  });
  languageMenu.addEventListener("focusout", (event) => {
    if (!event.relatedTarget?.closest(".language-switcher"))
      closeLanguageMenu();
  });
}
