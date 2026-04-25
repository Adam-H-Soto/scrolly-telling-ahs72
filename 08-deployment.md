# 08 — Deployment

## Inherited

The full deployment pipeline (Next.js static export, `NEXT_PUBLIC_BASE_PATH`, GitHub Actions workflow, `.nojekyll`, `actions/configure-pages`, `actions/deploy-pages`) is inherited from the starter kit unchanged.

For the full workflow YAML and setup checklist, see the starter kit's `08-deployment.md`.

This file documents only the **Wired-specific deployment configuration**: the repo name, the live URL, and the README requirements for the assignment submission.

---

## Repository name

```
wired-ai-integration
```

GitHub Pages URL:

```
https://<your-github-username>.github.io/wired-ai-integration/
```

The `NEXT_PUBLIC_BASE_PATH` value in CI must be set to `/wired-ai-integration`.

---

## `next.config.ts` (no changes needed)

The starter kit's `next.config.ts` already handles `NEXT_PUBLIC_BASE_PATH` dynamically. No modifications required.

---

## GitHub repo settings

1. **Settings → Pages → Source:** GitHub Actions.
2. **Settings → Actions → General:** Allow GitHub Actions to read and write.
3. Default branch: `main`.

---

## README requirements (assignment submission)

The `README.md` in the repo root must contain:

1. **Site title and one-line description.** Example: `# Wired — The AI Integration Story` / *A cinematic scrollytelling site about AI-powered systems integration.*
2. **Live site link**, formatted as a clickable URL: `https://<username>.github.io/wired-ai-integration/`
3. **Screenshot** (or animated GIF) of the homepage in the README, so the professor can see it without clicking.
4. **Tech stack summary** (3–5 bullet points): Next.js, framer-motion, GitHub Pages, etc.
5. **What I learned / what was hard** — a short paragraph (3–5 sentences) reflecting on the spec-driven process and scrollytelling technique. This is part of the assignment rubric.
6. **Spec index** — a link to `docs/specs/` with a one-line description of each spec file.

### README template

```markdown
# Wired — The AI Integration Story

> "The future of software isn't written. It's connected."

A cinematic scrollytelling website about the problem of systems integration
and how AI is fundamentally changing how it gets solved.

**[→ View the live site](https://<username>.github.io/wired-ai-integration/)**

---

## Screenshot

![Wired homepage screenshot](docs/assets/screenshot-home.png)

---

## Tech Stack

- **Framework:** Next.js 16 App Router, static export
- **Animation:** framer-motion (scroll-linked + viewport reveals)
- **Content:** Markdown + YAML frontmatter, Zod validation
- **Styling:** CSS Modules + CSS custom properties
- **Deploy:** GitHub Pages via GitHub Actions

---

## What I Learned

[Your 3–5 sentence reflection here.]

---

## Specs

See [`docs/specs/`](./docs/specs/) for the full specification suite.

| Spec | Purpose |
|---|---|
| [00-overview](docs/specs/00-overview.md) | Goals, narrative arc, success criteria |
| [01-architecture](docs/specs/01-architecture.md) | Tech stack additions and directory layout |
| [02-content-model](docs/specs/02-content-model.md) | All five pages: frontmatter, slide structure, body content |
| [03-motion-system](docs/specs/03-motion-system.md) | Cinematic motion tokens and Wired-specific patterns |
| [04-layouts](docs/specs/04-layouts.md) | Header, footer, per-page layout notes |
| [05-design-system](docs/specs/05-design-system.md) | Dark palette, typography, tokens |
| [06-visualizations](docs/specs/06-visualizations.md) | Three custom viz components |
| [07-testing](docs/specs/07-testing.md) | Unit + E2E test matrix |
| [08-deployment](docs/specs/08-deployment.md) | GitHub Pages config + README requirements |
| [09-roadmap](docs/specs/09-roadmap.md) | Milestones and delivery order |
```

---

## First deploy checklist

- [ ] Fork / clone `scrollytelling_spec_driven` into a new repo named `wired-ai-integration`.
- [ ] Replace `docs/specs/` with this spec suite.
- [ ] Set GitHub Pages source to "GitHub Actions".
- [ ] Confirm `npm run build` passes locally with `NEXT_PUBLIC_BASE_PATH=/wired-ai-integration`.
- [ ] Push to `main`. First workflow run should be green.
- [ ] Visit `https://<username>.github.io/wired-ai-integration/` and confirm the homepage loads.
- [ ] Run Lighthouse on the live URL. Record scores in the README.
- [ ] Add screenshot to `docs/assets/screenshot-home.png` and commit.

---

## Local preview

```bash
NEXT_PUBLIC_BASE_PATH=/wired-ai-integration npm run build
npx serve out -l 4321
# Visit http://localhost:4321/wired-ai-integration/
```
