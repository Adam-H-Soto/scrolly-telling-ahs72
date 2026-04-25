"use client";

import React, { Children } from "react";
import { Reveal } from "./Reveal";

interface LayeredRevealGroupProps {
  children: React.ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function LayeredRevealGroup({
  children,
  stagger = 0.15,
  direction = "up",
  className,
}: LayeredRevealGroupProps) {
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} direction={direction} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
