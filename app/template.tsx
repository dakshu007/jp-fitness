"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/** Simple opacity fade between routes. Opacity only, so CLS stays at 0. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
