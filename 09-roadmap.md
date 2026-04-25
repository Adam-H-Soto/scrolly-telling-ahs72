# 09 — Roadmap

Delivery is sliced so that each milestone produces a **shippable static site**. No milestone leaves the build broken. Each milestone maps to one focused AI-assisted session.

---

## Milestone 0 — Fork and configure (✅ start here)

- Fork `scrollytelling_spec_driven` into a new repo named `wired-ai-integration`.
- Replace `docs/specs/` with this spec suite.
- Update `README.md` with the Wired title and live site link (placeholder URL is fine).
- Confirm `npm run build` and `npm run test` both pass with zero changes to source code.

**Exit check:** `npm run build` exits 0. `npm run test` exits 0. No content yet — scaffold only.

---

## Milestone 1 — Design tokens + fonts

Ref: [05-design-system.md](./05-design-system.md)

- Override `src/app/globals.css` with the Wired token set (dark navy palette, cyan accent, cream text).
- Install Playfair Display, Inter, and JetBrains Mono via `next/font/google` in `src/app/layout.tsx`.
- Add `--dur-cinematic` motion token and its `prefers-reduced-motion` reset.
- Add `WiredLogo` component (SVG wordmark, two variants).
- Smoke test: start `npm run dev` and confirm the homepage shows dark background and the new fonts.

**Exit check:** `npm run build` green. `tests/unit/wired-tokens.test.ts` all pass (contrast ratios verified).

---

## Milestone 2 — Header and footer

Ref: [04-layouts.md](./04-layouts.md) § SiteHeader, SiteFooter

- Update `SiteHeader` with `WiredLogo`, transparent-to-dark scroll transition, and four nav links.
- Update `SiteFooter` with the three-column Wired layout (wordmark, nav, credits).
- `PresentationProgress` bar color set to `--accent-cyan`.

**Exit check:** `npm run build` green. `tests/browser/wired-header.spec.ts` all pass (transparent on load, dark after scroll).

---

## Milestone 3 — Content pipeline + placeholder content

Ref: [02-content-model.md](./02-content-model.md)

- Create all five `.md` files under `content/` and `content/pages/`:
  - `home.md` (presentation, 7 slides — placeholder text for non-final slides)
  - `the-problem.md` (presentation, 8 slides)
  - `how-ai-helps.md` (presentation, 9 slides)
  - `in-practice.md` (standard)
  - `get-started.md` (standard)
- All frontmatter fields filled in. All slides separated with `---`. Image directives present (images are placeholders for now).
- `generateStaticParams` produces all five slugs.

**Exit check:** All five pages build and render. `npm run test` (unit) green. `tests/browser/wired-presentation-nav.spec.ts` — navigation links present on each page.

---

## Milestone 4 — Three custom visualizations

Ref: [06-visualizations.md](./06-visualizations.md)

- `IntegrationDiagram.tsx` + parser + Zod schema.
- `TimelineStat.tsx` + parser + Zod schema + `StatCounter` animation.
- `FlowChart.tsx` + parser + Zod schema.
- Wire all three into `MarkdownRenderer.tsx` component map.
- Add visualization fenced blocks to the appropriate content pages.

**Exit check:** `npm run test` (unit) green for all three parsers. `tests/browser/wired-visualizations.spec.ts` all pass. No visualization error cards visible on any page.

---

## Milestone 5 — Motion tuning + cinematic patterns

Ref: [03-motion-system.md](./03-motion-system.md)

- Apply `--dur-cinematic` to cold open and "the shift" slides via `.cinematic-reveal` className.
- Set `LayeredRevealGroup` stagger values on stat grids and feature columns per spec table.
- Configure `ParallaxBackground` on home and `/the-problem` heroes (intensity, image height).
- `TimelineStat` counter enters on scroll (verify in dev).

**Exit check:** `tests/browser/wired-reduced-motion.spec.ts` all pass. Manual check: cold open slide feels appropriately dramatic; stat numbers count up.

---

## Milestone 6 — Image assets + final content pass

Ref: [02-content-model.md](./02-content-model.md) (images section), [05-design-system.md](./05-design-system.md) (imagery guidelines)

- Source five atmospheric `.webp` images from Unsplash/Pexels:
  - `hero-network.webp` — glowing network map, dark
  - `server-room.webp` — atmospheric server room
  - `hands-keyboard.webp` — developer at night
  - `data-flow.webp` — abstract data flow, dark
  - `team-deploy.webp` — team at monitors
- Compress to ≤ 400KB each. Place in `public/images/wired/`.
- Replace placeholder text with final narrative copy per `02-content-model.md`.
- Final typography and spacing review: every slide should feel deliberate.

**Exit check:** `npm run build` green. No image 404s. `tests/browser/wired-homepage.spec.ts` golden path passes. Manual: scroll the full site top to bottom and verify narrative arc feels complete.

---

## Milestone 7 — CI + deploy + Lighthouse

Ref: [08-deployment.md](./08-deployment.md)

- Verify GitHub Actions workflow runs on push to `main`.
- Confirm live site loads at `https://<username>.github.io/wired-ai-integration/`.
- Run Lighthouse on live URL. Target: Performance ≥ 90, Accessibility ≥ 95.
- Fix any Lighthouse failures before submission.
- Add screenshot to `docs/assets/screenshot-home.png`.
- Complete `README.md` (all sections per `08-deployment.md` template).

**Exit check:** Green CI run. Live URL loads. Lighthouse scores ≥ target. README complete with live link visible.

---

## Out of scope for v1

- Dark mode toggle (the site is always dark — it's a design choice, not a missing feature).
- Search or full-text indexing.
- Comment system.
- Animations beyond what `framer-motion` provides natively.
- Any content beyond the five pages specified in `02-content-model.md`.
- Analytics (add later if desired).

---

## Assignment submission checklist

- [ ] Live GitHub Pages URL in README.
- [ ] Screenshot in README.
- [ ] All five pages navigable and readable.
- [ ] All visualizations render without error cards.
- [ ] Reduced motion: no transforms at rest.
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95.
- [ ] Reflection paragraph written in README.
- [ ] Spec index in README links to all nine spec files.
