import Image from "next/image";
import styles from "./StandardLayout.module.css";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface StandardLayoutProps {
  children: React.ReactNode;
  heroImage?: string;
  title: string;
  summary?: string;
}

export function StandardLayout({
  children,
  heroImage,
  title,
  summary,
}: StandardLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.root}>
        {heroImage && (
          <div className={styles.hero}>
            <Image
              src={heroImage}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>{title}</h1>
              {summary && <p className={styles.heroSummary}>{summary}</p>}
            </div>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
