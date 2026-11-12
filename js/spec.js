import { renderIcons } from "./icons.js";
import { initCards } from "./cards.js";
import { initNav } from "./nav.js";
import { initHoverUnstick } from "./hover-unstick.js";

// Startup for the spec sheet: the shared chrome (icons, theme toggle, sticky
// header, card tilt, hover unstick). The portfolio-only modules (gallery,
// i18n, projects) are not part of this page.

renderIcons();
initCards();
initNav();
initHoverUnstick();

const themeToggle = document.querySelector("#theme-toggle");

function syncThemeToggle() {
  const isDark = document.documentElement.dataset.theme !== "light";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
  document.querySelector('meta[name="theme-color"]').content = isDark
    ? "#1e1e2e"
    : "#eff1f5";
}

syncThemeToggle();

themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  try {
    localStorage.setItem("n0rule-theme", root.dataset.theme);
  } catch {}
  syncThemeToggle();
});

document.querySelector("#year").textContent = new Date().getFullYear();
