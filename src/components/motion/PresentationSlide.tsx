"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SlideContext } from "./SlideContext";
import styles from "./PresentationSlide.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface PresentationSlideProps {
  children: React.ReactNode;
  slideIndex: number;
  kind?: "bg" | "split" | "split-reverse" | "plain";
  imageUrl?: string;
  heightVh?: number;
}

export function PresentationSlide({
  children,
  slideIndex,
  kind = "plain",
  imageUrl,
  heightVh = 170,
}: PresentationSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgStyle = imageUrl
    ? { backgroundImage: `url("${basePath}${imageUrl}")` }
    : undefined;

  return (
    <SlideContext.Provider value={{ scrollYProgress, isSlideMode: true }}>
      <div
        ref={containerRef}
        className={styles.container}
        style={{ height: `${heightVh}vh` }}
        data-slide-index={slideIndex}
      >
        <div className={`${styles.sticky} ${styles[kind] ?? ""}`}>
          {kind === "bg" && imageUrl && (
            <div className={`${styles.bgLayer} ${styles.bgImage}`} style={bgStyle}>
              <div className={styles.bgOverlay} />
            </div>
          )}

          {(kind === "split" || kind === "split-reverse") && imageUrl && (
            <div
              className={`${styles.splitImage} ${kind === "split-reverse" ? styles.splitImageReverse : ""}`}
              style={bgStyle}
            />
          )}

          <div
            className={`${styles.content} ${kind === "split" ? styles.contentSplit : ""} ${kind === "split-reverse" ? styles.contentSplitReverse : ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </SlideContext.Provider>
  );
}
