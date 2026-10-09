/**
 * Version archive of the legal documents. Each list is newest first; the
 * first entry is the latest version and is served at the plain URL. Every
 * version also has an immutable ?version=<fecha> link (e.g. /legal/terminos/?version=2026-10-08).
 *
 * Publishing a new version: copy the current module to a dated file (e.g.
 * content/archive/terminos-2026-10-08.ts), point its entry below at that copy,
 * then edit the current module and add its entry at the top. Never edit an
 * archived file — RN 13.3 promises the earlier text stays accessible as it was.
 */
import type { RulesDoc, TermsDoc } from "../model";
import { TERMINOS } from "./terminos";
import { REGLAS } from "./reglas";
import { TERMINOS as TERMINOS_2026_10_08 } from "./archive/terminos-2026-10-08";
import { REGLAS as REGLAS_2026_10_08 } from "./archive/reglas-2026-10-08";

export type Versioned<T> = { version: string; effective: string; reviewNotice?: string; doc: T };

export const TERMINOS_VERSIONS: Versioned<TermsDoc>[] = [
  { version: TERMINOS.version, effective: TERMINOS.effective, reviewNotice: TERMINOS.reviewNotice, doc: TERMINOS },
  { version: TERMINOS_2026_10_08.version, effective: TERMINOS_2026_10_08.effective, doc: TERMINOS_2026_10_08 },
];

export const REGLAS_VERSIONS: Versioned<RulesDoc>[] = [
  { version: REGLAS.version, effective: REGLAS.effective, reviewNotice: REGLAS.reviewNotice, doc: REGLAS },
  { version: REGLAS_2026_10_08.version, effective: REGLAS_2026_10_08.effective, doc: REGLAS_2026_10_08 },
];
