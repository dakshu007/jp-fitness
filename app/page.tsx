import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatCounter from "@/components/StatCounter";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import PlanCard from "@/components/PlanCard";
import TestimonialCard from "@/components/TestimonialCard";
import AppDownload from "@/components/AppDownload";
import InstagramGrid from "@/components/InstagramGrid";
import VisitUs from "@/components/VisitUs";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import {
  business,
  plans,
  programs,
  reviews,
  stats,
  strengthClassic,
  whyChooseUs,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "JP Fitness Kalapatti | Best Unisex Gym in Coimbatore",
  description:
    "Rated 5.0 on Google. Unisex gym on Kalapatti Main Road, Coimbatore with expert trainers, modern equipment and weight loss programs. Plans from ₹4,999.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Upcoming event banner */}
      <section className="border-b border-line bg-surface" aria-label="Upcoming event">
        <div className="container-jp flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Upcoming event
              </p>
              <p className="mt-1 font-semibold text-white">
                {strengthClassic.name}: bench press and deadlift championship ·{" "}
                {strengthClassic.dateDisplay}, {strengthClassic.venue}
              </p>
            </div>
          </div>
          <Link href="/events" className="btn-brand shrink-0">
            Event details
          </Link>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-line" aria-label="JP Fitness in numbers">
        <div className="container-jp grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-16">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section>
        <div className="container-jp py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Why JP Fitness"
              title={
                <>
                  BUILT FOR <Slashed>RESULTS</Slashed>
                </>
              }
              sub="Searching for the best gym in Coimbatore? Here is what members get at JP Fitness in Kalapatti."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} className="h-full" delay={index * 0.06}>
                <div className="h-full rounded-lg border border-line bg-surface p-6 transition-colors duration-200 hover:border-brand">
                  <item.icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <h3 className="display-heading mt-4 text-lg text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted-bright">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="border-t border-line">
        <div className="container-jp py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Programs"
              title={
                <>
                  TRAINING FOR EVERY <Slashed>GOAL</Slashed>
                </>
              }
              sub="Strength training, weight loss and weight gain programs in Coimbatore, with diet guidance included in every membership."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Reveal key={program.title} className="h-full" delay={index * 0.05}>
                <Link
                  href="/pricing"
                  className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-brand"
                >
                  <program.icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <h3 className="display-heading mt-4 text-lg text-white">{program.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted-bright">
                    {program.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    See membership plans
                    <ArrowRight
                      className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership preview */}
      <section className="border-t border-line">
        <div className="container-jp py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Membership plans"
              title={
                <>
                  SIMPLE <Slashed>PLANS</Slashed>
                </>
              }
              sub="Every plan includes full gym access, all equipment, trainer guidance and diet guidance."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 pt-3 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/pricing" className="btn-outline">
              See full gym membership plans in Coimbatore
              <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-line">
        <div className="container-jp py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Testimonials"
              title="RATED 5.0 BY OUR MEMBERS"
              sub={`${business.rating.value} from ${business.rating.count} public reviews on Google.`}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reviews.map((review, index) => (
              <Reveal key={index} className="h-full" delay={(index % 2) * 0.05}>
                <TestimonialCard review={review} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <a href={business.mapsUrl} target="_blank" rel="noopener" className="btn-outline">
              Read all reviews on Google
            </a>
          </div>
        </div>
      </section>

      <AppDownload />
      <InstagramGrid />
      <VisitUs />
      <CtaBand />
    </>
  );
}
