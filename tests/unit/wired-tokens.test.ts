import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const css = readFileSync(
  join(process.cwd(), "src/app/globals.css"),
  "utf-8"
);

function extractToken(token: string): string | null {
  const match = new RegExp(`${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*([^;\\n]+)`).exec(css);
  return match ? match[1].trim() : null;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function linearize(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(linearize);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Wired design tokens", () => {
  it("--page-background is a valid 6-digit hex color", () => {
    const value = extractToken("--page-background");
    expect(value).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("--accent contrast against --page-background is ≥ 4.5:1", () => {
    const accent = extractToken("--accent");
    expect(accent).toBeTruthy();
    const ratio = contrastRatio(accent!, "#0a0f1e");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("--text contrast against --page-background is ≥ 7:1 (AAA)", () => {
    const text = extractToken("--text");
    expect(text).toBeTruthy();
    const ratio = contrastRatio(text!, "#0a0f1e");
    expect(ratio).toBeGreaterThanOrEqual(7);
  });

  it("--text-muted contrast against --page-background is ≥ 4.5:1 (AA)", () => {
    const muted = extractToken("--text-muted");
    expect(muted).toBeTruthy();
    const ratio = contrastRatio(muted!, "#0a0f1e");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("--dur-cinematic is present and a numeric millisecond value", () => {
    const value = extractToken("--dur-cinematic");
    expect(value).toBeTruthy();
    const ms = parseInt(value!.replace("ms", ""), 10);
    expect(isNaN(ms)).toBe(false);
    expect(ms).toBeGreaterThan(0);
  });
});
