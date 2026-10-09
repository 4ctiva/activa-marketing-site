# Activa

Marketing / informative website for **Activa** — a wellness membership platform connecting people and companies with gyms, studios, and wellness services in Costa Rica through a single flexible membership.

Built with Vite + React + TypeScript and Tailwind CSS v4. Static pages:

- **Main site** (`/`) — bilingual EN/ES landing (language toggle in the header, persisted): hero with app mockups, what/why, how it works, evidence, benefits, control & safety, 2026 pilot, partner network, FAQ, contact, about.
- **Activa para Todos** (`/para-todos/`) — Spanish-only social-commitment page (3% of annual pre-tax profits go to CEPIA).
- **Legal** (`/legal/terminos/`, `/legal/reglas-de-negocio/`) — the Términos y Condiciones and the Reglas de Negocio, cross-linked clause by clause. The documents are Spanish-only (binding text); the page chrome follows the EN/ES toggle. Linked from the footer's Legal column.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/ (all pages)
npm run test:legal   # with the dev server running: browser checks of the legal pages (links, cross-references, mobile, print)
```

## Structure

- `src/app/App.tsx` — the main landing page.
- `src/app/AptApp.tsx` — the Activa para Todos page (entry: `para-todos/index.html` + `src/para-todos.tsx`).
- `src/app/i18n.tsx` — all EN/ES copy and the language context.
- `src/app/components/site/` — shared header-less pieces: footer, phone mockups, icons.
- `src/app/legal/` — the legal pages (entry: `legal/*/index.html` + `src/legal.tsx`). `content/terminos.ts` and `content/reglas.ts` hold the documents, adapted from counsel's Word files with ACTIVA's approved decisions, with light inline markup (`**bold**`, `[label](href)`, `{{pending}}` for values still to confirm); `model.ts` defines the stable anchor ids (`#seccion-8`, `#clausula-8-6`, `#clausulas-8-1-a-8-6`, `#rn-04`, `#regla-4-2`) and derives the Términos → Reglas links from each rule's references. `content/versions.ts` is the version archive: the newest entry is served at the plain URL and every version at `?version=<fecha>` (see the comment there for how to publish a new version). Explicit version links retain the corresponding version in companion-document references. An optional `reviewNotice` marks an unapproved draft on screen and in print; newest does not mean in force.
- `src/app/category-icons.tsx` — partner-network tile icons (inline SVGs from the design).
- `src/app/components/ui/` — shadcn/ui components (unused boilerplate, kept as-is).
- `src/styles/` — theme tokens, fonts, and Tailwind entry (`index.css`).

Design source: `design_handoff_activa_site` bundle (high-fidelity HTML prototypes; the prototype lays out in content-box, which the implementation mirrors with `box-content` utilities where explicit dimensions and padding combine).

## Privacy review — 2026-10-09

The latest terms/rules are a **draft for review**, with full Annex A (privacy notice) and Annex B (optional visual profile-photo authorization). The published 2026-10-08 texts remain preserved under `content/archive/`; they retain the former policy and must not be rewritten. The planned November 1 effective date is subject to approval of the new draft.

Approved by ACTIVA in this review:

- Profile photography is optional; missing or withdrawn photographs must not block registration, purchase, reservations, QR/temporary-code access or renewal.
- Staff compare authorized photos visually. Members without a photo present QR/temporary code plus identification for visual inspection only, without capturing or retaining an ID copy. No automated facial recognition or facial templates.
- Removing/replacing a photo immediately stops its display; delete its file from active storage within five business days. Recovery copies follow the newly selected A.14 policy below; provider and configuration validation remains a launch gate.
- Photo changes do not change the member's renewal preference. Advertising image permission is requested separately per campaign/event, not during general registration.
- Odoo is the accountant's user-confirmed platform. Resend is evidenced by the app's email implementation; `no-reply.4ctiva.com` is a sender domain, not the email provider.

### Resolve before final approval and acceptance

- [ ] **Accountant / ACTIVA:** identify accountant or firm, Odoo instance operator, hosting model, country and invoicing integration. Using Odoo does not prove the app is already integrated.
- [ ] **ONVO:** confirm countries of production storage, processing, backups and payment/antifraud subprocessors. Its public AWS statement does not identify a country.
- [x] **ACTIVA confirmation — 2026-10-09:** Upstash has no additional read replicas in other regions. This closes that question for the app documents; it does not establish absence of all technical backups.
- [x] **Document scope — 2026-10-09:** at the user's request, exclude the informational website's interest form from these app/member documents. Google Forms has no region policy configured according to the user; this is no longer a blocker for this annex. Remove website-only GitHub Pages/browser-preference disclosures as part of the same scope correction; the actual website form remains unchanged.
- [ ] **Counsel + ACTIVA:** review provider contracts, processor/controller roles, subprocessors and international treatment. A region lookup or a vendor's EU transfer framework alone does not establish Costa Rican legal compliance.
- [x] **Draft policy selected at ACTIVA's request:** fill A.12 retention periods and starting points, with a separate minimal commercial/fiscal archive under A.13. These are proposed contractual commitments for legal review, not claims that deletion jobs already exist.
- [ ] **Counsel + accountant:** validate the selected retention periods, start dates, commercial correspondence scope and statutory extensions before acceptance.
- [x] **Draft policy selected at ACTIVA's request:** A.14 specifies 30 calendar days for ACTIVA-managed residual recovery copies and 90 calendar days for provider residual copies, measured from active deletion; no additional photo backups or deadline resets.
- [ ] **Developer + providers:** prove the contracted services and restoration process meet A.14. Do not publish these caps as effective until validated; Odoo Cloud's public backup policy can exceed them and is an explicit unresolved compatibility check under the pending Odoo hosting selection.
- [ ] **Counsel — after remaining document information is complete:** ACTIVA will send the full set to its lawyer and report approval or requested changes here. Review both annexes and related clauses together and confirm the effective date. Do not treat the draft as approved or send it on ACTIVA's behalf.
- [ ] **Developer / ACTIVA — explicitly deferred by the user on 2026-10-09:** after reviewing the documents, implement/verify optional-photo signup, purchase and both entry methods in `activa-app`; arrange reception identity checks; verify removal/replacement deletion, restricted photo access, legacy signed URLs, retention and backup restoration; update actual consent documents/version ledger. Keep this open for the later app review, without starting implementation now. It is not missing wording that must be completed before sending the draft to counsel; verification is still required before the policy takes effect. These website edits do not implement those app changes.

Annex A now marks two remaining factual groups explicitly: A.8 and A.9. A.12–A.14 are drafted policy decisions, still subject to legal review and technical validation. Implementation tasks remain here rather than becoming contractual instructions. Do not remove `reviewNotice` or pending markers until the corresponding facts and legal review are complete. A future publication must use a new version if this draft has already been shared as a fixed version.

Source basis: [Ley 8968, arts. 5–9](https://formatos.inamu.go.cr/SIDOC/DOCS/ley_8968.pdf), [Reglamento 37554-JP](https://formatos.inamu.go.cr/SIDOC/DOCS/decreto_37554jp.pdf), [reform 40008-JP](https://formatos.inamu.go.cr/SIDOC/archivosPeriodicosOficiales/decreto_40008-jp_636171313480169877.pdf); lawyer's October 9 photography draft and ACTIVA decisions in this review. Provider evidence comes from the app's architecture, mailer, rate-limit and monitoring code; the website embeds Google Forms and deploys via GitHub Pages.


### Provider-location evidence — checked 2026-10-09

This matrix distinguishes ACTIVA configuration evidence from the vendor's general service description. It is a review record, not a live audit of private account settings. No provider was contacted and no messages were sent. ACTIVA explicitly requested public publication of the current draft on 2026-10-09; the review notice and factual placeholders must remain visible. Publication is not legal approval or activation of the policy.

| Service | Evidence for ACTIVA / location | Official source and scope |
| --- | --- | --- |
| Supabase | User supplied a project screenshot: primary database `us-east-1`, North Virginia, USA. | [Residency FAQ](https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq): database, Auth and Storage objects in the selected region; logs in EU data centers; global support/CDN exceptions. Do not claim all processing is US-only. |
| Vercel | User confirmed primary region `iad1`. | [Regions](https://vercel.com/docs/regions): `iad1` maps to Washington, D.C., USA / AWS `us-east-1`; CDN/security routing is global. |
| Upstash | The app's `docs/STAGING-TO-PRODUCTION.md` and `docs/runbooks/vercel-environment-boundary.md` explicitly record the independently provisioned `activa-production` database in AWS `us-east-1`. This is a recorded configuration, not a fresh console inspection. | [Global database](https://upstash.com/docs/redis/features/globaldatabase): North Virginia, USA; ACTIVA confirmed on 2026-10-09 that no additional read replicas are configured; no fresh console inspection was performed. `iad1` is Vercel's code, not the Upstash region identifier. |
| Resend | App mailer and production setup record identify Resend and the sender domain `no-reply.4ctiva.com`. The sender domain itself does not identify residence. | [Security](https://resend.com/security): stored email-service data in USA regardless of sending region; [subprocessors](https://resend.com/legal/subprocessors), [DPA](https://resend.com/legal/dpa). |
| Sentry | User reports US / Iowa for ACTIVA. | [Storage documentation](https://docs.sentry.io/organization/data-storage-location/) ([official source](https://github.com/getsentry/sentry-docs/blob/master/docs/organization/data-storage-location/index.mdx)): US event-data storage is Iowa; region selection is not a guarantee about all access/processing. No independent account-console verification was performed. |
| GitHub Pages — website only, outside this app annex | Website deployment uses Pages; disclosure removed from the app annex at ACTIVA's scope clarification on 2026-10-09. | [Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection) confirms visitor IP logging; [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#international-data-transfers) allows international processing, including USA and other operating countries. No single-country guarantee is claimed. |
| Google Forms — website only, outside this app annex | ACTIVA reports no configured data region on 2026-10-09 and requests removal from the app documents. Embedded form inspected without entering data: footer identifies the Activa organization. Only public form content was viewed, not responses. | [Covered data](https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions?hl=en) and [Workspace service terms](https://workspace.google.com/intl/en/terms/service-terms/): eligible editions support US/Europe storage for Forms content and responses, not Forms processing. Organization ownership does not prove a regional setting. [Subprocessors](https://workspace.google.com/terms/subprocessors/) describe possible locations, not the actual location of this form. |
| ONVO | User reports AWS; vendor confirms AWS publicly. | [ONVO developers](https://www.onvopay.com/devs), [Costa Rica privacy policy](https://onvopay.com/en/CR/documents/politica-de-privacidad.pdf): no applicable AWS country/region found. The policy's Costa Rican corporate address is not a hosting location. |
| Odoo / accountant | User confirms accountant uses Odoo. Instance URL, operator, hosting mode and effective region have not been supplied; no app integration was established by this review. | [Hosting options](https://www.odoo.com/page/hosting-types), [privacy policy](https://www.odoo.com/privacy): Online, Odoo.sh and independently hosted installations differ. Odoo's Cloud policy lists Americas production in USA/Canada and backup locations in France/Netherlands/Canada; these are conditional vendor facts, not ACTIVA's confirmed locations. |

Targeted remaining evidence:

1. **ONVO:** countries for ACTIVA client data in production, backups and payment/antifraud services, plus current processing documentation. Public AWS use is insufficient.
2. **Accountant:** instance URL, operator, Odoo Online/Odoo.sh/independent hosting, effective region and backup countries. Also identify the accountant/firm and invoicing integration scope for A.8.
Closed/scoped out on 2026-10-09: Upstash additional-region replicas (ACTIVA confirms none); Google Forms region (no regional policy configured according to ACTIVA; website intake is outside this app annex). These are not remaining document questions.

A.12 retention and A.14 backups were subsequently filled at ACTIVA's express request with the policy below. Their technical implementation remains unverified. Vendor retention limits must be checked against the contracted plan and ACTIVA's own copies before this policy becomes effective or is used to collect acceptances; database backup retention must not be assumed to cover profile-photo files.


### Retention policy drafted at ACTIVA's request — 2026-10-09

The user asked for the safest recommendation and authorized inserting it in the documents. The schedule balances minimization with recoverability and necessary commercial proof. It is not a claim that Costa Rican law prescribes every operational period below. Archived 2026-10-08 texts were not changed; the current 2026-10-09 text remains a review draft.

| Category | Selected maximum / start |
| --- | --- |
| Operational profile after account closure | Five business days from closure; retain only separately justified evidence. |
| Inactive accounts | Close after 12 months with neither membership nor user activity, with 30 calendar days' advance notice and an opportunity to continue; do not close an active paid cycle or unresolved service case through this routine. |
| Superseded/unnecessary eligibility files | 30 calendar days after replacement or end of need; retain current state only as needed and minimal relevant contractual proof separately. |
| Reservation, check-in and credit detail | 12 months from each event; separate the minimum required settlement/payment evidence before expiry. |
| Purely technical support | 12 months from case closure; commercial/refund/cancellation correspondence belongs in the commercial archive. |
| Technical/security logs | 90 calendar days from event, without photos, full access codes, passwords or full card data. Residual access-code records: seven calendar days from expiry/revocation, never continued access validity. |
| Enquiries without a contract/dispute | 12 months from the person's last interaction; outgoing ACTIVA messages do not reset the clock. |
| Consent and acceptance evidence | While effective plus five years from the last applicable service or photo withdrawal/account closure, as specified in A.12.7. Historical legal text can remain without personal links. |
| Commercial/fiscal records | Five years from their dates, subject to actual statutory computation/extensions; never extend this automatically to photos or complete profiles. |
| ACTIVA-managed residual recovery backups | 30 calendar days from active deletion. |
| Provider residual recovery backups | 90 calendar days from active deletion, subject to mandatory proof/configuration before effectiveness or acceptance. |
| Photos | Existing approved immediate display withdrawal + active deletion within five business days; no extra photo backups/history; any provider residue isolated and subject to the provider recovery cap. |

Exceptions require a specific legal obligation, audit, dispute or process; restricted access, review at least every six months, and deletion within five business days once the reason and any other applicable period end. A hypothetical future claim is not a blanket hold. Rights requests remain independent of routine maximum periods.

Legal basis reviewed: [Law 8968 arts. 6–7](https://formatos.inamu.go.cr/SIDOC/DOCS/ley_8968.pdf) (necessity and five-business-day rights resolution; ten years is not a default retention recommendation); [Commerce Code art. 234(d)](https://www.asamblea.go.cr/sd/SiteAssets/Lists/Consultas%20Biblioteca/EditForm/C%C3%B3digo%20de%20Comercio.pdf) (commercial correspondence, invoices and supporting documents); [Decree 44739-H art. 22](https://www.pgrweb.go.cr/DOCS/NORMAS/1/VIGENTE/D/2020-2029/2020-2024/2024/19326/16FAC2.HTML) (electronic-voucher retention and statutory exceptions). Counsel must validate classification and any longer applicable duties.

Technical evidence and launch gates (read-only app review; app not modified):

- `activa-app/docs/runbooks/backup-restore-drill.md` and launch docs plan seven-day Supabase backups/PITR; they do not prove the production configuration or a successful restore drill. [Supabase](https://supabase.com/docs/guides/platform/backups) documents plan-dependent database backup periods and expressly excludes Storage binaries.
- [Sentry](https://www.sentry.help/en/articles/13965019-how-frequently-is-data-backed-up) reports recovery backups expiring 30/90 days from creation; [Resend](https://resend.com/security) reports seven-day backups. Hence the draft does not promise every provider's recovery copy disappears in 30 days.
- Odoo's public Cloud policy can retain deleted data in backups for up to 12 months. The pending accountant's hosting choice must be checked against the selected 90-day residual cap; configuration/contract/provider changes or an expressly disclosed and reviewed exception are required if it cannot comply. A.8/A.9 cannot be marked complete by merely learning the hosting country.
- `activa-app/docs/06-data-model.md` contains older inconsistent planning periods (including permanent ledger/check-in data, seven-year audit and 90-day photos). Reconcile these with the selected policy; they are not implementation proof or authority to overwrite this decision.
- `activa-app/src/lib/photos/actions.ts` currently retains old objects on replacement and uses best-effort deletion on removal. Build a verified retrying deletion process for replacement, withdrawal, closure and orphan files; invalidate access/caches. Signed-URL expiry alone is not proof of withdrawal; [Supabase Smart CDN](https://supabase.com/docs/guides/storage/cdn/smart-cdn) has separate cache behavior.
- Acceptance-ledger immutability must permit controlled expiry/anonymization once the lawful retention period ends, while preserving integrity during that period. No general completed member-anonymization implementation was found in this targeted review.
- Implement category-based purge jobs, minimal archive separation, commercial correspondence classification, inactive-account notices, exceptions with expiry/review, and minimal proof of completed deletion. No production data was deleted by this documentation task.
- Restore into isolation; apply deletion/withdrawal/cancelled-renewal records kept outside the restored snapshot before reopening access. A new snapshot or copy must not reset a deleted item's residual deadline. Verify this in a restore drill, including photo object metadata, logs, external services and exports.


### Current handoff / user decisions — 2026-10-09

This section records the latest chat instructions for continuity:

1. **Upstash:** ACTIVA confirms no copies in other regions in response to the read-replica question. The app annex says no additional read replicas; this does not claim no provider recovery backups.
2. **Website scope:** ACTIVA reports no selected region for Google Forms and instructs removing it from these documents because it belongs to the informational website. The annex now covers the app, membership and related service communications; it expressly excludes website interest forms. Website-only GitHub Pages/browser-preference text is also removed for consistency. The actual form and website behavior are unchanged. A website/form privacy notice is a separate scope and has not been authored or represented as complete by this change.
3. **App review — deferred, not completed:** the user wants implementation and verification later, after reviewing the documents. Preserve all technical findings and launch gates above. Do not reopen this as an immediate drafting question, start app work now or mark the task complete. This includes optional photos, QR/temporary-code plus ID entry, consent logs, deletion, retention and backup restoration.
4. **Lawyer handoff — later:** once remaining document information is complete, ACTIVA will send the documents to its lawyer and return with approval or edits. Do not contact counsel. The user's later explicit request on 2026-10-09 authorizes publishing this version as a review draft; it does not approve the legal text or start the deferred app work.
5. **Current drafting inputs still missing:** accountant/Odoo identity, hosting, processing scope and backup compatibility; ONVO locations, provider/processing documentation and relevant backup details. A.8/A.9 retain only these factual blanks. Legal/contract review and the effective date remain part of the later approval stage.


### Public review publication — requested 2026-10-09

ACTIVA explicitly requested publication of the current version on 4ctiva.com. Publish through the existing main-branch GitHub Pages workflow while preserving the visible draft status, accountant/ONVO placeholders and archived 2026-10-08 texts. The intended 2026-11-01 effective date remains subject to approval. This publication does not start or complete the deferred app implementation/verification and does not authorize collecting acceptance of the draft.

Preflight: restored the exact latest work from GitHub Desktop's saved changes without deleting the saved copy; production build, JavaScript syntax check and diff whitespace check passed. Verify the public current and historical legal routes after deployment; GitHub Actions provides the deployment result for the commit.
