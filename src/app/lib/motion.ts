/*
 * Motion runtime — scroll reveals, parallax, stat counters.
 * Pairs with src/styles/motion.css (likova-style motion language).
 * No-ops entirely under prefers-reduced-motion (and tears itself down if the
 * preference flips mid-session); without JS the CSS never hides content
 * (states are gated on html.js-motion).
 */

const EASE_OUT_EXPO = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

type ParallaxItem = { el: HTMLElement; img: HTMLElement; strength: number; near: boolean };

let observer: IntersectionObserver | null = null;
let nearObserver: IntersectionObserver | null = null;
let parallaxItems: ParallaxItem[] = [];
let parallaxRaf = 0;
let booted = false;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Reveals ─────────────────────────────────────────────────── */

function finishReveal(el: HTMLElement) {
  // drop the reveal transition override so the element's own Tailwind
  // hover transitions (colors etc.) apply again
  el.removeAttribute("data-reveal");
  el.style.removeProperty("--reveal-delay");
}

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!el.isConnected) {
          observer?.unobserve(el);
          continue;
        }
        if (!entry.isIntersecting) continue;
        revealNow(el);
      }
    },
    // threshold 0: clip-path shrinks the intersection rect, so clipped
    // curtain elements only ever expose a hairline sliver
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return observer;
}

function revealNow(el: HTMLElement) {
  el.classList.add("is-in");
  observer?.unobserve(el);
  el.addEventListener("transitionend", (e) => {
    // curtain imgs keep settling after the container's clip-path ends;
    // those elements are finished by the timeout instead
    if (e.target === el && e.propertyName !== "clip-path") finishReveal(el);
  });
  // fallback for curtain elements and anything that never fires transitionend
  window.setTimeout(() => finishReveal(el), 2600);
  if (el.hasAttribute("data-count")) runCounter(el);
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(runCounter);
}

/** Observe any [data-reveal] elements not yet tracked; assign group staggers. */
export function scanReveals(root: ParentNode = document) {
  if (!booted || reducedMotion()) return;
  const obs = ensureObserver();

  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const step = Number(group.dataset.revealStagger || 110);
    group.querySelectorAll<HTMLElement>(":scope [data-reveal]").forEach((el, i) => {
      if (!el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", `${(i * step) / 1000}s`);
      }
    });
  });

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.dataset.revealTracked) return;
    el.dataset.revealTracked = "1";
    obs.observe(el);
  });
}

/* ── Stat counters ───────────────────────────────────────────── */

function runCounter(el: HTMLElement) {
  const raw = el.dataset.count || el.textContent || "";
  const match = raw.match(/^([^0-9]*)([0-9][0-9., ]*)(.*)$/);
  if (!match) return;
  const [, prefix, numStr, suffix] = match;
  const decimals = (numStr.split(".")[1] || "").length;
  const target = parseFloat(numStr.replace(/[ ,]/g, ""));
  if (!isFinite(target)) return;
  const dur = 1400;
  let start = 0;
  const frame = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / dur);
    const value = target * EASE_OUT_EXPO(t);
    el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = raw;
  };
  requestAnimationFrame(frame);
}

/* ── Parallax ────────────────────────────────────────────────── */

function collectParallax() {
  parallaxItems = [...document.querySelectorAll<HTMLElement>("[data-parallax]")].flatMap((el) => {
    const img = el.querySelector<HTMLElement>("img");
    if (!img) return [];
    return [{ el, img, strength: Number(el.dataset.parallax) || 26, near: false }];
  });
  // Only near-viewport images get transformed (and thus layer-promoted);
  // leaving the viewport clears the transform so GPU layers are released.
  nearObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const item = parallaxItems.find((p) => p.el === entry.target);
        if (!item) continue;
        item.near = entry.isIntersecting;
        item.el.classList.toggle("is-near", item.near);
        if (!item.near) item.img.style.transform = "";
      }
      onScrollOrResize();
    },
    { rootMargin: "50% 0px 50% 0px" },
  );
  parallaxItems.forEach((p) => nearObserver?.observe(p.el));
}

function parallaxFrame() {
  const vh = window.innerHeight;
  for (const { el, img, strength, near } of parallaxItems) {
    if (!near) continue;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh || rect.height === 0) continue;
    // progress ≈ -1 (entering from below) … 1 (leaving above), slight bias is fine
    const progress = 1 - (2 * (rect.top + rect.height / 2)) / (vh + rect.height);
    // minimum overscan that guarantees the travel never exposes an edge
    const scale = 1 + (2 * strength) / rect.height;
    img.style.transform = `translate3d(0, ${(progress * strength).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
  }
  parallaxRaf = 0;
}

function onScrollOrResize() {
  if (!parallaxRaf) parallaxRaf = requestAnimationFrame(parallaxFrame);
}

/* ── Teardown (reduced-motion flipped on mid-session) ────────── */

function teardown() {
  window.removeEventListener("scroll", onScrollOrResize);
  window.removeEventListener("resize", onScrollOrResize);
  if (parallaxRaf) {
    cancelAnimationFrame(parallaxRaf);
    parallaxRaf = 0;
  }
  for (const { el, img } of parallaxItems) {
    img.style.transform = "";
    el.classList.remove("is-near");
  }
  parallaxItems = [];
  nearObserver?.disconnect();
  nearObserver = null;
  observer?.disconnect();
  observer = null;
  // un-gate the hidden states so nothing stays invisible
  document.documentElement.classList.remove("js-motion");
}

/* ── Boot ────────────────────────────────────────────────────── */

/**
 * Initialize the motion layer. `revealAfterMs` delays the first reveal scan
 * so entrances choreograph with the page-load curtain.
 */
export function initMotion({ revealAfterMs = 0 }: { revealAfterMs?: number } = {}) {
  if (booted || reducedMotion()) return;
  booted = true;
  document.documentElement.classList.add("js-motion");

  window.setTimeout(() => scanReveals(), revealAfterMs);

  // keyboard focus must never land on an invisible control: force-reveal
  // the focused element's [data-reveal] ancestors immediately
  document.addEventListener("focusin", (e) => {
    let el = (e.target as Element).closest?.("[data-reveal]") as HTMLElement | null;
    while (el) {
      el.style.setProperty("--reveal-delay", "0s");
      revealNow(el);
      el = el.parentElement?.closest("[data-reveal]") ?? null;
    }
  });

  collectParallax();
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  parallaxFrame();

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", (e) => {
    if (e.matches) teardown();
  });
}

/** Whether the load intro should play this session (once per tab session). */
export function introPending(): boolean {
  if (reducedMotion()) return false;
  try {
    return !window.sessionStorage.getItem("activa-intro-done");
  } catch {
    return false;
  }
}

export function markIntroDone() {
  try {
    window.sessionStorage.setItem("activa-intro-done", "1");
  } catch {
    // ignore
  }
}
