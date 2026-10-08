import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang, type Lang } from "../i18n";
import SiteFooter from "../components/site/SiteFooter";
import RichText, { PENDING_LEGEND_ID, Pending } from "./RichText";
import TerminosBody from "./TerminosBody";
import ReglasBody from "./ReglasBody";
import { REGLAS_VERSIONS, TERMINOS_VERSIONS } from "./content/versions";
import { LEGAL_PATHS, rulesIds, termsIds, type LegalDocId } from "./model";
import { reducedMotion, useHashTargets, useScrollSpy } from "./useLegalNav";
import { trackStickyHeader } from "../lib/stickyHeader";
import logoFull from "../../../assets/logo-full.png";
import logoMark from "../../../assets/mark.png";

type TocItem = { id: string; num?: string; label: string };

type DocMeta = {
  titleTop: string;
  titleEm: string;
  subtitle?: string;
  version: string;
  effective: string;
  hasPending: boolean;
  toc: TocItem[];
  body: ReactNode;
  /** every version of this document, newest (in force) first */
  versions: { version: string; effective: string }[];
};

/** The requested version (?version=<fecha>), or the one in force. */
function pick<T extends { version: string }>(versions: T[]): T {
  const wanted = new URLSearchParams(window.location.search).get("version");
  return versions.find((v) => v.version === wanted) ?? versions[0];
}

function docMeta(id: LegalDocId): DocMeta {
  if (id === "terminos") {
    const { doc } = pick(TERMINOS_VERSIONS);
    return {
      titleTop: "Términos y Condiciones",
      titleEm: "de ACTIVA",
      subtitle: doc.subtitle,
      version: doc.version,
      effective: doc.effective,
      hasPending: JSON.stringify(doc).includes("{{"),
      toc: [
        { id: termsIds.essentials, label: doc.essentials.title },
        { id: termsIds.keyData, label: doc.keyData.title },
        ...doc.sections.map((s) => ({ id: termsIds.section(s.num), num: String(s.num), label: s.title })),
        ...doc.annexes.map((a) => ({ id: a.id, num: a.letter, label: a.title })),
      ],
      body: <TerminosBody doc={doc} />,
      versions: TERMINOS_VERSIONS,
    };
  }
  const { doc } = pick(REGLAS_VERSIONS);
  return {
    titleTop: "Reglas de Negocio",
    titleEm: "de ACTIVA",
    version: doc.version,
    effective: doc.effective,
    hasPending: JSON.stringify(doc).includes("{{"),
    toc: doc.topics.map((topic) => ({ id: rulesIds.topic(topic.code), num: topic.code.split(" ")[1], label: topic.title })),
    body: <ReglasBody doc={doc} />,
    versions: REGLAS_VERSIONS,
  };
}

const DOC_ORDER: LegalDocId[] = ["terminos", "reglas"];

const CONTAINER = "mx-auto box-content max-w-[1280px] px-[clamp(20px,4.5vw,48px)]";

/**
 * Standalone legal document page (/legal/terminos/, /legal/reglas-de-negocio/).
 * The documents are Spanish-only (the binding text); the page chrome follows
 * the site language, and English visitors get a notice saying so.
 */
