# 05 — Design System

## Inherited foundation

CSS Modules + CSS custom properties approach is inherited from the starter kit. The token architecture (naming conventions, fluid type scales, spacing baseline, motion tokens, z-index scale) is identical. Only the **values** change to implement the Wired dark/cinematic palette.

This file is a complete drop-in replacement for the starter kit's `globals.css` token block.

---

## Color palette — "Operations Center"

Inspired by a late-night command center: deep navy environment, electric cyan accents, warm cream text that reads like a monitor against darkness.

| Token | Value | Usage |
|---|---|---|
| `--page-background` | `#0a0f1e` | Page and slide backgrounds |
| `--surface` | `#111827` | Card and panel surfaces |
| `--surface-ink` | `#f0ebe0` | Text on dark surfaces |
| `--text` | `#f0ebe0` | Body text (cream, not white — easier on the eyes) |
| `--text-muted` | `#8b9cba` | Secondary text, captions, labels |
| `--accent` | `#00d4ff` | Primary accent: cyan |
| `--accent-strong` | `#00a8cc` | Accent hover / pressed state |
| `--accent-warm` | `#ff6b35` | Secondary accent: orange-red for warnings / contrast moments |
| `--rule` | `rgba(0, 212, 255, 0.15)` | Dividers — subtle cyan |
| `--navy-deep` | `#0a0f1e` | Alias for `--page-background`, used by layout components explicitly |

```css
:root {
  --page-background: #0a0f1e;
  --surface:         #111827;
  --surface-ink:     #f0ebe0;
  --text:            #f0ebe0;
  --text-muted:      #8b9cba;
  --accent:          #00d4ff;
  --accent-strong:   #00a8cc;
  --accent-warm:     #ff6b35;
  --rule:            rgba(0, 212, 255, 0.15);
  --navy-deep:       #0a0f1e;
}
```

### Cyan alpha ramp (for glass UI on dark)

```css
:root {
  --cyan-08:  rgba(0, 212, 255, 0.08);
  --cyan-16:  rgba(0, 212, 255, 0.16);
  --cyan-32:  rgba(0, 212, 255, 0.32);
  --cyan-64:  rgba(0, 212, 255, 0.64);
  --cyan-96:  rgba(0, 212, 255, 0.96);
}
```

### Cream alpha ramp (for overlays on dark backgrounds)

```css
:root {
  --cream-08: rgba(240, 235, 224, 0.08);
  --cream-16: rgba(240, 235, 224, 0.16);
  --cream-48: rgba(240, 235, 224, 0.48);
  --cream-72: rgba(240, 235, 224, 0.72);
  --cream-96: rgba(240, 235, 224, 0.96);
}
```

---

## Typography

### Fonts

