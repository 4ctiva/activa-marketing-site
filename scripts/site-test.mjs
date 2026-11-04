// Driven-browser checks of the main page on the live dev server: landmarks and
// skip link, audience paths, ARIA tabs, the contact dialog (keyboard, Escape,
// focus trap and restore, honest loading state), FAQ filter, area selector,
// HR message, localization and layout at mobile/tablet/desktop/200% zoom widths.
// Run with the dev server up: `npm run test:site` (SHOTS=<dir> saves screenshots).
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:5173";
const SHOTS = process.env.SHOTS;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const checks = [];
const check = (name, ok, detail) => checks.push({ name, ok: !!ok, ...(detail === undefined ? {} : { detail }) });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  timeout: 120000, // first headless launch can be slow
  args: ["--hide-scrollbars", "--no-first-run", "--no-default-browser-check", `--user-data-dir=${mkdtempSync(join(tmpdir(), "pptr-activa-site-"))}`],
});

async function open({ width = 1440, height = 900, lang = "en", motion = "reduce" } = {}) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && !/docs\.google|googletagmanager|google-analytics/.test(m.location()?.url ?? "") && errors.push(m.text()));
  await page.setViewport({ width, height, isMobile: width < 640, hasTouch: width < 640 });
  // reduced motion by default: no intro curtain or reveal delays to wait for
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: motion }]);
  await page.evaluateOnNewDocument((l) => {
    localStorage.setItem("activa-lang", l);
    sessionStorage.clear();
  }, lang);
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  return { page, errors };
}

const shot = async (page, name, opts = {}) => SHOTS && page.screenshot({ path: `${SHOTS}/${name}.png`, ...opts });
const active = (page) =>
  page.evaluate(() => {
    const el = document.activeElement;
    return el ? `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}|${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40)}` : "";
  });
const clickText = (page, sel, text) =>
  page.evaluate(
    (sel, text) => {
      const el = [...document.querySelectorAll(sel)].find((e) => e.textContent.trim().startsWith(text));
      el?.scrollIntoView({ block: "center" });
      el?.click();
      return !!el;
    },
    sel,
    text,
  );

