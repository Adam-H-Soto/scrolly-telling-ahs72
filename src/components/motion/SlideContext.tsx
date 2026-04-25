"use client";

import { createContext, useContext } from "react";
import { motionValue, useMotionValue, type MotionValue } from "framer-motion";

interface SlideContextValue {
  scrollYProgress: MotionValue<number>;
  isSlideMode: boolean;
}

// Stable default so non-slide-wrapped components get a static 0
const defaultScrollYProgress = motionValue(0);

export const SlideContext = createContext<SlideContextValue>({
  scrollYProgress: defaultScrollYProgress,
  isSlideMode: false,
});

export function useSlideContext() {
  return useContext(SlideContext);
}

export function ViewportModeProvider({ children }: { children: React.ReactNode }) {
  const scrollYProgress = useMotionValue(0);
  return (
    <SlideContext.Provider value={{ scrollYProgress, isSlideMode: false }}>
      {children}
    </SlideContext.Provider>
  );
}
