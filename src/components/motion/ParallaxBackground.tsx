"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  intensity?: "soft" | "medium" | "strong";
  children?: React.ReactNode;
  className?: string;
}

const intensityMap = { soft: 0.1, medium: 0.2, strong: 0.35 };

export function ParallaxBackground({
  src,
  alt = "",
  intensity = "medium",
  children,
  className,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = intensityMap[intensity];
  const y = useTransform(scrollYProgress, [0, 1], [`-${factor * 100}%`, `${factor * 100}%`]);

  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        style={{ y, position: "absolute", inset: "-20% 0", zIndex: 0 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </motion.div>
      {children && (
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      )}
    </div>
  );
}
