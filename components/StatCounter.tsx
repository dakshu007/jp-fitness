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

/**
 * Animated count-up stat. The server renders the final value (so crawlers and
 * no-JS visitors read the real numbers, not zeros); on the client the value
 * resets to 0 off-screen and counts up when scrolled into view.
 */
export default function StatCounter({ value, decimals = 0, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const startedRef = useRef(false);
  // Seed with the real value so SSR/hydration show the true number.
  const [display, setDisplay] = useState(value.toFixed(decimals));

  // On mount, drop to 0 so the count-up reads correctly. Skipped under reduced
  // motion, where the real value simply stays put.
  useEffect(() => {
    if (!reducedMotion) setDisplay((0).toFixed(decimals));
  }, [reducedMotion, decimals]);

  useEffect(() => {
    if (!inView || reducedMotion || startedRef.current) return;
    startedRef.current = true;
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