- **Display / headlines:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — heavy serif with ink-trap personality. Cinematic and authoritative.
- **Body / UI:** [Inter](https://fonts.google.com/specimen/Inter) — clean, readable, familiar. Doesn't compete with the headline font.
- **Mono / data / stats:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — used for numbers in stats and code samples.

```tsx
// src/app/layout.tsx
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

```css
/* globals.css */
body          { font-family: var(--font-sans),    system-ui, sans-serif; }
h1, h2, h3    { font-family: var(--font-display), Georgia, serif; }
code, .stat   { font-family: var(--font-mono),    "Courier New", monospace; }
```

### Type scale (fluid, golden ratio)

```css
:root {
  --phi: 1.618;
  --fluid-min-px: 16;
  --fluid-max-px: 20;
  --fluid-scaler: calc(
    var(--fluid-min-px) * 1px
    + (var(--fluid-max-px) - var(--fluid-min-px)) * ((100vw - 360px) / (1280 - 360))
  );
  --text-base:  clamp(16px, var(--fluid-scaler), 20px);
  --text-h4:    calc(var(--text-base)  * 1.2);
  --text-h3:    calc(var(--text-base)  * var(--phi));
  --text-h2:    calc(var(--text-h3)    * var(--phi));
  --text-h1:    calc(var(--text-h2)    * var(--phi));
  --text-small: calc(var(--text-base)  / var(--phi));

  /* Presentation slides — larger, more dramatic */
  --slide-display:  clamp(2.8rem, 5vw, 5.5rem);   /* bigger than starter kit */
  --slide-eyebrow:  clamp(0.75rem, 1vw, 0.9rem);  /* smaller, uppercase */
  --slide-body:     clamp(1.1rem, 1.4vw, 1.35rem);
  --slide-line:     1.4;
  --slide-measure:  55ch;
}
```

### Weight decay

```css
:root {
  --wght-base: 400;
  --wght-h4:   500;
  --wght-h3:   600;
  --wght-h2:   700;
  --wght-h1:   900;   /* Maximum weight for Playfair Display — full impact */
}
```

---

## Spacing

Inherited 24px baseline, identical token names:

```css
:root {
  --baseline:    24px;
  --space-0_5x:  calc(var(--baseline) * 0.5);   /* 12px */
  --space-1x:    var(--baseline);               /* 24px */
  --space-2x:    calc(var(--baseline) * 2);     /* 48px */
  --space-3x:    calc(var(--baseline) * 3);     /* 72px */
  --space-4x:    calc(var(--baseline) * 4);     /* 96px */
  --space-5x:    calc(var(--baseline) * 5);     /* 120px */
  --space-8x:    calc(var(--baseline) * 8);     /* 192px — new, for cinematic section padding */
}
```

---

## Motion tokens (Wired overrides)

```css
:root {
  --ease-brand:      cubic-bezier(0.16, 1, 0.3, 1);
  --dur-quick:       240ms;
  --dur-base:        500ms;
  --dur-slow:        900ms;
  --dur-cinematic:   1200ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-quick:     0ms;
    --dur-base:      0ms;
    --dur-slow:      0ms;
    --dur-cinematic: 0ms;
  }
}
```

---

## Shadows

```css
:root {
  --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 16px 60px rgba(0, 0, 0, 0.75);
  --glow-cyan: 0 0 24px rgba(0, 212, 255, 0.35);   /* new: for accent elements */
}
```

---

## Z-index scale (inherited, unchanged)

```css
:root {
  --z-base:    0;
  --z-sticky:  10;
  --z-overlay: 50;
  --z-modal:   100;
}
```

---

## Component design rules

### Wired-specific additions to `src/components/ui/`

All starter kit UI primitives (`Heading`, `Text`, `ContextualLink`, `CallToActionGroup`) are used unchanged. Wired adds:

**`Eyebrow`** — a small uppercase label that appears above section headlines in presentation slides. Example: "THE PROBLEM" above "Software Is a City of Islands."

```tsx
// Usage in markdown (via MDX component map)
// Rendered by a custom remark plugin or manually as a special blockquote syntax
// Spec: if a paragraph begins with `> eyebrow:`, render as <Eyebrow>
```

```css
/* Eyebrow.module.css */
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--slide-eyebrow);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-0_5x);
}
```

**`CyanRule`** — a 1px horizontal rule in `--accent` color, used as a section divider in standard pages.

```css
.cyanRule {
  border: none;
  border-top: 1px solid var(--accent);
  opacity: 0.4;
  margin: var(--space-3x) 0;
}
```

---

## Imagery guidelines

- **Format:** `.webp`, max 1600px wide, max 400KB.
- **Aspect ratios:** Full-bleed hero: 21:9 or 16:9. Split slides: 3:4 (portrait orientation works better in split layout). Standard hero: 16:9.
- **Tone:** Dark, atmospheric, high contrast. Images should feel like stills from a technology documentary — no stock photo cheerfulness.
- **Sourcing:** Use royalty-free sources (Unsplash, Pexels) filtered for dark/tech/infrastructure imagery. Preferred queries: "server room dark", "network cables blue light", "developer night coding", "data center infrastructure".
- All images must have explicit `width` and `height` attributes to prevent layout shift.

---

## Accessibility

- Minimum contrast: `--text` (#f0ebe0) on `--page-background` (#0a0f1e) = 13.5:1 ✓
- `--text-muted` (#8b9cba) on `--page-background` = 5.2:1 ✓ (meets AA for body text)
- `--accent` (#00d4ff) on `--page-background` = 8.1:1 ✓
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 3px;` — cyan on dark is highly visible.
- Touch targets: minimum 44×44px, inherited from starter kit.
- Never remove `outline` without replacement. The cyan focus ring is a design feature, not an afterthought.
