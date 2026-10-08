/**
 * Version archive of the legal documents. Each list is newest first; the
 * first entry is the version in force and is served at the plain URL, older
 * ones at ?version=<fecha> (e.g. /legal/terminos/?version=2026-10-08).
 *
 * Publishing a new version: copy the current module to a dated file (e.g.
 * content/archive/terminos-2026-10-08.ts), point its entry below at that copy,
 * then edit the current module and add its entry at the top. Never edit an
 * archived file — RN 13.3 promises the earlier text stays accessible as it was.
 */
import type { RulesDoc, TermsDoc } from "../model";
import { TERMINOS } from "./terminos";
import { REGLAS } from "./reglas";

export type Versioned<T> = { version: string; effective: string; doc: T };

export const TERMINOS_VERSIONS: Versioned<TermsDoc>[] = [
  { version: TERMINOS.version, effective: TERMINOS.effective, doc: TERMINOS },
];

export const REGLAS_VERSIONS: Versioned<RulesDoc>[] = [
  { version: REGLAS.version, effective: REGLAS.effective, doc: REGLAS },
];
