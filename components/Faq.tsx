import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";

/** Accordion built on native <details>, so it needs no JS state at all. */
export default function Faq() {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="faq-summary flex min-h-[44px] cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white sm:text-base">
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5">
            <p className="text-sm leading-[1.7] text-muted-bright">
              {faq.answer}
              {faq.link ? (
                <>
                  {" "}
                  <Link
                    href={faq.link.href}
                    className="font-semibold text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-white/80"
                  >
                    {faq.link.label}
                  </Link>
                  .
                </>
              ) : null}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
