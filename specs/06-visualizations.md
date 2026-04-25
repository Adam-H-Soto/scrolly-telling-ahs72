# 06 — Visualizations

## Inherited

The visualization system (fenced code block dispatch, `MarkdownRenderer` component map, the `source: string` prop contract, parse-or-error behavior) is inherited from the starter kit. `StatGrid`, `ScrollDemo`, `Timeline`, `ProgressBar`, `Mermaid`, and `CodeSample` are all available.

This file specifies the **three Wired-specific visualization components** that are new and must be built.

For the full dispatch wiring and component contract, see the starter kit's `06-visualizations.md`.

---

## New visualization components

### 1. `IntegrationDiagram`

**Tag:** `integration-diagram`

**Purpose:** Shows the before/after of an integration stack — a "traditional approach" fading out and an "AI-assisted approach" fading in. Used in `/how-ai-helps` slide 3.

**Source format (in markdown):**

````markdown
```integration-diagram
before:
  - Label: Order Management System
    role: source
  - Label: Custom ETL Script (340 lines)
    role: connector
    highlight: pain
  - Label: 3PL Logistics API
    role: target

after:
  - Label: Order Management System
    role: source
  - Label: AI-Generated Connector (18 lines config)
    role: connector
    highlight: win
  - Label: 3PL Logistics API
    role: target
```
````

**Parsed structure:**

```ts
interface DiagramNode {
  label: string;
  role: "source" | "connector" | "target";
  highlight?: "pain" | "win";
}

interface IntegrationDiagramData {
  before: DiagramNode[];
  after: DiagramNode[];
}
```

**Render behavior:**

- Two columns: "Before" and "After", each showing a vertical stack of nodes connected by arrows.
- The connector node (middle) in the "before" column is styled with `--accent-warm` (orange-red) and a subtle shake animation to communicate fragility.
- The connector node in the "after" column is styled with `--accent` (cyan) and a subtle glow (`--glow-cyan`).
- On scroll (when inside a `PresentationSlide`), the "before" column fades out at `scrollYProgress = 0.3–0.5` and the "after" column fades in at `0.5–0.7`. This is achieved using `useSlideContext()` and `useTransform`.
- In viewport mode (if used in a standard page), both columns display side by side statically with no transition.

**Parse failures:** Render a visible error card reading `"IntegrationDiagram: could not parse source. Expected before: and after: blocks."` — never silent.

**Accessibility:** The diagram has a `role="img"` wrapper with an `aria-label` that reads the full comparison in prose: `"Before: [nodes]. After: [nodes]."` Screen readers get the full content; sighted users get the animation.

**Dimensions:** Fixed height of `360px` on desktop, `auto` on mobile (stacks vertically). Explicit `aspect-ratio` on the column containers prevents layout jump.

---

### 2. `TimelineStat`

**Tag:** `timeline-stat`

**Purpose:** A large animated number + label + optional supporting note. Used when a single statistic deserves its own moment. Used in `/the-problem` slide 4 and `/how-ai-helps` slide 8.

**Source format:**

````markdown
```timeline-stat
value: 72
unit: "%"
label: of integration projects run over budget
note: Source: Gartner, 2023
```
````

**Parsed structure:**

```ts
interface TimelineStatData {
  value: number;
  unit?: string;       // e.g. "%", "B+", "x"
  label: string;
  note?: string;
}
```

**Render behavior:**

- `value` displayed in `--font-mono` at approximately `8rem` / `--text-h1` scale.
- `unit` displayed inline, slightly smaller, in `--accent` (cyan).
- `label` below in `--font-sans`, `--text-h3`, muted cream.
- `note` at the bottom in `--text-small`, `--text-muted`.
- Counter animation: from `0` to `value` over 1.2 seconds when the element enters the viewport (`useInView` in standard mode) or when `scrollYProgress` crosses 0.3 in slide mode.

**Reduced motion:** Display final `value` immediately. No counter animation.

**Accessibility:** The `<span>` containing the animated number must have `aria-live="off"` (the animation is decorative). The final value must be present in the DOM at all times in a visually-hidden element: `<span className="sr-only">{value}{unit}</span>` alongside the animated span.

**Dimensions:** Min-height `200px`. Full container width.

---

### 3. `FlowChart`

**Tag:** `flow-chart`

**Purpose:** A simplified, linearly-connected flow diagram. Used in `/in-practice` section 3 to show an AI-assisted integration pipeline step by step. Not a full graph — only supports linear sequences with optional branch labels.

**Source format:**

````markdown
```flow-chart
- step: Define intent in plain language
  actor: Developer
- step: Read source + target API docs
  actor: AI Agent
  note: "Automatic — no manual API parsing"
- step: Propose field mapping
  actor: AI Agent
- step: Review and correct
  actor: Developer
  note: "2 fields adjusted"
- step: Generate connector code
  actor: AI Agent
- step: Run tests
  actor: CI System
- step: Deploy
  actor: Developer
```
````

**Parsed structure:**

```ts
interface FlowStep {
  step: string;
  actor: string;
  note?: string;
}
type FlowChartData = FlowStep[];
```

**Render behavior:**

- Vertical sequence of nodes connected by downward arrows.
- Each node is a pill/card containing: actor label (small, uppercase, in `--accent` if "AI Agent", in `--text-muted` otherwise), step description, and optional note.
- Arrows are `--accent` cyan, 2px wide.
- On scroll into view (`useInView`), nodes enter one by one with a `Reveal` stagger (delay 0.15s per node).
- No slide-mode behavior required — `FlowChart` is only used in standard-layout pages.

**Dimensions:** Full container width, height determined by node count. Min 400px.

**Parse failures:** Visible error card.

**Accessibility:** Rendered as a `<ol>` list with appropriate ARIA labels. The visual connector arrows are `aria-hidden`. Screen readers navigate the list naturally.

---

## Wiring in `MarkdownRenderer`

Add the three new components to the `code` dispatcher in `MarkdownRenderer.tsx`:

```tsx
import { IntegrationDiagram } from "@/components/visualization/IntegrationDiagram";
import { TimelineStat }       from "@/components/visualization/TimelineStat";
import { FlowChart }          from "@/components/visualization/FlowChart";

// Inside the switch:
case "integration-diagram": return <IntegrationDiagram source={String(children)} />;
case "timeline-stat":       return <TimelineStat source={String(children)} />;
case "flow-chart":          return <FlowChart source={String(children)} />;
```

---

## Zod schemas for each parser

All three parsers must validate with Zod and throw a structured `VisualizationParseError` on failure. This is not optional — silent parse failures become invisible bugs in production content.

```ts
// IntegrationDiagram
const DiagramNodeSchema = z.object({
  label: z.string().min(1),
  role: z.enum(["source", "connector", "target"]),
  highlight: z.enum(["pain", "win"]).optional(),
});
const IntegrationDiagramSchema = z.object({
  before: z.array(DiagramNodeSchema).min(1),
  after:  z.array(DiagramNodeSchema).min(1),
});

// TimelineStat
const TimelineStatSchema = z.object({
  value: z.number(),
  unit:  z.string().optional(),
  label: z.string().min(1),
  note:  z.string().optional(),
});

// FlowChart
const FlowStepSchema = z.object({
  step:  z.string().min(1),
  actor: z.string().min(1),
  note:  z.string().optional(),
});
const FlowChartSchema = z.array(FlowStepSchema).min(1);
```

---

## What NOT to add

- No visualization that requires fetching data at runtime. All data is in the markdown source.
- No new visualization without a spec entry. Whitelist only.
- No D3 or heavy charting library. These three components are all achievable with framer-motion + CSS.
