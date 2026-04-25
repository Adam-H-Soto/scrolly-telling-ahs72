import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PageFrontmatterSchema, type ParsedPage } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readPage(filePath: string, slug: string): ParsedPage {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = PageFrontmatterSchema.parse(data);
  return { slug, frontmatter, body: content.trim() };
}

export function getHomePage(): ParsedPage {
  return readPage(path.join(CONTENT_DIR, "home.md"), "");
}

export function getAllPageSlugs(): string[] {
  const pagesDir = path.join(CONTENT_DIR, "pages");
  if (!fs.existsSync(pagesDir)) return [];
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPageBySlug(slug: string): ParsedPage {
  const filePath = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  return readPage(filePath, slug);
}

export function getAllPages(): ParsedPage[] {
  const slugs = getAllPageSlugs();
  return slugs
    .map((s) => getPageBySlug(s))
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}
