# 00 — Overview

## Site name

**Wired — The AI Integration Story**

Tagline: *"The future of software isn't written. It's connected."*

## What we are building

**Wired** is a cinematic, scrollytelling website about the problem of systems integration in modern software — and how AI is fundamentally changing how that problem gets solved. It is simultaneously:

1. A **narrative experience** — sticky-slide sections walk the visitor through the history of integration pain, the emergence of AI-powered middleware, and what a streamlined future looks like.
2. A **visual argument** — bold, documentary-style imagery and animated data visualizations make the case without requiring a technical background.
3. A **call to inspiration** — every page ends with a moment designed to make the visitor feel that this shift is real, happening now, and worth paying attention to.

Target audience: a broad mix — developers who live this problem daily, business leaders who feel it as cost and delay, and students or curious outsiders who want to understand what AI is actually doing in the real world (beyond chatbots).

## Pages (5 total)

| Slug | Title | Layout |
|---|---|---|
| `/` | Home — *The Wired World* | `presentation` |
| `/the-problem` | The Integration Problem | `presentation` |
| `/how-ai-helps` | How AI Changes Everything | `presentation` |
| `/in-practice` | AI Integration in Practice | `standard` |
| `/get-started` | Where Do You Go From Here? | `standard` |

## Non-goals

- Not a product or SaaS landing page. No pricing, no sign-up wall.
- Not a technical tutorial. Code examples are illustrative, not instructional.
- Not server-rendered. Output is static HTML for GitHub Pages.
- Not a design framework. Styling is CSS Modules + custom properties, narrow and intentional.

## Guiding principles

1. **Story first.** Every layout decision serves the narrative arc: problem → insight → possibility → action.
2. **Cinematic over cute.** Full-bleed imagery, high contrast, dramatic typography. Think *documentary film*, not *tech startup*.
3. **Content is Markdown.** Authors write `.md` files with YAML frontmatter. No JSX in content.
4. **One primitive, two modes.** Motion components run in viewport mode (standard pages) or slide mode (presentation pages), chosen automatically via React context.
5. **Accessibility is baseline.** `prefers-reduced-motion` is honored everywhere; keyboard navigation works throughout.
6. **Static export only.** Output goes to `out/` and ships to GitHub Pages.

## Aesthetic direction

- **Palette:** Deep navy (`#0a0f1e`) background, electric cyan (`#00d4ff`) accent, warm cream (`#f5f0e8`) text. Feels like a late-night operations center.
- **Typography:** A heavy display serif for headlines (Playfair Display or similar), a clean mono for data/stats, a readable sans for body copy.
- **Motion:** Slow, weighty reveals. Nothing bouncy. Think a Ken Burns effect on stills, not a SaaS product demo.
- **Images:** Dark, atmospheric. Circuit boards, server rooms, glowing network maps, hands on keyboards at night.

## Narrative arc (the spine of the site)

```
Act 1 — The Problem  (Home + /the-problem)
  "Software today is a city of islands. Getting them to talk costs billions."

Act 2 — The Shift   (/how-ai-helps)
  "AI doesn't just automate the connection. It understands the intent behind it."

Act 3 — The Reality  (/in-practice)
  "Here's what it actually looks like when a team uses AI-assisted integration."

Act 4 — The Invitation  (/get-started)
  "This is happening now. Here's how you step into it."
```

## Success criteria

- `npm run build` produces a static `out/` with zero runtime errors.
- A new author can add a page by dropping a single `.md` file under `content/pages/` and see it live after push.
- Scroll animations run at 60fps on a mid-range laptop; drop silently to static under reduced-motion.
- A Playwright test confirms presentation-mode slides advance via scroll.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on homepage.
- Every page ends with a moment a visitor would want to share or screenshot.

## Relationship to the reference project

This project is built on top of the `scrollytelling_spec_driven` starter kit. All motion primitives, the content pipeline, the two layout modes, and the deployment workflow are inherited directly. This spec addresses only what is **new or different**: the content, the design tokens, and the cinematic aesthetic layer on top of the kit's architecture.
