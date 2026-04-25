"use client";

import { motion, useScroll } from "framer-motion";
import styles from "./PresentationProgress.module.css";

export function PresentationProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className={styles.track} aria-hidden="true">
      <motion.div className={styles.bar} style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
