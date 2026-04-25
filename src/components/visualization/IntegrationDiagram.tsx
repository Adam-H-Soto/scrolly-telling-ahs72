"use client";

import { useTransform, useMotionValue, motion, type MotionValue } from "framer-motion";
import { parseIntegrationDiagram, type DiagramNode } from "@/lib/parseIntegrationDiagram";
import { useSlideContext } from "@/components/motion/SlideContext";
import styles from "./IntegrationDiagram.module.css";

interface IntegrationDiagramProps {
  source: string;
}

function NodeCard({ node }: { node: DiagramNode }) {
  const roleLabel = { source: "Source", connector: "Connector", target: "Target" };
  return (
    <div
      className={`${styles.node} ${node.highlight === "pain" ? styles.pain : ""} ${node.highlight === "win" ? styles.win : ""}`}
    >
      <span className={styles.nodeRole}>{roleLabel[node.role]}</span>
      <span className={styles.nodeLabel}>{node.label}</span>
    </div>
  );
}

function Column({ nodes, label, opacity }: { nodes: DiagramNode[]; label: string; opacity: MotionValue<number> }) {
  return (
    <motion.div className={styles.column} style={{ opacity }}>
      <span className={styles.columnLabel}>{label}</span>
      {nodes.map((node, i) => (
        <div key={i}>
          <NodeCard node={node} />
          {i < nodes.length - 1 && (
            <div className={styles.arrow} aria-hidden="true">↓</div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export function IntegrationDiagram({ source }: IntegrationDiagramProps) {
  const { scrollYProgress, isSlideMode } = useSlideContext();

  // Always call hooks unconditionally — React rule
  const staticOpacity = useMotionValue(1);
  const beforeOpacitySlide = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const afterOpacitySlide = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  let data;
  try {
    data = parseIntegrationDiagram(source);
  } catch (e) {
    return (
      <div className={styles.error} data-viz-error="true">
        {e instanceof Error ? e.message : "IntegrationDiagram: parse error"}
      </div>
    );
  }

  // In slide mode, use scroll-linked opacity; otherwise show both columns fully
  const beforeOpacity = isSlideMode ? beforeOpacitySlide : staticOpacity;
  const afterOpacity = isSlideMode ? afterOpacitySlide : staticOpacity;

  const ariaLabel = `Before: ${data.before.map((n) => n.label).join(", ")}. After: ${data.after.map((n) => n.label).join(", ")}.`;

  return (
    <div
      className={`${styles.root} integration-diagram`}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={`${styles.col} integration-diagram__before`}>
        <Column nodes={data.before} label="Before" opacity={beforeOpacity} />
      </div>
      <div className={`${styles.col} integration-diagram__after`}>
        <Column nodes={data.after} label="After" opacity={afterOpacity} />
      </div>
    </div>
  );
}
