# 04 — Layouts

## Inherited

Both layout modes (`standard` and `presentation`) are inherited from the starter kit. `PageLayoutFactory`, `StandardLayout`, `PresentationLayout`, `PresentationSlide`, `PresentationProgress`, `PresentationShortcuts`, and `PresentationFooterGate` are all used as-is.

This file documents only the **Wired-specific layout customizations**: the header/footer design, the cinematic slide shell, and per-page layout notes.

For the full layout architecture, component responsibilities, keyboard controls, and responsive behavior spec, see the starter kit's `04-layouts.md`.

---

## `SiteHeader` — Wired variant

The inherited `SiteHeader` shell is used, but the visual design changes:

- **Logo:** `WiredLogo` component (see `01-architecture.md`) — wordmark "WIRED" in a heavy serif, with a thin cyan underline.
- **Background:** Transparent on load. On scroll (> 50px), transitions to `rgba(10, 15, 30, 0.85)` with `backdrop-filter: blur(12px)`. This keeps the hero full-bleed on initial load.
- **Nav links:** Right-aligned. "The Problem", "How AI Helps", "In Practice", "Get Started". No dropdown, no hamburger menu on mobile — links collapse to a single `≡` icon that toggles a full-screen overlay nav.
- **Color:** Cream (`--text-cream`) text on dark background. Active link gets cyan underline.

CSS module: `SiteHeader.module.css`. Uses CSS custom property `--header-bg` toggled by a scroll listener (`useEffect` + `window.scrollY`).

```tsx
// Header background transition
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}, []);
```

**Reduced motion:** Omit the transition on `--header-bg`; apply the scrolled style instantly.

---

## `SiteFooter` — Wired variant

Three-column layout (inherited structure, custom content):

| Column | Content |
|---|---|
| Left | "WIRED" wordmark + tagline: *"The future of software isn't written. It's connected."* |
| Center | Page links (same as nav) |
| Right | "Built with Next.js + scrollytelling. Source on GitHub." + repo link |

Background: `--navy-deep` (`#0a0f1e`). Text: `--text-muted-cream`. Accent links: `--accent-cyan`.

---

## Presentation layout — cinematic slide shell

For `presentation` pages, the `PresentationLayout` renders each `PresentationSlide` inside a dark shell. The only visual difference from the starter kit is the **slide background default**:

- Starter kit default: `--page-background` (warm cream).
- Wired default: `--navy-deep` (#0a0f1e).

This is achieved by overriding `--page-background` in the Wired design tokens (see `05-design-system.md`). No layout component changes needed.

**`PresentationProgress` bar color:** `--accent-cyan` instead of the starter kit's `--accent`.

---

## Per-page layout notes

### `/` — Home (`presentation`, 7 slides)

- Slide 1 (cold open): `![bg]` directive, `hasBackground={true}`, 200vh height. Text centered, max-width 40ch.
- Slide 2 (stats): `plain` kind, dark background, `StatGrid` visualization.
- Slide 3 (pain): `![split]` directive, server room image right, prose left.
- Slide 4 (old way): `plain` kind, `Timeline` visualization.
- Slide 5 (the shift): `![bg]` directive, `hasBackground={true}`. Minimal text, maximum impact.
- Slide 6 (what's inside): `![split-reverse]` directive, hands-on-keyboard image left, nav cards right.
- Slide 7: `PresentationFooterGate` with `SiteFooter`.

### `/the-problem` (`presentation`, 8 slides)

- Slides 1, 3, 6, 8: full-bleed or split backgrounds.
- Slide 2, 4, 5, 7: plain dark slides with text + visualizations.
- Final slide contains a `ContextualLink` to `/how-ai-helps`.

### `/how-ai-helps` (`presentation`, 9 slides)

- Slides 1, 5, 7: full-bleed backgrounds.
- Slide 3: `IntegrationDiagram` visualization (before/after animated diagram).
- Slide 8: `StatGrid` with animated counters.
- Final slide contains a `ContextualLink` to `/in-practice`.

### `/in-practice` (`standard`)

- Hero image: `team-deploy.webp`.
- Sticky table of contents on wide viewports: sections 1–8 listed.
- `FlowChart` visualization in section 3.
- `CodeSample` in section 4.
- `StatGrid` in section 6.
- Footer contains `ContextualLink` to `/get-started`.

### `/get-started` (`standard`)

- Hero image: `hands-keyboard.webp`.
- No visualizations — this page is pure editorial prose.
- Three `SceneCard` components for the three audience sections (developer / decision-maker / learner), entering on scroll.
- Final section: plain text, no CTA button. Ends on a single sentence.

---

## Mobile behavior

Inherited from starter kit: below 768px, presentation slides lose `position: sticky` and become a normal vertical scroll. On Wired, this is especially important because the cinematic full-bleed slides must still be readable at 375px.

Additional mobile rule: on the cold open slide (home slide 1), the headline font size scales down more aggressively — `clamp(2rem, 8vw, 5rem)` rather than the standard slide display scale — so the single line never wraps to two lines on any screen width.

---

## Do not

- Do not add a sidebar to `PresentationLayout`. The sticky stage is the focus; a sidebar fights it.
- Do not modify `PresentationSlide`'s `height` prop defaults. The 170vh/200vh values are tuned for the motion system.
- Do not render `SiteHeader` inside `PresentationLayout` — the progress bar is the only persistent chrome on presentation pages.
- Do not add any layout that requires a third layout type. All five pages fit `standard` or `presentation`.
