import { useLang } from "../i18n";
import RichText from "./RichText";
import { ArrowLink, ClauseList, KeyValueCard, MiniLabel } from "./parts";
import { REGLAS } from "./content/reglas";
import { ruleTopicHref, rulesByTermsTarget, termsIds, type RuleTopic, type TermsDoc } from "./model";

const RELATED = rulesByTermsTarget(REGLAS);

const H2 = "m-0 font-display text-[clamp(25px,3vw,32px)] font-light leading-[1.15] tracking-[-.01em] text-ink";

/** Términos y Condiciones — Lo esencial, Datos clave and the 20 numbered sections. */
export default function TerminosBody({ doc }: { doc: TermsDoc }) {
  const { essentials, keyData } = doc;

  return (
    <>
      {/* ── LO ESENCIAL ───────────────────────────────────────── */}
      <section id={termsIds.essentials} className="legal-anchor glass-quiet px-[clamp(20px,3.2vw,36px)] py-[clamp(22px,3vw,32px)]">
        <h2 className={`${H2} mb-5`}>
          <span className="legal-mark">{essentials.title}</span>
        </h2>
        <ul className="m-0 grid list-none gap-y-3.5 p-0">
          {essentials.items.map((item) => (
            <li key={item.lead} className="relative pl-[18px] text-[14.5px] leading-[1.7] text-ink/85 text-pretty">
              <span aria-hidden="true" className="legal-dot absolute left-0 top-[.62em] size-[6px] rounded-full bg-sand-deep" />
              <strong className="font-semibold text-ink">{item.lead}</strong> <RichText text={item.text} />
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-6 border-t border-border pt-4 text-[13px] italic leading-[1.6] text-muted-foreground">
          {essentials.note}
        </p>
        {/* the Reglas' "Encabezado" refs (RN 13) also surface here, right under the header */}
        <Related topics={[...new Set([...(RELATED.get("header") ?? []), ...(RELATED.get("essentials") ?? [])])].sort((a, b) => a.code.localeCompare(b.code))} />
      </section>

      {/* ── DATOS CLAVE ───────────────────────────────────────── */}
      <section id={termsIds.keyData} className="legal-anchor mt-[clamp(48px,6vw,72px)]">
        <h2 className={`${H2} mb-6`}>
          <span className="legal-mark">{keyData.title}</span>
        </h2>

        <h3 className="mb-3 mt-0 font-mono text-[11px] font-normal uppercase tracking-[.2em] text-ink/70">
          {keyData.provider.title}
        </h3>
        <KeyValueCard rows={keyData.provider.rows} />

        <h3 className="mb-3 mt-9 font-mono text-[11px] font-normal uppercase tracking-[.2em] text-ink/70">
          {keyData.plans.title}
        </h3>
        <PlansTable head={keyData.plans.head} rows={keyData.plans.rows} />
        <p className="mb-0 mt-3.5 text-[13px] italic leading-[1.6] text-muted-foreground">{keyData.plans.note}</p>
      </section>

      {/* ── TÉRMINOS ──────────────────────────────────────────── */}
      <div className="mt-[clamp(56px,7vw,88px)]">
        <h2 className={`${H2} mb-2`}>{doc.termsTitle}</h2>
        {doc.sections.map((s, i) => (
          <section
            key={s.num}
            id={termsIds.section(s.num)}
            className={`legal-anchor border-t border-border pb-3 pt-[clamp(28px,3.5vw,40px)] first-of-type:border-t-0 ${
              !doc.annexes.length && i === doc.sections.length - 1 ? "legal-last-section" : ""
            }`}
          >
            <h3 className="mb-3 mt-0 font-display text-[clamp(20px,2.3vw,24px)] font-normal leading-[1.25] text-ink">
              <span className="legal-mark">
                <span className="mr-1 font-light text-[#76674a]">{s.num}.</span> {s.title}
              </span>
            </h3>
            <ClauseList clauses={s.clauses} idFor={termsIds.clause} />
            <Related topics={RELATED.get(s.num)} />
            {/* inside the last block, so print never leaves it alone on a page */}
            {!doc.annexes.length && i === doc.sections.length - 1 && <EndMark text={doc.endMark} />}
          </section>
        ))}
      </div>

      {/* ── ANEXOS ────────────────────────────────────────────── */}
      {doc.annexes.length > 0 && (
        <div className="mt-[clamp(56px,7vw,88px)]">
          <h2 className={`${H2} mb-2`}>Anexos</h2>
          {doc.annexes.map((a, i) => (
            <section
              key={a.id}
              id={a.id}
              className={`legal-anchor border-t border-border pb-3 pt-[clamp(28px,3.5vw,40px)] first-of-type:border-t-0 ${
                i === doc.annexes.length - 1 ? "legal-last-section" : ""
              }`}
            >
              <h3 className="mb-3 mt-0 font-display text-[clamp(20px,2.3vw,24px)] font-normal leading-[1.25] text-ink">
                <span className="legal-mark">
                  <span className="mr-1 font-light text-[#76674a]">Anexo {a.letter}.</span> {a.title}
                </span>
              </h3>
              {a.paragraphs.map((text) => (
                <p key={text} className="mb-3 mt-0 text-[15.5px] leading-[1.75] text-ink/85 text-pretty">
                  <RichText text={text} />
                </p>
              ))}
              {i === doc.annexes.length - 1 && <EndMark text={doc.endMark} />}
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function EndMark({ text }: { text: string }) {
  return <p className="legal-endmark mb-0 mt-10 text-center font-display text-[15px] italic text-[#76674a]">{text}</p>;
}

/** "Más detalle en las Reglas de Negocio" — reverse of the Reglas' "Referencias". */
function Related({ topics }: { topics?: RuleTopic[] }) {
  const { t, lang } = useLang();
  if (!topics?.length) return null;
  return (
    <aside className="legal-noprint mt-4 rounded-xl border border-border bg-white/35 px-4 py-3">
      <MiniLabel>
        <span lang={lang}>{t.legal.relatedRules}</span>
      </MiniLabel>
      {topics.map((topic) => (
        <ArrowLink key={topic.code} href={ruleTopicHref(topic)} code={topic.code} title={topic.title} />
      ))}
    </aside>
  );
}

/** Planes y precios: a table from `sm` up, one card per plan below it. */
function PlansTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      <div className="glass-quiet overflow-hidden max-sm:hidden">
        <table className="w-full border-collapse text-left text-[14.5px]">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`border-b border-border px-5 py-3.5 font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-muted-foreground ${i ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-border first:border-t-0">
                {r.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-5 py-4 font-display text-[16px] font-semibold text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={i}
                      className={`px-5 py-4 text-right tabular-nums text-ink/85 ${i === 3 ? "font-semibold text-ink" : ""}`}
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:hidden">
        {rows.map((r) => (
          <dl key={r[0]} className="glass-quiet m-0 px-5 py-4">
            <div className="mb-2 font-display text-[17px] font-semibold text-ink">{r[0]}</div>
            {r.slice(1).map((cell, i) => (
              <div key={head[i + 1]} className="flex items-baseline justify-between gap-4 py-1">
                <dt className="font-mono text-[10.5px] font-bold uppercase tracking-[.12em] text-muted-foreground">{head[i + 1]}</dt>
                <dd className={`m-0 tabular-nums text-[14.5px] ${i === 2 ? "font-semibold text-ink" : "text-ink/85"}`}>{cell}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </>
  );
}
