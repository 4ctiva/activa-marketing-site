import { useState, useEffect } from "react";
import { Menu, X, Check, ArrowRight, ChevronDown, MapPin, Mail, Globe } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  useLang,
  type Lang,
  PRIMARY_EMAIL,
  LAUNCH_ZONES,
} from "./i18n";
import { CATEGORY_ICONS } from "./category-icons";
import activaLogo from "../../assets/Activa_Logo.png";
import heroRunner from "../../assets/hero-runner.webp";
import meditation from "../../assets/meditation.webp";
import companyWellness from "../../assets/company-wellness.webp";
import strengthTraining from "../../assets/strength-training.webp";
import boxing from "../../assets/boxing.webp";
import poolRecovery from "../../assets/pool-recovery.webp";

const APP_ORIGIN = import.meta.env.DEV ? "http://localhost:3000" : "https://app.4ctiva.com";

// ── HELPERS ─────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-6">
      {children}
    </p>
  );
}

function BulletItem({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Check size={14} className={`mt-0.5 shrink-0 ${dark ? "text-secondary" : "text-secondary-foreground"}`} />
      <span className={`text-sm leading-relaxed ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
        {text}
      </span>
    </div>
  );
}

function WhatsAppIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function BrandLogo({ inverse = false, size = "lg" }: { inverse?: boolean; size?: "sm" | "lg" }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-visible ${
        size === "sm" ? "h-9 w-[8.75rem]" : "h-12 w-[10.5rem]"
      }`}
    >
      <img
        src={activaLogo}
        alt="Activa"
        className={`absolute left-1/2 top-1/2 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 ${
          size === "sm" ? "w-[10rem]" : "w-[12rem]"
        } ${inverse ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}

// ── LANGUAGE PICKER (forced on first visit) ─────────────────────
function LanguagePicker() {
  const { showPicker, choose } = useLang();
  if (!showPicker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/85 backdrop-blur-md px-6">
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-background p-8 text-center shadow-2xl sm:p-10">
        <div className="flex items-center justify-center mb-8">
          <BrandLogo />
        </div>
        <p className="eyebrow mb-2">
          Choose your language
        </p>
        <p className="text-sm text-muted-foreground mb-8">Elige tu idioma</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => choose("en")}
            className="motion-control group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-foreground/70 bg-transparent px-7 text-sm font-medium tracking-[-0.02em] text-foreground hover:border-foreground hover:bg-card"
          >
            English
            <ArrowRight
              size={14}
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </button>
          <button
            onClick={() => choose("es")}
            className="motion-control group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-foreground/70 bg-transparent px-7 text-sm font-medium tracking-[-0.02em] text-foreground hover:border-foreground hover:bg-card"
          >
            Español
            <ArrowRight
              size={14}
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LANGUAGE TOGGLE (top right, switch anytime) ─────────────────
function LanguageToggle({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "es" : "en";
  const idle = !scrolled;
  return (
    <button
      onClick={() => setLang(next)}
      aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
      className={`motion-control inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs tracking-wide transition-colors ${
        idle
          ? "border-white/30 text-white hover:border-white/60"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
      }`}
    >
      <Globe size={13} />
      <span className="font-medium">{lang === "en" ? "EN" : "ES"}</span>
      <span className="opacity-50">/</span>
      <span>{lang === "en" ? "ES" : "EN"}</span>
    </button>
  );
}

// ── MAIN ────────────────────────────────────────────────────────
export default function App() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [howTab, setHowTab] = useState<"users" | "companies" | "gyms">("users");
  const [contactOpen, setContactOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.memberships, href: "#benefits" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const LEGAL_LINKS = [
    { label: t.footer.memberTerms, href: `${APP_ORIGIN}/legal/terms` },
    { label: t.footer.partnerTerms, href: `${APP_ORIGIN}/legal/partner-terms` },
    { label: t.footer.privacyNotice, href: `${APP_ORIGIN}/legal/privacy` },
    { label: t.footer.photoConsent, href: `${APP_ORIGIN}/legal/photo-consent` },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home", "what", "how", "evidence", "benefits", "safety", "pilot", "categories", "faq", "contact", "about"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const howTabs = [
    { key: "users" as const, label: t.how.tabs.users },
    { key: "companies" as const, label: t.how.tabs.companies },
    { key: "gyms" as const, label: t.how.tabs.gyms },
  ];

  return (
    <div className="route-transition min-h-screen overflow-x-hidden bg-background text-foreground font-['Quicksand',sans-serif]">

      <LanguagePicker />

      {/* ── CONTACT FORM MODAL ─────────────────────────────────── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/85 backdrop-blur-md p-0 sm:p-6"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative flex h-full w-full flex-col overflow-hidden bg-background shadow-2xl sm:h-[90vh] sm:max-h-[900px] sm:max-w-xl sm:rounded-[2rem] sm:border sm:border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
              <span className="text-sm tracking-wide font-medium text-foreground">{t.contact.formTitle}</span>
              <button
                onClick={() => setContactOpen(false)}
                aria-label="Close"
                className="motion-control flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf4GeBCFGcsHa3XpXcrZQVP70hvqwa9TQ0XhCx8ZHf2R-Dznw/viewform?embedded=true"
                title={t.contact.formTitle}
                className="w-full block"
                style={{ height: "3985px", border: 0 }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header
        className={`fixed left-2 right-2 top-2 z-50 rounded-full transition-all duration-300 ${
          scrolled
            ? "border border-border/70 bg-background/92 shadow-sm backdrop-blur-xl"
            : "border border-white/10 bg-primary/20 backdrop-blur-sm md:border-transparent md:bg-transparent md:backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-10">
          {/* LOGO */}
          <button onClick={() => scrollTo("#home")} className="motion-control group inline-flex rounded-full">
            <BrandLogo inverse={!scrolled} />
          </button>
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`rounded-full px-1 py-2 text-sm font-medium tracking-[-0.02em] transition-colors duration-200 ${
                    scrolled
                      ? activeSection === id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      : activeSection === id
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("#contact")}
              className="motion-control ml-1 inline-flex h-12 items-center justify-center rounded-full bg-secondary px-6 text-sm font-medium tracking-[-0.02em] text-secondary-foreground hover:bg-white"
            >
              {t.nav.cta}
            </button>
            <LanguageToggle scrolled={scrolled} />
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle scrolled={scrolled} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`motion-control flex size-10 items-center justify-center rounded-full border ${
                scrolled ? "border-border text-foreground" : "border-white/30 text-white"
              }`}
              aria-label={t.nav.menu}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`mx-2 overflow-hidden rounded-[1.5rem] border-border bg-background shadow-xl transition-all duration-300 md:hidden ${menuOpen ? "mt-2 max-h-80 border opacity-100" : "max-h-0 border-0 opacity-0"}`}>
          <nav className="flex flex-col gap-2 p-4">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="rounded-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-card">
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section id="home" className="relative isolate m-2 flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-20 bg-[#1a1a1a]">
          <img
            src={heroRunner}
            alt="Woman training outdoors"
            className="h-full w-full scale-[1.02] object-cover object-[60%_center] opacity-80"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/90 via-primary/45 to-primary/30" />
        <div className="mx-auto flex w-full max-w-[90rem] flex-1 items-center justify-center px-6 py-32 text-center lg:px-10">
          <div className="max-w-5xl">
            <p className="eyebrow !text-secondary">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-7 text-[54px] font-normal leading-none tracking-[-0.05em] text-white lg:text-[74px] lg:font-[350]">
              {t.hero.titleTop} <em className="not-italic">{t.hero.titleEm}</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.5] text-white/75 sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              {[t.hero.ctaCompany, t.hero.ctaGym, t.hero.ctaUser].map((label, index) => (
                <button
                  key={label}
                  onClick={() => scrollTo("#contact")}
                  className={`motion-control group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-medium tracking-[-0.02em] sm:w-auto ${
                    index === 0
                      ? "bg-secondary text-secondary-foreground hover:bg-white"
                      : "border border-white/40 text-white hover:border-white hover:bg-white hover:text-primary"
                  }`}
                >
                  {label}
                  <ArrowRight
                    size={15}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("#evidence")}
              className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/60 hover:text-white/90"
            >
              {t.hero.proofText}{" "}
              <span className="text-secondary underline underline-offset-4 whitespace-nowrap">{t.hero.proofLink} ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS ACTIVA ──────────────────────────────────── */}
      <section id="what" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.what.label}</SectionLabel>
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.what.titleTop}<br />
                <em className="not-italic">{t.what.titleEm}</em>
              </h2>
            </div>
            <div className="lg:pt-2">
              <p className="mb-7 text-lg leading-[1.5] text-muted-foreground">
                {t.what.intro}
              </p>
              <div className="flex flex-col gap-4">
                {t.what.cards.map((card) => (
                  <div key={card.lead} className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:bg-muted sm:p-7">
                    <span className="shrink-0 text-2xl font-normal text-secondary-foreground">→</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="text-foreground font-medium">{card.lead}</span>{" "}
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Activa exists */}
          <div className="mt-20 grid items-center gap-14 sm:mt-28 lg:mt-40 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-muted sm:aspect-[3/2] lg:aspect-[4/5]">
              <img
                src={meditation}
                alt="Woman meditating in a bright studio"
                className="h-full w-full object-cover object-[64%_center] transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
            <div className="flex max-w-2xl flex-col justify-center">
              <SectionLabel>{t.what.whyLabel}</SectionLabel>
              <h3 className="mb-7 text-[32px] font-normal leading-[1.1] tracking-[-0.04em] lg:text-[54px]">
                {t.what.whyTitleTop}<br />
                <em className="not-italic">{t.what.whyTitleEm}</em>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.what.whyP1}
              </p>
              <p className="leading-relaxed font-medium text-foreground">
                {t.what.whyP2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ────────────────────────────────────── */}
      <section id="how" className="bg-card py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.how.label}</SectionLabel>
          <h2 className="mb-12 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
            {t.how.title}
          </h2>

          {/* Tabs */}
          <div className="mb-12 flex w-full gap-1 rounded-full border border-border bg-background p-1 sm:w-fit">
            {howTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setHowTab(tab.key)}
                className={`h-11 flex-1 rounded-full px-3 text-xs font-medium tracking-[-0.02em] transition-colors sm:flex-none sm:px-6 sm:text-sm ${
                  howTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {t.how.steps[howTab].map((item) => (
              <div key={item.step} className="flex min-h-72 flex-col rounded-[2rem] border border-border bg-background p-8 transition-colors duration-300 hover:bg-muted sm:p-10">
                <span className="mb-10 flex size-12 items-center justify-center rounded-full border border-border bg-card text-sm font-medium text-muted-foreground">{item.step}</span>
                <h4 className="mb-3 text-[22px] font-normal leading-[1.2] tracking-[-0.035em] text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3b. THE EVIDENCE ───────────────────────────────────── */}
      <section id="evidence" className="m-2 rounded-[2rem] bg-primary py-24 text-primary-foreground sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <p className="eyebrow mb-6 !text-secondary">{t.evidence.label}</p>
          <h2 className="mb-7 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
            {t.evidence.titleTop}<br />
            <em className="not-italic">{t.evidence.titleEm}</em>
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.5] text-primary-foreground/70 sm:mb-16">
            {t.evidence.intro}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.evidence.stats.map((st) => (
              <div
                key={st.n}
                className="flex min-h-72 flex-col rounded-[2rem] border border-white/15 bg-white/[0.04] p-8 lg:p-10"
              >
                <span className="mb-5 text-5xl font-normal tracking-[-0.04em] text-secondary lg:text-6xl">
                  {st.n}
                </span>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 flex-1">{st.d}</p>
                <p className="text-primary-foreground/40 text-xs italic">{st.s}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-start gap-6 justify-between">
            <button
              onClick={() => scrollTo("#contact")}
              className="motion-control group inline-flex h-13 w-fit shrink-0 items-center gap-2 rounded-full bg-secondary px-7 text-sm font-medium tracking-[-0.02em] text-secondary-foreground hover:bg-white"
            >
              {t.evidence.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <details className="text-primary-foreground/50 text-xs max-w-2xl">
              <summary className="cursor-pointer hover:text-primary-foreground/80 transition-colors">
                {t.evidence.refsLabel}
              </summary>
              <ul className="mt-3 space-y-2">
                {t.evidence.refs.map((r) => (
                  <li key={r} className="leading-relaxed">{r}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      {/* ── 4–6. BENEFITS ──────────────────────────────────────── */}
      <section id="benefits" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.benefits.label}</SectionLabel>
          <h2 className="mb-14 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:mb-20 lg:text-[66px]">
            {t.benefits.titleTop}<br />
            <em className="not-italic">{t.benefits.titleEm}</em>
          </h2>

          {/* Companies */}
          <div className="mb-4 grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-2">
            <div className="bg-primary text-primary-foreground p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-5 !text-secondary">{t.benefits.companies.eyebrow}</p>
                <h3 className="mb-4 text-[30px] font-normal leading-[1.1] tracking-[-0.04em] lg:text-[46px]">
                  {t.benefits.companies.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed mb-8">
                  {t.benefits.companies.desc}
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {t.benefits.companies.bullets.map((b) => <BulletItem key={b} text={b} dark />)}
                </div>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="motion-control group inline-flex h-13 w-fit items-center gap-2 rounded-full bg-secondary px-7 text-sm font-medium tracking-[-0.02em] text-secondary-foreground hover:bg-white"
              >
                {t.benefits.companies.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="bg-muted overflow-hidden min-h-80">
              <img
                src={companyWellness}
                alt="Group wellness session beside the water"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
          </div>

          {/* Gyms */}
          <div className="mb-4 grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-2">
            <div className="bg-muted overflow-hidden min-h-80 order-2 lg:order-1">
              <img
                src={strengthTraining}
                alt="Athlete preparing a barbell lift"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
            <div className="bg-card p-8 sm:p-10 lg:p-14 flex flex-col justify-between order-1 lg:order-2">
              <div>
                <p className="eyebrow mb-5">{t.benefits.gyms.eyebrow}</p>
                <h3 className="mb-4 text-[30px] font-normal leading-[1.1] tracking-[-0.04em] lg:text-[46px]">
                  {t.benefits.gyms.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.benefits.gyms.desc}
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {t.benefits.gyms.bullets.map((b) => <BulletItem key={b} text={b} />)}
                </div>
                <p className="text-xs text-foreground/60 italic border-l-2 border-secondary pl-4 leading-relaxed">
                  {t.benefits.gyms.note}
                </p>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="motion-control group mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium tracking-[-0.02em] text-primary-foreground hover:brightness-110"
              >
                {t.benefits.gyms.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Users */}
          <div className="grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-2">
            <div className="bg-card p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-5">{t.benefits.users.eyebrow}</p>
                <h3 className="mb-4 text-[30px] font-normal leading-[1.1] tracking-[-0.04em] lg:text-[46px]">
                  {t.benefits.users.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.benefits.users.desc}
                </p>
                <div className="flex flex-col gap-3">
                  {t.benefits.users.bullets.map((b) => <BulletItem key={b} text={b} />)}
                </div>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="motion-control group mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium tracking-[-0.02em] text-primary-foreground hover:brightness-110"
              >
                {t.benefits.users.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="bg-muted overflow-hidden min-h-80">
              <img
                src={boxing}
                alt="Woman practicing boxing"
                className="h-full w-full object-cover object-[62%_center] transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CURATED & CONTROLLED NETWORK ────────────────────── */}
      <section id="safety" className="bg-primary py-24 text-primary-foreground sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow mb-6 !text-secondary">{t.safety.eyebrow}</p>
              <h2 className="mb-7 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.safety.titleTop}<br />
                <em className="not-italic">{t.safety.titleEm}</em>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed text-lg">
                {t.safety.paragraph}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:pt-16">
              {t.safety.bullets.map((b) => (
                <div key={b} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                  <BulletItem text={b} dark />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. COSTA RICA PILOT ────────────────────────────────── */}
      <section id="pilot" className="bg-card py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionLabel>{t.pilot.label}</SectionLabel>
              <h2 className="mb-7 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.pilot.titleTop}<br />
                <em className="not-italic">{t.pilot.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.pilot.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.pilot.p2}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                {[t.pilot.btnCompany, t.pilot.btnGym, t.pilot.btnUser].map((label) => (
                  <button
                    key={label}
                    onClick={() => scrollTo("#contact")}
                    className="motion-control group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-foreground/70 px-7 text-sm font-medium tracking-[-0.02em] text-foreground hover:border-foreground hover:bg-background sm:w-auto"
                  >
                    {label}
                    <ArrowRight
                      size={14}
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-border bg-background p-8 sm:p-10">
                <p className="eyebrow mb-8">{t.pilot.zonesLabel}</p>
                <div className="grid grid-cols-2 gap-3">
                  {LAUNCH_ZONES.map((zona) => (
                    <div key={zona} className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                      <MapPin size={13} className="shrink-0 text-secondary-foreground" />
                      {zona}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {t.pilot.zonesNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CATEGORIES ──────────────────────────────────────── */}
      <section id="categories" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.categories.label}</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <h2 className="text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
              {t.categories.titleTop}<br />
              <em className="not-italic">{t.categories.titleEm}</em>
            </h2>
            <p className="text-muted-foreground max-w-xs lg:text-right text-sm leading-relaxed">
              {t.categories.intro}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9">
            {t.categories.items.map((label, i) => {
              const Icon = CATEGORY_ICONS[i];
              return (
                <div
                  key={label}
                  className="group flex min-h-40 flex-col items-center justify-center gap-4 rounded-[2rem] border border-border bg-card px-4 py-8 transition-colors hover:bg-muted"
                >
                  {Icon && (
                    <Icon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  )}
                  <span className="text-xs tracking-wide text-muted-foreground text-center">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 10. FAQs ───────────────────────────────────────────── */}
      <section id="faq" className="bg-card py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.faq.titleTop}<br />
                <em className="not-italic">{t.faq.titleEm}</em>
              </h2>
            </div>
            <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
              {t.faq.items.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-background px-6 transition-colors hover:bg-muted">
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-6 text-left text-sm font-medium text-foreground transition-colors hover:text-foreground/80 [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown size={16} className="text-muted-foreground shrink-0 ml-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease] data-[state=closed]:animate-[accordion-up_200ms_ease]">
                    <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT — direct emails ────────────────────────── */}
      <section id="contact" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <SectionLabel>{t.contact.label}</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="mb-7 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.contact.titleTop}<br />
                <em className="not-italic">{t.contact.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
                {t.contact.intro}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-full border border-border bg-card">
                  <MapPin size={15} className="text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{t.contact.location}</span>
              </div>
            </div>

            <div className="flex w-full max-w-xl flex-col justify-center gap-4">
              <button
                onClick={() => setContactOpen(true)}
                className="motion-control group inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 text-sm font-medium tracking-[-0.02em] text-primary-foreground hover:brightness-110"
              >
                {t.contact.ctaForm}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="mailto:estebanbaltodano@4ctiva.com"
                className="motion-control group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-secondary group-hover:bg-secondary">
                    <Mail size={15} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Esteban Baltodano</span>
                    <span className="text-xs text-muted-foreground break-all">estebanbaltodano@4ctiva.com</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </a>

              <a
                href="https://wa.me/16073196214"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-control group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-secondary group-hover:bg-secondary">
                    <WhatsAppIcon size={16} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">WhatsApp</span>
                    <span className="text-xs text-muted-foreground break-all">+1 (607) 319-6214</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. ABOUT US ───────────────────────────────────────── */}
      <section id="about" className="bg-card py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
          <div className="grid items-stretch gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="h-full min-h-96 overflow-hidden rounded-[2rem] border border-border bg-muted">
              <img
                src={poolRecovery}
                alt="Swimmer recovering beside an outdoor pool"
                className="h-full w-full object-cover object-[75%_center] transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <SectionLabel>{t.about.label}</SectionLabel>
              <h2 className="mb-7 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] lg:text-[66px]">
                {t.about.titleTop}<br />
                <em className="not-italic">{t.about.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t.about.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t.about.p2}
              </p>
              <p className="text-foreground leading-relaxed font-medium">
                {t.about.p3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              {/* LOGO */}
              <div className="flex items-center mb-4">
                <BrandLogo inverse />
              </div>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4 !text-secondary">{t.footer.legalLabel}</p>
              <nav aria-label={t.footer.legalLabel} className="flex flex-col items-start gap-1">
                {LEGAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-left text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="eyebrow mb-4 !text-secondary">{t.footer.navLabel}</p>
              <nav className="flex flex-col items-start gap-1">
                {NAV_LINKS.map((link) => (
                  <button key={link.href} onClick={() => scrollTo(link.href)} className="inline-flex min-h-11 items-center rounded-full text-left text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <p className="eyebrow mb-4 !text-secondary">{t.footer.contactLabel}</p>
              <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
                <a href={`mailto:${PRIMARY_EMAIL}`} className="flex items-center gap-2.5 hover:text-primary-foreground transition-colors">
                  <Mail size={15} className="shrink-0" />
                  <span className="break-all">{PRIMARY_EMAIL}</span>
                </a>
                <a href="https://wa.me/16073196214" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-primary-foreground transition-colors">
                  <WhatsAppIcon size={15} className="shrink-0" />
                  <span>+1 (607) 319-6214</span>
                </a>
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>
          <div className="pt-7">
            <p className="text-xs text-primary-foreground/40">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
