import type { Metadata } from "next";
import { getHomePage } from "@/lib/content";
import { parseAllSlides } from "@/lib/slides";
import { PresentationLayout } from "@/components/layout/PresentationLayout";
import { PresentationSlide } from "@/components/motion/PresentationSlide";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { SiteFooter } from "@/components/layout/SiteFooter";

export async function generateMetadata(): Promise<Metadata> {
  const page = getHomePage();
  const seo = page.frontmatter.seo;
  return {
    title: seo?.title ?? page.frontmatter.title,
    description: seo?.description ?? page.frontmatter.summary,
    openGraph: seo?.openGraphImage
      ? { images: [seo.openGraphImage] }
      : undefined,
  };
}

export default function HomePage() {
  const page = getHomePage();
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
      {/* Footer gate on last slide */}
      <div style={{ background: "var(--navy-deep)" }}>
        <SiteFooter />
      </div>
    </PresentationLayout>
  );
}