export default function LegalPage({ doc }: { doc: LegalDocId }) {
  const { t, lang } = useLang();
  const L = t.legal;
  const [meta] = useState(() => docMeta(doc));
  const archived = meta.version !== meta.versions[0].version;
  const other = DOC_ORDER.find((d) => d !== doc)!;
  const otherTitle = (d: LegalDocId) => (d === "terminos" ? t.footer.terms : t.footer.rules);

  const titleRef = useRef<HTMLHeadingElement>(null);
  useHashTargets();
  useEffect(() => trackStickyHeader(), []);
  const active = useScrollSpy(meta.toc.map((i) => i.id));

  return (
    <div className="legal-page min-h-screen overflow-x-clip bg-background font-sans text-foreground print:bg-white">
      <a href="#documento" className="legal-skip">
        {L.skipToDoc}
      </a>
      <LegalHeader doc={doc} />

      <main className={CONTAINER}>
        <article lang="es">
          {/* ── TITLE ──────────────────────────────────────────── */}
          <header
            id={doc === "terminos" ? termsIds.header : undefined}
            className="legal-anchor max-w-[860px] pb-[clamp(28px,4vw,44px)] pt-[clamp(40px,6vw,76px)]"
          >
            <div lang={lang} className="eyebrow mb-5 !text-muted-foreground">
              {L.eyebrow}
            </div>
            <h1
              ref={titleRef}
              tabIndex={-1}
              className="m-0 font-display text-[clamp(34px,5.4vw,58px)] font-light leading-[1.06] tracking-[-.015em] text-ink outline-none"
            >
              <span className="legal-mark">{meta.titleTop}</span>
              <br />
              <span className="legal-mark font-semibold">{meta.titleEm}</span>
            </h1>
            {meta.subtitle && (
              <p className="mb-0 mt-5 max-w-[620px] text-[17px] leading-[1.6] text-muted-foreground text-pretty">
                {meta.subtitle}
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="glass-quiet glass-pill px-4 py-2 font-mono text-[11.5px] tracking-[.04em] text-ink/80 shadow-none">
                <span lang={lang}>{L.version}</span> {meta.version}
              </span>
              <span className="glass-quiet glass-pill px-4 py-2 font-mono text-[11.5px] tracking-[.04em] text-ink/80 shadow-none">
                <span lang={lang}>{L.effective}</span>: <RichText text={meta.effective} />
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                lang={lang}
                className="legal-noprint inline-flex items-center gap-2 rounded-full border border-[rgba(33,43,60,.25)] px-4 py-2 font-mono text-[11.5px] tracking-[.04em] text-ink/80 transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                <PrintIcon />
                {L.print}
              </button>
            </div>

            {(lang === "en" || meta.hasPending || archived) && (
              <div lang={lang} className="legal-noprint mt-6 flex flex-col gap-2.5">
                {archived && (
                  <p className="m-0 flex max-w-[640px] items-start gap-3 rounded-[var(--radius-surface)] border border-ink px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
                    <span>
                      <strong className="font-semibold">{L.archivedTitle}.</strong> {L.archivedBody}{" "}
                      <a href={LEGAL_PATHS[doc]} className="underline underline-offset-[3px]">
                        {L.archivedLink} →
                      </a>
                    </span>
                  </p>
                )}
                {lang === "en" && (
                  <p className="glass-quiet m-0 flex max-w-[640px] items-start gap-3 px-4 py-3 text-[13.5px] leading-[1.55] text-ink/80 shadow-none text-pretty">
                    <span className="mt-px shrink-0 rounded-full bg-ink px-2 py-[3px] font-mono text-[10px] font-bold tracking-[.12em] text-light">
                      ES
                    </span>
                    <span>
                      <strong className="font-semibold text-ink">{L.spanishOnlyTitle}.</strong> {L.spanishOnlyBody}
                    </span>
                  </p>
                )}
                {meta.hasPending && (
                  <p className="m-0 flex items-center gap-2.5 text-[12.5px] text-muted-foreground">
                    <span lang="es" aria-hidden="true">
                      <Pending text="…" />
                    </span>
                    <span id={PENDING_LEGEND_ID}>{L.pendingLegend}</span>
                  </p>
                )}
              </div>
            )}
          </header>

          {/* ── INDEX + DOCUMENT ───────────────────────────────── */}
          <div className="grid gap-x-[clamp(36px,5vw,80px)] pb-[clamp(56px,8vw,96px)] lg:grid-cols-[250px_minmax(0,1fr)] print:block print:pb-0">
            <aside className="legal-noprint max-lg:hidden">
              <div className="legal-toc sticky overflow-y-auto pb-6 pl-1 pr-2">
                <TocNav items={meta.toc} active={active} label={L.contents} lang={lang} />
                <div className="mt-6 border-t border-border pt-5" lang={lang}>
                  <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[.18em] text-muted-foreground">
                    {L.seeAlso}
                  </div>
                  <a
                    href={LEGAL_PATHS[other]}
                    className="group flex items-baseline justify-between gap-3 text-[13.5px] font-medium text-ink/80 transition-colors duration-200 hover:text-ink"
                  >
                    {otherTitle(other)}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </aside>

            <div id="documento" tabIndex={-1} className="legal-anchor min-w-0 max-w-[620px] outline-none">
              <MobileToc items={meta.toc} label={L.contents} lang={lang} />
              {meta.body}
              <VersionHistory meta={meta} path={LEGAL_PATHS[doc]} lang={lang} />

              {/* ── END: other document + back to top ──────────── */}
              <div id="legal-end" lang={lang} className="legal-noprint mt-14 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                <a
                  href={LEGAL_PATHS[other]}
                  className="glass-quiet glass-hover group flex items-center justify-between gap-4 px-6 py-5"
                >
                  <span>
                    <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[.18em] text-muted-foreground">
                      {L.seeAlso}
                    </span>
                    <span className="font-display text-[19px] font-normal text-ink">{otherTitle(other)}</span>
                  </span>
                  <span aria-hidden="true" className="text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: reducedMotion() ? "instant" : "smooth" });
                    history.replaceState(null, "", window.location.pathname + window.location.search);
                    titleRef.current?.focus({ preventScroll: true });
                  }}
                  className="glass-quiet glass-hover flex items-center justify-center gap-2 px-6 py-5 text-[13.5px] font-medium text-ink/80 hover:text-ink"
                >
                  {L.backToTop} <span aria-hidden="true">↑</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      <div className="legal-noprint">
        <SiteFooter lang={lang} anchorPrefix="/" />
      </div>
    </div>
  );
}

