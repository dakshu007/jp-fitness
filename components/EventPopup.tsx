"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { anniversaryCompetition as event } from "@/lib/data";

const DISMISS_KEY = "jp-event-popup-dismissed";

/**
 * Small "Upcoming event" card: top-right under the header on desktop,
 * bottom of the screen on mobile (beside the WhatsApp button).
 * Closing it hides it for the rest of the visit.
 */
export default function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  return (
    <AnimatePresence>
      {open ? (
        <m.aside
          aria-label="Upcoming event"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-4 right-[88px] z-40 md:bottom-auto md:left-auto md:right-6 md:top-[140px] md:w-[320px]"
        >
          <div className="relative flex items-center gap-3 rounded-lg border border-line bg-surface/95 p-3 pr-9 shadow-[0_12px_32px_rgb(0_0_0/0.5)] backdrop-blur">
            <span className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-brand" aria-hidden="true" />
            <Image
              src={event.poster.src}
              alt=""
              width={44}
              height={66}
              sizes="44px"
              className="h-[66px] w-11 shrink-0 rounded object-cover"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                Upcoming event
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-tight text-white">
                1st Anniversary Fitness Competition
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-bright">
                {event.dateRangeDisplay}
              </p>
              <Link
                href="/events"
                className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white underline-offset-4 hover:text-brand hover:underline"
              >
                View details
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close event popup"
              className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </m.aside>
      ) : null}
    </AnimatePresence>
  );
}
