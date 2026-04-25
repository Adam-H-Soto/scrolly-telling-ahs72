# 02 — Content Model

## Inherited

The full content pipeline (Zod schema, `ContentRepository`, `splitMarkdownIntoSlides`, dynamic routing) is inherited from the starter kit unchanged. This file documents only the **content** authored for Wired — the actual `.md` files, their frontmatter, and their narrative structure.

For the technical spec of the pipeline itself, see the starter kit's `02-content-model.md`.

---

## `content/home.md` — *The Wired World*

```yaml
---
title: "The Wired World"
layout: "presentation"
heroImage: "/images/wired/hero-network.webp"
summary: "Every modern business runs on software. But software doesn't talk to software — not without a fight. Discover why systems integration is the hidden cost of the digital age, and how AI is finally changing the equation."
seo:
  title: "Wired — The AI Integration Story"
  description: "A cinematic journey through the hidden complexity of modern software integration, and how AI is streamlining it."
  openGraphImage: "/images/wired/hero-network.webp"
order: 0
---
```

**Slide structure (7 slides):**

1. **COLD OPEN** — Full-bleed network image. Single line of text: *"Every app is an island."* No explanation. Just the image and the statement.
2. **THE SCALE** — Stat grid: average enterprise uses 900+ apps; 43% of IT budget is integration; $500B spent annually on integration projects worldwide.
3. **THE PAIN** — Split slide (image: server room). *"Getting systems to talk is slow, expensive, and breaks constantly."* Three bullet points: brittle APIs, custom glue code, endless maintenance.
4. **THE OLD WAY** — Plain slide. Timeline showing integration approaches from the 1980s (ETL batch jobs) → 1990s (EDI) → 2000s (ESBs) → 2010s (REST APIs / iPaaS) — each generation faster, but still fundamentally manual.
5. **THE SHIFT** — Full-bleed dark slide with cyan accent text. *"Then AI learned to read the docs."* Beat. *"And everything changed."*
6. **WHAT'S INSIDE** — Split slide (image: hands on keyboard). Navigation cards to the four inner pages.
7. **FOOTER GATE** — Standard footer with site links.

---

## `content/pages/the-problem.md` — *The Integration Problem*

```yaml
---
title: "The Integration Problem"
layout: "presentation"
heroImage: "/images/wired/server-room.webp"
summary: "Why does connecting two software systems still take months? A deep look at the real cost of integration — in time, money, and developer sanity."
seo:
  title: "The Integration Problem | Wired"
  description: "Why connecting software systems is still one of the hardest, most expensive problems in tech."
order: 1
---
```

**Slide structure (8 slides):**

1. **HOOK** — Full-bleed server room. *"You've built the app. Now make it talk to the other 12 apps."*
2. **THE GAP** — What integration actually means: data format mismatches, authentication protocols, rate limits, schema drift, error handling. Stat: average integration project takes 6–12 months.
3. **THE HUMAN COST** — Split slide (portrait-style). Developer quote (fictionalized): *"I've written the same ETL script six times. Different systems, same problem."* 40% of developer time goes to integration work.
4. **THE BUSINESS COST** — Stat grid: $500B global integration market; 70% of digital transformation projects delayed by integration; average enterprise maintains 800–1000 active integrations.
5. **WHY IT'S HARD** — Plain slide. Three root causes: (1) systems weren't designed to talk, (2) every system speaks a different dialect, (3) the landscape never stops changing.
6. **THE BRITTLENESS PROBLEM** — Split-reverse slide. *"When one system changes its API, everything downstream breaks."* Visualization: dependency graph where one node change cascades.
7. **WHAT WE TRIED** — Timeline of solutions: custom code → middleware → ESBs → iPaaS → low-code connectors. Each helped. None solved it.
8. **THE QUESTION** — Dark full-bleed. *"What if the connector could figure out what you meant — not just what you wrote?"* Link forward to `/how-ai-helps`.

---

## `content/pages/how-ai-helps.md` — *How AI Changes Everything*

```yaml
---
title: "How AI Changes Everything"
layout: "presentation"
heroImage: "/images/wired/data-flow.webp"
summary: "AI doesn't just automate integration — it understands intent. Here's how large language models and AI agents are reshaping the middleware layer."
seo:
  title: "How AI Changes Everything | Wired"
  description: "How large language models and AI agents are solving the integration problem that brittle APIs and manual connectors never could."
order: 2
---
```

**Slide structure (9 slides):**

