import { useState, useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { useLang, type Lang, LAUNCH_ZONES } from "./i18n";
import { CATEGORY_ICONS } from "./category-icons";
import PhoneMockups from "./components/site/PhoneMockups";
import SiteFooter from "./components/site/SiteFooter";
import IntroCurtain from "./components/site/IntroCurtain";
import ContactDialog, { AudiencePills, ContactAlternatives } from "./components/site/ContactDialog";
import HrMessage from "./components/site/HrMessage";
import { initMotion, scanReveals } from "./lib/motion";
import { trackStickyHeader } from "./lib/stickyHeader";
import { AUDIENCES, MEMBER_APP_LIVE, MEMBER_APP_URL, useAreas, useAudience, type Audience } from "./lib/audience";
import logoFull from "../../assets/optimized/logo-full-400w.webp";
import mark from "../../assets/mark.png";
import aptLogo from "../../assets/optimized/apt-logo-270w.webp";
import badgeAppStore from "../../assets/optimized/badge-appstore-380w.webp";
import badgeGooglePlay from "../../assets/optimized/badge-googleplay-380w.webp";
import meditation from "../../assets/optimized/meditation-1400w.webp";
import companyWellness from "../../assets/optimized/company-wellness-1400w.webp";
import strengthTraining from "../../assets/optimized/strength-training-1400w.webp";
import boxing from "../../assets/optimized/boxing-1400w.webp";
import poolRecovery from "../../assets/optimized/pool-recovery-1400w.webp";

// box-content: the design prototype lays out in content-box, so 1280px is the
// content width and the side padding sits outside it (1376px overall).
const CONTAINER = "mx-auto box-content max-w-[1280px] px-[clamp(20px,4.5vw,48px)]";
const SECTION_Y = "py-[clamp(56px,8vw,96px)]";
const H2 = "m-0 font-display text-[clamp(31px,4.6vw,50px)] font-light leading-[1.1] tracking-[-.01em]";
const GRID_2COL =
  "grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(28px,4.5vw,64px)]";
const BTN_INK =
  "inline-block max-w-full rounded-full bg-ink px-7 py-[13px] text-center text-[13.5px] font-bold text-primary-foreground";
const BTN_OUTLINE =
  "inline-block max-w-full rounded-full border-[1.5px] border-ink px-6 py-3 text-center text-[13px] font-semibold transition-colors duration-200 hover:text-[#3d4a61]";

// staggered reveal delays (see motion.css / lib/motion.ts)
const D = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** Splits an APA reference into its text and trailing URL so the URL can be a link. */
function RefItem({ text }: { text: string }) {
  const url = text.match(/https?:\/\/\S+$/)?.[0];
  if (!url) return <>{text}</>;
  return (
    <>
      {text.slice(0, -url.length)}
      <a href={url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2 hover:text-light">
        {url}
      </a>
    </>
  );
}

// ── LANGUAGE PICKER (optional, flag-gated in i18n) ──────────────
function LanguagePicker() {
  const { showPicker, choose } = useLang();
  if (!showPicker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(15,22,36,.85)] backdrop-blur-[8px]">
      <div className="box-content w-[min(400px,92%)] rounded-2xl bg-background px-10 py-11 text-center">
        <img src={mark} alt="Activa" className="inline-block size-10 object-contain" />
        <div className="mb-1 mt-[22px] font-mono text-[11px] tracking-[.24em] text-[#70685c]">
          CHOOSE YOUR LANGUAGE
        </div>
        <div lang="es" className="mb-[26px] text-[13px] text-muted-foreground">Elegí tu idioma</div>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => choose("en")}
            className="rounded-full border-[1.5px] border-ink p-[13px] text-sm font-semibold"
          >
            English
          </button>
          <button
            lang="es"
            onClick={() => choose("es")}
            className="rounded-full border-[1.5px] border-ink p-[13px] text-sm font-semibold"
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────
export default function App() {
  const { t, lang, setLang } = useLang();
  const [audience, setAudience] = useAudience();
  const [areas, setAreas] = useAreas();
  const [howTab, setHowTab] = useState<Audience>(audience ?? "users");
  const [faqFilter, setFaqFilter] = useState<Audience | "all">(audience ?? "all");
  const [faqOpen, setFaqOpen] = useState(-1);
  const [contactOpen, setContactOpen] = useState(false);

  const nextLang: Lang = lang === "en" ? "es" : "en";

  // one choice drives the how-it-works steps, the FAQ filter and the contact messages
  const chooseAudience = (a: Audience) => {
    setAudience(a);
    setHowTab(a);
    setFaqFilter(a);
  };
  const openContact = (a?: Audience) => {
    if (a) chooseAudience(a);
    setContactOpen(true);
  };
  const areaLabels = areas.map((a) => (a === "other" ? t.pilot.zoneOther : a));
  const toggleArea = (zone: string) =>
    setAreas((prev) => (prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]));

  useEffect(() => {
    initMotion({ revealAfterMs: document.querySelector(".intro-curtain") ? 1150 : 0 });
  }, []);

  useEffect(() => trackStickyHeader(), []);

  // the language toggle swaps copy in place, so the tab title and description follow it
  useEffect(() => {
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [t]);

  // initMotion covers the mount scan (choreographed with the intro curtain);
  // this effect only handles content swapped in by tab/filter/language changes
  const firstScan = useRef(true);
  useEffect(() => {
    if (firstScan.current) {
      firstScan.current = false;
      return;
    }
    scanReveals();
  }, [howTab, faqFilter, lang]);

  const howTabs = [
    { key: "users" as const, label: t.how.tabs.users },
    { key: "companies" as const, label: t.how.tabs.companies },
    { key: "gyms" as const, label: t.how.tabs.gyms },
  ];

  // WAI-ARIA tabs: arrow keys / Home / End move between tabs and select them
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = howTabs.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setHowTab(howTabs[next].key);
    tabRefs.current[next]?.focus();
  };

  const faqItems = t.faq.items
    .map((f, i) => ({ ...f, i }))
    .filter((f) => faqFilter === "all" || (f.for as string[]).includes(faqFilter));

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>
      <IntroCurtain />
      <LanguagePicker />
      <ContactDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        audience={audience}
        onAudience={chooseAudience}
        areas={areaLabels}
      />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header data-sticky-header className="sticky top-0 z-50 border-b border-border bg-[rgba(250,248,244,.6)] backdrop-blur-[22px]">
        <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-[clamp(16px,4vw,48px)] py-3.5 max-md:gap-x-1.5 max-md:px-1.5">
          <a href="#home" className="flex items-center">
            <img src={logoFull} alt="Activa" width={94} height={19} className="block h-[19px] w-auto max-md:h-[11px]" />
          </a>
          <nav
            aria-label={t.nav.main}
            className="flex flex-wrap items-center gap-x-[clamp(14px,2.2vw,30px)] gap-y-3 text-[13.5px] font-medium text-ink/70 max-md:gap-x-[clamp(6px,2.2vw,12px)] max-md:text-[11px]"
          >
            <a href="#home" className="inline-flex transition-[translate,color] duration-200 hover:-translate-y-[3px] hover:text-ink">
              {t.nav.home}
            </a>
            <a href="#about" className="inline-flex transition-[translate,color] duration-200 hover:-translate-y-[3px] hover:text-ink">
              {t.nav.about}
            </a>
            <a href="#contact" className="inline-flex transition-[translate,color] duration-200 hover:-translate-y-[3px] hover:text-ink">
              {t.nav.contact}
            </a>
            <a
              href="/para-todos/"
              className="inline-flex items-center transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <img src={aptLogo} alt="Activa para Todos" width={87} height={38} className="block h-[38px] w-auto max-md:h-[21px]" />
            </a>
          </nav>
          <div className="flex items-center gap-3.5">
            {MEMBER_APP_LIVE && (
              <a href={MEMBER_APP_URL} className="text-[12.5px] font-medium text-ink/70 hover:text-ink max-md:hidden">
                {t.nav.signIn}
              </a>
            )}
            <button
              onClick={() => setLang(nextLang)}
              aria-label={t.nav.switchLang}
              lang={nextLang}
              className="rounded-full border border-[rgba(33,43,60,.25)] px-[15px] py-2 font-mono text-[11px] transition-colors duration-200 hover:text-[#3d4a61] max-md:px-1.5 max-md:py-[5px] max-md:text-[9px]"
            >
              <span className="font-bold">{lang.toUpperCase()}</span>
              <span className="text-[#70685c]"> / {nextLang.toUpperCase()}</span>
            </button>
            <a
              href="#contact"
              className="rounded-full bg-ink px-6 py-[11px] text-[13px] font-semibold text-primary-foreground max-md:hidden"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        {/* ── 1. HERO ────────────────────────────────────────────── */}
        <section id="home" className="relative">
          <div
            data-reveal-group
            className="mx-auto box-content max-w-[1280px] px-[clamp(20px,4.5vw,48px)] pb-6 pt-20 text-center max-md:pt-8"
          >
            <div data-reveal className="eyebrow mb-6">
              {t.hero.eyebrow}
            </div>
            <h1
              data-reveal
              className="m-0 font-display text-[clamp(36px,6vw,64px)] font-light leading-[1.08] tracking-[-.015em] max-md:text-[31px]"
            >
              {t.hero.titleTop}
              <br />
              <span className="font-semibold">{t.hero.titleEm}</span>
            </h1>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-[620px] text-[16.5px] leading-[1.6] text-muted-foreground text-pretty"
            >
              {t.hero.subtitle}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openContact()}
                className="max-w-full rounded-full bg-ink px-7 py-3.5 text-[14px] font-bold text-primary-foreground shadow-[0_14px_30px_rgba(33,43,60,.18)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(33,43,60,.24)]"
              >
                {t.hero.ctaPrimary}
              </button>
              <a href="#how" className={`${BTN_OUTLINE} !py-3.5 text-[14px]`}>
                {t.hero.ctaSecondary}
              </a>
            </div>
            <p data-reveal className="mx-auto mb-0 mt-5 flex items-center justify-center gap-2 text-[12.5px] text-muted-foreground">
              <span aria-hidden="true" className="text-ink/35">◉</span>
              {t.hero.status}
            </p>
          </div>
          <PhoneMockups caption={t.hero.mockupCaption} />
          <div className="flex flex-col items-center gap-[26px] px-6 pb-[72px] pt-8">
            <div data-reveal className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[.24em] text-[#70685c]">{t.hero.comingSoon}</span>
              {/* badges stay side by side; only the label wraps on narrow screens */}
              <span className="flex flex-nowrap items-center gap-[18px]">
                <img src={badgeAppStore} alt={t.alts.appStore} width={125} height={42} loading="lazy" decoding="async" className="h-[42px] w-auto opacity-85" />
                <img src={badgeGooglePlay} alt={t.alts.googlePlay} width={141} height={42} loading="lazy" decoding="async" className="h-[42px] w-auto opacity-85" />
              </span>
            </div>
          </div>
        </section>

        {/* ── 1b. AUDIENCE PATHS ─────────────────────────────────── */}
        <section id="paths" aria-labelledby="paths-title" className="border-t border-border bg-card/55">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px]">{t.audiences.label}</div>
            <h2 id="paths-title" data-reveal style={D(0.1)} className={`${H2} mb-10`}>
              {t.audiences.titleTop}
              <br />
              <span className="font-semibold">{t.audiences.titleEm}</span>
            </h2>
            <ul data-reveal-group className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4 p-0">
              {AUDIENCES.map((a) => {
                const path = t.audiences[a];
                const selected = audience === a;
                return (
                  <li
                    key={a}
                    data-reveal
                    className={`glass-quiet glass-frost flex flex-col p-[clamp(22px,3vw,32px)] ${selected ? "ring-[1.5px] ring-ink" : ""}`}
                  >
                    <h3 className="mb-2 mt-0 font-display text-[22px] font-medium leading-[1.25]">{path.name}</h3>
                    <p className="mb-1.5 mt-0 text-[13px] text-muted-foreground">{path.who}</p>
                    <p className="mb-5 mt-0 text-sm leading-[1.65] text-muted-foreground text-pretty">{path.offer}</p>
                    <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[.2em] text-[#70685c]">
                      {t.audiences.nextLabel}
                    </div>
                    <ol className="mb-6 mt-0 flex list-decimal flex-col gap-2 pl-5 text-[13.5px] leading-[1.55] text-muted-foreground">
                      {path.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                    {a === "users" && (
                      <details className="group mb-6 rounded-xl border border-border px-4 py-3">
                        <summary className="cursor-pointer list-none text-[13px] font-semibold [&::-webkit-details-marker]:hidden">
                          <span aria-hidden="true" className="details-caret mr-1.5 inline-block transition-transform duration-200">▸</span>
                          {t.hr.title}
                        </summary>
                        <div className="mt-3">
                          <HrMessage />
                        </div>
                      </details>
                    )}
                    <div className="mt-auto flex flex-col items-start gap-3">
                      <button type="button" onClick={() => openContact(a)} className={BTN_INK}>
                        {path.cta}
                      </button>
                      <a
                        href="#how"
                        onClick={() => chooseAudience(a)}
                        className="text-[13px] font-semibold underline underline-offset-4 hover:text-[#3d4a61]"
                      >
                        {t.audiences.howLink}: {path.name} <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p data-reveal className="mb-0 mt-6 max-w-[760px] text-[12.5px] leading-[1.65] text-muted-foreground">
              {t.audiences.note}
            </p>
          </div>
        </section>

        {/* ── 2. WHAT IS ACTIVA ──────────────────────────────────── */}
        <section id="what" className="border-t border-border">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px]">{t.what.label}</div>
            <div className={`${GRID_2COL} items-start`}>
              <h2 data-reveal style={D(0.1)} className={H2}>
                {t.what.titleTop}
                <br />
                <span className="font-semibold">{t.what.titleEm}</span>
              </h2>
              <p data-reveal style={D(0.2)} className="m-0 text-[16.5px] leading-[1.6] text-muted-foreground text-pretty">
                {t.what.intro}
              </p>
            </div>
            <div className={`${GRID_2COL} mt-[clamp(56px,8vw,110px)] items-center`}>
              <div data-reveal="curtain" data-parallax="24" className="h-[520px] overflow-hidden rounded-2xl max-md:h-[340px]">
                <img
                  src={meditation}
                  alt={t.alts.meditation}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[64%_center]"
                />
              </div>
              <div data-reveal>
                <div className="eyebrow mb-[22px]">{t.what.whyLabel}</div>
                <h3 className="mb-6 mt-0 font-display text-[clamp(28px,4vw,42px)] font-light leading-[1.1] tracking-[-.01em]">
                  {t.what.whyTitleTop}
                  <br />
                  <span className="font-semibold">{t.what.whyTitleEm}</span>
                </h3>
                <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-muted-foreground text-pretty">
                  {t.what.whyP1}
                </p>
                <p className="m-0 text-[15px] font-bold leading-[1.7]">{t.what.whyP2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. HOW IT WORKS ────────────────────────────────────── */}
        <section id="how" className="border-t border-border bg-card/55">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px]">{t.how.label}</div>
            {/* the design's only heading without an explicit line-height */}
            <h2 data-reveal style={D(0.1)} className="m-0 mb-10 font-display text-[clamp(31px,4.6vw,50px)] font-light leading-normal tracking-[-.01em]">
              {t.how.title}
            </h2>
            <div
              data-reveal
              style={D(0.2)}
              role="tablist"
              aria-label={t.how.tabsLabel}
              className="glass-quiet glass-frost glass-pill mb-10 inline-flex flex-wrap gap-1 p-1"
            >
              {howTabs.map((tab, i) => (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`how-tab-${tab.key}`}
                  aria-selected={howTab === tab.key}
                  aria-controls="how-panel"
                  tabIndex={howTab === tab.key ? 0 : -1}
                  onClick={() => setHowTab(tab.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`rounded-full px-6 py-[11px] text-[13.5px] font-semibold transition-colors duration-200 ${
                    howTab === tab.key ? "bg-ink text-light" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              key={howTab}
              id="how-panel"
              role="tabpanel"
              aria-labelledby={`how-tab-${howTab}`}
              tabIndex={0}
              data-reveal-group
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4"
            >
              {t.how.steps[howTab].map((item) => (
                <div key={item.step} data-reveal className="glass-quiet box-content p-9 md:min-h-[230px] max-md:p-7">
                  <div className="mb-[34px] font-mono text-[11px] text-[#70685c] max-md:mb-5">{item.step}</div>
                  <h3 className="mb-2.5 mt-0 font-display text-[22px] font-medium leading-[1.25]">{item.title}</h3>
                  <p className="m-0 text-sm leading-[1.65] text-muted-foreground text-pretty">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. EVIDENCE (external research, not Activa results) ── */}
        <section id="evidence" className="surface-dark bg-ink text-light">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px] !text-[#a89f8c]">{t.evidence.label}</div>
            <h2 data-reveal style={D(0.1)} className={`${H2} mb-5`}>
              {t.evidence.titleTop}
              <br />
              <span className="font-semibold">{t.evidence.titleEm}</span>
            </h2>
            <p data-reveal style={D(0.2)} className="mb-12 mt-0 max-w-[620px] text-base leading-[1.6] text-[#a89f8c] text-pretty">
              {t.evidence.intro}
            </p>
            <div data-reveal-group data-reveal-stagger="140" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
              {t.evidence.stats.map((st) => (
                <div
                  key={st.n}
                  data-reveal
                  className="glass-dark box-content flex flex-col p-9 md:min-h-[250px] max-md:p-7"
                >
                  <div className="mb-4 font-display text-[clamp(40px,5vw,54px)] font-normal text-light">
                    <span className="sr-only">{st.n}</span>
                    <span aria-hidden="true" data-count={st.n}>
                      {st.n}
                    </span>
                  </div>
                  <p className="mb-5 mt-0 flex-1 text-sm leading-[1.65] text-[#d8d2c5]">{st.d}</p>
                  <div className="text-[11.5px] italic text-[#a89f8c]">{st.s}</div>
                </div>
              ))}
            </div>
            <p data-reveal className="mb-0 mt-6 text-[12.5px] leading-[1.6] text-[#a89f8c]">
              {t.evidence.disclaimer}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
              <button
                type="button"
                onClick={() => openContact("companies")}
                className="max-w-full rounded-full bg-light px-[30px] py-3.5 text-center text-[13.5px] font-bold text-ink transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,.25)]"
              >
                {t.evidence.cta} →
              </button>
              <details className="group max-w-[640px] text-[11.5px] text-[#a89f8c]">
                {/* custom marker: iOS renders the native one as a blue emoji */}
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="details-caret mr-1.5 inline-block transition-transform duration-200">{"▸"}</span>
                  {t.evidence.refsLabel}
                </summary>
                <ul className="m-0 mt-3 flex list-disc flex-col gap-2 pl-[18px]">
                  {t.evidence.refs.map((r) => (
                    <li key={r} lang="en" className="leading-[1.6]">
                      <RefItem text={r} />
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>

        {/* ── 5. BENEFITS ────────────────────────────────────────── */}
        <section id="benefits">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px]">{t.benefits.label}</div>
            <h2 data-reveal style={D(0.1)} className={`${H2} mb-14 max-md:mb-10`}>
              {t.benefits.titleTop}
              <br />
              <span className="font-semibold">{t.benefits.titleEm}</span>
            </h2>

            {/* Companies */}
            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-2xl border border-border">
              <div data-reveal className="surface-dark flex flex-col bg-ink p-[clamp(28px,5vw,52px)] text-light">
                <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-[#a89f8c]">
                  {t.benefits.companies.eyebrow}
                </div>
                <h3 className="mb-3.5 mt-0 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                  {t.benefits.companies.title}
                </h3>
                <p className="mb-[26px] mt-0 text-[15px] leading-[1.65] text-[#a89f8c]">{t.benefits.companies.desc}</p>
                <ul className="mb-8 mt-0 flex list-none flex-col gap-3 p-0">
                  {t.benefits.companies.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-[13px] text-[#a89f8c]">✓</span>
                      <span className="text-sm leading-[1.6] text-[#d8d2c5]">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => openContact("companies")}
                    className="inline-block max-w-full rounded-full bg-light px-7 py-[13px] text-[13.5px] font-bold text-ink"
                  >
                    {t.benefits.companies.btn} →
                  </button>
                </div>
              </div>
              <div data-reveal="curtain" data-parallax="22" className="min-h-[480px] overflow-hidden max-md:min-h-[240px]">
                <img
                  src={companyWellness}
                  alt={t.alts.companyWellness}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Gyms / Studios */}
            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-2xl border border-border">
              <div data-reveal="curtain" data-parallax="22" className="min-h-[480px] overflow-hidden max-md:min-h-[240px]">
                <img src={strengthTraining} alt={t.alts.strength} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div data-reveal className="flex flex-col bg-card p-[clamp(28px,5vw,52px)]">
                <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-[#70685c]">
                  {t.benefits.gyms.eyebrow}
                </div>
                <h3 className="mb-3.5 mt-0 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                  {t.benefits.gyms.title}
                </h3>
                <p className="mb-[22px] mt-0 text-[15px] leading-[1.65] text-muted-foreground">{t.benefits.gyms.desc}</p>
                <ul className="mb-[22px] mt-0 flex list-none flex-col gap-3 p-0">
                  {t.benefits.gyms.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-[13px] text-ink/30">✓</span>
                      <span className="text-sm leading-[1.6] text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-7 mt-0 border-l-2 border-ink/20 pl-4 text-[12.5px] italic leading-[1.65] text-[#70685c]">
                  {t.benefits.gyms.note}
                </p>
                <div className="mt-auto">
                  <button type="button" onClick={() => openContact("gyms")} className={BTN_INK}>
                    {t.benefits.gyms.btn} →
                  </button>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-2xl border border-border">
              <div data-reveal className="flex flex-col bg-card p-[clamp(28px,5vw,52px)]">
                <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-[#70685c]">
                  {t.benefits.users.eyebrow}
                </div>
                <h3 className="mb-3.5 mt-0 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                  {t.benefits.users.title}
                </h3>
                <p className="mb-[22px] mt-0 text-[15px] leading-[1.65] text-muted-foreground">{t.benefits.users.desc}</p>
                <ul className="mb-[22px] mt-0 flex list-none flex-col gap-3 p-0">
                  {t.benefits.users.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-[13px] text-ink/30">✓</span>
                      <span className="text-sm leading-[1.6] text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-7 mt-0 border-l-2 border-ink/20 pl-4 text-[12.5px] italic leading-[1.65] text-[#70685c]">
                  {t.benefits.users.note}
                </p>
                <div className="mt-auto">
                  <button type="button" onClick={() => openContact("users")} className={BTN_INK}>
                    {t.benefits.users.btn} →
                  </button>
                </div>
              </div>
              <div data-reveal="curtain" data-parallax="22" className="min-h-[480px] overflow-hidden max-md:min-h-[240px]">
                <img
                  src={boxing}
                  alt={t.alts.boxing}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[62%_center]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CONTROL & SAFETY ────────────────────────────────── */}
        <section id="safety" className="surface-dark bg-ink text-light">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
            <div data-reveal>
              <div className="eyebrow mb-[22px] !text-[#a89f8c]">{t.safety.eyebrow}</div>
              <h2 className={`${H2} mb-6`}>
                {t.safety.titleTop}
                <br />
                <span className="font-semibold">{t.safety.titleEm}</span>
              </h2>
              <p className="m-0 text-base leading-[1.7] text-[#a89f8c] text-pretty">{t.safety.paragraph}</p>
            </div>
            <ul data-reveal-group data-reveal-stagger="90" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3 p-0 pt-[clamp(0px,4vw,56px)]">
              {t.safety.bullets.map((b, i) => (
                <li
                  key={i}
                  data-reveal
                  className="glass-dark flex items-start gap-3 p-5"
                >
                  <span aria-hidden="true" className="text-[13px] text-[#a89f8c]">✓</span>
                  <span className="text-[13.5px] leading-[1.55] text-[#d8d2c5]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 6b. DIGITAL WELLBEING (exploration only) ───────────── */}
        {/* public status is "in exploration" only: no providers, logos, prices or
            activation CTAs until the commercial terms are validated */}
        <section id="digital" aria-labelledby="digital-title">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
            <div data-reveal>
              <span className="eyebrow mb-[22px] inline-flex items-center gap-2 rounded-full border border-[rgba(33,43,60,.15)] px-3.5 py-1.5 !text-muted-foreground">
                <span aria-hidden="true" className="text-ink/35">◉</span>
                {t.digital.badge}
              </span>
              <h2 id="digital-title" className={`${H2} mb-6`}>
                {t.digital.titleTop}
                <br />
                <span className="font-semibold">{t.digital.titleEm}</span>
              </h2>
              <p className="mb-7 mt-0 max-w-[560px] text-[15px] leading-[1.7] text-muted-foreground text-pretty">
                {t.digital.desc}
              </p>
              <p className="m-0 max-w-[560px] border-l-2 border-ink/20 pl-4 text-[13.5px] leading-[1.65] text-muted-foreground text-pretty">
                {t.digital.note}
              </p>
            </div>
            <div data-reveal style={D(0.15)} className="glass-quiet glass-frost p-[clamp(24px,4vw,40px)]">
              <h3 id="digital-areas" className="eyebrow mb-[26px] mt-0 !text-muted-foreground">
                {t.digital.areasLabel}
              </h3>
              <ul
                aria-labelledby="digital-areas"
                data-reveal-group
                data-reveal-stagger="70"
                className="m-0 flex list-none flex-col gap-2.5 p-0"
              >
                {t.digital.areas.map((area) => (
                  <li
                    key={area}
                    data-reveal
                    className="flex items-center gap-2.5 rounded-full border border-[rgba(33,43,60,.15)] px-[18px] py-[11px] text-[13.5px] text-muted-foreground"
                  >
                    <span aria-hidden="true" className="text-ink/35">◉</span>
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-border pt-7">
                <p className="mb-5 mt-0 text-[13.5px] leading-[1.65] text-muted-foreground text-pretty">
                  {t.digital.partnerText}
                </p>
                <a href="#contact" className={BTN_OUTLINE}>
                  {t.digital.partnerCta} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. 2026 PILOT ──────────────────────────────────────── */}
        <section id="pilot" className="bg-card/55">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
            <div data-reveal>
              <div className="eyebrow mb-[22px]">{t.pilot.label}</div>
              <h2 className="mb-6 mt-0 font-display text-[clamp(30px,4.3vw,46px)] font-light leading-[1.12] tracking-[-.01em]">
                {t.pilot.titleTop}
                <br />
                <span className="font-semibold">{t.pilot.titleEm}</span>
              </h2>
              <div className="mb-6 rounded-2xl border border-[rgba(33,43,60,.15)] bg-white/40 px-5 py-4">
                <h3 className="mb-1.5 mt-0 text-[13.5px] font-semibold">{t.pilot.statusTitle}</h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-muted-foreground text-pretty">{t.pilot.status}</p>
              </div>
              <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-muted-foreground text-pretty">{t.pilot.p1}</p>
              <p className="mb-[30px] mt-0 text-[15px] leading-[1.7] text-muted-foreground">{t.pilot.p2}</p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    ["companies", t.pilot.btnCompany],
                    ["gyms", t.pilot.btnGym],
                    ["users", t.pilot.btnUser],
                  ] as const
                ).map(([a, label]) => (
                  <button key={a} type="button" onClick={() => openContact(a)} className={BTN_OUTLINE}>
                    {label} →
                  </button>
                ))}
              </div>
            </div>
            <div data-reveal style={D(0.15)} className="glass-quiet glass-frost p-[clamp(24px,4vw,40px)]">
              <fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby="zones-hint">
                <legend className="eyebrow mb-3 p-0">{t.pilot.zonesLabel}</legend>
                <p id="zones-hint" className="mb-5 mt-0 text-[13px] leading-[1.6] text-muted-foreground">
                  {t.pilot.zonesHint}
                </p>
                <div data-reveal-group data-reveal-stagger="70" className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
                  {[...LAUNCH_ZONES, "other"].map((zone) => (
                    <label key={zone} data-reveal className="pill-choice pill-choice--wide">
                      <input
                        type="checkbox"
                        checked={areas.includes(zone)}
                        onChange={() => toggleArea(zone)}
                        className="sr-only"
                      />
                      <span>
                        <span aria-hidden="true" className="pill-dot">◉</span>
                        {zone === "other" ? t.pilot.zoneOther : zone}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {areaLabels.length > 0 && (
                <p className="mb-0 mt-5 text-[12.5px] leading-[1.6] text-muted-foreground">
                  <span className="font-semibold text-ink">{t.pilot.zonesSelected}</span> {areaLabels.join(", ")}
                </p>
              )}
              <div className="mt-7 border-t border-border pt-7">
                <p className="m-0 text-xs italic leading-[1.7] text-[#70685c]">{t.pilot.zonesNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. PARTNER NETWORK ─────────────────────────────────── */}
        <section id="categories">
          <div className={`${CONTAINER} ${SECTION_Y}`}>
            <div data-reveal className="eyebrow mb-[22px]">{t.categories.label}</div>
            <div data-reveal style={D(0.1)} className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
              <h2 className={H2}>
                {t.categories.titleTop}
                <br />
                <span className="font-semibold">{t.categories.titleEm}</span>
              </h2>
              <p className="m-0 max-w-[300px] text-right text-[13.5px] leading-[1.65] text-muted-foreground max-md:text-left">
                {t.categories.intro}
              </p>
            </div>
            <ul data-reveal-group data-reveal-stagger="60" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(105px,1fr))] gap-2.5 p-0">
              {t.categories.items.map((label, i) => {
                const Icon = CATEGORY_ICONS[i];
                return (
                  <li
                    key={i}
                    data-reveal
                    className="group flex h-[150px] flex-col items-center justify-center gap-3.5 rounded-2xl border border-border/70 bg-white/40 px-2 transition-colors duration-[250ms] hover:bg-white/75 max-md:h-[112px]"
                  >
                    <Icon aria-hidden="true" className="text-ink/45 transition-colors duration-[250ms] group-hover:text-ink" />
                    <span className="text-center text-[11.5px] font-semibold text-muted-foreground">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── 9. FAQ ─────────────────────────────────────────────── */}
        <section id="faq" className="border-t border-border bg-card/55">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
            <div data-reveal>
              <div className="eyebrow mb-[22px]">{t.faq.label}</div>
              <h2 className={`${H2} mb-8`}>
                {t.faq.titleTop}
                <br />
                <span className="font-semibold">{t.faq.titleEm}</span>
              </h2>
              <AudiencePills
                name="faq-filter"
                legend={t.faq.filterLabel}
                value={faqFilter}
                onChange={(v) => {
                  setFaqFilter(v);
                  setFaqOpen(-1);
                }}
                allLabel={t.faq.all}
              />
            </div>
            <div key={faqFilter} data-reveal-group data-reveal-stagger="80" className="flex flex-col border-t border-border">
              {faqItems.map((f) => {
                const open = faqOpen === f.i;
                return (
                  <div key={f.i} data-reveal className="border-b border-border px-1">
                    <h3 className="m-0">
                      <button
                        id={`faq-q-${f.i}`}
                        aria-expanded={open}
                        aria-controls={`faq-a-${f.i}`}
                        onClick={() => setFaqOpen(open ? -1 : f.i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="text-[14.5px] font-semibold">{f.q}</span>
                        <span aria-hidden="true" className="font-display text-[20px] text-[#70685c]">{open ? "−" : "+"}</span>
                      </button>
                    </h3>
                    <div
                      id={`faq-a-${f.i}`}
                      role="region"
                      aria-labelledby={`faq-q-${f.i}`}
                      className={`faq-answer ${open ? "is-open" : ""}`}
                      aria-hidden={!open}
                    >
                      <div>
                        <p className="m-0 pb-5 text-[13.5px] leading-[1.7] text-muted-foreground">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 10. CONTACT ────────────────────────────────────────── */}
        <section id="contact">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
            <div data-reveal>
              <div className="eyebrow mb-[22px]">{t.contact.label}</div>
              <h2 className={`${H2} mb-6`}>
                {t.contact.titleTop}
                <br />
                <span className="font-semibold">{t.contact.titleEm}</span>
              </h2>
              <p className="mb-9 mt-0 max-w-[380px] text-[15px] leading-[1.7] text-muted-foreground text-pretty">
                {t.contact.intro}
              </p>
              <div className="flex items-center gap-3 text-[13.5px] text-muted-foreground">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full border border-[rgba(33,43,60,.15)] text-ink/35">
                  ◉
                </span>
                {t.contact.location}
              </div>
            </div>
            <div data-reveal-group data-reveal-stagger="110" className="flex max-w-[520px] flex-col gap-3.5">
              <button
                type="button"
                onClick={() => openContact()}
                data-reveal
                className="rounded-full bg-ink p-4 text-center text-sm font-bold text-primary-foreground shadow-[0_14px_30px_rgba(33,43,60,.18)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(33,43,60,.24)]"
              >
                {t.contact.ctaForm} →
              </button>
              <div data-reveal className="flex flex-col gap-3.5">
                <ContactAlternatives audience={audience} areas={areaLabels} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. ABOUT ──────────────────────────────────────────── */}
        <section id="about" className="border-t border-border bg-card/55">
          <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-stretch`}>
            <div data-reveal="curtain" data-parallax="24" className="min-h-[460px] overflow-hidden rounded-2xl max-md:min-h-[300px]">
              <img
                src={poolRecovery}
                alt={t.alts.pool}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[75%_center]"
              />
            </div>
            <div data-reveal className="flex flex-col justify-center">
              <div className="eyebrow mb-[22px]">{t.about.label}</div>
              <h2 className={`${H2} mb-6`}>
                {t.about.titleTop}
                <br />
                <span className="font-semibold">{t.about.titleEm}</span>
              </h2>
              <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-muted-foreground text-pretty">{t.about.p1}</p>
              <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-muted-foreground text-pretty">{t.about.p2}</p>
              <p className="m-0 text-[15px] font-bold leading-[1.7]">{t.about.p3}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
