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

## The Scenario

A mid-size e-commerce company has a problem. They've just signed with a new 3PL (third-party logistics) provider to handle fulfillment. The new provider has their own API. The company's order management system has its own API. Neither was designed to talk to the other.

In the old world, this is a 3-month project for two engineers. In the AI-assisted world, it takes one developer three days.

Here's how.

---

## Step 1: Define the Intent

The developer opens a chat with an AI coding assistant and writes a single paragraph:

> *"I need to sync orders from our OMS to FulfillPro's API whenever an order is marked 'ready to ship'. The OMS uses a REST endpoint that returns orders in our internal format. FulfillPro uses a different schema — their docs are at this URL. I need near-real-time sync, within 5 minutes of the status change."*

That's it. No YAML. No mapping tables. Just intent in plain English.

The AI reads both API documentation sets, identifies the relevant endpoints, and confirms its understanding before proceeding.

---

## Step 2: AI Proposes the Map

The AI presents a proposed field mapping. The developer reviews it. Most of it is correct — but two fields are wrong. The `orderDate` field is being mapped as UTC when FulfillPro expects local timezone, and the `lineItems` array structure is slightly off.

The developer corrects both in plain English: *"orderDate should use the customer's local timezone, not UTC"* and *"lineItems should be a flat list, not nested."*

The AI updates the mapping.

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

---

## Step 3: Generate the Connector

With the mapping confirmed, the AI generates the connector code. This is the part that used to take weeks.

```
// AI-generated connector (simplified for illustration)
// Real output: ~85 lines of TypeScript
// Equivalent handwritten code: ~340 lines

export async function syncOrderToFulfillPro(orderId: string) {
  const order = await oms.getOrder(orderId);
  const mapped = mapOrderToFulfillPro(order);
  await fulfillPro.createShipment(mapped);
}

// Field mapping generated from natural language description
function mapOrderToFulfillPro(order: OmsOrder): FulfillProShipment {
  return {
    reference: order.id,
    items: order.lineItems.map(flattenItem),
    shipTo: mapAddress(order.shippingAddress),
    requestedBy: toLocalTime(order.orderDate, order.customerTimezone),
  };
}
```

The developer reviews the output, asks two clarifying questions, and approves it.

---

## Step 4: Test and Monitor

The AI writes an initial test suite — happy path, edge cases (empty line items, international addresses, timezone edge cases), and error handling tests. The developer adds three more tests covering their specific business rules.

The connector deploys. The AI sets up a monitoring hook that alerts the developer if FulfillPro's API response schema changes. Three weeks later, FulfillPro releases a minor API update. The alert fires. The fix takes 20 minutes.

---

## What Changed

```stat-grid
- value: "3 days"
  label: "Time to first working integration (vs 3 weeks)"
- value: "18"
  label: "Lines of hand-written code (vs 340)"
- value: "1"
  label: "Post-launch incidents in first month (vs 7)"
```

---

## What Didn't Change

The developer still had to understand the business logic. The developer still had to review the output. The developer still owned the deployment and was responsible for what shipped.

AI handled the translation. The human handled the judgment.

That division of labor is the key insight. AI is extraordinarily good at the mechanical, repetitive parts of integration work — reading documentation, mapping fields, generating boilerplate. Humans are still essential for the parts that require context, business knowledge, and accountability.

---

## The Bigger Picture

One developer. Ten integrations. Six weeks. Previously that was a team of four for six months.

The math changes what's possible. Teams that were previously too small to maintain their integration layer can now keep up. Products that were previously too complex to connect can now be connected. The bottleneck moves — from "can we build it" to "what should we build."

<ContextualLink href="/get-started">Where do you go from here? →</ContextualLink>
