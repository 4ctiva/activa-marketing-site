import { Fragment, type ReactNode } from "react";

/** Id of the visible legend that explains pending markers (rendered by LegalPage). */
export const PENDING_LEGEND_ID = "legal-pending-legend";

/**
 * Renders the inline markup used in the legal content modules:
 *   **bold**        → <strong>
 *   [label](href)   → <a>  (#anchor, /legal/… page, mailto:, tel:)
 *   {{text}}        → pending placeholder (a bracketed "[text]" in the Word source)
 * No HTML is ever injected; everything else renders as plain text.
 */
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\{\{(.+?)\}\}/g;

export default function RichText({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

function parse(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1] !== undefined) {
      out.push(
        <strong key={key++} className="font-semibold text-ink">
          {parse(m[1])}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      out.push(<DocLink key={key++} href={m[3]} label={m[2]} />);
    } else {
      out.push(<Pending key={key++} text={m[4]} />);
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, i) => (typeof node === "string" ? <Fragment key={`t${i}`}>{node}</Fragment> : node));
}

function DocLink({ href, label }: { href: string; label: string }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className="legal-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

/**
 * A value still to be confirmed. Copies as the Word text ("[tres]"); screen
 * readers get the explanation from the page legend, never inside the text.
 */
export function Pending({ text }: { text: string }) {
  return (
    <mark className="legal-pending" title="Pendiente de confirmación" aria-describedby={PENDING_LEGEND_ID}>
      <span className="legal-pending-bracket">[</span>
      {text}
      <span className="legal-pending-bracket">]</span>
    </mark>
  );
}
