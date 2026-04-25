"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./SceneCard.module.css";

interface SceneCardProps {
  title: string;
  children: React.ReactNode;
  eyebrow?: string;
  index?: number;
}

export function SceneCard({ title, children, eyebrow, index = 0 }: SceneCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </motion.div>
  );
}