1. **REFRAME** — *"Integration has always been a translation problem."* Full-bleed cyan-tinted data flow image.
2. **WHAT AI BRINGS** — Three-column LayeredRevealGroup: (1) Natural language mapping — describe the transformation, AI writes the code; (2) Schema inference — AI reads source and target and proposes the map; (3) Error recovery — AI diagnoses failures and suggests fixes in plain English.
3. **THE DEMO CONCEPT** — IntegrationDiagram: before (hand-written connector code, brittle, 400 lines) vs after (AI-generated connector, 20 lines of config + auto-adapted).
4. **HOW IT WORKS** — Plain slide. Step-by-step: (1) Describe intent in plain language; (2) AI reads both APIs; (3) AI generates mapping; (4) Human reviews and approves; (5) AI monitors and alerts on drift.
5. **THE MODELS BEHIND IT** — Split slide. Large language models (GPT-4, Claude, Gemini) trained on code + documentation understand API semantics, not just syntax. This is qualitatively different from regex-based mappers.
6. **REAL TOOLS TODAY** — Stat grid: examples of platforms using AI for integration (unnamed/generic — no specific brand endorsements unless instructor approves). Framing: this isn't theoretical; tools exist today.
7. **THE LIMITS** — Dark honest slide. *"AI-assisted integration is not magic."* Still requires human review. Hallucinations happen. Security must be validated. The human stays in the loop.
8. **THE NET EFFECT** — Before/after stat comparison: integration project time (12 months → 6 weeks in best-documented cases); developer hours on boilerplate (60% → 15%); time-to-first-connection (days → hours).
9. **TRANSITION** — *"Sounds good in theory. Here's what it looks like when a real team tries it."* Link to `/in-practice`.

---

## `content/pages/in-practice.md` — *AI Integration in Practice*

```yaml
---
title: "AI Integration in Practice"
layout: "standard"
heroImage: "/images/wired/team-deploy.webp"
summary: "A walk-through of what an AI-assisted integration workflow actually looks like — from problem statement to deployed connector."
seo:
  title: "AI Integration in Practice | Wired"
  description: "Step-by-step: what does an AI-assisted integration workflow look like in a real engineering team?"
order: 3
---
```

**Body sections (standard long-scroll layout):**

1. **The Scenario** — Fictional but realistic: a mid-size e-commerce company needs to sync their order management system with a new 3PL (third-party logistics) provider. Classic integration problem.
2. **Step 1: Define the Intent** — Developer writes a natural language description of what data needs to flow where and when. AI reads both API docs.
3. **Step 2: AI Proposes the Map** — FlowChart visualization showing the proposed field mappings. Developer reviews. Two fields are wrong; developer corrects in plain English.
4. **Step 3: Generate the Connector** — AI produces the connector code. CodeSample visualization showing the output (simplified, illustrative).
5. **Step 4: Test and Monitor** — AI writes test cases. Integration deploys. AI monitors for schema drift and alerts when the 3PL updates their API.
6. **What Changed** — StatGrid: time to first working integration (3 days vs 3 weeks), lines of hand-written code (18 vs 340), number of post-launch incidents in first month (1 vs 7).
7. **What Didn't Change** — The developer still had to understand the business logic. Still had to review the output. Still owned the deployment. AI handled the translation; the human handled the judgment.
8. **The Bigger Picture** — This scales. One developer. Ten integrations. Six weeks. Previously that was a team of four for six months.

---

## `content/pages/get-started.md` — *Where Do You Go From Here?*

```yaml
---
title: "Where Do You Go From Here?"
layout: "standard"
heroImage: "/images/wired/hands-keyboard.webp"
summary: "AI-assisted integration is here. Whether you're a developer, a decision-maker, or just curious — here's how to step into this shift."
seo:
  title: "Where Do You Go From Here? | Wired"
  description: "Practical next steps for developers, business leaders, and learners who want to understand and use AI-assisted integration."
order: 4
---
```

**Body sections (standard long-scroll layout):**

1. **You Just Learned Something Real** — Brief reflection on the arc of the site. The integration problem is old; the AI solution is new; the moment is now.
2. **If You're a Developer** — Three actions: (1) Try an AI coding assistant on your next integration ticket; (2) Read the docs on one of the major AI-native integration platforms; (3) Build a proof-of-concept — describe an integration in plain English and see what the AI produces.
3. **If You're a Decision-Maker** — Three questions to ask your engineering team; framing for how to evaluate AI-assisted integration tools; what a reasonable pilot project looks like.
4. **If You're a Student or Learner** — Suggested learning path: understand REST APIs → understand data transformation → understand LLMs → combine them; pointers to public resources (generic, not specific links that will break).
5. **The Invitation** — *"This isn't about replacing engineers. It's about multiplying what one engineer can do."* Cinematic closing paragraph. No CTA button — just a final thought designed to stay with the reader.
6. **About This Site** — Brief note: built with Next.js, scrollytelling technique, AI-assisted spec-driven development. Links to the GitHub repo.

---

## Authoring rules

- All slide separators use `---` (three dashes on their own line).
- Image directives follow the starter kit convention: `![bg]`, `![split]`, `![split-reverse]`.
- No inline HTML in content files.
- Fenced code blocks for visualizations use the tags defined in [06-visualizations.md](./06-visualizations.md).
- Every page's final slide or section must contain a link forward or to the homepage — no dead ends.
