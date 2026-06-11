import { marqueeItems } from "@/lib/data";

/**
 * Signature element: thin red chevron marquee strip between the hero and the
 * next section. Pure CSS animation, paused under prefers-reduced-motion.
 * Decorative; every fact in it appears elsewhere on the page.
 */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-3" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {marqueeItems.map((item) => (
              <span
                key={item}
                className="display-heading mx-4 flex items-center gap-3 whitespace-nowrap text-sm text-white/80"
              >
                <span className="text-brand">&raquo;</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
