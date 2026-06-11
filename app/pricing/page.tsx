import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import PlanCard from "@/components/PlanCard";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Slashed from "@/components/Slashed";
import TodoTag from "@/components/TodoTag";
import { faqs, plans, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gym Membership Fees in Coimbatore | JP Fitness Plans",
  description:
    "JP Fitness membership: 3 months ₹4,999, 6 months ₹6,999, 12 months ₹9,999. Unisex gym in Kalapatti, Coimbatore. Call or WhatsApp 99659 72440 to join.",
  alternates: { canonical: "/pricing/" },
};

/** FAQPage schema generated from the same data array that renders the accordion. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.link ? `${faq.answer} ${faq.link.label}.` : faq.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title={
          <>
            MEMBERSHIP <Slashed>PLANS</Slashed>
          </>
        }
        sub="Simple pricing for the best gym experience in Kalapatti, Coimbatore."
      />

      {/* Plans */}
      <section>
        <div className="container-jp py-16 md:py-24">
          <div className="grid gap-5 pt-3 md:grid-cols-3 md:gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} large />
            ))}
          </div>
          <div className="mt-5">
            <TodoTag note="Prices follow the client's current offer poster, labelled limited time. Confirm whether they are permanent before launch; never show an invented regular price." />
          </div>
        </div>
      </section>

      {/* Personal training band */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-surface p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="display-heading text-2xl text-white md:text-3xl">
                NEED SOMETHING PERSONAL?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-[1.7] text-muted-bright md:text-base">
                Personal training and online coaching are available, with pricing
                on request. Message us and a trainer will get back to you.
              </p>
            </div>
            <a
              href={waLink(
                "Hi JP Fitness! I want to know about personal training and online coaching."
              )}
              target="_blank"
              rel="noopener"
              className="btn-brand shrink-0"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="QUESTIONS, ANSWERED"
              sub="Everything members usually ask before their first visit."
            />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
