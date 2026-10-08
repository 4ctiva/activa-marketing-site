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
