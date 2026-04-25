"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WiredLogo } from "@/components/ui/WiredLogo";
import styles from "./SiteHeader.module.css";

const navLinks = [
  { href: "/the-problem", label: "The Problem" },
  { href: "/how-ai-helps", label: "How AI Helps" },
  { href: "/in-practice", label: "In Practice" },
  { href: "/get-started", label: "Get Started" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logoLink} aria-label="Wired — home">
            <WiredLogo variant="light" />
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <button
            className={styles.overlayClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className={styles.overlayNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.overlayLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
