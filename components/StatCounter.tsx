"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { animate } from "motion";

interface StatCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

/** Animated count-up stat. Skips the animation under prefers-reduced-motion. */
export default function StatCounter({ value, decimals = 0, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, decimals]);

  return (
    <div ref={ref} className="text-center">
      <p className="display-heading text-4xl text-brand md:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
    </div>
  );
}
