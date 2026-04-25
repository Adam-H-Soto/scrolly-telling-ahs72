import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { parseIntegrationDiagram } from "@/lib/parseIntegrationDiagram";
import { VisualizationParseError } from "@/lib/errors";

const fixture = (name: string) =>
  readFileSync(
    join(__dirname, "../__mocks__/visualizations", name),
    "utf-8"
  );

describe("parseIntegrationDiagram", () => {
  it("parses a valid before/after source correctly", () => {
    const result = parseIntegrationDiagram(fixture("integration-diagram.valid.txt"));
    expect(result.before).toHaveLength(3);
    expect(result.after).toHaveLength(3);
    expect(result.before[0].label).toBe("Order Management System");
    expect(result.after[1].label).toBe("AI-Generated Connector (18 lines config)");
  });

  it("throws VisualizationParseError when after: block is missing", () => {
    expect(() =>
      parseIntegrationDiagram(fixture("integration-diagram.missing-after.txt"))
    ).toThrow(VisualizationParseError);
  });

  it("throws when after: block is missing with correct message", () => {
    expect(() =>
      parseIntegrationDiagram(fixture("integration-diagram.missing-after.txt"))
    ).toThrow("Expected before: and after: blocks");
  });

  it("throws when before array is empty", () => {
    const source = "before: []\nafter:\n  - label: Target\n    role: target";
    expect(() => parseIntegrationDiagram(source)).toThrow(VisualizationParseError);
  });

  it("parses highlight: pain correctly", () => {
    const result = parseIntegrationDiagram(fixture("integration-diagram.valid.txt"));
    const connector = result.before.find((n) => n.role === "connector");
    expect(connector?.highlight).toBe("pain");
  });

  it("parses node without highlight as undefined", () => {
    const result = parseIntegrationDiagram(fixture("integration-diagram.valid.txt"));
    const source = result.before.find((n) => n.role === "source");
    expect(source?.highlight).toBeUndefined();
  });

  it("strips unknown fields (Zod .strip() behavior)", () => {
    const source = `
before:
  - label: Source
    role: source
    unknownField: should-be-stripped
after:
  - label: Target
    role: target
`;
    const result = parseIntegrationDiagram(source);
    expect((result.before[0] as Record<string, unknown>).unknownField).toBeUndefined();
  });
});
