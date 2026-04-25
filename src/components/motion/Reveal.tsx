"use client";

import { useRef } from "react";
import { motion, useTransform, useInView } from "framer-motion";
import { useSlideContext } from "./SlideContext";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const translateOffset: Record<Direction, number> = {
  up: 24,
  down: -24,
  left: 24,
  right: -24,
  none: 0,
};

function SlideReveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const { scrollYProgress } = useSlideContext();
  const from = 0.1 + delay * 0.08;
  const to = Math.min(from + 0.25, 0.9);
  const opacity = useTransform(scrollYProgress, [from, to], [0, 1]);
  const yOffset = translateOffset[direction];
  const y = useTransform(scrollYProgress, [from, to], [yOffset, 0]);

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function ViewportReveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const yOffset = translateOffset[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealProps) {
  const { isSlideMode } = useSlideContext();

  if (isSlideMode) {
    return (
      <SlideReveal direction={direction} delay={delay} className={className}>
        {children}
      </SlideReveal>
    );
  }

  return (
    <ViewportReveal direction={direction} delay={delay} className={className}>
      {children}
    </ViewportReveal>
  );
}
