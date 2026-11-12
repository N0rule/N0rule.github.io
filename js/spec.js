import { renderIcons } from "./icons.js";
import { initCards } from "./cards.js";
import { initNav } from "./nav.js";
import { reducedMotion } from "./environment.js";

// Startup for the spec sheet: the shared chrome (icons, theme toggle, sticky
// header, card tilt) plus one greeting. The portfolio-only modules (gallery,
// i18n, projects) are not part of this page.

renderIcons();
initCards();
initNav();

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

// The same restrained greeting the main page plays, once the fonts are in.
document.fonts.ready.then(() => {
  if (reducedMotion.matches) return;
  document.querySelector(".hello-wave")?.animate(
    [
      { rotate: "0deg" },
      { rotate: "14deg", offset: 0.22 },
      { rotate: "-9deg", offset: 0.42 },
      { rotate: "7deg", offset: 0.62 },
      { rotate: "-3deg", offset: 0.8 },
      { rotate: "0deg" },
    ],
    { duration: 1100, delay: 200, easing: "ease-in-out", iterations: 1 },
  );
});
