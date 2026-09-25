import { ArrowRight, Flame, MessageCircle } from "lucide-react";
import { offerBar } from "@/lib/data";

/**
 * Sticky offer strip at the very top of the fixed header, on every page.
 * The whole strip is one link that opens WhatsApp with a prefilled claim message.
 */
export default function OfferBar() {
  return (
    <a
      href={offerBar.href}
      target="_blank"
      rel="noopener"
      aria-label={`${offerBar.headline} at just ${offerBar.price} ${offerBar.suffix}. ${offerBar.label}. ${offerBar.cta} on WhatsApp`}
      className="offer-bar group relative block overflow-hidden text-white"
    >
      <span className="offer-bar-shine" aria-hidden="true" />
      <span className="container-jp relative flex h-11 items-center justify-center gap-2.5 sm:gap-4">
        <span className="offer-bar-pulse hidden shrink-0 items-center gap-1 rounded-full bg-[#ffd400] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink sm:inline-flex">
          <Flame className="h-3 w-3" aria-hidden="true" />
          {offerBar.label}
        </span>
        <Flame className="h-4 w-4 shrink-0 text-[#ffd400] sm:hidden" aria-hidden="true" />
        <span className="min-w-0 truncate text-[13px] font-semibold sm:text-sm">
          <span className="hidden sm:inline">{offerBar.headline} at just </span>
          <span className="sm:hidden">Weight Loss @ </span>
          <span className="display-heading text-base tracking-[0.04em] text-[#ffd400] sm:text-lg">
            {offerBar.price}
          </span>{" "}
          <span className="uppercase">{offerBar.suffix}</span>
        </span>
        <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-brand-dark shadow-[0_0_0_3px_rgb(255_255_255/0.2)] transition-transform duration-200 group-hover:scale-105">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {offerBar.cta}
          <ArrowRight
            className="hidden h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 sm:block"
            aria-hidden="true"
          />
        </span>
      </span>
    </a>
  );
}
