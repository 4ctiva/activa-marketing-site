/**
 * Publishes the page's sticky header height as --header-clearance on <html>,
 * which theme.css uses as the top scroll-margin of focusable controls, so a
 * control reached with Tab/Shift+Tab never lands under the header — even when
 * the header wraps to two rows (e.g. the main site at tablet widths).
 * Pages mark their header with `data-sticky-header`. Returns a cleanup.
 */
export function trackStickyHeader() {
  const header = document.querySelector<HTMLElement>("[data-sticky-header]");
  if (!header || typeof ResizeObserver === "undefined") return () => {};

  const root = document.documentElement;
  const update = () => {
    // the margin applies inside the zoomed body, so convert back to its CSS px
    const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
    root.style.setProperty("--header-clearance", `${Math.ceil(header.getBoundingClientRect().height / zoom) + 12}px`);
  };
  const observer = new ResizeObserver(update);
  observer.observe(header);
  update();
  return () => {
    observer.disconnect();
    root.style.removeProperty("--header-clearance");
  };
}

/**
 * Marks the sticky header while it sits over a dark section ([data-dark-surface])
 * so it can switch to ink glass with light text instead of a muddy grey slab,
 * and once the page has scrolled (data-condensed) so it can tighten slightly.
 * Returns a cleanup.
 */
export function trackHeaderSurface() {
  const header = document.querySelector<HTMLElement>("[data-sticky-header]");
  if (!header) return () => {};
  let raf = 0;
  const update = () => {
    raf = 0;
    const box = header.getBoundingClientRect();
    const line = box.top + box.height / 2;
    const overDark = [...document.querySelectorAll<HTMLElement>("[data-dark-surface]")].some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= line && r.bottom >= line;
    });
    header.dataset.overDark = String(overDark);
    // hysteresis wider than the ~9px the header shrinks by: otherwise scroll
    // anchoring moves scrollY back across a single threshold and it flips forever
    const condensed = header.dataset.condensed === "true";
    header.dataset.condensed = String(condensed ? window.scrollY > 8 : window.scrollY > 40);
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();
  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (raf) cancelAnimationFrame(raf);
  };
}
