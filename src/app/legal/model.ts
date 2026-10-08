/**
 * Legal documents — data model, stable anchor ids and the cross-references
 * between the Términos y Condiciones and the Reglas de Negocio.
 *
 * Anchor ids are part of the public URLs (shared links, links from the app),
 * so keep them stable:
 *   /legal/terminos/            #encabezado #lo-esencial #datos-clave
 *                               #seccion-8  #clausula-8-6  #clausulas-8-1-a-8-6 (range)
 *   /legal/reglas-de-negocio/   #rn-04  #regla-4-2
 */

/** Text with inline markup: **bold**, [label](href), {{pending}} — rendered by RichText. */
export type Rich = string;

export type Clause = { num: string; text: Rich };

export type TermsSection = { num: number; title: string; clauses: Clause[] };

export type TermsDoc = {
  title: string;
  subtitle: string;
  version: string;
  effective: Rich;
  essentials: { title: string; items: { lead: string; text: Rich }[]; note: string };
  keyData: {
    title: string;
    provider: { title: string; rows: [string, Rich][] };
    plans: { title: string; head: string[]; rows: string[][]; note: string };
  };
  termsTitle: string;
  sections: TermsSection[];
  /** Annexes that form part of the Términos (Aviso de Privacidad, consentimiento de fotografía). */
  annexes: { id: string; letter: string; title: string; paragraphs: Rich[] }[];
  endMark: string;
};

/** A pointer from a business rule into the Términos (as listed under "Referencias"). */
export type TermsRef =
  | { kind: "header" }
  | { kind: "essentials" }
  | { kind: "section"; section: number }
  | { kind: "clauses"; from: string; to: string };

export type RuleTopic = { code: string; title: string; termsRefs: TermsRef[]; clauses: Clause[] };

export type RulesDoc = {
  title: string;
  version: string;
  effective: Rich;
  intro: Rich;
  operator: { title: string; rows: [string, Rich][] };
  topics: RuleTopic[];
};

export type LegalDocId = "terminos" | "reglas";

export const LEGAL_PATHS: Record<LegalDocId, string> = {
  terminos: "/legal/terminos/",
  reglas: "/legal/reglas-de-negocio/",
};

// ── anchor ids ──────────────────────────────────────────────────
const dashed = (num: string) => num.replace(".", "-");

export const termsIds = {
  header: "encabezado",
  essentials: "lo-esencial",
  keyData: "datos-clave",
  section: (n: number) => `seccion-${n}`,
  clause: (num: string) => `clausula-${dashed(num)}`,
  range: (from: string, to: string) => `clausulas-${dashed(from)}-a-${dashed(to)}`,
};

export const rulesIds = {
  topic: (code: string) => `rn-${code.split(" ")[1]}`,
  clause: (num: string) => `regla-${dashed(num)}`,
};

/** "#clausulas-8-1-a-8-6" → ["8.1", "8.6"] */
export function parseClauseRange(hash: string): [string, string] | null {
  const m = /^clausulas-(\d+)-(\d+)-a-(\d+)-(\d+)$/.exec(hash);
  return m ? [`${m[1]}.${m[2]}`, `${m[3]}.${m[4]}`] : null;
}

// ── Términos refs (used by the Reglas page) ─────────────────────
export function termsRefLabel(ref: TermsRef): string {
  switch (ref.kind) {
    case "header":
      return "Encabezado";
    case "essentials":
      return "Lo esencial";
    case "section":
      return `Sección ${ref.section}`;
    case "clauses":
      return ref.from === ref.to ? ref.from : `${ref.from}–${ref.to}`;
  }
}

export function termsRefHref(ref: TermsRef): string {
  const base = LEGAL_PATHS.terminos;
  switch (ref.kind) {
    case "header":
      return `${base}#${termsIds.header}`;
    case "essentials":
      return `${base}#${termsIds.essentials}`;
    case "section":
      return `${base}#${termsIds.section(ref.section)}`;
    case "clauses":
      return `${base}#${ref.from === ref.to ? termsIds.clause(ref.from) : termsIds.range(ref.from, ref.to)}`;
  }
}

/** The ref exactly as the Word "Referencias: Términos …" line writes it (used in print). */
export function termsRefSourceLabel(ref: TermsRef): string {
  return ref.kind === "section" ? String(ref.section) : termsRefLabel(ref);
}

/** Where a ref lands in the Términos, for the reverse ("more detail") links. */
function termsRefTarget(ref: TermsRef): "header" | "essentials" | number {
  switch (ref.kind) {
    case "header":
    case "essentials":
      return ref.kind;
    case "section":
      return ref.section;
    case "clauses":
      return Number(ref.from.split(".")[0]);
  }
}

/**
 * Reverse index: for each part of the Términos, the business-rule topics that
 * reference it. Derived from the Reglas "Referencias" so both directions of
 * the cross-linking always agree.
 */
export function rulesByTermsTarget(rules: RulesDoc) {
  const map = new Map<"header" | "essentials" | number, RuleTopic[]>();
  for (const topic of rules.topics) {
    for (const ref of topic.termsRefs) {
      const key = termsRefTarget(ref);
      const list = map.get(key) ?? [];
      if (!list.includes(topic)) list.push(topic);
      map.set(key, list);
    }
  }
  return map;
}

export function ruleTopicHref(topic: RuleTopic): string {
  return `${LEGAL_PATHS.reglas}#${rulesIds.topic(topic.code)}`;
}
