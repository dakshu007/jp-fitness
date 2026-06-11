"use client";

import { Check, MessageCircle } from "lucide-react";
import { m } from "motion/react";
import { planInclusions, planWaLink, type Plan } from "@/lib/data";

interface PlanCardProps {
  plan: Plan;
  /** Pricing page renders large cards with the full inclusion list. */
  large?: boolean;
}

export default function PlanCard({ plan, large = false }: PlanCardProps) {
  return (
    <m.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      initial={plan.best ? { scale: 1 } : false}
      whileInView={plan.best ? { scale: [1, 1.02, 1] } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      className={`relative flex h-full flex-col rounded-lg bg-surface transition-colors duration-200 ${
        plan.best
          ? "border-2 border-brand"
          : "border border-line hover:border-brand"
      } ${large ? "p-7 md:p-8" : "p-6"}`}
    >
      {plan.best ? (
        <span className="absolute -top-3 left-6 rounded bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Best value
        </span>
      ) : null}

      <h3 className="display-heading text-xl text-white">{plan.duration}</h3>
      <p className="mt-3">
        <span
          className={`display-heading text-white ${large ? "text-4xl md:text-5xl" : "text-4xl"}`}
        >
          {plan.priceDisplay}
        </span>
        <span className="ml-2 text-sm text-muted-bright">total</span>
      </p>

      {large ? (
        <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm text-muted-bright">
          {planInclusions.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-[1.7] text-muted-bright">
          Full gym access with trainer and diet guidance included.
        </p>
      )}

      <div className="flex-1" aria-hidden="true" />

      <a
        href={planWaLink(plan)}
        target="_blank"
        rel="noopener"
        className={`mt-6 w-full ${plan.best ? "btn-brand" : "btn-outline"}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Join via WhatsApp
      </a>
    </m.div>
  );
}
