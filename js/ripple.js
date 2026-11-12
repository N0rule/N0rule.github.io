import { reducedMotion } from "./environment.js";

// Bounded, ink-like Material ripples. Keyboard activation starts at the center.
const pressTargets =
  ".button, .icon-button, .language-toggle, .language-menu button, .filter, .model-choice, #navigation a, .project-links a, .social-link";

function ripple(target, x, y) {
  if (reducedMotion.matches || target.matches(":disabled") || target.closest(":disabled"))
    return;
  const bounds = target.getBoundingClientRect();
  const size = Math.hypot(bounds.width, bounds.height) * 2;
  const ink = document.createElement("span");
  ink.className = "press-ripple";
  ink.setAttribute("aria-hidden", "true");
  Object.assign(ink.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
  });
  target.append(ink);
  const animation = ink.animate(
    [
      { transform: "scale(0)", opacity: 0.16 },
      { transform: "scale(1)", opacity: 0 },
    ],
    { duration: 480, easing: "cubic-bezier(.2,0,0,1)" },
  );
  const cleanup = () => ink.remove();
  animation.addEventListener("finish", cleanup, { once: true });
  animation.addEventListener("cancel", cleanup, { once: true });
}

export function initRipples() {
  document.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const target = event.target.closest(pressTargets);
    if (!target) return;
    const bounds = target.getBoundingClientRect();
    ripple(target, event.clientX - bounds.left, event.clientY - bounds.top);
  });
  document.addEventListener("click", (event) => {
    if (event.detail !== 0) return;
    const target = event.target.closest(pressTargets);
    if (target)
      ripple(target, target.clientWidth / 2, target.clientHeight / 2);
  });
}
