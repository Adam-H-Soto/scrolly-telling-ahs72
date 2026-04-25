import { PresentationProgress } from "./PresentationProgress";
import styles from "./PresentationLayout.module.css";

interface PresentationLayoutProps {
  children: React.ReactNode;
}

export function PresentationLayout({ children }: PresentationLayoutProps) {
  return (
    <main className={styles.root}>
      <PresentationProgress />
      {children}
    </main>
  );
}
