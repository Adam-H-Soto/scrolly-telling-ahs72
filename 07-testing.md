# 07 — Testing

## Inherited

The full testing strategy (Vitest for unit/integration, Playwright for E2E, the four-axis matrix, the operational rules) is inherited from the starter kit. All existing tests pass unchanged.

This file specifies the **additional tests required for Wired-specific code**: the three new visualization components, the design token overrides, the custom header scroll behavior, and the cinematic motion tokens.

For the full test architecture, runner configuration, fixture layout, and coverage targets, see the starter kit's `07-testing.md`.

---

## New unit tests (Vitest)

### `tests/unit/integration-diagram.test.ts`

Tests the `IntegrationDiagram` source parser.

| Test | Axis | Assertion |
|---|---|---|
| Valid before/after source parses correctly | Positive | `parseDiagramSource(validSource)` returns `{ before: [...], after: [...] }` |
| Missing `after:` block throws `VisualizationParseError` | Negative | Error message contains "Expected before: and after: blocks" |
| Empty `before` array throws | Negative | Zod validation surfaces a readable message |
| Node with `highlight: "pain"` parses correctly | Edge | `.highlight` field present on connector node |
| Node without `highlight` parses as `undefined` | Edge | `.highlight` is `undefined`, not `null` or `""` |
| YAML with extra unknown fields strips cleanly (Zod `.strip()`) | Edge | No error thrown; extra fields silently ignored |

### `tests/unit/timeline-stat.test.ts`

Tests the `TimelineStat` source parser.

| Test | Axis | Assertion |
|---|---|---|
| Valid stat source with all fields parses | Positive | Returns `{ value: 72, unit: "%", label: "...", note: "..." }` |
| Valid source without `unit` and `note` parses | Positive | Optional fields absent, not defaulted to empty string |
| Non-numeric `value` throws | Negative | Zod error on `value` field |
| Missing `label` throws | Negative | Zod error on `label` field |
| `value: 0` parses (zero is valid) | Edge | No error; `value` is `0` |
| `value: -1` parses (negative valid for some stats) | Edge | No error |

### `tests/unit/flow-chart.test.ts`

Tests the `FlowChart` source parser.

| Test | Axis | Assertion |
|---|---|---|
| Valid 7-step flow parses to array of 7 `FlowStep` objects | Positive | Array length 7, all fields present |
| Single-step flow is valid | Edge | Array length 1 |
| Empty array (no steps) throws | Negative | Zod min(1) fires |
| Step without `actor` throws | Negative | Zod error on `actor` field |
| Step with `note` present parsed correctly | Positive | `.note` field populated |
| YAML step with only `step` and `actor` (no note) | Positive | `.note` is `undefined` |

### `tests/unit/wired-tokens.test.ts`

Verifies that the design token override does not break inherited component expectations.

| Test | Axis | Assertion |
|---|---|---|
| `--page-background` token is a valid CSS hex color | Positive | Matches `/^#[0-9a-f]{6}$/i` |
| `--accent` token contrast against `--page-background` ≥ 4.5:1 | Positive | Computed via WCAG contrast formula |
| `--text` contrast against `--page-background` ≥ 7:1 | Positive | AA Large + AAA body text |
| `--text-muted` contrast against `--page-background` ≥ 4.5:1 | Positive | Meets AA |
| Motion token `--dur-cinematic` is present and numeric | Positive | Parsed value is a valid millisecond integer |

> Note: contrast ratios are computed by a small helper function, not a library, to keep test dependencies minimal.

---

## New E2E tests (Playwright)

### `tests/browser/wired-homepage.spec.ts`

Golden path: a visitor experiences the homepage narrative.

