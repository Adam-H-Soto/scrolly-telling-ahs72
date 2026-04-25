import Link from "next/link";
import styles from "./ContextualLink.module.css";

interface ContextualLinkProps {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
}

export function ContextualLink({ href, children, arrow = true }: ContextualLinkProps) {
  return (
    <Link href={href} className={styles.link}>
      {children}
      {arrow && <span className={styles.arrow} aria-hidden>→</span>}
    </Link>
  );
}
