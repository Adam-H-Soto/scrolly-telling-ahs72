import styles from "./StandardLayout.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
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
            <img
              src={`${BASE}${heroImage}`}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
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
