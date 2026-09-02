import { useState, useEffect, useRef } from "react";
import { useLang, type Lang, LAUNCH_ZONES } from "./i18n";
import { CATEGORY_ICONS } from "./category-icons";
import { MailIcon, WhatsAppIcon } from "./components/site/icons";
import PhoneMockups from "./components/site/PhoneMockups";
import SiteFooter from "./components/site/SiteFooter";
import logoFull from "../../assets/logo-full.png";
import mark from "../../assets/mark.png";
import aptLogo from "../../assets/apt-logo.png";
import badgeAppStore from "../../assets/badge-appstore.png";
import badgeGooglePlay from "../../assets/badge-googleplay.png";
import meditation from "../../assets/meditation.webp";
import companyWellness from "../../assets/company-wellness.webp";
import strengthTraining from "../../assets/strength-training.webp";
import boxing from "../../assets/boxing.webp";
import poolRecovery from "../../assets/pool-recovery.webp";

// box-content: the design prototype lays out in content-box, so 1280px is the
// content width and the side padding sits outside it (1376px overall).
const CONTAINER = "mx-auto box-content max-w-[1280px] px-[clamp(20px,4.5vw,48px)]";
const SECTION_Y = "py-[clamp(56px,8vw,96px)]";
const H2 = "m-0 font-display text-[clamp(31px,4.6vw,50px)] font-light leading-[1.1] tracking-[-.01em]";
const GRID_2COL =
  "grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(28px,4.5vw,64px)]";

