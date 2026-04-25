"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Timeline.module.css";

export interface TimelineItem {
  era: string;
  label: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={styles.root}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={styles.item}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.era}>{item.era}</div>
          <div className={styles.content}>
            <div className={styles.label}>{item.label}</div>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
