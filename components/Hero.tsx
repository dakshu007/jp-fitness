"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Star } from "lucide-react";
import { business } from "@/lib/data";
import Slashed from "@/components/Slashed";

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const wordParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const word = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const LINE_ONE = ["TRANSFORM", "YOUR", "BODY."];
const LINE_TWO = ["BUILD", "YOUR"];

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center">
      {/* hero-main.jpg placeholder: swap for next/image with priority once the client photo arrives */}
      <div className="absolute inset-0 overflow-hidden bg-surface" aria-hidden="true">
        <span className="absolute right-4 top-24 rounded border border-line bg-ink/70 px-3 py-1.5 text-xs text-muted">
          Photo: gym floor. TODO: hero-main.jpg (1920x1080) from client
        </span>
      </div>
      {/* Ink-to-transparent overlay for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
        aria-hidden="true"
      />

      <div className="container-jp relative z-10 pb-24 pt-32 md:pt-36">
        <m.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <m.p
            variants={child}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm"
          >
            Unisex gym &middot; Kalapatti, Coimbatore
          </m.p>

          <m.h1
            variants={wordParent}
            className="display-heading mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[1.04] text-white"
          >
            <span className="block">
              {LINE_ONE.map((w) => (
                <m.span key={w} variants={word} className="mr-[0.28em] inline-block">
                  {w}
                </m.span>
              ))}
            </span>
            <span className="block">
              {LINE_TWO.map((w) => (
                <m.span key={w} variants={word} className="mr-[0.28em] inline-block">
                  {w}
                </m.span>
              ))}
              <m.span variants={word} className="inline-block">
                <Slashed>CONFIDENCE.</Slashed>
              </m.span>
            </span>
          </m.h1>

          <m.p variants={child} className="mt-6 max-w-xl text-base leading-[1.7] text-muted md:text-lg">
            A unisex gym on Kalapatti Main Road with modern equipment, certified
            trainers and customised programs for weight loss and weight gain.
          </m.p>

          <m.div variants={child} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={business.whatsappHref} target="_blank" rel="noopener" className="btn-brand">
              Start with a free visit
            </a>
            <Link href="/pricing" className="btn-outline">
              View membership plans
            </Link>
          </m.div>

          <m.div
            variants={child}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
          >
            <span className="flex items-center gap-1.5 font-medium text-white">
              <Star className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
              {business.rating.value} on Google
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{business.rating.count}+ reviews</span>
            <span aria-hidden="true">&middot;</span>
            <span>6+ certified trainers</span>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
