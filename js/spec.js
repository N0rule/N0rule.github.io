import { renderIcons } from "./icons.js";

// Lightweight startup for the spec sheet: icons, the shared theme toggle,
// and the footer year. Deliberately skips the portfolio modules (gallery,
// i18n, cards) that index.html needs.

renderIcons();

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
