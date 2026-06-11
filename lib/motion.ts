import type { Variants } from "motion/react";

/** Shared animation variants. Transform and opacity only, per the performance budget. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
