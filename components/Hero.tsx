import Link from "next/link";
import { Star } from "lucide-react";
import { business } from "@/lib/data";
import Slashed from "@/components/Slashed";

/**
 * Hero load sequence runs on pure CSS animations (see globals.css), so the H1
 * paints with the first frame and LCP never waits for hydration. Words stagger
 * 60ms apart via animation-delay; prefers-reduced-motion disables it all.
 */

const LINE_ONE = ["TRANSFORM", "YOUR", "BODY."];
const LINE_TWO = ["BUILD", "YOUR"];
const WORD_STAGGER = 0.06;
const H1_WORDS = LINE_ONE.length + LINE_TWO.length + 1;

const delay = (seconds: number) => ({ animationDelay: `${seconds.toFixed(2)}s` });

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
        <div className="max-w-3xl">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-muted sm:text-sm">
            Unisex gym &middot; Kalapatti, Coimbatore
          </p>

          <h1 className="display-heading mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[1.04] text-white">
            <span className="block">
              {LINE_ONE.map((w, i) => (
                <span
                  key={w}
                  className="animate-rise mr-[0.28em] inline-block"
                  style={delay(0.05 + i * WORD_STAGGER)}
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block">
              {LINE_TWO.map((w, i) => (
                <span
                  key={w}
                  className="animate-rise mr-[0.28em] inline-block"
                  style={delay(0.05 + (LINE_ONE.length + i) * WORD_STAGGER)}
                >
                  {w}
                </span>
              ))}
              <span
                className="animate-rise inline-block"
                style={delay(0.05 + (H1_WORDS - 1) * WORD_STAGGER)}
              >
                <Slashed>CONFIDENCE.</Slashed>
              </span>
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-[1.7] text-muted md:text-lg"
            style={delay(0.2)}
          >
            A unisex gym on Kalapatti Main Road with modern equipment, certified
            trainers and customised programs for weight loss and weight gain.
          </p>

          <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={delay(0.3)}>
            <a href={business.whatsappHref} target="_blank" rel="noopener" className="btn-brand">
              Start with a free visit
            </a>
            <Link href="/pricing" className="btn-outline">
              View membership plans
            </Link>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
            style={delay(0.4)}
          >
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Star className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
              {business.rating.value} on Google
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{business.rating.count}+ reviews</span>
            <span aria-hidden="true">&middot;</span>
            <span>6+ certified trainers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
