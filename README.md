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

Upon using the spec-driven process, I can see how much more efficient AI-assisted development is. I no longer have to explain myself recursively to achieve what I want to create, I just mark it in the spec files. Troubleshooting is also easier than ever, after each spec document is processed, if any error happens, I know exactly where to look first. The scrolly-telling is an interesting design for websites, after testing a few samples, I found that it works best for presenting information. Overall, the process of using spec-driven development and scrolly-telling techniques has redefined how I approach AI-assisted development and even my own creation process.

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
