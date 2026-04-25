import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { parseTimelineStat } from "@/lib/parseTimelineStat";
import { VisualizationParseError } from "@/lib/errors";

const fixture = (name: string) =>
  readFileSync(
    join(__dirname, "../__mocks__/visualizations", name),
    "utf-8"
  );

describe("parseTimelineStat", () => {
  it("parses a valid stat source with all fields", () => {
    const result = parseTimelineStat(fixture("timeline-stat.valid.txt"));
    expect(result.value).toBe(72);
    expect(result.unit).toBe("%");
    expect(result.label).toBe("of integration projects run over budget");
    expect(result.note).toContain("Gartner");
  });

  it("parses source without unit and note (optional fields)", () => {
    const source = "value: 42\nlabel: something happened";
    const result = parseTimelineStat(source);
    expect(result.value).toBe(42);
    expect(result.unit).toBeUndefined();
    expect(result.note).toBeUndefined();
  });

  it("throws VisualizationParseError for non-numeric value", () => {
    expect(() =>
      parseTimelineStat(fixture("timeline-stat.invalid-value.txt"))
    ).toThrow(VisualizationParseError);
  });

  it("throws when label is missing", () => {
    const source = "value: 50\nunit: '%'";
    expect(() => parseTimelineStat(source)).toThrow(VisualizationParseError);
  });

  it("parses value: 0 (zero is valid)", () => {
    const source = "value: 0\nlabel: some metric";
    const result = parseTimelineStat(source);
    expect(result.value).toBe(0);
  });

  it("parses value: -1 (negative is valid)", () => {
    const source = "value: -1\nlabel: temperature drop";
    const result = parseTimelineStat(source);
    expect(result.value).toBe(-1);
  });
});
