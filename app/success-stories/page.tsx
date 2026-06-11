import type { Metadata } from "next";
import { Play } from "lucide-react";
import PageHero from "@/components/PageHero";
import TransformationGrid from "@/components/TransformationGrid";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import TodoTag from "@/components/TodoTag";
import { business, reviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Client Transformations | JP Fitness Coimbatore",
  description:
    "Real weight loss and muscle gain results from JP Fitness members in Kalapatti, Coimbatore. Rated 5.0 on Google by our members.",
  alternates: { canonical: "/success-stories/" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title={
          <>
            REAL CLIENT <Slashed>TRANSFORMATIONS</Slashed>
          </>
        }
        sub="Weight loss and weight gain results from real members of JP Fitness, Coimbatore."
      />

      {/* Before/after photo wall (client-supplied collages) */}
      <section>
        <div className="container-jp py-16 md:py-24">
          <TransformationGrid />
        </div>
      </section>

      {/* Review wall */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Member reviews"
              title="WHAT MEMBERS SAY ON GOOGLE"
              sub={`Every quote below comes from our public Google listing, rated ${business.rating.value} across ${business.rating.count} reviews.`}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal key={index} className="h-full" delay={(index % 3) * 0.05}>
                <TestimonialCard review={review} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={business.mapsUrl} target="_blank" rel="noopener" className="btn-outline">
              Read all reviews on Google
            </a>
            <a href={business.reviewUrl} target="_blank" rel="noopener" className="btn-outline">
              Write a review
            </a>
          </div>
        </div>
      </section>

      {/* Reels row */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="On Instagram"
              title="WATCH THE REELS"
              sub="Training clips and member moments, straight from our Instagram."
            />
          </Reveal>
          <div className="mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <a
                key={n}
                href={business.instagramUrl}
                target="_blank"
                rel="noopener"
                aria-label={`Watch JP Fitness reel ${n} on Instagram`}
                className="group relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-brand"
              >
                <span className="absolute inset-x-0 top-4 px-4 text-center text-xs text-muted">
                  Reel {n}: TODO pick with client
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-4">
            <TodoTag note="Pick 3 reels with the client; thumbnails link out to Instagram, no embeds." />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Your transformation starts with one visit."
        sub="Walk in for a free first visit and talk to a trainer about your goal."
      />
    </>
  );
}
