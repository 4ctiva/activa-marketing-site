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
- `src/app/legal/` — the legal pages (entry: `legal/*/index.html` + `src/legal.tsx`). `content/terminos.ts` and `content/reglas.ts` hold the document text verbatim from the Word files, with light inline markup (`**bold**`, `[label](href)`, `{{pending}}` for values still to confirm); `model.ts` defines the stable anchor ids (`#seccion-8`, `#clausula-8-6`, `#clausulas-8-1-a-8-6`, `#rn-04`, `#regla-4-2`) and derives the Términos → Reglas links from each rule's references. `content/versions.ts` is the version archive: the newest entry is served at the plain URL and earlier ones at `?version=<fecha>` (see the comment there for how to publish a new version).
- `src/app/category-icons.tsx` — partner-network tile icons (inline SVGs from the design).
- `src/app/components/ui/` — shadcn/ui components (unused boilerplate, kept as-is).
- `src/styles/` — theme tokens, fonts, and Tailwind entry (`index.css`).

Design source: `design_handoff_activa_site` bundle (high-fidelity HTML prototypes; the prototype lays out in content-box, which the implementation mirrors with `box-content` utilities where explicit dimensions and padding combine).