// ── VERSION HISTORY ─────────────────────────────────────────────
function VersionHistory({ meta, path, lang }: { meta: DocMeta; path: string; lang: Lang }) {
  const { t } = useLang();
  const L = t.legal;
  return (
    <section id="versiones" aria-labelledby="versiones-title" lang={lang} className="legal-anchor mt-14 border-t border-border pt-8">
      <h2 id="versiones-title" className="mb-4 mt-0 font-mono text-[11px] font-bold uppercase tracking-[.18em] text-muted-foreground">
        {L.versionsTitle}
      </h2>
      <ol className="m-0 list-none p-0">
        {meta.versions.map((v, i) => {
          const shown = v.version === meta.version;
          return (
            <li key={v.version} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border py-2.5 text-[14px] first:border-t-0">
              <a
                href={i === 0 ? path : `${path}?version=${v.version}`}
                aria-current={shown ? "page" : undefined}
                className={`font-mono text-[13px] ${shown ? "font-bold text-ink" : "text-ink/80 underline underline-offset-[3px]"}`}
              >
                {L.version} {v.version}
              </a>
              <span className="text-ink/75">
                {L.effective}: <span lang="es">{v.effective}</span>
              </span>
              {i === 0 && (
                <span className="rounded-full bg-ink px-2 py-[2px] font-mono text-[10px] font-bold uppercase tracking-[.12em] text-light">
                  {L.versionCurrent}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ── HEADER ──────────────────────────────────────────────────────
function LegalHeader({ doc }: { doc: LegalDocId }) {
  const { t, lang, setLang } = useLang();
  const nextLang: Lang = lang === "en" ? "es" : "en";

  return (
    <div data-sticky-header className="legal-noprint sticky top-0 z-50 border-b border-border bg-[rgba(250,248,244,.6)] backdrop-blur-[22px]">
      <div className="mx-auto box-content flex max-w-[1280px] items-center justify-between gap-x-2 px-[clamp(12px,4vw,48px)] py-2.5 md:gap-x-5 md:py-3">
        <a href="/" className="flex shrink-0 items-center">
          {/* below 380px only the mark fits next to the switcher and the toggle */}
          <img src={logoMark} alt="Activa" className="block size-[18px] object-contain min-[380px]:hidden" />
          <img src={logoFull} alt="Activa" className="block h-[13px] w-auto max-[379px]:hidden md:h-[19px]" />
        </a>

        <nav aria-label={t.legal.docsLabel} className="glass-quiet glass-pill flex shrink-0 p-1 shadow-none">
          {DOC_ORDER.map((d) => {
            const current = d === doc;
            return (
              <a
                key={d}
                href={LEGAL_PATHS[d]}
                aria-current={current ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-200 md:px-[18px] md:py-[7px] md:text-[13px] ${
                  current ? "bg-ink text-light" : "text-ink/75 hover:text-ink"
                }`}
              >
                <span className="max-md:hidden">{d === "terminos" ? t.footer.terms : t.footer.rules}</span>
                <span className="md:hidden">{d === "terminos" ? t.legal.termsShort : t.legal.rulesShort}</span>
              </a>
            );
          })}
        </nav>

        <button
          onClick={() => setLang(nextLang)}
          aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
          className="shrink-0 rounded-full border border-[rgba(33,43,60,.25)] px-2.5 py-[5px] font-mono text-[10px] transition-colors duration-200 hover:text-[#3d4a61] md:px-[15px] md:py-2 md:text-[11px]"
        >
          <span className="font-bold">{lang.toUpperCase()}</span>
          <span className="opacity-60"> / {nextLang.toUpperCase()}</span>
        </button>
      </div>
    </div>
  );
}

// ── INDEX ───────────────────────────────────────────────────────
function TocNav({ items, active, label, lang }: { items: TocItem[]; active: string; label: string; lang: Lang }) {
  const listRef = useRef<HTMLOListElement>(null);

  // keep the active entry visible inside the (scrollable) sticky index
  useEffect(() => {
    const item = listRef.current?.querySelector<HTMLElement>(`[data-toc="${active}"]`);
    const box = listRef.current?.closest<HTMLElement>(".legal-toc");
    if (!item || !box) return;
    const top = item.offsetTop; // the sticky box is the entries' offsetParent
    if (top < box.scrollTop + 24 || top + item.offsetHeight > box.scrollTop + box.clientHeight - 24) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3) });
    }
  }, [active]);

  return (
    <nav aria-label={label} lang={lang}>
      <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[.18em] text-muted-foreground">{label}</div>
      <ol ref={listRef} lang="es" className="m-0 list-none border-l border-border p-0">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id} data-toc={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex gap-2.5 border-l py-[5px] pl-4 text-[13px] leading-[1.4] transition-colors duration-200 ${
                  on ? "border-ink font-semibold text-ink" : "border-transparent text-ink/75 hover:text-ink"
                }`}
              >
                {item.num && <span className="w-[1.4rem] shrink-0 font-mono text-[11px] leading-[1.7]">{item.num}</span>}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Below lg: a collapsible index above the document, reopened from a floating button while reading. */
function MobileToc({ items, label, lang }: { items: TocItem[]; label: string; lang: Lang }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [away, setAway] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // shown once the inline index has scrolled away, hidden again at the end of the page
    let past = false;
    let atEnd = false;
    const sync = () => setAway(past && !atEnd);
    const indexIo = new IntersectionObserver(([e]) => {
      past = !e.isIntersecting && e.boundingClientRect.top < 0;
      sync();
    });
    const endIo = new IntersectionObserver((entries) => {
      atEnd = entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0);
      sync();
    });
    indexIo.observe(el);
    const end = document.getElementById("legal-end");
    if (end) endIo.observe(end);
    return () => {
      indexIo.disconnect();
      endIo.disconnect();
    };
  }, []);

  const reopen = () => {
    const el = ref.current;
    if (!el) return;
    el.open = true;
    el.scrollIntoView({ block: "start", behavior: reducedMotion() ? "instant" : "smooth" });
    el.querySelector("summary")?.focus({ preventScroll: true });
  };

  return (
    <>
      <details ref={ref} className="legal-anchor legal-noprint glass-quiet group mb-8 shadow-none lg:hidden">
        <summary
          lang={lang}
          className="flex cursor-pointer list-none items-center justify-between rounded-[var(--radius-surface)] px-5 py-3.5 font-mono text-[11px] uppercase tracking-[.18em] text-ink/80 [&::-webkit-details-marker]:hidden"
        >
          {label}
          <span aria-hidden="true" className="details-caret text-[13px] transition-transform duration-200">
            ›
          </span>
        </summary>
        <ol lang="es" className="m-0 list-none border-t border-border px-5 py-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => ref.current?.removeAttribute("open")}
                className="flex gap-2.5 py-1.5 text-[14px] leading-[1.4] text-ink/80 hover:text-ink"
              >
                {item.num && <span className="w-[1.4rem] shrink-0 font-mono text-[11.5px] leading-[1.6]">{item.num}</span>}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>

      {/* the wrapper floats it: .glass sets position: relative, which would beat `fixed` */}
      <div
        className={`legal-noprint fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 lg:hidden ${
          away ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={reopen}
          lang={lang}
          tabIndex={away ? 0 : -1}
          aria-hidden={!away}
          className="glass glass-pill flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[.16em] text-ink"
        >
          <span aria-hidden="true" className="text-[13px] leading-none">
            ☰
          </span>
          {label}
        </button>
      </div>
    </>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  );
}