try {
  // ── 1. Structure: landmarks, skip link, ids, images ───────────────
  {
    const { page, errors } = await open();
    await shot(page, "desktop-top");
    const s = await page.evaluate(() => ({
      header: document.querySelectorAll("header").length,
      nav: !!document.querySelector("header nav[aria-label]"),
      main: document.querySelectorAll("main#main").length,
      footer: document.querySelectorAll("footer").length,
      h1: document.querySelectorAll("h1").length,
      ids: [...document.querySelectorAll("[id]")].map((e) => e.id),
      imgsNoAlt: [...document.querySelectorAll("img:not([alt])")].map((i) => i.src),
      mockupsHidden: !!document.querySelector("figure > [aria-hidden=true] img"),
      caption: document.querySelector("figure figcaption")?.textContent ?? "",
      signIn: [...document.querySelectorAll("a")].some((a) => /app\.4ctiva\.com/.test(a.href)),
      title: document.title,
    }));
    check("landmarks: one header with labelled nav, one main, one footer", s.header === 1 && s.nav && s.main === 1 && s.footer === 1, s);
    check("exactly one h1", s.h1 === 1);
    check("no duplicate ids", new Set(s.ids).size === s.ids.length, s.ids.filter((id, i) => s.ids.indexOf(id) !== i));
    check("every img has an alt attribute", s.imgsNoAlt.length === 0, s.imgsNoAlt);
    check("app mockups hidden from AT and captioned as example data", s.mockupsHidden && /examples/i.test(s.caption), s.caption);
    check("no sign-in link until the app is live (MEMBER_APP_LIVE)", !s.signIn);

    await page.keyboard.press("Tab");
    await sleep(150); // let headless Chrome restyle for :focus
    const skip = await page.evaluate(() => {
      const el = document.activeElement;
      return { cls: el.className, visible: el.getBoundingClientRect().top >= 0, href: el.getAttribute("href") };
    });
    check("first Tab reaches a visible skip link to #main", skip.cls.includes("skip-link") && skip.visible && skip.href === "#main", skip);
    await page.keyboard.press("Enter");
    await sleep(200);
    check("skip link moves focus into main", (await page.evaluate(() => document.activeElement.id)) === "main");
    await page.evaluate(() => document.querySelector("#paths").scrollIntoView());
    await shot(page, "desktop-paths");
    check("no console/page errors (desktop)", errors.length === 0, errors);
    await page.close();
  }

  // ── 2. Hero CTAs, dialog keyboard behavior, honest form state ─────
  {
    const { page, errors } = await open();
    const hero = await page.evaluate(() => {
      const box = document.querySelector("#home");
      const btn = [...box.querySelectorAll("button")].find((b) => /register/i.test(b.textContent));
      const how = [...box.querySelectorAll("a")].find((a) => a.getAttribute("href") === "#how");
      return { primary: !!btn, secondary: !!how, inFirstView: btn ? btn.getBoundingClientRect().bottom < innerHeight : false };
    });
    check("hero: primary pilot CTA and secondary How-it-works link, above the fold", hero.primary && hero.secondary && hero.inFirstView, hero);

    await page.focus("#home button");
    await page.keyboard.press("Enter");
    await sleep(300);
    const d = await page.evaluate(() => {
      const dlg = document.querySelector("dialog.contact-dialog");
      return {
        open: dlg?.open,
        focusInside: dlg?.contains(document.activeElement),
        labelled: !!document.getElementById(dlg?.getAttribute("aria-labelledby") ?? "_"),
        newTab: [...dlg.querySelectorAll("a[target=_blank]")].some((a) => a.href.startsWith("https://docs.google.com/forms/") && !a.href.includes("embedded")),
        status: dlg.querySelector("[role=status]")?.textContent ?? "",
        alternatives: [...dlg.querySelectorAll("a")].filter((a) => /^mailto:|wa\.me|instagram/.test(a.href)).length,
        falseSuccess: /thank|gracias|submitted|enviado|success/i.test(dlg.textContent),
      };
    });
    check("dialog opens modally with focus inside and an accessible name", d.open && d.focusInside && d.labelled, d);
    check("dialog shows the new-tab form link and email/WhatsApp/Instagram", d.newTab && d.alternatives === 3, d);
    check("dialog shows a loading status, never a success message", /loading|taking/i.test(d.status) && !d.falseSuccess, d);
    await shot(page, "desktop-dialog");

    // Tab and Shift+Tab stay inside the dialog
    const inside = [];
    // focus moving into the cross-origin form frame settles asynchronously
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      await sleep(150);
      inside.push(await page.evaluate(() => document.querySelector("dialog").contains(document.activeElement)));
    }
    for (let i = 0; i < 4; i++) {
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await sleep(150);
      inside.push(await page.evaluate(() => document.querySelector("dialog").contains(document.activeElement)));
    }
    check("Tab / Shift+Tab never leave the dialog", inside.every(Boolean), inside);
    check("page behind the dialog is not reachable", await page.evaluate(() => !document.querySelector("main").contains(document.activeElement)));

    await page.keyboard.press("Escape");
    await sleep(200);
    const after = await page.evaluate(() => ({
      open: document.querySelector("dialog").open,
      restored: document.activeElement === document.querySelector("#home button"),
      scrollUnlocked: document.body.style.overflow === "",
    }));
    check("Escape closes, focus returns to the opener, scroll unlocked", !after.open && after.restored && after.scrollUnlocked, after);
    check("no console/page errors (dialog)", errors.length === 0, errors);
    await page.close();
  }

  // ── 3. Audience carried into contact; tabs; FAQ filter; areas ─────
  {
    const { page } = await open();
    await clickText(page, "#paths button", "Register as a gym");
    await sleep(250);
    const pre = await page.evaluate(() => {
      const dlg = document.querySelector("dialog");
      const checked = dlg.querySelector("input[type=radio]:checked");
      const mail = [...dlg.querySelectorAll("a")].find((a) => a.href.startsWith("mailto:"))?.href ?? "";
      const wa = [...dlg.querySelectorAll("a")].find((a) => a.href.includes("wa.me"))?.href ?? "";
      return { checked: checked?.value, mail: decodeURIComponent(mail), wa: decodeURIComponent(wa) };
    });
    check("path CTA preselects the audience in the dialog", pre.checked === "gyms", pre);
    check("email and WhatsApp prefills name the audience", /Gym or studio/.test(pre.mail) && /Gym or studio/.test(pre.wa), pre);
    // change audience with arrow keys inside the radio group
    await page.focus("dialog input[type=radio]:checked");
    await page.keyboard.press("ArrowRight");
    check("arrow keys move the audience radio", (await page.evaluate(() => document.querySelector("dialog input:checked").value)) === "users");
    await page.keyboard.press("Escape");
    await sleep(150);

    const tabs = await page.evaluate(() => ({
      sel: document.querySelector("#how [role=tab][aria-selected=true]")?.id,
      panel: document.querySelector("#how [role=tabpanel]")?.getAttribute("aria-labelledby"),
    }));
    check("chosen audience drives the How-it-works tab", tabs.sel === "how-tab-users" && tabs.panel === "how-tab-users", tabs);
    await page.focus("#how [role=tab][aria-selected=true]");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("End");
    const t2 = await page.evaluate(() => ({
      sel: document.querySelector("#how [role=tab][aria-selected=true]")?.id,
      focus: document.activeElement.id,
      roving: [...document.querySelectorAll("#how [role=tab]")].map((t) => t.tabIndex),
    }));
    check("tabs: arrows/End move selection and focus; roving tabindex", t2.sel === "how-tab-gyms" && t2.focus === "how-tab-gyms" && t2.roving.filter((i) => i === 0).length === 1, t2);

    const faq = await page.evaluate(() => {
      const count = () => document.querySelectorAll("#faq [aria-expanded]").length;
      const all = [...document.querySelectorAll("#faq input[name=faq-filter]")];
      const before = count();
      all.find((r) => r.value === "all").click();
      return { usersCount: before, allCount: count() };
    });
    await sleep(100);
    const faqGyms = await page.evaluate(() => {
      document.querySelector('#faq input[value="gyms"]').click();
      return null;
    });
    await sleep(100);
    const gymsCount = await page.evaluate(() => document.querySelectorAll("#faq [aria-expanded]").length);
    check("FAQ filter follows the audience and can be changed", faq.usersCount < faq.allCount && gymsCount < faq.allCount && gymsCount > 0, { ...faq, gymsCount, faqGyms });
    await page.click("#faq [aria-expanded]");
    await sleep(100);
    const acc = await page.evaluate(() => {
      const b = document.querySelector("#faq [aria-expanded]");
      const panel = document.getElementById(b.getAttribute("aria-controls"));
      return { expanded: b.getAttribute("aria-expanded"), panelHidden: panel?.getAttribute("aria-hidden") };
    });
    check("FAQ accordion exposes expanded state and controls its answer", acc.expanded === "true" && acc.panelHidden === "false", acc);

    await page.evaluate(() => {
      const box = [...document.querySelectorAll("#pilot input[type=checkbox]")];
      box[1].click();
      box.at(-1).click();
    });
    await sleep(100);
    const areas = await page.evaluate(() => ({
      checked: [...document.querySelectorAll("#pilot input:checked")].length,
      note: /confirmed coverage/i.test(document.querySelector("#pilot").textContent),
      mail: decodeURIComponent([...document.querySelectorAll("#contact a")].find((a) => a.href.startsWith("mailto:")).href),
    }));
    check("area selector: checkboxes, labelled as not confirmed, added to the message", areas.checked === 2 && areas.note && /Escazú/.test(areas.mail) && /Somewhere else/.test(areas.mail), areas);

    const hr = await page.evaluate(async () => {
      document.querySelector("#paths details summary").click();
      await new Promise((r) => setTimeout(r, 50));
      const ta = document.getElementById("hr-message");
      [...document.querySelectorAll("#paths details button")].find((b) => /copy/i.test(b.textContent)).click();
      await new Promise((r) => setTimeout(r, 300));
      return { hasLabel: !!document.querySelector('label[for="hr-message"]'), editable: !ta.readOnly, status: document.querySelector("#paths details [role=status]").textContent };
    });
    check("HR message: labelled, editable, copy gives a status", hr.hasLabel && hr.editable && hr.status.length > 0, hr);
    await page.close();
  }

  // ── 4. Spanish: no leftover English UI, title/description follow ───
  {
    const { page, errors } = await open({ lang: "es" });
    const es = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      title: document.title,
      desc: document.querySelector('meta[name="description"]').content,
      leftovers: ["Coming soon", "Register", "Loading", "Close", "Woman meditating", "Download on the", "Members", "Companies &"].filter((s) =>
        (document.body.innerText + [...document.querySelectorAll("img")].map((i) => i.alt).join(" ")).includes(s),
      ),
      tuteo: ["Únete", "Elige ", "Regístrate", "Contáctanos"].filter((s) => document.body.innerText.includes(s)),
    }));
    check("ES: html lang, title and description switch", es.lang === "es" && es.title.includes("Una membresía") && es.desc.includes("Sumate"), es);
    check("ES: no leftover English UI strings or alts", es.leftovers.length === 0, es.leftovers);
    check("ES: Costa Rican voseo, no tuteo imperatives", es.tuteo.length === 0, es.tuteo);
    await page.evaluate(() => document.querySelector("#pilot").scrollIntoView());
    await shot(page, "es-desktop-pilot");
    await page.evaluate(() => document.querySelector("#home button").click());
    await sleep(200);
    check("ES: dialog is localized", await page.evaluate(() => document.querySelector("dialog h2").textContent === "Registrá tu interés"));
    check("no console/page errors (es)", errors.length === 0, errors);
    await page.close();
  }

  // ── 5. Layout: no horizontal scroll; 200% zoom widths ─────────────
  for (const [w, h, name] of [
    [360, 780, "m360"],
    [390, 844, "m390"],
    [430, 932, "m430"],
    [768, 1024, "tablet"],
    [1024, 768, "tablet-land"],
    [1440, 900, "desktop"],
    [640, 450, "zoom200-1280"],
    [720, 450, "zoom200-1440"],
  ]) {
    const { page } = await open({ width: w, height: h });
    const r = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      // anything poking past the right edge (ignoring hidden/clipped decorative layers)
      const wide = [...document.querySelectorAll("main *, header *")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.right > innerWidth + 1 && !el.closest("[aria-hidden=true]");
        })
        .slice(0, 5)
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 40)}`);
      const cta = document.querySelector("#home button").getBoundingClientRect();
      return { overflow, wide, ctaVisible: cta.bottom < innerHeight * 1.6 && cta.width > 0, ctaH: cta.height };
    });
    check(`${name}: no horizontal page scroll`, r.overflow <= 0 && r.wide.length === 0, r);
    check(`${name}: hero CTA tappable (≥44px) near the top`, r.ctaVisible && r.ctaH >= 44, r);
    if (["m360", "m390", "m430", "tablet"].includes(name)) await shot(page, `${name}-top`);
    if (name === "m390") {
      await page.evaluate(() => document.querySelector("#paths").scrollIntoView());
      await shot(page, "m390-paths");
      await page.evaluate(() => document.querySelector("#home button").click());
      await sleep(300);
      const dlg = await page.evaluate(() => {
        const b = document.querySelector("dialog").getBoundingClientRect();
        return { fits: b.left >= 0 && b.right <= innerWidth && b.top >= 0 && b.bottom <= innerHeight };
      });
      check("m390: dialog fits the viewport", dlg.fits, dlg);
      await shot(page, "m390-dialog");
    }
    await page.close();
  }

  // ── 5b. Phone header: Menu sheet, tabs, categories ────────────────
  {
    const { page, errors } = await open({ width: 390, height: 844 });
    const head = await page.evaluate(() => {
      const header = document.querySelector("header");
      const btn = header.querySelector("button[aria-controls=mobile-menu]");
      const toggle = header.querySelector("button[lang]");
      const sz = (el) => {
        const r = el.getBoundingClientRect();
        return Math.min(r.width, r.height);
      };
      return {
        inlineNavHidden: getComputedStyle(header.querySelector("nav")).display === "none",
        menuBtn: btn ? sz(btn) : 0,
        toggle: toggle ? sz(toggle) : 0,
        oneRow: header.getBoundingClientRect().height < 80,
      };
    });
    check("m390: inline nav hidden, one-row header with ≥40px Menu and language targets", head.inlineNavHidden && head.menuBtn >= 40 && head.toggle >= 40 && head.oneRow, head);
    await page.focus("button[aria-controls=mobile-menu]");
    await page.keyboard.press("Enter");
    await sleep(250);
    const menu = await page.evaluate(() => {
      const d = document.getElementById("mobile-menu");
      return { open: d.open, focusInside: d.contains(document.activeElement), links: d.querySelectorAll("a[href]").length, expanded: document.querySelector("button[aria-controls=mobile-menu]").getAttribute("aria-expanded") };
    });
    check("m390: Menu opens a modal sheet with focus inside and every nav link", menu.open && menu.focusInside && menu.links >= 7 && menu.expanded === "true", menu);
    await shot(page, "m390-menu");
    await page.keyboard.press("Escape");
    await sleep(200);
    check("m390: Escape closes the menu and focus returns to the Menu button", await page.evaluate(() => !document.getElementById("mobile-menu").open && document.activeElement?.getAttribute("aria-controls") === "mobile-menu"));
    await page.evaluate(() => document.querySelector("button[aria-controls=mobile-menu]").click());
    await sleep(200);
    await page.evaluate(() => [...document.querySelectorAll("#mobile-menu a")].find((a) => a.getAttribute("href") === "#faq").click());
    await sleep(500);
    const nav = await page.evaluate(() => ({ closed: !document.getElementById("mobile-menu").open, scrollUnlocked: document.body.style.overflow === "", faqTop: document.getElementById("faq").getBoundingClientRect().top }));
    check("m390: a menu link closes the sheet and goes to its section", nav.closed && nav.scrollUnlocked && nav.faqTop < 200, nav);
    const tabs = await page.evaluate(() => {
      const tops = [...document.querySelectorAll("#how [role=tab]")].map((t) => Math.round(t.getBoundingClientRect().top));
      return { sameRow: new Set(tops).size === 1 };
    });
    check("m390: How-it-works tabs sit on one row", tabs.sameRow, tabs);
    const cats = await page.evaluate(() => {
      const tops = [...document.querySelectorAll("#categories li")].map((t) => Math.round(t.getBoundingClientRect().top));
      return { rows: new Set(tops).size };
    });
    check("m390: categories form a 3×3 grid (no orphan tile)", cats.rows === 3, cats);
    check("no console/page errors (m390)", errors.length === 0, errors);
    await page.close();
  }
  {
    // short landscape phone: the sheet must fit (body zoom) so its CTA can be scrolled to
    const { page } = await open({ width: 667, height: 375 });
    await page.evaluate(() => document.querySelector("button[aria-controls=mobile-menu]").click());
    await sleep(300);
    const sheet = await page.evaluate(() => {
      const d = document.getElementById("mobile-menu");
      d.scrollTop = d.scrollHeight;
      const cta = [...d.querySelectorAll("a")].at(-1).getBoundingClientRect();
      return { sheetBottom: Math.round(d.getBoundingClientRect().bottom), ctaBottom: Math.round(cta.bottom), vh: innerHeight };
    });
    check("667×375: Menu sheet fits the viewport and its CTA scrolls into view", sheet.sheetBottom <= sheet.vh && sheet.ctaBottom <= sheet.vh, sheet);
    await page.close();
  }

  // ── 5c. Header over dark sections; research links; photos ─────────
  {
    const { page } = await open();
    const states = {};
    for (const id of ["paths", "evidence", "benefits", "safety"]) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 20);
      }, id);
      await sleep(250);
      states[id] = await page.evaluate(() => document.querySelector("header").dataset.overDark);
    }
    check("header switches to its dark style only over dark sections", states.paths === "false" && states.evidence === "true" && states.benefits === "false" && states.safety === "true", states);
    await page.evaluate(() => {
      const card = document.querySelector("#benefits .surface-dark");
      window.scrollTo(0, card.getBoundingClientRect().top + window.scrollY + 120);
    });
    await sleep(250);
    check("header also goes dark over the Companies card", await page.evaluate(() => document.querySelector("header").dataset.overDark === "true"));

    // over dark: light focus ring, hovers keep their text readable, APT logo keeps its colours
    await page.evaluate(() => {
      const el = document.getElementById("evidence");
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 20);
    });
    await sleep(350);
    const lum = (rgb) => {
      const [r, g, b] = rgb.match(/[\d.]+/g).slice(0, 3).map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
    await page.hover("header a[href='#contact'].rounded-full");
    await sleep(350);
    const dark = await page.evaluate(() => {
      const header = document.querySelector("header");
      const cta = header.querySelector("a[href='#contact'].rounded-full");
      const apt = header.querySelector("nav a[href='/para-todos/'] img");
      return {
        ring: getComputedStyle(header).getPropertyValue("--focus-ring").trim(),
        sheetRing: getComputedStyle(document.getElementById("mobile-menu")).getPropertyValue("--focus-ring").trim(),
        ctaFg: getComputedStyle(cta).color,
        ctaBg: getComputedStyle(cta).backgroundColor,
        aptFilter: getComputedStyle(apt).filter,
      };
    });
    dark.ctaContrast = +ratio(dark.ctaFg, dark.ctaBg).toFixed(2);
    check("over dark: light focus ring (sheet keeps ink), hovered CTA ≥4.5:1, APT logo unfiltered", dark.ring === "#f5f1e8" && dark.sheetRing === "#212b3c" && dark.ctaContrast >= 4.5 && dark.aptFilter === "none", dark);

    // condensed state must settle, not flip each frame under scroll anchoring
    const flips = await page.evaluate(async () => {
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 200));
      window.scrollTo(0, 28);
      const header = document.querySelector("header");
      let last = header.dataset.condensed;
      let n = 0;
      for (let i = 0; i < 40; i++) {
        await new Promise((r) => requestAnimationFrame(r));
        if (header.dataset.condensed !== last) (n++, (last = header.dataset.condensed));
      }
      return n;
    });
    check("header condensed state settles near the threshold (no flip loop)", flips <= 1, { flips });
    await page.evaluate(() => {
      const el = document.getElementById("evidence");
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 20);
    });
    await sleep(300);
    await shot(page, "desktop-evidence-header", { captureBeyondViewport: false });
    const ev = await page.evaluate(() => ({
      counters: document.querySelectorAll("[data-count]").length,
      links: [...document.querySelectorAll("#evidence ol a[target=_blank]")].map((a) => a.href),
      chips: [...document.querySelectorAll("#evidence ol li")].filter((li) => /external study/i.test(li.textContent)).length,
    }));
    check("research: static figures, every study linked, every row marked as external", ev.counters === 0 && ev.links.length === 4 && ev.chips === 3, ev);
    check("research links: only the citation is lang=en, the new-tab hint follows the page", await page.evaluate(() =>
      [...document.querySelectorAll("#evidence ol a[target=_blank]")].every((a) => !a.hasAttribute("lang") && a.querySelector("[lang=en]") && a.querySelector(".sr-only").closest("[lang]") === document.documentElement),
    ));
    check("area pills: the check glyph is hidden by opacity when unchecked (survives forced colors)", await page.evaluate(() =>
      [...document.querySelectorAll(".pill-choice input[type=checkbox]")].every((i) => getComputedStyle(i.nextElementSibling.querySelector(".pill-box svg")).opacity === (i.checked ? "1" : "0")),
    ));
    const photos = await page.evaluate(() =>
      [...document.querySelectorAll("main img[srcset]")].map((i) => ({ sizes: i.sizes, lazy: i.loading, bg: getComputedStyle(i).backgroundImage.startsWith("url(") })),
    );
    check("section photos: srcset + sizes, lazy, with a placeholder behind", photos.length === 5 && photos.every((p) => p.sizes && p.lazy === "lazy" && p.bg), photos);
    await page.close();
  }

  // ── 6. With motion: content still reachable by keyboard ───────────
  {
    const { page } = await open({ motion: "no-preference" });
    await sleep(2400);
    for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
    const vis = await page.evaluate(() => {
      const el = document.activeElement;
      let o = 1;
      for (let n = el; n && n !== document.body; n = n.parentElement) o = Math.min(o, Number(getComputedStyle(n).opacity));
      return { el: el.tagName + "|" + el.textContent.trim().slice(0, 30), opacity: o };
    });
    await sleep(1200);
    const later = await page.evaluate(() => {
      let o = 1;
      for (let n = document.activeElement; n && n !== document.body; n = n.parentElement) o = Math.min(o, Number(getComputedStyle(n).opacity));
      return o;
    });
    check("motion on: a focused control is never left invisible", later === 1, { ...vis, later });
    await page.close();
  }
} finally {
  await browser.close();
}

const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? "✓" : "✗"} ${c.name}${c.ok ? "" : `  ${JSON.stringify(c.detail)}`}`);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
