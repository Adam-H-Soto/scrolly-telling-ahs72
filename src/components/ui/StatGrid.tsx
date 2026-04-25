"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./StatGrid.module.css";

export interface StatItem {
  value: string;
  label: string;
  note?: string;
}

interface StatGridProps {
  items: StatItem[];
}

export function StatGrid({ items }: StatGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className={`${styles.grid} stat-grid`}
      role="list"
      aria-label="Statistics"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={styles.item}
          role="listitem"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
          {item.note && <span className={styles.note}>{item.note}</span>}
        </motion.div>
      ))}
    </div>
  );
}
