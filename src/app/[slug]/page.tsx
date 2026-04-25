import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPageSlugs, getPageBySlug } from "@/lib/content";
import { parseAllSlides } from "@/lib/slides";
import { PresentationLayout } from "@/components/layout/PresentationLayout";
import { PresentationSlide } from "@/components/motion/PresentationSlide";
import { StandardLayout } from "@/components/layout/StandardLayout";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = getPageBySlug(slug);
    const seo = page.frontmatter.seo;
    return {
      title: seo?.title ?? page.frontmatter.title,
      description: seo?.description ?? page.frontmatter.summary,
      openGraph: seo?.openGraphImage
        ? { images: [seo.openGraphImage] }
        : undefined,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  let page;
  try {
    page = getPageBySlug(slug);
  } catch {
    notFound();
  }

  if (page.frontmatter.layout === "presentation") {
    const slides = parseAllSlides(page.body);
    return (
      <PresentationLayout>
        {slides.map((slide, i) => (
          <PresentationSlide
            key={i}
            slideIndex={i}
            kind={slide.kind}
            imageUrl={slide.imageUrl}
            heightVh={slide.heightVh}
          >
            <MarkdownRenderer source={slide.content} />
          </PresentationSlide>
        ))}
        <div style={{ background: "var(--navy-deep)" }}>
          <SiteFooter />
        </div>
      </PresentationLayout>
    );
  }

  return (
    <StandardLayout
      title={page.frontmatter.title}
      heroImage={page.frontmatter.heroImage}
      summary={page.frontmatter.summary}
    >
      <MarkdownRenderer source={page.body} />
    </StandardLayout>
  );
}
