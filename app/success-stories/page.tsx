import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TransformationGrid from "@/components/TransformationGrid";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reviews.map((review, index) => (
              <Reveal key={index} className="h-full" delay={(index % 2) * 0.05}>
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

      <CtaBand
        heading="Your transformation starts with one visit."
        sub="Walk in for a free first visit and talk to a trainer about your goal."
      />
    </>
  );
}
