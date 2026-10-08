import { useEffect, useState } from "react";
import { parseClauseRange, termsIds } from "./model";

const HIGHLIGHT_MS = 3200;

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The element(s) a hash points at; a clause range resolves to every clause in it. */
function resolveTargets(hash: string): HTMLElement[] {
  let id = hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    // keep the raw id on malformed escapes
  }
  if (!id) return [];

  const range = parseClauseRange(id);
  if (!range) {
    const el = document.getElementById(id);
    return el ? [el] : [];
  }

  const first = document.getElementById(termsIds.clause(range[0]));
  const last = document.getElementById(termsIds.clause(range[1]));
  if (!first) return [];
  const els: HTMLElement[] = [first];
  // clauses of one section are siblings, so a range is a run of siblings
  for (let el = first.nextElementSibling; last && el && els.at(-1) !== last; el = el.nextElementSibling) {
    els.push(el as HTMLElement);
  }
  return els.at(-1) === last ? els : [first];
}

/**
 * Hash navigation for the legal pages: scrolls to the target (also on first
 * load — the content renders client-side, after the browser's own anchor
 * jump) and briefly highlights it, including clause ranges such as
 * #clausulas-8-1-a-8-6 that have no element of their own.
 *
 * Only navigations the reader starts (a fresh load of a deep link, a click on
 * an in-page link) jump; Back/Forward and reloads keep the position the
 * browser restores, so following a cross-reference and coming back never
 * loses the reader's place.
 */
export function useHashTargets() {
  useEffect(() => {
    let timer = 0;
    let seen: IntersectionObserver | null = null;
    let current: HTMLElement[] = [];
    let clickedHash: string | null = null;

    const clear = () => {
      window.clearTimeout(timer);
      seen?.disconnect();
      for (const el of current) el.classList.remove("is-targeted", "is-target-first", "is-target-last");
      current = [];
    };

    const go = (hash: string, opts: { smooth: boolean; focus?: boolean }) => {
      const targets = resolveTargets(hash);
      if (!targets.length) return;
      clear();
      // a link to a section's first clause lands on the section, so its heading shows
      const first = targets[0];
      const section = first.parentElement?.closest("section");
      const anchor = first.matches("li:first-child") && section ? section : first;
      // "instant", not "auto": auto would inherit the page's smooth scroll-behavior
      anchor.scrollIntoView({ block: "start", behavior: opts.smooth && !reducedMotion() ? "smooth" : "instant" });
      if (opts.focus) {
        // move the keyboard's starting point to the target, like a native fragment jump
        if (!first.matches("a, button, summary, [tabindex]")) first.setAttribute("tabindex", "-1");
        first.focus({ preventScroll: true });
      }
      // legal.css decides the look: clauses get a band, headings a marker stroke
      current = targets;
      targets[0].classList.add("is-target-first");
      targets.at(-1)!.classList.add("is-target-last");
      for (const el of targets) el.classList.add("is-targeted");
      // the highlight's clock starts once the target is actually on screen
      seen = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        seen?.disconnect();
        timer = window.setTimeout(clear, HIGHLIGHT_MS);
      });
      seen.observe(targets[0]);
    };

    // in-page links: remember the hash so hashchange knows the reader asked for it;
    // re-clicking the current hash fires no hashchange, so replay it directly
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.origin !== window.location.origin || a.pathname !== window.location.pathname || !a.hash) return;
      if (a.hash === window.location.hash) {
        e.preventDefault();
        go(a.hash, { smooth: true, focus: true });
      } else {
        clickedHash = a.hash;
      }
    };

    // a hashchange we did not trigger is Back/Forward (or a typed URL): the browser
    // already restores/handles the position, so leave it alone
    const onHashChange = () => {
      const mine = clickedHash !== null && clickedHash === window.location.hash;
      clickedHash = null;
      if (mine) go(window.location.hash, { smooth: true, focus: true });
    };

    const navType = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type;
    if (window.location.hash && navType !== "reload" && navType !== "back_forward") {
      go(window.location.hash, { smooth: false });
      // web fonts can reflow the page after the first jump
      document.fonts?.ready.then(() => {
        if (current.length) go(window.location.hash, { smooth: false });
      });
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      clear();
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);
}

/** Id of the section currently being read (the last one whose top passed ~28% of the viewport). */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.28;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
