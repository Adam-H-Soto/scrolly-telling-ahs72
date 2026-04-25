"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { parseFlowChart, type FlowStep } from "@/lib/parseFlowChart";
import styles from "./FlowChart.module.css";

interface FlowChartProps {
  source: string;
}

function StepNode({ step, index, inView }: { step: FlowStep; index: number; inView: boolean }) {
  const isAI = step.actor === "AI Agent";
  return (
    <motion.li
      className={`${styles.step} flow-chart__step`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.stepCard}>
        <span className={`${styles.actor} ${isAI ? styles.actorAI : styles.actorHuman}`}>
          {step.actor}
        </span>
        <p className={styles.stepText}>{step.step}</p>
        {step.note && <p className={styles.stepNote}>{step.note}</p>}
      </div>
      {/* Arrow is decorative only */}
    </motion.li>
  );
}

export function FlowChart({ source }: FlowChartProps) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  let steps: FlowStep[];
  try {
    steps = parseFlowChart(source);
  } catch (e) {
    return (
      <div className={styles.error} data-viz-error="true">
        {e instanceof Error ? e.message : "FlowChart: parse error"}
      </div>
    );
  }

  return (
    <ol
      ref={ref}
      className={`${styles.root} flow-chart`}
      aria-label="Integration workflow steps"
    >
      {steps.map((step, i) => (
        <StepNode key={i} step={step} index={i} inView={inView} />
      ))}
    </ol>
  );
}
