// Driven-browser verification of the legal pages (/legal/terminos/,
// /legal/reglas-de-negocio/) on the live dev server: every link resolves,
// cross-references land on (and highlight) the right clause, the index,
// English notice, mobile layout and print layout behave.
// Run with the dev server up: `npm run test:legal` (SHOTS=<dir> saves screenshots).
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:5173";
const SHOTS = process.env.SHOTS;
const PAGES = { terminos: "/legal/terminos/", reglas: "/legal/reglas-de-negocio/" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const checks = [];
const check = (name, ok, detail) => checks.push({ name, ok: !!ok, ...(detail === undefined ? {} : { detail }) });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--window-size=1440,900", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", `--user-data-dir=${mkdtempSync(join(tmpdir(), "pptr-activa-legal-"))}`],
  defaultViewport: { width: 1440, height: 900 },
});

async function open(path, { width = 1440, height = 900, lang = "es", media } = {}) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.setViewport({ width, height, isMobile: width < 640, hasTouch: width < 640 });
  if (lang) await page.evaluateOnNewDocument((l) => localStorage.setItem("activa-lang", l), lang);
  if (media) await page.emulateMediaType(media);
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await pump(page, 250);
  return { page, errors };
}

/**
 * Wait while keeping headless Chrome rendering: with no CDP traffic it stops
 * producing frames, which stalls rAF-driven code (scroll-spy) and scroll events.
 */
async function pump(page, ms) {
  for (const end = Date.now() + ms; Date.now() < end; await sleep(50)) await page.evaluate(() => 0);
}

const shot = async (page, name, opts = {}) => SHOTS && page.screenshot({ path: `${SHOTS}/${name}.png`, ...opts });

/** Viewport-relative top of an element, divided back out of the body zoom. */
const topOf = (page, id) =>
  page.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top : null;
  }, id);

const clearance = (page) =>
  page.evaluate(() => {
    const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--legal-header-clearance"));
    return px * (parseFloat(getComputedStyle(document.body).zoom) || 1);
  });

/** Wait until smooth scrolling has come to rest (scroll position stable for 300ms). */
async function settle(page, timeout = 5000) {
  let last = -1;
  let stableSince = Date.now();
  for (const end = Date.now() + timeout; Date.now() < end; await sleep(50)) {
    const y = await page.evaluate(() => window.scrollY);
    if (y !== last) {
      last = y;
      stableSince = Date.now();
    } else if (Date.now() - stableSince >= 300) return;
  }
}

const highlighted = (page) => page.evaluate(() => [...document.querySelectorAll(".is-targeted")].map((e) => e.id));

