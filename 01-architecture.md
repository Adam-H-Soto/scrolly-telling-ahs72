# 01 — Architecture

## Inherited from starter kit

This project forks `scrollytelling_spec_driven`. The following are inherited **without modification** unless a spec section below explicitly says otherwise:

- Next.js App Router, `output: "export"`, `basePath` wiring
- TypeScript strict mode
- `framer-motion` for all animation
- `gray-matter` + `next-mdx-remote` + `remark-gfm` content pipeline
- `zod` frontmatter validation
- CSS Modules + CSS custom properties styling approach
- Vitest unit tests + Playwright E2E tests
- GitHub Actions deploy workflow

Refer to the starter kit's `01-architecture.md` for the full tech-stack table and data flow diagram. This file documents only the **additions and overrides** specific to Wired.

## Directory layout (additions only)

```
wired/
├── content/
│   ├── home.md                        # → /         (presentation)
│   └── pages/
│       ├── the-problem.md             # → /the-problem    (presentation)
│       ├── how-ai-helps.md            # → /how-ai-helps   (presentation)
│       ├── in-practice.md             # → /in-practice    (standard)
│       └── get-started.md             # → /get-started    (standard)
├── src/
│   ├── app/
│   │   └── globals.css                # OVERRIDE: Wired design tokens (see 05-design-system.md)
│   └── components/
│       ├── ui/
│       │   └── WiredLogo.tsx          # Site wordmark (SVG inline component)
│       └── visualization/
│           ├── IntegrationDiagram.tsx # Animated before/after diagram (see 06-visualizations.md)
│           ├── TimelineStat.tsx       # Stat card with animated counter
│           └── FlowChart.tsx          # Simplified Mermaid-style flow, custom styled
├── public/
│   └── images/
│       └── wired/                     # Site-specific image assets
│           ├── hero-network.webp      # Homepage full-bleed: glowing network map
│           ├── server-room.webp       # Dark server room, atmospheric
│           ├── hands-keyboard.webp    # Developer at work, night
│           ├── data-flow.webp         # Abstract data flow visualization
│           └── team-deploy.webp       # Team looking at dashboards
```

## Design token override

`src/app/globals.css` replaces the starter kit's warm cream palette with the Wired dark/cyan palette. All token names remain identical so motion components and layout modules need no changes. Only the values change.

See [05-design-system.md](./05-design-system.md) for the full token list.

## New components

### `WiredLogo.tsx`
- Renders the site wordmark in the `SiteHeader`.
- SVG inline, no external image dependency.
- Two variants: `light` (cream on transparent) and `dark` (navy on cream).

### `IntegrationDiagram.tsx`
- Used in `/how-ai-helps` to show the before/after of an integration stack.
- Animated: old stack fades out, AI-assisted stack fades in, driven by scroll progress.
- Accepts a `source` prop (pipe-delimited table in markdown) parsed into `before[]` and `after[]` arrays.
- See [06-visualizations.md](./06-visualizations.md) for the full spec.

### `TimelineStat.tsx`
- A large animated number + label. Example: "**72%** of integration projects run over budget."
- Counter animates from 0 to target value when it enters the viewport.
- Accessible: final value is in the DOM from the start; animation is progressive enhancement.

### `FlowChart.tsx`
- Simplified flow chart renderer. Not a full Mermaid replacement — only supports linear flows with labeled nodes and edges.
- Styled with Wired tokens (dark background, cyan connectors).
- Used in `/in-practice` to illustrate an AI-assisted integration pipeline.

## Path aliases

Inherited: `@/*` → `./src/*`. No changes.

## External dependencies (additions)

No new dependencies beyond those already in the starter kit. `IntegrationDiagram`, `TimelineStat`, and `FlowChart` are built with framer-motion + CSS Modules, no new libraries.

## What must NOT change

- The `PresentationSlide` / `SlideContext` / `Reveal` component API. Content relies on it.
- The `ContentRepository` interface. Parser and routing are shared.
- The GitHub Actions workflow structure. Only `NEXT_PUBLIC_BASE_PATH` value changes.
- `dynamicParams = false` in `[...slug]/page.tsx`. All slugs must be known at build time.
