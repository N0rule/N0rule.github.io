import { reducedMotion, finePointer } from "./environment.js";

// Hover feedback: the tilt rides a spring, and a soft glare trails it
// slightly — the light glides behind the pointer instead of snapping.
const FLAT = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
const settleTimers = new WeakMap();
// Each card's springs at the moment it settled, so a quick re-entry
// resumes from the current tilt instead of snapping flat.
const cardSprings = new WeakMap();
let activeCard = null;
let cardBounds = null;
let cardFrame = 0;
let pointerX = 0;
let pointerY = 0;
// Spring state for the tilt and the glare position, resting flat/center.
let tiltX = 0;
let tiltY = 0;
let glareX = 0;
let glareY = 0;

function settleCard(card) {
  card.classList.remove("card-tilting");
  card.classList.add("card-settling");
  // Remember where the springs were, so re-entry can resume smoothly.
  cardSprings.set(card, { x: tiltX, y: tiltY, gx: glareX, gy: glareY });
  // Returning through the base transition keeps the exit smooth but short.
  card.style.transform = FLAT;
  clearTimeout(settleTimers.get(card));
  settleTimers.set(
    card,
    setTimeout(() => {
      if (activeCard === card) return;
      card.classList.remove("card-settling");
      card.style.removeProperty("transform");
      // The glare has faded by now; only then clear its position.
      card.style.removeProperty("--shx");
      card.style.removeProperty("--shy");
    }, 640),
  );
}

export function resetCardTracking() {
  cancelAnimationFrame(cardFrame);
  cardFrame = 0;
  if (activeCard) settleCard(activeCard);
  activeCard = null;
  cardBounds = null;
}

function updateCardFrame() {
  cardFrame = 0;
  if (!activeCard || !cardBounds) return;
  const tx = Math.max(
    -1,
    Math.min(1, ((pointerX - cardBounds.left) / cardBounds.width) * 2 - 1),
  );
  const ty = Math.max(
    -1,
    Math.min(1, ((pointerY - cardBounds.top) / cardBounds.height) * 2 - 1),
  );
  const delta =
    Math.abs(tiltX - tx) +
    Math.abs(tiltY - ty) +
    Math.abs(glareX - tx) +
    Math.abs(glareY - ty);
  tiltX += (tx - tiltX) * 0.2;
  tiltY += (ty - tiltY) * 0.2;
  // The glare trails the card's turn, so the light behaves like it has mass.
  glareX += (tx - glareX) * 0.13;
  glareY += (ty - glareY) * 0.13;
  // Cap the combined tilt, including diagonal corners, at 6 degrees.
  // Oversized cards can opt into a smaller cap: the same angle swings a
  // big card's edges much further, so they stay proportionate via
  // data-tilt-max.
  const magnitude = Math.max(1, Math.hypot(tiltX, tiltY));
  const maxTilt = parseFloat(activeCard.dataset.tiltMax) || 6;
  activeCard.style.transform =
    `perspective(1100px) rotateX(${((-tiltY * maxTilt) / magnitude).toFixed(2)}deg) ` +
    `rotateY(${((tiltX * maxTilt) / magnitude).toFixed(2)}deg)`;
  activeCard.style.setProperty("--shx", glareX.toFixed(3));
  activeCard.style.setProperty("--shy", glareY.toFixed(3));
  // Keep gliding until the springs settle; nothing runs when idle.
  if (delta > 0.002) cardFrame = requestAnimationFrame(updateCardFrame);
}

function updateCardPointer(event) {
  if (reducedMotion.matches || !finePointer.matches || event.pointerType === "touch")
    return;
  const card = event.currentTarget;
  if (activeCard !== card) {
    resetCardTracking();
    activeCard = card;
    clearTimeout(settleTimers.get(card));
    cardBounds = card.getBoundingClientRect();
    // Re-entering mid-settle resumes from the card's own springs; a fresh
    // entry starts from rest, with the light drifting out from center.
    const resume =
      card.classList.contains("card-settling") && cardSprings.get(card);
    if (resume) {
      ({ x: tiltX, y: tiltY, gx: glareX, gy: glareY } = cardSprings.get(card));
    } else {
      card.style.transform = FLAT;
      tiltX = tiltY = glareX = glareY = 0;
    }
    card.classList.remove("card-settling");
    card.classList.add("card-tilting");
  }
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (cardFrame) return;
  cardFrame = requestAnimationFrame(updateCardFrame);
}

// Entrance and reveal animations share one map per card, so re-animating
// (for example, refiltering) cancels the previous run.
const entranceAnimations = new WeakMap();

export function cancelCardReveal(card) {
  entranceAnimations.get(card)?.cancel();
}

export function revealCards(cards) {
  if (reducedMotion.matches) return;
  cards.forEach((card, index) => {
    entranceAnimations.get(card)?.cancel();
    const animation = card.animate([{ translate: "0 12px" }, { translate: "0 0" }], {
      duration: 450,
      delay: Math.min(index, 5) * 65,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "backwards",
    });
    entranceAnimations.set(card, animation);
  });
}

export function initCards() {
  // Contact cards stay flat: only projects and skills get the tilt and glare.
  for (const card of document.querySelectorAll(".project-card, .skill-card")) {
    const glare = document.createElement("span");
    glare.className = "card-glare";
    glare.setAttribute("aria-hidden", "true");
    card.append(glare);
    card.addEventListener("pointerenter", updateCardPointer);
    card.addEventListener("pointermove", updateCardPointer, { passive: true });
    card.addEventListener("pointerleave", resetCardTracking);
    card.addEventListener("pointercancel", resetCardTracking);
  }
  window.addEventListener("scroll", resetCardTracking, {
    passive: true,
    capture: true,
  });
  window.addEventListener("resize", resetCardTracking, { passive: true });
  window.addEventListener("blur", resetCardTracking);
  finePointer.addEventListener("change", resetCardTracking);
  reducedMotion.addEventListener("change", resetCardTracking);
  // Cards can also be left mid-tilt when the page is backgrounded;
  // rAF is paused there, so the springs would run against stale bounds.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetCardTracking();
  });
}
