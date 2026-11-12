export function initNav() {
  const navigation = document.querySelector("#navigation");
  const siteHeader = document.querySelector(".site-header");

  let headerFrame = 0;
  function updateHeader() {
    headerFrame = 0;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 32);
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
    },
    { passive: true },
  );
  updateHeader();

  // The nav pill switches by fit, not by breakpoint: the labeled pill's width
  // depends on the active language, so measure it and collapse to the icon
  // deck only when it actually runs out of room.
  const navInner = document.querySelector(".nav-inner");
  let deckFrame = 0;
  function fitNav() {
    deckFrame = 0;
    // A hidden probe of the fully-labeled pill, freed from the max-width cap
    // and from the deck mode, measures its natural width.
    const probe = navInner.cloneNode(true);
    probe.style.cssText =
      "position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;width:max-content;max-width:none";
    document.body.append(probe);
    const labeledWidth = probe.offsetWidth;
    probe.remove();
    siteHeader.classList.toggle(
      "is-deck",
      labeledWidth + 4 > siteHeader.clientWidth - 32,
    );
  }
  function requestFitNav() {
    if (!deckFrame) deckFrame = requestAnimationFrame(fitNav);
  }
  new ResizeObserver(requestFitNav).observe(siteHeader);
  new ResizeObserver(requestFitNav).observe(navInner);
  document.fonts.ready.then(requestFitNav);
  requestFitNav();

  // Track the section in view and signpost it in the pill.
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting)
          for (const link of navigation.querySelectorAll("a")) {
            const isCurrent = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", isCurrent);
            if (isCurrent) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          }
    },
    { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => sectionObserver.observe(section));
}
