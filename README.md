# Wired — The AI Integration Story

> "The future of software isn't written. It's connected."

A cinematic scrollytelling website about the problem of systems integration in modern software, and how AI is fundamentally changing how it gets solved.

**[→ View the live site](https://adam-h-soto.github.io/scrolly-telling-ahs72/)**

**[→ GitHub Repository](https://github.com/Adam-H-Soto/scrolly-telling-ahs72)**

---

## Screenshot

![Wired homepage screenshot](docs/assets/screenshot-home.png)

---

## Tech Stack

- **Framework:** Next.js 15 App Router, static export (`output: "export"`)
- **Animation:** framer-motion — scroll-linked sticky slides + viewport reveals
- **Content:** Markdown + YAML frontmatter, Zod validation, next-mdx-remote/rsc
- **Styling:** CSS Modules + CSS custom properties (dark navy / electric cyan palette)
- **Deploy:** GitHub Pages via GitHub Actions

---

## What I Learned

[Your reflection here — 3 to 5 sentences about the spec-driven process and scrollytelling technique.]

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
```

---

## Specs

See [`specs/`](./specs/) for the full specification suite.

| # | Spec | Purpose |
|---|---|---|
| 00 | [overview](./specs/00-overview.md) | Goals, narrative arc, success criteria |
| 01 | [architecture](./specs/01-architecture.md) | Tech stack additions and directory layout |
| 02 | [content-model](./specs/02-content-model.md) | All five pages: frontmatter, slide structure, body content |
| 03 | [motion-system](./specs/03-motion-system.md) | Cinematic motion tokens and Wired-specific patterns |
| 04 | [layouts](./specs/04-layouts.md) | Header, footer, per-page layout notes |
| 05 | [design-system](./specs/05-design-system.md) | Dark palette, typography, tokens |
| 06 | [visualizations](./specs/06-visualizations.md) | Three custom visualization components |
| 07 | [testing](./specs/07-testing.md) | Unit + E2E test matrix |
| 08 | [deployment](./specs/08-deployment.md) | GitHub Pages config + README requirements |
| 09 | [roadmap](./specs/09-roadmap.md) | Milestones and delivery order |
