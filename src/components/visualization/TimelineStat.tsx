"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { parseTimelineStat } from "@/lib/parseTimelineStat";
import styles from "./TimelineStat.module.css";

interface TimelineStatProps {
  source: string;
}

export function TimelineStat({ source }: TimelineStatProps) {
  let data;
  try {
    data = parseTimelineStat(source);
  } catch (e) {
    return (
      <div className={styles.error} data-viz-error="true">
        {e instanceof Error ? e.message : "TimelineStat: parse error"}
      </div>
    );
  }

  return <TimelineStatInner data={data} />;
}

function TimelineStatInner({
  data,
}: {
  data: { value: number; unit?: string; label: string; note?: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [displayed, setDisplayed] = useState(0);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplayed(data.value);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();
    const target = data.value;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, data.value, prefersReduced]);

  return (
    <div ref={ref} className={`${styles.root} timeline-stat`} aria-label={`${data.value}${data.unit ?? ""} — ${data.label}`}>
      <span className="sr-only">{data.value}{data.unit}</span>
      <div className={styles.number}>
        <span
          className={`${styles.value} timeline-stat__value`}
          aria-live="off"
          aria-hidden="true"
        >
          {displayed}
        </span>
        {data.unit && <span className={styles.unit}>{data.unit}</span>}
      </div>
      <p className={styles.label}>{data.label}</p>
      {data.note && <p className={styles.note}>{data.note}</p>}
    </div>
  );
}