```ts
test("homepage cold open slide is visible on load", async ({ page }) => {
  await page.goto("/");
  const slide1 = page.locator("[data-slide-index='0']");
  await expect(slide1).toBeVisible();
  await expect(slide1).toContainText("Every app is an island");
});

test("scrolling past slide 2 shows stat grid", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await page.waitForTimeout(500);
  const statGrid = page.locator(".stat-grid");
  await expect(statGrid).toBeVisible();
});

test("slide 5 'the shift' contains accent text", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 9));
  await page.waitForTimeout(300);
  await expect(page.locator("[data-slide-index='4']")).toContainText("Then AI learned");
});
```

### `tests/browser/wired-presentation-nav.spec.ts`

Navigation between presentation pages.

| Assertion | Method |
|---|---|
| `/the-problem` final slide contains a link to `/how-ai-helps` | `page.locator("a[href*='how-ai-helps']")` is visible |
| `/how-ai-helps` final slide contains a link to `/in-practice` | Same pattern |
| `/in-practice` footer contains a link to `/get-started` | Same pattern |
| `/get-started` body does not contain a dead-end (links back to home) | `page.locator("a[href='/']")` is visible somewhere on the page |

### `tests/browser/wired-visualizations.spec.ts`

Spot-checks that visualization components render without errors.

| Assertion | Page | Selector |
|---|---|---|
| `IntegrationDiagram` renders "Before" and "After" labels | `/how-ai-helps` | `.integration-diagram__before`, `.integration-diagram__after` |
| `TimelineStat` renders a numeric value | `/the-problem` | `.timeline-stat__value` |
| `FlowChart` renders at least 5 step nodes | `/in-practice` | `.flow-chart__step` (count ≥ 5) |
| No visualization renders an error card on valid content | all pages | `[data-viz-error]` count === 0 |

### `tests/browser/wired-reduced-motion.spec.ts`

Extends the starter kit's `reduced-motion.spec.ts` for Wired-specific components.

```ts
test.use({ reducedMotion: "reduce" });

test("TimelineStat displays final value immediately without animation", async ({ page }) => {
  await page.goto("/the-problem");
  const statValue = page.locator(".timeline-stat__value").first();
  // Value should be present in DOM from the start, not 0
  const text = await statValue.textContent();
  expect(Number(text)).toBeGreaterThan(0);
});

test("IntegrationDiagram shows both columns statically under reduced motion", async ({ page }) => {
  await page.goto("/how-ai-helps");
  const before = page.locator(".integration-diagram__before");
  const after  = page.locator(".integration-diagram__after");
  await expect(before).toBeVisible();
  await expect(after).toBeVisible();
});
```

### `tests/browser/wired-header.spec.ts`

Header scroll behavior.

| Assertion | Method |
|---|---|
| Header is transparent (no background) on page load | `getComputedStyle` on header, check `background-color` is `rgba(0, 0, 0, 0)` or transparent |
| Header gains background after scrolling 60px | `page.evaluate(() => window.scrollTo(0, 60))`, then assert header `background-color` is not transparent |
| Header nav links are all visible at 1280px viewport | All 4 nav links have `visibility: visible` |

---

## Coverage targets

- Unit: ≥ 90% statement coverage on `src/lib/**` and the three new visualization parsers in `src/components/visualization/**`.
- E2E: one golden-path spec per page (5 total); all visualization render specs; reduced-motion spec; header scroll spec.

---

## Test data / fixtures

Add to `tests/__mocks__/`:

```
tests/__mocks__/
├── content/
│   ├── home.md             (minimal valid presentation, 2 slides)
│   ├── pages/
│   │   └── the-problem.md  (minimal valid presentation, 2 slides)
├── visualizations/
│   ├── integration-diagram.valid.txt
│   ├── integration-diagram.missing-after.txt
│   ├── timeline-stat.valid.txt
│   ├── timeline-stat.invalid-value.txt
│   ├── flow-chart.valid.txt
│   └── flow-chart.empty.txt
```

Each `.txt` file contains only the fenced-code-block body (no backticks), as it would be passed to the parser's `source` prop.
