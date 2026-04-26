"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SlideContext } from "./SlideContext";
import styles from "./PresentationSlide.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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

  return (
    <SlideContext.Provider value={{ scrollYProgress, isSlideMode: true }}>
      <div
        ref={containerRef}
        className={styles.container}
        style={{ height: `${heightVh}vh` }}
        data-slide-index={slideIndex}
      >
        <div className={`${styles.sticky} ${styles[kind] ?? ""}`}>

          {/* Full-bleed background: fill works because bgLayer is position:absolute */}
          {kind === "bg" && imageUrl && (
            <div className={styles.bgLayer}>
              <img
                src={`${BASE}${imageUrl}`}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className={styles.bgOverlay} />
            </div>
          )}

          {/* Split: explicit dimensions + CSS sizing avoids fill/grid conflicts */}
          {(kind === "split" || kind === "split-reverse") && imageUrl && (
            <div className={`${styles.splitImage} ${kind === "split-reverse" ? styles.splitImageReverse : ""}`}>
              <img
                src={`${BASE}${imageUrl}`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          <div className={`${styles.content} ${kind === "split" ? styles.contentSplit : ""} ${kind === "split-reverse" ? styles.contentSplitReverse : ""}`}>
            {children}
          </div>

        </div>
      </div>
    </SlideContext.Provider>
  );
}
