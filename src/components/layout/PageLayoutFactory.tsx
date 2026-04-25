import { PresentationLayout } from "./PresentationLayout";
import { StandardLayout } from "./StandardLayout";
import type { PageFrontmatter } from "@/lib/schema";

interface PageLayoutFactoryProps {
  frontmatter: PageFrontmatter;
  children: React.ReactNode;
}

export function PageLayoutFactory({ frontmatter, children }: PageLayoutFactoryProps) {
  if (frontmatter.layout === "presentation") {
    return <PresentationLayout>{children}</PresentationLayout>;
  }

  return (
    <StandardLayout
      title={frontmatter.title}
      heroImage={frontmatter.heroImage}
      summary={frontmatter.summary}
    >
      {children}
    </StandardLayout>
  );
}
