import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  openGraphImage: z.string().optional(),
});

export const PageFrontmatterSchema = z.object({
  title: z.string(),
  layout: z.enum(["standard", "presentation"]),
  heroImage: z.string().optional(),
  summary: z.string().optional(),
  seo: SeoSchema.optional(),
  order: z.number().int().optional(),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;

export interface ParsedPage {
  slug: string;
  frontmatter: PageFrontmatter;
  body: string;
}
