import Link from "next/link";
import { WiredLogo } from "@/components/ui/WiredLogo";
import styles from "./SiteFooter.module.css";

const navLinks = [
  { href: "/the-problem", label: "The Problem" },
  { href: "/how-ai-helps", label: "How AI Helps" },
  { href: "/in-practice", label: "In Practice" },
  { href: "/get-started", label: "Get Started" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <WiredLogo variant="light" />
          <p className={styles.tagline}>
            The future of software isn&apos;t written. It&apos;s connected.
          </p>
        </div>

        <nav className={styles.col} aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.col}>
          <p className={styles.credits}>
            Built with Next.js + scrollytelling.
          </p>
          <a
            href="https://github.com/ashetheloyal/wired-ai-integration"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}
