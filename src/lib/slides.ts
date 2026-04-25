export type SlideKind = "bg" | "split" | "split-reverse" | "plain";

export interface ParsedSlide {
  kind: SlideKind;
  imageUrl?: string;
  content: string;
  heightVh: number;
}

export function splitMarkdownIntoSlides(body: string): string[] {
  return body
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSlideDirective(markdown: string): ParsedSlide {
  const bgMatch = /^!\[(bg|split|split-reverse)\]\(([^)]+)\)/.exec(markdown);

  if (bgMatch) {
    const kind = bgMatch[1] as "bg" | "split" | "split-reverse";
    const imageUrl = bgMatch[2];
    const content = markdown.slice(bgMatch[0].length).trim();
    const heightVh = kind === "bg" ? 200 : 170;
    return { kind, imageUrl, content, heightVh };
  }

  return { kind: "plain", content: markdown, heightVh: 170 };
}

export function parseAllSlides(body: string): ParsedSlide[] {
  return splitMarkdownIntoSlides(body).map(parseSlideDirective);
}
