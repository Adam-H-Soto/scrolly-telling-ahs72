import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { parseFlowChart } from "@/lib/parseFlowChart";
import { VisualizationParseError } from "@/lib/errors";

const fixture = (name: string) =>
  readFileSync(
    join(__dirname, "../__mocks__/visualizations", name),
    "utf-8"
  );

describe("parseFlowChart", () => {
  it("parses a valid 7-step flow into an array of 7 FlowStep objects", () => {
    const result = parseFlowChart(fixture("flow-chart.valid.txt"));
    expect(result).toHaveLength(7);
    expect(result[0].step).toBe("Define intent in plain language");
    expect(result[0].actor).toBe("Developer");
  });

  it("parses a single-step flow as valid", () => {
    const source = "- step: Deploy\n  actor: Developer";
    const result = parseFlowChart(source);
    expect(result).toHaveLength(1);
  });

  it("throws VisualizationParseError for empty array", () => {
    expect(() => parseFlowChart(fixture("flow-chart.empty.txt"))).toThrow(
      VisualizationParseError
    );
  });

  it("throws when step is missing actor", () => {
    const source = "- step: Do something";
    expect(() => parseFlowChart(source)).toThrow(VisualizationParseError);
  });

  it("parses step with note correctly", () => {
    const result = parseFlowChart(fixture("flow-chart.valid.txt"));
    const stepWithNote = result.find((s) => s.note !== undefined);
    expect(stepWithNote).toBeDefined();
    expect(stepWithNote!.note).toContain("Automatic");
  });

  it("parses step without note as undefined (not empty string)", () => {
    const result = parseFlowChart(fixture("flow-chart.valid.txt"));
    const stepWithoutNote = result.find((s) => s.actor === "Developer" && s.step === "Define intent in plain language");
    expect(stepWithoutNote).toBeDefined();
    expect(stepWithoutNote!.note).toBeUndefined();
  });
});
