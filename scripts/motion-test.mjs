// Driven-browser verification of the motion layer (reveals, counters,
// parallax, curtain intro, FAQ animation) on the live dev server.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5173";
const results = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--window-size=1440,900", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--user-data-dir=/tmp/pptr-activa-profile"],
  defaultViewport: { width: 1440, height: 900 },
});

try {
  const page = await browser.newPage();

  // ── 1. Load + intro curtain choreography ─────────────────────
  await page.goto(BASE, { waitUntil: "networkidle0" });
  results.curtainAtLoad = await page.evaluate(() => ({
    present: !!document.querySelector(".intro-curtain"),
    jsMotion: document.documentElement.classList.contains("js-motion"),
    h1HiddenBehindCurtain: getComputedStyle(document.querySelector("h1")).opacity === "0",
  }));
  await sleep(2300);
  await page.waitForFunction(
    () => !document.querySelector(".intro-curtain") && document.querySelector("h1").classList.contains("is-in"),
    { timeout: 20000, polling: 300 },
  );
  results.afterIntro = await page.evaluate(() => ({
    curtainGone: !document.querySelector(".intro-curtain"),
    h1In: document.querySelector("h1").classList.contains("is-in"),
    phonesIn: [...document.querySelectorAll('[class*="phoneFloat"]')].map((e) => e.classList.contains("is-in")),
  }));

  // ── 2. Second-load: intro skipped within same session ────────
  await page.goto(BASE, { waitUntil: "networkidle0" });
  results.secondLoadCurtain = await page.evaluate(() => !!document.querySelector(".intro-curtain"));

  // ── 3. Scroll reveal + counters in #evidence ─────────────────
  await page.evaluate(() => document.getElementById("evidence").scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(420); // mid-animation
  results.counterMid = await page.evaluate(() => document.querySelector("[data-count]").textContent);
  await sleep(1700);
  results.countersEnd = await page.evaluate(() => [...document.querySelectorAll("[data-count]")].map((e) => e.textContent));
  results.statCardsIn = await page.evaluate(() =>
    [...document.querySelectorAll("#evidence [data-reveal-group] > div")].map((e) => e.classList.contains("is-in")),
  );

  // ── 4. Curtain image reveal + parallax in #what ──────────────
  await page.evaluate(() => document.getElementById("what").scrollIntoView({ behavior: "instant" }));
  await sleep(150);
  await page.evaluate(() => window.scrollBy(0, 400));
  await sleep(400);
  results.whatCurtain = await page.evaluate(() => {
    const el = [...document.querySelectorAll('#what [data-reveal="curtain"]')][0];
    return { isIn: el.classList.contains("is-in"), clip: getComputedStyle(el).clipPath };
  });
  const t1 = await page.evaluate(() => document.querySelector("[data-parallax] img").style.transform);
  await page.evaluate(() => window.scrollBy(0, 250));
  await sleep(300);
  const t2 = await page.evaluate(() => document.querySelector("[data-parallax] img").style.transform);
  results.parallax = { t1, t2, moves: t1 !== t2 && t1 !== "" };

  // ── 5. FAQ expand animation ──────────────────────────────────
  await page.evaluate(() => document.getElementById("faq").scrollIntoView({ behavior: "instant" }));
  await sleep(600);
  await page.click("#faq button");
  await sleep(120); // mid-transition
  const rowsMid = await page.evaluate(() => getComputedStyle(document.querySelector(".faq-answer")).gridTemplateRows);
  await sleep(700);
  const rowsEnd = await page.evaluate(() => getComputedStyle(document.querySelector(".faq-answer")).gridTemplateRows);
  results.faq = { rowsMid, rowsEnd, animated: rowsMid !== rowsEnd && parseFloat(rowsEnd) > 0 };

  // ── 6. Tab switch entrance ───────────────────────────────────
  await page.evaluate(() => document.getElementById("how").scrollIntoView({ behavior: "instant" }));
  await sleep(700);
  await page.evaluate(() => [...document.querySelectorAll("#how button")].find((b) => b.textContent === "Companies").click());
  await sleep(80);
  results.tabSwapMidOpacity = await page.evaluate(
    () => getComputedStyle(document.querySelector("#how [data-reveal-group] > div")).opacity,
  );
  await sleep(1400);
  results.tabSwapEnd = await page.evaluate(() => ({
    opacity: getComputedStyle(document.querySelector("#how [data-reveal-group] > div")).opacity,
    text: document.querySelector("#how [data-reveal-group]").textContent.includes("Activa designs your benefit"),
  }));

  // ── 7. Reduced motion: content never hidden, no curtain ──────
  const rmPage = await browser.newPage();
  await rmPage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await rmPage.goto(BASE, { waitUntil: "networkidle0" });
  results.reducedMotion = await rmPage.evaluate(() => ({
    curtain: !!document.querySelector(".intro-curtain"),
    curtainVisible: (() => {
      const c = document.querySelector(".intro-curtain");
      return c ? getComputedStyle(c).display !== "none" : false;
    })(),
    jsMotion: document.documentElement.classList.contains("js-motion"),
    h1Visible: getComputedStyle(document.querySelector("h1")).opacity === "1",
    evidenceVisible: getComputedStyle(document.querySelector("#evidence h2")).opacity === "1",
  }));
  await rmPage.close();

  // ── 8. No-JS resilience ──────────────────────────────────────
  const njPage = await browser.newPage();
  await njPage.setJavaScriptEnabled(false);
  await njPage.goto(BASE, { waitUntil: "networkidle2" }).catch(() => {});
  results.noJs = await njPage.evaluate(() => ({
    rootEmpty: !document.getElementById("root")?.children.length,
  })).catch(() => ({ evalFailed: true }));
  await njPage.close();

  // ── 9. APT page motion ───────────────────────────────────────
  const apt = await browser.newPage();
  await apt.goto(`${BASE}/para-todos/`, { waitUntil: "networkidle0" });
  await sleep(2300);
  results.apt = await apt.evaluate(() => ({
    curtainGone: !document.querySelector(".intro-curtain"),
    h1In: document.querySelector("h1").classList.contains("is-in"),
    heroParallax: document.querySelector("section[data-parallax] img")?.style.transform || "",
  }));
  await apt.evaluate(() => document.getElementById("causa").scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(500);
  results.aptCausa = await apt.evaluate(() => ({
    curtainIn: document.querySelector('[data-reveal="curtain"]').classList.contains("is-in"),
    equipoParallax: document.querySelector('[data-reveal="curtain"] img').style.transform,
  }));
  await apt.close();

  console.log(JSON.stringify(results, null, 1));
} finally {
  await browser.close();
}