// ── LANGUAGE PICKER (optional, flag-gated in i18n) ──────────────
function LanguagePicker() {
  const { showPicker, choose } = useLang();
  if (!showPicker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(15,22,36,.85)] backdrop-blur-[8px]">
      <div className="box-content w-[min(400px,92%)] rounded-2xl bg-background px-10 py-11 text-center">
        <img src={mark} alt="Activa" className="inline-block size-10 object-contain" />
        <div className="mb-1 mt-[22px] font-mono text-[11px] tracking-[.24em] text-[#8a8172]">
          CHOOSE YOUR LANGUAGE
        </div>
        <div className="mb-[26px] text-[13px] text-muted-foreground">Elige tu idioma</div>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => choose("en")}
            className="rounded-full border-[1.5px] border-ink p-[13px] text-sm font-semibold"
          >
            English
          </button>
          <button
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
  const [howTab, setHowTab] = useState<"users" | "companies" | "gyms">("users");
  const [faqOpen, setFaqOpen] = useState(-1);
  const [contactOpen, setContactOpen] = useState(false);
  const [mapHover, setMapHover] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const nextLang: Lang = lang === "en" ? "es" : "en";

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [contactOpen]);

  const howTabs = [
    { key: "users" as const, label: t.how.tabs.users },
    { key: "companies" as const, label: t.how.tabs.companies },
    { key: "gyms" as const, label: t.how.tabs.gyms },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <LanguagePicker />

      {/* ── CONTACT FORM MODAL ─────────────────────────────────── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(15,22,36,.85)] p-6 backdrop-blur-[8px]"
          onClick={() => setContactOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
            className="flex h-[86vh] w-[min(620px,94%)] flex-col overflow-hidden rounded-2xl bg-background outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-[26px] py-[18px]">
              <span id="contact-modal-title" className="text-sm font-semibold">
                {t.contact.formTitle}
              </span>
              <button
                onClick={() => setContactOpen(false)}
                aria-label="Close"
                className="px-2.5 py-1 text-[18px] text-muted-foreground"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf4GeBCFGcsHa3XpXcrZQVP70hvqwa9TQ0XhCx8ZHf2R-Dznw/viewform?embedded=true"
                title={t.contact.formTitle}
                className="block w-full border-0"
                style={{ height: "3985px" }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-border bg-[rgba(250,248,244,.92)] backdrop-blur-[12px]">
        <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-[clamp(16px,4vw,48px)] py-3.5 max-md:gap-x-2.5 max-md:px-2.5">
          <a href="#home" className="flex items-center">
            <img src={logoFull} alt="Activa" className="block h-[19px] w-auto max-md:h-[12px]" />
          </a>
          <div className="flex flex-wrap items-center gap-x-[clamp(14px,2.2vw,30px)] gap-y-3 text-[13.5px] font-medium text-leaf max-md:gap-x-[5px] max-md:text-[9.5px]">
            <a href="#home" className="inline-flex text-leaf transition-transform duration-200 hover:-translate-y-[3px]">
              {t.nav.home}
            </a>
            <a href="#about" className="inline-flex text-leaf transition-transform duration-200 hover:-translate-y-[3px]">
              {t.nav.about}
            </a>
            <a href="#contact" className="inline-flex text-leaf transition-transform duration-200 hover:-translate-y-[3px]">
              {t.nav.contact}
            </a>
            <a
              href="/para-todos/"
              className="inline-flex items-center transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <img src={aptLogo} alt="Activa para Todos" className="block h-[38px] w-auto max-md:h-[18px]" />
            </a>
          </div>
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setLang(nextLang)}
              aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
              className="rounded-full border border-[rgba(33,43,60,.25)] px-[15px] py-2 font-mono text-[11px] transition-colors duration-200 hover:text-[#3d4a61] max-md:px-[7px] max-md:py-[5px] max-md:text-[9px]"
            >
              <span className="font-bold">{lang.toUpperCase()}</span>
              <span className="opacity-45"> / {nextLang.toUpperCase()}</span>
            </button>
            <a
              href="#contact"
              className="rounded-full bg-ink px-6 py-[11px] text-[13px] font-semibold text-primary-foreground max-md:hidden"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section id="home" className="relative">
        <div
          className="pointer-events-none fixed inset-0 z-[60] bg-navy transition-opacity duration-500"
          style={{ opacity: mapHover ? 0.45 : 0 }}
        />
        <a
          href="/para-todos/"
          onMouseEnter={() => setMapHover(true)}
          onMouseLeave={() => setMapHover(false)}
          className="absolute right-10 top-5 z-[61] block max-md:right-3 max-md:top-[30px]"
        >
          <img
            src={aptLogo}
            alt="Activa para Todos"
            className="apt-hero-logo block h-auto w-[clamp(180px,16vw,260px)] max-md:w-11"
          />
        </a>
        <div className="mx-auto box-content max-w-[1280px] px-12 pb-6 pt-20 text-center max-md:pt-8">
          <div className="eyebrow mb-6">{t.hero.eyebrow}</div>
          <h1 className="m-0 font-display text-[clamp(36px,6vw,64px)] font-light leading-[1.08] tracking-[-.015em] max-md:text-[31px]">
            {t.hero.titleTop}
            <br />
            <span className="font-semibold">{t.hero.titleEm}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[16.5px] leading-[1.6] text-muted-foreground text-pretty">
            {t.hero.subtitle}
          </p>
        </div>
        <PhoneMockups />
        <div className="flex flex-col items-center gap-[26px] px-12 pb-[88px] pt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3.5">
            <span className="font-mono text-[11px] uppercase tracking-[.24em] text-[#8a8172]">
              Coming soon on
            </span>
            {/* badges stay side by side; only the label wraps on narrow screens */}
            <span className="flex flex-nowrap items-center gap-[18px]">
              <img src={badgeAppStore} alt="Download on the App Store" className="h-[42px] w-auto opacity-85" />
              <img src={badgeGooglePlay} alt="Get it on Google Play" className="h-[42px] w-auto opacity-85" />
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS ACTIVA ──────────────────────────────────── */}
      <section id="what" className="border-t border-border">
        <div className={`${CONTAINER} ${SECTION_Y}`}>
          <div className="eyebrow mb-[22px]">{t.what.label}</div>
          <div className={`${GRID_2COL} items-start`}>
            <h2 className={H2}>
              {t.what.titleTop}
              <br />
              <span className="font-semibold">{t.what.titleEm}</span>
            </h2>
            <div>
              <p className="mb-6 mt-0 text-[16.5px] leading-[1.6] text-muted-foreground text-pretty">
                {t.what.intro}
              </p>
              <div className="flex flex-col gap-3">
                {t.what.cards.map((card) => (
                  <div key={card.lead} className="flex gap-4 rounded-lg bg-card px-6 py-[22px]">
                    <span className="font-display text-[20px] text-sand-deep">→</span>
                    <p className="m-0 text-sm leading-[1.65] text-muted-foreground">
                      <span className="font-bold text-ink">{card.lead}</span> {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`${GRID_2COL} mt-[110px] items-center`}>
            <div className="h-[520px] overflow-hidden rounded-lg">
              <img
                src={meditation}
                alt="Woman meditating in a bright studio"
                className="h-full w-full object-cover object-[64%_center]"
              />
            </div>
            <div>
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
      <section id="how" className="border-t border-border bg-card">
        <div className={`${CONTAINER} ${SECTION_Y}`}>
          <div className="eyebrow mb-[22px]">{t.how.label}</div>
          {/* the design's only heading without an explicit line-height */}
          <h2 className="m-0 mb-10 font-display text-[clamp(31px,4.6vw,50px)] font-light leading-normal tracking-[-.01em]">
            {t.how.title}
          </h2>
          <div className="mb-10 inline-flex flex-wrap gap-1 rounded-3xl border border-[rgba(33,43,60,.15)] bg-background p-1">
            {howTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setHowTab(tab.key)}
                className={`rounded-full px-6 py-[11px] text-[13.5px] font-semibold transition-colors duration-200 ${
                  howTab === tab.key ? "bg-ink text-light" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {t.how.steps[howTab].map((item) => (
              <div key={item.step} className="box-content min-h-[230px] rounded-lg border border-border bg-background p-9">
                <div className="mb-[34px] font-mono text-[11px] text-[#8a8172]">{item.step}</div>
                <div className="mb-2.5 font-display text-[22px] font-medium leading-[1.25]">{item.title}</div>
                <p className="m-0 text-sm leading-[1.65] text-muted-foreground text-pretty">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. EVIDENCE ────────────────────────────────────────── */}
      <section id="evidence" className="bg-ink text-light">
        <div className={`${CONTAINER} ${SECTION_Y}`}>
          <div className="eyebrow mb-[22px] !text-sand">{t.evidence.label}</div>
          <h2 className={`${H2} mb-5`}>
            {t.evidence.titleTop}
            <br />
            <span className="font-semibold">{t.evidence.titleEm}</span>
          </h2>
          <p className="mb-12 mt-0 max-w-[620px] text-base leading-[1.6] text-[#a89f8c] text-pretty">
            {t.evidence.intro}
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {t.evidence.stats.map((st) => (
              <div
                key={st.n}
                className="box-content flex min-h-[250px] flex-col rounded-lg border border-[rgba(245,241,232,.15)] bg-[rgba(255,255,255,.04)] p-9"
              >
                <div className="mb-4 font-display text-[clamp(40px,5vw,54px)] font-normal text-sand">{st.n}</div>
                <p className="mb-5 mt-0 flex-1 text-sm leading-[1.65] text-[#d8d2c5]">{st.d}</p>
                <div className="text-[11.5px] italic text-[#8f887d]">{st.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
            <a
              href="#contact"
              className="flex-none rounded-full bg-sand px-[30px] py-3.5 text-[13.5px] font-bold text-ink"
            >
              {t.evidence.cta} →
            </a>
            <details className="group max-w-[640px] text-[11.5px] text-[#8f887d]">
              {/* custom marker: iOS renders the native one as a blue emoji */}
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="details-caret mr-1.5 inline-block transition-transform duration-200">{"▸"}</span>
                {t.evidence.refsLabel}
              </summary>
              <ul className="m-0 mt-3 flex list-disc flex-col gap-2 pl-[18px]">
                {t.evidence.refs.map((r) => (
                  <li key={r} className="leading-[1.6]">
                    {r}
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
          <div className="eyebrow mb-[22px]">{t.benefits.label}</div>
          <h2 className={`${H2} mb-14`}>
            {t.benefits.titleTop}
            <br />
            <span className="font-semibold">{t.benefits.titleEm}</span>
          </h2>

          {/* Companies */}
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-lg border border-border">
            <div className="flex flex-col bg-ink p-[52px] text-light">
              <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-sand">
                {t.benefits.companies.eyebrow}
              </div>
              <div className="mb-3.5 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                {t.benefits.companies.title}
              </div>
              <p className="mb-[26px] mt-0 text-[15px] leading-[1.65] text-[#a89f8c]">{t.benefits.companies.desc}</p>
              <div className="mb-8 flex flex-col gap-3">
                {t.benefits.companies.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="text-[13px] text-sand">✓</span>
                    <span className="text-sm leading-[1.6] text-[#d8d2c5]">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="#contact"
                  className="inline-block rounded-full bg-sand px-7 py-[13px] text-[13.5px] font-bold text-ink"
                >
                  {t.benefits.companies.btn} →
                </a>
              </div>
            </div>
            <div className="min-h-[480px]">
              <img
                src={companyWellness}
                alt="Group wellness session beside the water"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Gyms / Studios */}
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-lg border border-border">
            <div className="min-h-[480px]">
              <img src={strengthTraining} alt="Athlete preparing a barbell lift" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col bg-card p-[52px]">
              <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-[#8a8172]">
                {t.benefits.gyms.eyebrow}
              </div>
              <div className="mb-3.5 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                {t.benefits.gyms.title}
              </div>
              <p className="mb-[22px] mt-0 text-[15px] leading-[1.65] text-muted-foreground">{t.benefits.gyms.desc}</p>
              <div className="mb-[22px] flex flex-col gap-3">
                {t.benefits.gyms.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="text-[13px] text-sand-deep">✓</span>
                    <span className="text-sm leading-[1.6] text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mb-7 mt-0 border-l-2 border-sand pl-4 text-[12.5px] italic leading-[1.65] text-[#8a8172]">
                {t.benefits.gyms.note}
              </p>
              <div className="mt-auto">
                <a
                  href="#contact"
                  className="inline-block rounded-full bg-ink px-7 py-[13px] text-[13.5px] font-bold text-primary-foreground"
                >
                  {t.benefits.gyms.btn} →
                </a>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-lg border border-border">
            <div className="flex flex-col bg-card p-[52px]">
              <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[.22em] text-[#8a8172]">
                {t.benefits.users.eyebrow}
              </div>
              <div className="mb-3.5 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
                {t.benefits.users.title}
              </div>
              <p className="mb-[22px] mt-0 text-[15px] leading-[1.65] text-muted-foreground">{t.benefits.users.desc}</p>
              <div className="mb-8 flex flex-col gap-3">
                {t.benefits.users.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="text-[13px] text-sand-deep">✓</span>
                    <span className="text-sm leading-[1.6] text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="#contact"
                  className="inline-block rounded-full bg-ink px-7 py-[13px] text-[13.5px] font-bold text-primary-foreground"
                >
                  {t.benefits.users.btn} →
                </a>
              </div>
            </div>
            <div className="min-h-[480px]">
              <img
                src={boxing}
                alt="Woman practicing boxing"
                className="h-full w-full object-cover object-[62%_center]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CONTROL & SAFETY ────────────────────────────────── */}
      <section id="safety" className="bg-ink text-light">
        <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
          <div>
            <div className="eyebrow mb-[22px] !text-sand">{t.safety.eyebrow}</div>
            <h2 className={`${H2} mb-6`}>
              {t.safety.titleTop}
              <br />
              <span className="font-semibold">{t.safety.titleEm}</span>
            </h2>
            <p className="m-0 text-base leading-[1.7] text-[#a89f8c] text-pretty">{t.safety.paragraph}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3 pt-[clamp(0px,4vw,56px)]">
            {t.safety.bullets.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 rounded-lg border border-[rgba(245,241,232,.15)] bg-[rgba(255,255,255,.04)] p-5"
              >
                <span className="text-[13px] text-sand">✓</span>
                <span className="text-[13.5px] leading-[1.55] text-[#d8d2c5]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. 2026 PILOT ──────────────────────────────────────── */}
      <section id="pilot" className="bg-card">
        <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
          <div>
            <div className="eyebrow mb-[22px]">{t.pilot.label}</div>
            <h2 className="mb-6 mt-0 font-display text-[clamp(30px,4.3vw,46px)] font-light leading-[1.12] tracking-[-.01em]">
              {t.pilot.titleTop}
              <br />
              <span className="font-semibold">{t.pilot.titleEm}</span>
            </h2>
            <p className="mb-4 mt-0 text-[15px] leading-[1.7] text-muted-foreground text-pretty">{t.pilot.p1}</p>
            <p className="mb-[30px] mt-0 text-[15px] leading-[1.7] text-muted-foreground">{t.pilot.p2}</p>
            <div className="flex flex-wrap gap-3">
              {[t.pilot.btnCompany, t.pilot.btnGym, t.pilot.btnUser].map((label) => (
                <a
                  key={label}
                  href="#contact"
                  className="rounded-full border-[1.5px] border-ink px-6 py-3 text-[13px] font-semibold transition-colors duration-200 hover:text-[#3d4a61]"
                >
                  {label} →
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-10">
            <div className="eyebrow mb-[26px]">{t.pilot.zonesLabel}</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
              {LAUNCH_ZONES.map((zone) => (
                <div
                  key={zone}
                  className="flex items-center gap-2.5 rounded-full border border-[rgba(33,43,60,.15)] px-[18px] py-[11px] text-[13.5px] text-muted-foreground"
                >
                  <span className="text-sand-deep">◉</span>
                  {zone}
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-border pt-7">
              <p className="m-0 text-xs italic leading-[1.7] text-[#8a8172]">{t.pilot.zonesNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PARTNER NETWORK ─────────────────────────────────── */}
      <section id="categories">
        <div className={`${CONTAINER} ${SECTION_Y}`}>
          <div className="eyebrow mb-[22px]">{t.categories.label}</div>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <h2 className={H2}>
              {t.categories.titleTop}
              <br />
              <span className="font-semibold">{t.categories.titleEm}</span>
            </h2>
            <p className="m-0 max-w-[300px] text-right text-[13.5px] leading-[1.65] text-muted-foreground">
              {t.categories.intro}
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(105px,1fr))] gap-2.5">
            {t.categories.items.map((label, i) => {
              const Icon = CATEGORY_ICONS[i];
              return (
                <div
                  key={label}
                  className="flex h-[150px] flex-col items-center justify-center gap-3.5 rounded-lg bg-card px-2 transition-colors duration-[250ms] hover:bg-muted"
                >
                  <Icon className="text-sand-deep" />
                  <span className="text-center text-[11.5px] font-semibold text-muted-foreground">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-border bg-card">
        <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
          <div>
            <div className="eyebrow mb-[22px]">{t.faq.label}</div>
            <h2 className={H2}>
              {t.faq.titleTop}
              <br />
              <span className="font-semibold">{t.faq.titleEm}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {t.faq.items.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div
                  key={f.q}
                  onClick={() => setFaqOpen(open ? -1 : i)}
                  className="cursor-pointer rounded-lg border border-border bg-background px-6"
                >
                  {/* click bubbles to the card; the button carries keyboard/AT semantics */}
                  <button aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="text-[14.5px] font-semibold">{f.q}</span>
                    <span className="font-display text-[20px] text-[#8a8172]">{open ? "−" : "+"}</span>
                  </button>
                  {open && <p className="m-0 pb-5 text-[13.5px] leading-[1.7] text-muted-foreground">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 10. CONTACT ────────────────────────────────────────── */}
      <section id="contact">
        <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-start`}>
          <div>
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
              <span className="flex size-10 items-center justify-center rounded-full border border-[rgba(33,43,60,.15)] text-sand-deep">
                ◉
              </span>
              {t.contact.location}
            </div>
          </div>
          <div className="flex max-w-[520px] flex-col gap-3.5">
            <button
              onClick={() => setContactOpen(true)}
              className="rounded-full bg-ink p-4 text-center text-sm font-bold text-primary-foreground"
            >
              {t.contact.ctaForm} →
            </button>
            <a
              href="mailto:estebanbaltodano@4ctiva.com"
              className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(33,43,60,.15)] px-[22px] py-[18px] transition-colors duration-200 hover:bg-card hover:text-[#3d4a61]"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-[42px] items-center justify-center rounded-full border border-[rgba(33,43,60,.15)] text-muted-foreground">
                  <MailIcon size={17} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold">Esteban Baltodano</span>
                  <span className="text-xs text-[#8a8172]">estebanbaltodano@4ctiva.com</span>
                </span>
              </div>
              <span className="text-[#8a8172]">→</span>
            </a>
            <a
              href="https://wa.me/16073196214"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(33,43,60,.15)] px-[22px] py-[18px] transition-colors duration-200 hover:bg-card hover:text-[#3d4a61]"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-[42px] items-center justify-center rounded-full border border-[rgba(33,43,60,.15)] text-muted-foreground">
                  <WhatsAppIcon size={15} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold">WhatsApp</span>
                  <span className="text-xs text-[#8a8172]">+1 (607) 319-6214</span>
                </span>
              </div>
              <span className="text-[#8a8172]">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="border-t border-border bg-card">
        <div className={`${CONTAINER} ${SECTION_Y} ${GRID_2COL} items-stretch`}>
          <div className="min-h-[460px] overflow-hidden rounded-lg">
            <img
              src={poolRecovery}
              alt="Swimmer recovering beside an outdoor pool"
              className="h-full w-full object-cover object-[75%_center]"
            />
          </div>
          <div className="flex flex-col justify-center">
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

      <SiteFooter lang={lang} />
    </div>
  );
}
