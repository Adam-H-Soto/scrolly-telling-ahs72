# 03 — Motion System

## Inherited

The full motion system — `SlideContext`, `PresentationSlide`, `Reveal`, `LayeredRevealGroup`, `DriftMedia`, `SceneCard`, `ParallaxBackground`, `PresentationProgress` — is inherited from the starter kit **without modification**.

This file documents only the **Wired-specific motion behavior** layered on top: timing values, easing curves, and two presentation-specific motion patterns unique to this site's cinematic aesthetic.

For the full component API and dual-mode (viewport vs slide) explanation, see the starter kit's `03-motion-system.md`.

---

## Wired motion philosophy

The site should feel like a **documentary film**, not a product demo. This means:

- **Slow is intentional.** Reveals take longer than typical UI (700ms–1000ms, not 300ms).
- **Weight before speed.** Elements appear to have mass — they don't zip in, they settle.
- **One thing at a time.** Avoid simultaneous animations. Stagger aggressively.
- **Stillness is part of the design.** Full-bleed slides should hold for a beat before content appears.

These preferences are implemented by passing non-default `delay` and `duration` values into the existing `Reveal` and `LayeredRevealGroup` components — no new primitives required for most cases.

---

## Motion token overrides

In `globals.css`, override the starter kit's motion tokens:

```css
:root {
  --ease-brand:  cubic-bezier(0.16, 1, 0.3, 1);   /* slower settle than default */
  --dur-quick:   240ms;    /* was 180ms */
  --dur-base:    500ms;    /* was 380ms */
  --dur-slow:    900ms;    /* was 700ms */
  --dur-cinematic: 1200ms; /* new: for full-bleed hero reveals */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-quick:      0ms;
    --dur-base:       0ms;
    --dur-slow:       0ms;
    --dur-cinematic:  0ms;
  }
}
```

`--dur-cinematic` is used only by the two Wired-specific patterns below. It is not part of the starter kit's token set.

---

## Wired-specific pattern 1: `ColdOpenReveal`

Used on the homepage slide 1 (the cold open) and the "THE SHIFT" slide.

**Behavior:** Text fades in from opacity 0 to 1 with a very long duration and no translate — just a pure opacity fade that feels like something emerging from darkness. No movement. Just light.

**Implementation:** This is `<Reveal direction="none" delay={0.4}>` with the `--dur-cinematic` duration applied via a className. No new component needed.

```tsx
// In the presentation slide markdown, the author uses:
<Reveal direction="none" className="cinematic-reveal">
  Every app is an island.
</Reveal>

// globals.css:
.cinematic-reveal { --dur-slow: var(--dur-cinematic); }
```

**Reduced motion:** Falls through to instant display (opacity 1, no transition). The text must be readable at rest regardless.

---

## Wired-specific pattern 2: `StatCounter` entrance

Used in stat-heavy slides (home slide 2, `/the-problem` slide 4, `/how-ai-helps` slide 8).

**Behavior:** Numbers count up from 0 to their target value when the slide becomes active. The count is driven by `scrollYProgress` in slide mode, and by `useInView` in viewport mode (for the standard-layout stat grids).

**Implementation:** Lives inside `TimelineStat.tsx` (see [06-visualizations.md](./06-visualizations.md)). Uses `useTransform` to map `scrollYProgress` (0.3 → 0.8) to the numeric range (0 → target). Rendered as a `<motion.span>` with a custom `useMotionTemplate` or a `useEffect`-driven counter.

```tsx
// Slide mode
const count = useTransform(scrollYProgress, [0.3, 0.8], [0, target]);

// Viewport mode (standard layout)
const [displayed, setDisplayed] = useState(0);
const inView = useInView(ref, { once: true });
useEffect(() => {
  if (!inView) return;
  // simple requestAnimationFrame counter from 0 → target over 1.2s
}, [inView, target]);
```

**Reduced motion:** Skip the counter; render the final value immediately.

---

## Stagger timing for `LayeredRevealGroup`

The default stagger (0.08s) is too fast for Wired's cinematic pacing. Preferred values:

| Context | `stagger` prop | Notes |
|---|---|---|
| Headline + subhead | 0.15 | Let each line land |
| Three-column feature grid | 0.20 | Columns feel independent |
| Bullet list | 0.10 | Tight but readable |
| Stat grid numbers | 0.25 | Maximum drama |

These are **content-layer decisions** — set in the markdown via the component map, not hardcoded in the component.

---

## `ParallaxBackground` usage

Used on the homepage hero and the `/the-problem` hero. Settings:

- `intensity="medium"` — enough to feel cinematic without causing motion sickness.
- Image must be 20% taller than its container to allow the drift range. For a `100vh` stage, image should be `120vh` or taller.
- Never use `intensity="soft"` on presentation slides — the sticky stage already creates depth; two competing parallax effects fight each other.

---

## Accessibility contract (inherited + additions)

All inherited rules apply. Wired additions:

- `--dur-cinematic` must resolve to `0ms` under `prefers-reduced-motion: reduce` (covered by the token override above).
- `StatCounter` must render the final value in the DOM from initial render so screen readers announce it correctly. The animation is a visual layer on top of a static number, not a replacement for it.
- The cold open text on slide 1 must not rely on the animation to be legible — contrast ratio ≥ 4.5:1 at `opacity: 1` rest state.
