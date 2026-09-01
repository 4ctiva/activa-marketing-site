# Activa

Marketing / informative website for **Activa** — a wellness membership platform connecting people and companies with gyms, studios, and wellness services in Costa Rica through a single flexible membership.

Built with Vite + React + TypeScript and Tailwind CSS v4. Two static pages:

- **Main site** (`/`) — bilingual EN/ES landing (language toggle in the header, persisted): hero with app mockups, what/why, how it works, evidence, benefits, control & safety, 2026 pilot, partner network, FAQ, contact, about.
- **Activa para Todos** (`/para-todos/`) — Spanish-only social-commitment page (3% of annual pre-tax profits go to CEPIA).

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/ (both pages)
```

## Structure

- `src/app/App.tsx` — the main landing page.
- `src/app/AptApp.tsx` — the Activa para Todos page (entry: `para-todos/index.html` + `src/para-todos.tsx`).
- `src/app/i18n.tsx` — all EN/ES copy and the language context.
- `src/app/components/site/` — shared header-less pieces: footer, phone mockups, icons.
- `src/app/category-icons.tsx` — partner-network tile icons (inline SVGs from the design).
- `src/app/components/ui/` — shadcn/ui components (unused boilerplate, kept as-is).
- `src/styles/` — theme tokens, fonts, and Tailwind entry (`index.css`).

Design source: `design_handoff_activa_site` bundle (high-fidelity HTML prototypes; the prototype lays out in content-box, which the implementation mirrors with `box-content` utilities where explicit dimensions and padding combine).
