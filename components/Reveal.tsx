"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll-triggered fade-up. Fires once, never re-triggers. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay },
        },
      }}
    >
      {children}
    </m.div>
  );
}
