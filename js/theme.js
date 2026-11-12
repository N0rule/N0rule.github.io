import { t } from "./i18n.js";
import { reducedMotion } from "./environment.js";
import { resetCardTracking } from "./cards.js";

const themeToggle = document.querySelector("#theme-toggle");
let themeTransition;
let requestedTheme = document.documentElement.dataset.theme;

function syncThemeToggle() {
  const isDark = document.documentElement.dataset.theme !== "light";
  themeToggle.setAttribute(
    "aria-label",
    t(isDark ? "Switch to light theme" : "Switch to dark theme"),
  );
  document.querySelector('meta[name="theme-color"]').content = isDark
    ? "#1e1e2e"
    : "#eff1f5";
}

export function initTheme() {
  syncThemeToggle();
  window.addEventListener("portfolio:languagechange", syncThemeToggle);

  themeToggle.addEventListener("click", () => {
    resetCardTracking();
    const root = document.documentElement;
    requestedTheme = requestedTheme === "light" ? "dark" : "light";
    themeTransition?.skipTransition();
    // Repaint the new palette once, then crossfade compositor snapshots instead
    // of running color transitions on every card, icon, and text node each frame.
    root.classList.add("theme-switching");
    const applyTheme = () => {
      root.dataset.theme = requestedTheme;
      syncThemeToggle();
    };
    if (!reducedMotion.matches && document.startViewTransition) {
      const transition = document.startViewTransition(applyTheme);
      themeTransition = transition;
      transition.ready.catch(() => {}); // A rapid second click can skip a snapshot.
      transition.finished
        .catch(() => {})
        .finally(() => {
          if (themeTransition === transition) {
            themeTransition = null;
            root.classList.remove("theme-switching");
          }
        });
    } else {
      themeTransition = null;
      applyTheme();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!themeTransition) root.classList.remove("theme-switching");
        }),
      );
    }
    try {
      localStorage.setItem("n0rule-theme", requestedTheme);
    } catch {}
  });
}
