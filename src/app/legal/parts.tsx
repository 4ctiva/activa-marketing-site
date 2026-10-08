import type { ReactNode } from "react";
import RichText from "./RichText";
import type { Clause, Rich } from "./model";

/** Numbered clauses; each row is its own anchor and lights up when linked to. */
export function ClauseList({ clauses, idFor }: { clauses: Clause[]; idFor: (num: string) => string }) {
  return (
    <ol className="m-0 list-none p-0">
      {clauses.map((c) => {
        const id = idFor(c.num);
        return (
          <li
            key={c.num}
            id={id}
            className="legal-anchor legal-clause -mx-3 grid grid-cols-[3.1rem_minmax(0,1fr)] gap-x-2 rounded-[10px] px-3 py-[9px] max-sm:grid-cols-1 max-sm:gap-y-1"
          >
            <a
              href={`#${id}`}
              aria-label={`Cláusula ${c.num}`}
              className="justify-self-start pt-[3px] font-mono text-[12px] font-bold tabular-nums text-ink/70 transition-colors duration-200 hover:text-ink max-sm:pt-0"
            >
              {c.num}
            </a>
            <p className="m-0 text-[15.5px] leading-[1.75] text-ink/85 text-pretty">
              <RichText text={c.text} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/** Label/value card (Proveedor, Operador). Stacks on small screens. */
export function KeyValueCard({ rows }: { rows: [string, Rich][] }) {
  return (
    <dl className="glass-quiet m-0 px-[clamp(18px,2.6vw,28px)] py-1.5">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid gap-x-6 gap-y-1 border-t border-border py-3.5 first:border-t-0 sm:grid-cols-[minmax(140px,190px)_minmax(0,1fr)]"
        >
          <dt className="pt-[3px] font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-muted-foreground">{k}</dt>
          <dd className="m-0 text-[14.5px] leading-[1.65] text-ink/85">
            <RichText text={v} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Small mono label used above link groups. */
export function MiniLabel({ children }: { children: ReactNode }) {
  return <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[.18em] text-muted-foreground">{children}</div>;
}

/** "→" link row used by the cross-document asides. */
export function ArrowLink({ href, code, title }: { href: string; code: string; title: string }) {
  return (
    <a
      href={href}
      className="group flex items-baseline gap-3 rounded-lg py-1.5 text-[14px] leading-snug text-ink/80 transition-colors duration-200 hover:text-ink"
    >
      <span className="shrink-0 font-mono text-[11.5px] tracking-[.06em] text-ink/70 group-hover:text-ink">{code}</span>
      <span className="min-w-0 flex-1 underline decoration-ink/25 underline-offset-[3px] transition-[text-decoration-color] duration-200 group-hover:decoration-ink/70">
        {title}
      </span>
      <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
