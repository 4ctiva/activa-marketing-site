import { useLang } from "../i18n";
import RichText from "./RichText";
import { ClauseList, KeyValueCard, MiniLabel } from "./parts";
import { rulesIds, termsRefHref, termsRefLabel, termsRefSourceLabel, type RulesDoc } from "./model";

/** Reglas de Negocio — public version: introduction, operator and the 13 rule topics. */
export default function ReglasBody({ doc, linkVersion }: { doc: RulesDoc; linkVersion?: string }) {
  const { t, lang } = useLang();

  return (
    <>
      <p className="mb-6 mt-0 text-[16px] leading-[1.75] text-ink/85 text-pretty">
        <RichText text={doc.intro} />
      </p>
      <KeyValueCard rows={doc.operator.rows} />

      {doc.topics.map((topic) => (
        <section
          key={topic.code}
          id={rulesIds.topic(topic.code)}
          className="legal-anchor mt-[clamp(40px,5vw,56px)] border-t border-border pt-[clamp(28px,3.5vw,40px)]"
        >
          <div className="legal-topic-head">
            <div className="mb-2 font-mono text-[11px] font-bold tracking-[.2em] text-[#76674a]">{topic.code}</div>
            <h2 className="mb-4 mt-0 font-display text-[clamp(22px,2.6vw,27px)] font-normal leading-[1.22] tracking-[-.005em] text-ink">
              <span className="legal-mark">{topic.title}</span>
            </h2>

            {topic.termsRefs.length > 0 && (
              <p className="mb-3 mt-0 hidden text-[13px] text-ink/80 print:block">
                Referencias: Términos {topic.termsRefs.map(termsRefSourceLabel).join(", ")}
              </p>
            )}
          </div>
          {topic.termsRefs.length > 0 && (
            <div className="legal-noprint mb-4">
              <MiniLabel>
                <span lang={lang}>{t.legal.relatedTerms}</span>
              </MiniLabel>
              <div className="flex flex-wrap gap-2">
                {topic.termsRefs.map((ref) => (
                  <a
                    key={termsRefHref(ref, linkVersion)}
                    href={termsRefHref(ref, linkVersion)}
                    className="glass-quiet glass-pill glass-hover px-3 py-[5px] font-mono text-[11.5px] tracking-[.04em] text-ink/80 shadow-none hover:text-ink"
                  >
                    {termsRefLabel(ref)}
                  </a>
                ))}
              </div>
            </div>
          )}

          <ClauseList clauses={topic.clauses} idFor={rulesIds.clause} />
        </section>
      ))}
    </>
  );
}
