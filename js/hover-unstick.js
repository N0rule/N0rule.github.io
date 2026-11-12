// Returning from another tab or window, browsers keep the last :hover
// applied to whatever sat under the pointer, so cards can look stuck in
// their hovered state until the pointer actually moves. The hover-freeze
// class holds those styles off (see the CSS) until that happens.
const root = document.documentElement;
let armed = false;

function engage() {
  if (armed) return;
  armed = true;
  root.classList.add("hover-freeze");
}

function release() {
  if (!armed) return;
  armed = false;
  root.classList.remove("hover-freeze");
}

export function initHoverUnstick() {
  // Both fire when the visitor comes back to the page; a plain window
  // switch keeps the document visible, so visibilitychange alone is
  // not enough.
  window.addEventListener("focus", engage);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) engage();
  });
  window.addEventListener("pageshow", engage);
  window.addEventListener(
    "pointermove",
    () => {
      if (armed) release();
    },
    { passive: true },
  );
}
