# Wired — The AI Integration Story

> "The future of software isn't written. It's connected."

A cinematic scrollytelling website about the problem of systems integration in modern software, and how AI is fundamentally changing how it gets solved.

**[→ View the live site](https://ashetheloyal.github.io/wired-ai-integration/)**

---

## Screenshot

> Replace this section with a screenshot after deploying: `docs/assets/screenshot-home.png`

---

## Tech Stack

- **Framework:** Next.js 15 App Router, static export (`output: "export"`)
- **Animation:** framer-motion — scroll-linked sticky slides + viewport reveals
- **Content:** Markdown + YAML frontmatter, Zod validation, next-mdx-remote/rsc
- **Styling:** CSS Modules + CSS custom properties (dark navy / electric cyan palette)
- **Deploy:** GitHub Pages via GitHub Actions

---

## What I Learned

Building Wired taught me how spec-driven development forces you to think clearly before you code. Every layout decision, every token name, every component API had to be decided upfront in plain English — which meant far fewer dead ends during implementation. The scrollytelling technique (sticky slides driven by `useScroll` and `scrollYProgress`) was the most technically interesting part: synchronizing framer-motion values with the browser's scroll position to create cinematic reveals that feel weighty and intentional, not snappy. The hardest part was the dual-mode motion system — making `Reveal` and visualization components work correctly both inside a presentation slide (scroll-driven) and in a standard page (viewport-driven), without any conditional hook calls.

---

## Running Locally

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

```bash
npm run build   # Static export to out/
npm test        # Vitest unit tests (24 tests)
npm run test:e2e  # Playwright E2E (requires npm run dev in another terminal)
```

---

## Image Assets

Place five `.webp` images in `public/images/wired/` (max 400KB each, dark/atmospheric):

| File | Description |
|---|---|
| `hero-network.webp` | Glowing network map, dark background |
| `server-room.webp` | Atmospheric server room with blue light |
| `hands-keyboard.webp` | Developer at work, night scene |
| `data-flow.webp` | Abstract data flow visualization |
| `team-deploy.webp` | Team looking at dashboards |

Placeholder 1×1 webp files are included. Replace them with real images before deploying. Recommended sources: [Unsplash](https://unsplash.com) — search "server room dark", "network cables blue light", "developer night".

---

## Specs

See [`specs/`](./specs/) for the full specification suite.

| Spec | Purpose |
|---|---|
| [00-overview](specs/00-overview.md) | Goals, narrative arc, success criteria |
| [01-architecture](specs/01-architecture.md) | Tech stack additions and directory layout |
| [02-content-model](specs/02-content-model.md) | All five pages: frontmatter, slide structure, body content |
| [03-motion-system](specs/03-motion-system.md) | Cinematic motion tokens and Wired-specific patterns |
| [04-layouts](specs/04-layouts.md) | Header, footer, per-page layout notes |
| [05-design-system](specs/05-design-system.md) | Dark palette, typography, tokens |
| [06-visualizations](specs/06-visualizations.md) | Three custom visualization components |
| [07-testing](specs/07-testing.md) | Unit + E2E test matrix |
| [08-deployment](specs/08-deployment.md) | GitHub Pages config + README requirements |
| [09-roadmap](specs/09-roadmap.md) | Milestones and delivery order |
