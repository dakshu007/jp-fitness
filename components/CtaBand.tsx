import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/data";

interface CtaBandProps {
  heading?: string;
  sub?: string;
}

/** Red call-to-action band used above the footer on every page. */
export default function CtaBand({ heading = "Ready to start?", sub }: CtaBandProps) {
  return (
    <section className="bg-brand">
      <div className="container-jp flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <h2 className="display-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] text-white">
          {heading}
        </h2>
        <p className="max-w-xl text-base leading-[1.7] text-white">
          {sub ??
            "Call, WhatsApp, or walk in. 4th floor, DM Complex, Kalapatti Main Road, above Grace and Bakes."}
        </p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a className="btn-white-outline" href={business.phoneHref}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {business.phoneDisplay}
          </a>
          <a className="btn-ink" href={business.whatsappHref} target="_blank" rel="noopener">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