try {
  // ── 1. Load, errors, link integrity (both pages) ────────────────
  const ids = {};
  for (const [doc, path] of Object.entries(PAGES)) {
    const { page, errors } = await open(path);
    await shot(page, `${doc}-desktop-top`);
    ids[doc] = await page.evaluate(() => [...document.querySelectorAll("[id]")].map((e) => e.id));
    const links = await page.evaluate(() =>
      [...document.querySelectorAll("a[href]")].map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim() })),
    );
    check(`${doc}: no console/page errors`, errors.length === 0, errors);
    check(`${doc}: no duplicate ids`, new Set(ids[doc]).size === ids[doc].length);
    check(
      `${doc}: no target=_blank on internal links`,
      await page.evaluate(() => ![...document.querySelectorAll("a[target=_blank]")].some((a) => a.href.startsWith(location.origin))),
    );
    ids[`${doc}:links`] = links;
    await page.close();
  }

  const resolves = (doc, hash) => {
    const range = /^clausulas-(\d+)-(\d+)-a-(\d+)-(\d+)$/.exec(hash);
    if (range) {
      const [, a, b, c, d] = range;
      return a === c && ids[doc].includes(`clausula-${a}-${b}`) && ids[doc].includes(`clausula-${c}-${d}`) && +b < +d;
    }
    return hash === "top" || ids[doc].includes(hash);
  };
  const docOfPath = (p) => Object.entries(PAGES).find(([, v]) => v === p)?.[0];

  for (const doc of Object.keys(PAGES)) {
    const broken = [];
    for (const { href, text } of ids[`${doc}:links`]) {
      if (/^(mailto|tel):/.test(href)) {
        if (!/^mailto:[^@\s]+@[^@\s]+$|^tel:\+\d{8,15}$/.test(href)) broken.push({ href, text });
        continue;
      }
      if (/^https?:/.test(href)) continue;
      const [path, hash = ""] = href.split("#");
      const target = path === "" ? doc : docOfPath(path);
      if (target) {
        if (hash && !resolves(target, hash)) broken.push({ href, text });
      } else {
        const res = await fetch(`${BASE}${path || "/"}`);
        if (!res.ok) broken.push({ href, text, status: res.status });
      }
    }
    check(`${doc}: every link resolves`, broken.length === 0, broken);
  }

  // every textual cross-reference in the documents is a link
  {
    const { page } = await open(PAGES.terminos);
    const unlinked = await page.evaluate(() => {
      const out = [];
      const walker = document.createTreeWalker(document.querySelector("article"), NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (n.parentElement.closest("a")) continue;
        for (const m of n.textContent.matchAll(/sección \d+(\.\d+)?|Datos Clave|soporte@4ctiva\.com|\+506 7291 6960/g)) out.push(m[0]);
      }
      return out;
    });
    check("terminos: every 'sección N', 'Datos Clave', email and phone is a link", unlinked.length === 0, unlinked);
    await page.close();
  }
  {
    const { page } = await open(PAGES.reglas);
    const unlinked = await page.evaluate(() => {
      const out = [];
      const walker = document.createTreeWalker(document.querySelector("article"), NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (n.parentElement.closest("a, h2, nav, [data-toc]")) continue;
        if (n.parentElement.closest(".font-mono")) continue; // topic code labels ("RN 04") above the headings
        for (const m of n.textContent.matchAll(/RN \d{2}|soporte@4ctiva\.com|\+506 7291 6960/g)) out.push(m[0]);
      }
      return out;
    });
    check("reglas: every 'RN NN', email and phone in the text is a link", unlinked.length === 0, unlinked);
    const internal = await page.evaluate(() =>
      /Pendiente|Control:|Abogado|Contador|Registro detallado|Checklist|ASDECITI 6|Aliados \d/.test(document.querySelector("article").innerText),
    );
    check("reglas: internal working layer is not published", !internal);
    await page.close();
  }

  // ── 2. Cross-document link: Reglas chip → Términos clause range ─
  {
    const { page } = await open(PAGES.reglas);
    const chip = await page.$('a[href="/legal/terminos/#clausulas-4-1-a-4-5"]');
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), chip.click()]);
    await page.evaluate(() => document.fonts.ready);
    await pump(page, 400);
    // 4.1 opens its section, so the landing shows the §4 heading above it
    const top = await topOf(page, "seccion-4");
    const c = await clearance(page);
    check("cross-doc: lands on Términos §4 (heading visible) under the header", Math.abs(top - c) < 6, { top, clearance: c });
    const hl = await highlighted(page);
    check("cross-doc: range 4.1–4.5 highlighted", ["4-1", "4-2", "4-3", "4-4", "4-5"].every((n) => hl.includes(`clausula-${n}`)) && hl.length === 5, hl);
    await shot(page, "crossdoc-range-highlight");
    await pump(page, 3800);
    check("cross-doc: highlight fades out", (await highlighted(page)).length === 0);

    // reverse: Términos "more detail" aside → Reglas topic
    const aside = await page.$('#seccion-4 aside a[href^="/legal/reglas-de-negocio/#rn-"]');
    const href = await aside.evaluate((a) => a.getAttribute("href"));
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), aside.click()]);
    await page.evaluate(() => document.fonts.ready);
    await pump(page, 400);
    const id = href.split("#")[1];
    const t2 = await topOf(page, id);
    check(`cross-doc: Términos §4 aside lands on Reglas ${id}`, Math.abs(t2 - (await clearance(page))) < 6, { top: t2 });
    check("cross-doc: Reglas topic heading marked", (await highlighted(page)).includes(id));
    await shot(page, "crossdoc-topic-highlight");
    await page.close();
  }

  // ── 3. In-page reference, re-click, index and scroll-spy ────────
  {
    const { page } = await open(PAGES.terminos);
    await page.evaluate(() => document.getElementById("clausula-4-4").scrollIntoView({ behavior: "instant", block: "center" }));
    await pump(page, 300);
    await page.click('#clausula-4-4 a[href="#seccion-14"]');
    await settle(page);
    const c = await clearance(page);
    const t = await topOf(page, "seccion-14");
    check("in-page: 'sección 14' scrolls to §14", Math.abs(t - c) < 6, { top: t, clearance: c });
    check("in-page: §14 heading marked", (await highlighted(page)).includes("seccion-14"));
    const active = await page.evaluate(() => document.querySelector('.legal-toc [aria-current="location"]')?.getAttribute("href"));
    check("index: scroll-spy marks §14", active === "#seccion-14", active);

    await pump(page, 3800);
    await page.evaluate(() => document.getElementById("clausula-4-4").scrollIntoView({ behavior: "instant", block: "center" }));
    await pump(page, 200);
    await page.click('#clausula-4-4 a[href="#seccion-14"]');
    await settle(page);
    check("in-page: re-clicking the same reference replays it", Math.abs((await topOf(page, "seccion-14")) - c) < 6 && (await highlighted(page)).includes("seccion-14"));

    await page.click('.legal-toc a[href="#seccion-18"]');
    await settle(page);
    check("index: entry scrolls to its section", Math.abs((await topOf(page, "seccion-18")) - c) < 6);
    check("index: sticky index stays in view", (await page.evaluate(() => document.querySelector(".legal-toc").getBoundingClientRect().top)) >= 0);
    await shot(page, "index-scrollspy");

    // print layout: chrome hidden, document kept
    await page.emulateMediaType("print");
    const printState = await page.evaluate(() => ({
      header: getComputedStyle(document.querySelector(".sticky")).display,
      toc: getComputedStyle(document.querySelector(".legal-toc").closest("aside")).display,
      footer: getComputedStyle(document.querySelector("footer").parentElement).display,
      zoom: getComputedStyle(document.body).zoom,
      clauses: document.querySelectorAll(".legal-clause").length,
    }));
    check("print: header, index and footer hidden; body unzoomed", printState.header === "none" && printState.toc === "none" && printState.footer === "none" && printState.zoom === "1", printState);
    if (SHOTS) await page.pdf({ path: `${SHOTS}/terminos-print.pdf`, format: "A4", printBackground: true });
    await page.close();
  }

  // ── 4. English chrome over the Spanish documents ────────────────
  for (const [doc, path] of Object.entries(PAGES)) {
    const { page, errors } = await open(path, { lang: "en" });
    const s = await page.evaluate(() => ({
      htmlLang: document.documentElement.lang,
      articleLang: document.querySelector("article").lang,
      notice: document.body.innerText.includes("Available in Spanish only"),
      contents: !!document.querySelector('nav[aria-label="Contents"]'),
      footerTerms: [...document.querySelectorAll("footer a")].some((a) => a.textContent === "Terms & Conditions"),
    }));
    check(`${doc} (EN): chrome in English, document marked Spanish, notice shown`, s.htmlLang === "en" && s.articleLang === "es" && s.notice && s.contents && s.footerTerms, s);
    check(`${doc} (EN): no errors`, errors.length === 0, errors);
    if (doc === "terminos") await shot(page, "terminos-en-top");
    await page.close();
  }
  {
    const { page } = await open(PAGES.terminos, { lang: "es" });
    check("terminos (ES): no English notice", !(await page.evaluate(() => document.body.innerText.includes("Available in Spanish only"))));
    await page.close();
  }

  // ── 5. Mobile ───────────────────────────────────────────────────
  for (const [doc, path] of Object.entries(PAGES)) {
    const { page } = await open(path, { width: 375, height: 812 });
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      header: document.querySelector(".sticky").getBoundingClientRect().height,
      deskToc: getComputedStyle(document.querySelector(".legal-toc").closest("aside")).display,
    }));
    check(`${doc} (mobile): no horizontal overflow, one-row header, desktop index hidden`, m.overflow <= 0 && m.header < 80 && m.deskToc === "none", m);
    await shot(page, `${doc}-mobile-top`);
    await page.click("details.lg\\:hidden > summary");
    await pump(page, 200);
    const target = await page.evaluate(() => document.querySelectorAll("details.lg\\:hidden ol a")[5].getAttribute("href"));
    await page.click(`details.lg\\:hidden ol a[href="${target}"]`);
    await settle(page);
    const closed = await page.evaluate(() => !document.querySelector("details.lg\\:hidden").open);
    const t = await topOf(page, target.slice(1));
    check(`${doc} (mobile): index entry closes the index and scrolls`, closed && Math.abs(t - (await clearance(page))) < 6, { closed, top: t });
    if (doc === "terminos") {
      await page.evaluate(() => document.getElementById("datos-clave").scrollIntoView({ behavior: "instant" }));
      await pump(page, 300);
      await shot(page, "terminos-mobile-datos-clave");
    }
    await page.close();
  }

  // ── 6. Reduced motion: jumps are instant ────────────────────────
  {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(`${BASE}${PAGES.terminos}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => (location.hash = "#clausula-15-6"));
    await pump(page, 120);
    check("reduced motion: hash jump is instant", Math.abs((await topOf(page, "clausula-15-6")) - (await clearance(page))) < 6);
    await page.close();
  }

  // ── 7. Text you copy is the Word text ───────────────────────────
  {
    const { page } = await open(PAGES.terminos);
    const copied = await page.evaluate(() => {
      const sel = getSelection();
      sel.selectAllChildren(document.querySelector("#clausula-8-2 p"));
      const text = sel.toString();
      sel.removeAllRanges();
      return text;
    });
    check("copy: clause text copies cleanly (no hidden notes, no leftover placeholders)", copied.includes("Con al menos diez días naturales de anticipación") && !/pendiente|\[/.test(copied), copied);
    const head = await page.evaluate(() => document.querySelector("#seccion-1 h3").textContent.trim());
    check("copy: section headings keep 'N. Title'", head === "1. Quiénes somos", head);

    // Back after following a cross-reference returns to where the reader was
    await page.evaluate(() => document.getElementById("clausula-4-4").scrollIntoView({ behavior: "instant", block: "center" }));
    await pump(page, 300);
    const before = await page.evaluate(() => window.scrollY);
    await page.click('#clausula-4-4 a[href="#seccion-14"]');
    await settle(page);
    await page.goBack();
    await settle(page);
    const after = await page.evaluate(() => window.scrollY);
    check("history: Back after an in-page reference restores the reading position", Math.abs(after - before) < 12, { before, after });
    await page.close();
  }
  {
    const { page } = await open(PAGES.reglas);
    await page.evaluate(() => document.getElementById("rn-04").scrollIntoView({ behavior: "instant" }));
    await pump(page, 300);
    const before = await page.evaluate(() => window.scrollY);
    const chip = await page.$('#rn-04 a[href^="/legal/terminos/#"]');
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), chip.click()]);
    await pump(page, 500);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.goBack()]);
    await page.evaluate(() => document.fonts.ready);
    await settle(page);
    const after = await page.evaluate(() => window.scrollY);
    check("history: Back from the Términos returns to the same rule", Math.abs(after - before) < 12, { before, after });

    // Encabezado chip marks the Términos header
    const enc = await page.$('a[href="/legal/terminos/#encabezado"]');
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), enc.click()]);
    await pump(page, 900);
    const marked = await page.evaluate(() => getComputedStyle(document.querySelector("#encabezado h1 .legal-mark")).backgroundSize);
    check("cross-doc: 'Encabezado' reference marks the Términos title", marked.startsWith("100%"), marked);
    await page.close();
  }

  // ── 8. Reglas: no pending markers, unlinked 3.2, references in print ─
  {
    const { page } = await open(PAGES.reglas);
    const r = await page.evaluate(() => ({
      marks: document.querySelectorAll(".legal-pending").length,
      legend: !!document.getElementById("legal-pending-legend"),
      link32: !!document.querySelector("#regla-3-2 a.legal-link"),
    }));
    check("reglas: no pending markers or legend; 3.2 'Términos' not linked", r.marks === 0 && !r.legend && !r.link32, r);
    await page.emulateMediaType("print");
    const printed = await page.evaluate(() => document.getElementById("rn-01").innerText);
    check("print: Reglas keep their Términos references", printed.includes("Referencias: Términos Lo esencial, 3.1–3.4, 4.1–4.5, 16.2"), printed.slice(0, 200));
    await page.close();
  }

  // ── 9. Sticky index follows the reader (short laptop screen) ────
  {
    const { page } = await open(PAGES.terminos, { width: 1280, height: 720 });
    const overflows = await page.evaluate(() => {
      const box = document.querySelector(".legal-toc");
      return box.scrollHeight > box.clientHeight;
    });
    await page.evaluate(() => document.getElementById("seccion-20").scrollIntoView({ behavior: "instant" }));
    await pump(page, 500);
    const inView = await page.evaluate(() => {
      const box = document.querySelector(".legal-toc").getBoundingClientRect();
      const item = document.querySelector('.legal-toc [aria-current="location"]').getBoundingClientRect();
      return { box: [box.top, box.bottom], item: [item.top, item.bottom] };
    });
    check(
      "index: active entry scrolls into the sticky index",
      overflows && inView.item[0] >= inView.box[0] - 1 && inView.item[1] <= inView.box[1] + 1,
      { overflows, ...inView },
    );
    await page.close();
  }

  // ── 10. Header fits at every width ──────────────────────────────
  {
    const misfits = [];
    for (const width of [320, 340, 360, 375, 414, 600, 640, 700, 767, 768, 900, 1024, 1280]) {
      for (const lang of ["es", "en"]) {
        const { page } = await open(PAGES.terminos, { width, height: 800, lang });
        const over = await page.evaluate(() => {
          const outside = [...document.querySelectorAll(".sticky a, .sticky button, .sticky nav")]
            .map((el) => el.getBoundingClientRect())
            .some((r) => r.right > window.innerWidth + 0.5 || r.left < -0.5);
          const nav = document.querySelector(".sticky nav");
          const logo = document.querySelector(".sticky > div > a").getBoundingClientRect();
          const toggle = document.querySelector(".sticky button").getBoundingClientRect();
          const lastPill = [...nav.querySelectorAll("a")].at(-1).getBoundingClientRect();
          const navBox = nav.getBoundingClientRect();
          return outside || nav.scrollWidth > nav.clientWidth + 1 || lastPill.right > toggle.left - 2 || logo.right > navBox.left - 2;
        });
        if (over) misfits.push(`${width}/${lang}`);
        await page.close();
      }
    }
    check("header: logo, switcher and language toggle fit from 320px up", misfits.length === 0, misfits);
  }

  // ── 11. Keyboard: skip link; mobile: floating index button ──────
  {
    const { page } = await open(PAGES.terminos);
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => document.activeElement.className);
    await page.keyboard.press("Enter");
    await settle(page);
    const landed = await page.evaluate(() => document.activeElement.id);
    check("keyboard: first Tab is the skip link and it moves focus to the document", first.includes("legal-skip") && landed === "documento", { first, landed });
    await page.close();
  }
  {
    const { page } = await open(PAGES.terminos, { width: 375, height: 812 });
    // headless Chrome does not advance CSS transitions on its own: finish them before reading
    const floatState = () =>
      page.evaluate(() => {
        const b = [...document.querySelectorAll("button")].find((el) => el.textContent.includes("Contenido"));
        const box = b.parentElement;
        box.getAnimations().forEach((a) => a.finish());
        const r = b.getBoundingClientRect();
        return { opacity: getComputedStyle(box).opacity, position: getComputedStyle(box).position, inViewport: r.bottom <= innerHeight && r.right <= innerWidth && r.top > innerHeight / 2 };
      });
    const atTop = await floatState();
    await page.evaluate(() => window.scrollTo({ top: 6000, behavior: "instant" }));
    await pump(page, 600);
    const reading = await floatState();
    const hiddenAtTop = atTop.opacity;
    const shownWhileReading = reading.position === "fixed" && reading.inViewport ? reading.opacity : `${reading.opacity}/${reading.position}/${reading.inViewport}`;
    const btn = await page.evaluateHandle(() => [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Contenido")));
    await btn.click();
    await settle(page);
    const reopened = await page.evaluate(() => {
      const d = document.querySelector("details.lg\\:hidden");
      return { open: d.open, top: d.getBoundingClientRect().top };
    });
    check(
      "mobile: floating index button appears while reading and reopens the index",
      hiddenAtTop === "0" && shownWhileReading === "1" && reopened.open && reopened.top < 120,
      { hiddenAtTop, shownWhileReading, reopened },
    );
    await shot(page, "terminos-mobile-index-reopened");
    await page.close();
  }

  // ── 12a. Focus rings, skip link, floating index at the end ──────
  {
    const { page } = await open(PAGES.terminos);
    await page.keyboard.press("Tab");
    const skip = await page.evaluate(() => {
      const el = document.activeElement;
      el.getAnimations().forEach((a) => a.finish());
      const cs = getComputedStyle(el);
      return { bg: cs.backgroundColor, color: cs.color, outline: cs.outlineStyle };
    });
    check("keyboard: skip link is an opaque ink pill when focused", skip.bg === "rgb(33, 43, 60)" && skip.outline === "solid", skip);
    await page.keyboard.press("Tab");
    const ring = await page.evaluate(() => {
      const cs = getComputedStyle(document.activeElement);
      return { style: cs.outlineStyle, color: cs.outlineColor, width: cs.outlineWidth };
    });
    check("keyboard: focused controls show a solid ink ring", ring.style === "solid" && ring.color === "rgb(33, 43, 60)", ring);
    await page.evaluate(() => document.querySelector("footer a").focus());
    const footerRing = await page.evaluate(() => {
      document.activeElement.getAnimations().forEach((a) => a.finish());
      return getComputedStyle(document.activeElement).outlineColor;
    });
    check("keyboard: footer (navy) links get a light ring", footerRing === "rgb(245, 241, 232)", footerRing);
    await page.evaluate(() => {
      document.querySelector("#clausula-8-6 > a").click();
    });
    await settle(page);
    const edge = await page.evaluate(() => getComputedStyle(document.getElementById("clausula-8-6")).boxShadow);
    check("highlight: linked clause shows its ink edge", edge.includes("rgb(33, 43, 60)"), edge);
    await page.close();
  }
  {
    const { page } = await open(PAGES.terminos, { width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await pump(page, 600);
    const atEnd = await page.evaluate(() => {
      const box = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Contenido")).parentElement;
      box.getAnimations().forEach((a) => a.finish());
      return getComputedStyle(box).opacity;
    });
    check("mobile: floating index button steps aside at the end of the page", atEnd === "0", atEnd);
    await page.close();
  }

  // ── 12b. The visitor's language carries over from the site ──────
  {
    // a fresh profile: no language stored by the earlier checks
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
    const link = await page.$('footer a[href^="/legal/terminos/"]');
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), link.evaluate((a) => a.click())]);
    await pump(page, 300);
    const s = await page.evaluate(() => ({
      contents: !!document.querySelector('nav[aria-label="Contents"]'),
      notice: document.body.innerText.includes("Available in Spanish only"),
    }));
    check("language: English site → footer link → legal page in English chrome with the notice", s.contents && s.notice, s);
    await context.close();
  }

  // ── 12c. Version archive and annexes ────────────────────────────
  for (const [doc, path] of Object.entries(PAGES)) {
    const { page } = await open(`${path}?version=no-existe`);
    const v = await page.evaluate(() => ({
      entries: document.querySelectorAll("#versiones li").length,
      current: !!document.querySelector('#versiones [aria-current="page"]'),
      archivedBanner: document.body.innerText.includes("Versión anterior"),
    }));
    check(`${doc}: version history lists the version in force; unknown ?version falls back to it`, v.entries >= 1 && v.current && !v.archivedBanner, v);
    await page.close();
  }
  {
    const { page } = await open(PAGES.terminos);
    const a = await page.evaluate(() => ["aviso-de-privacidad", "consentimiento-de-fotografia"].map((id) => !!document.getElementById(id) && !!document.querySelector(`.legal-toc a[href="#${id}"]`)));
    check("terminos: privacy and photo-consent annexes exist and are in the index", a.every(Boolean), a);
    await page.close();
  }

  // ── 12. Footer on the other pages points at the legal pages ──────
  for (const path of ["/", "/para-todos/"]) {
    const { page } = await open(path);
    const hrefs = await page.evaluate(() => [...document.querySelectorAll("footer a")].map((a) => a.getAttribute("href")));
    check(
      `footer on ${path}: links both legal pages (carrying the language), no app.4ctiva.com`,
      hrefs.some((h) => /^\/legal\/terminos\/\?lang=(en|es)$/.test(h)) && hrefs.some((h) => /^\/legal\/reglas-de-negocio\/\?lang=(en|es)$/.test(h)) && !hrefs.some((h) => h.includes("app.4ctiva.com")),
      hrefs,
    );
    await page.close();
  }
} finally {
  await browser.close();
}

const failed = checks.filter((c) => !c.ok);
console.log(JSON.stringify({ passed: checks.length - failed.length, failed: failed.length, checks }, null, 1));
process.exitCode = failed.length ? 1 : 0;
