import type { Metadata } from "next";
import Link from "next/link";
import { Award, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import TodoTag from "@/components/TodoTag";
import { achievementsTimeline, business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Achievements & Trainers | JP Fitness Kalapatti",
  description:
    "Meet the certified trainers and competitive bodybuilding background behind JP Fitness, a 5.0-rated unisex gym in Kalapatti, Coimbatore.",
  alternates: { canonical: "/achievements/" },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title={
          <>
            OUR <Slashed>ACHIEVEMENTS</Slashed>
          </>
        }
        sub="The bodybuilding background and certified team behind JP Fitness."
      />

      {/* Founder block */}
      <section>
        <div className="container-jp py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
            <PlaceholderImage
              label="Photo: founder (TODO from client, 800x1000)"
              className="aspect-[4/5] w-full max-w-xs"
            />
            <div>
              <Reveal>
                <SectionHeader
                  eyebrow="The founder"
                  title="RUN BY A COMPETITIVE BODYBUILDER"
                  sub="JP Fitness is run by a competitive bodybuilder who brings contest-level discipline to everyday coaching, supported by 6+ certified trainers."
                />
              </Reveal>
              <div className="mt-6">
                <TodoTag note="Founder name, titles and competition history come from the client (open item 7)." />
              </div>
              <div className="mt-8">
                <Link href="/success-stories" className="btn-outline">
                  See real member transformations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Milestones"
              title="THE JOURNEY SO FAR"
              sub="Each milestone is filled in as the client confirms dates and details. Nothing here gets invented."
            />
          </Reveal>
          <ol className="relative mt-12 space-y-10 border-l border-line pl-8">
            {achievementsTimeline.map((entry) => (
              <li key={entry.title} className="relative">
                <span
                  className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-brand"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {entry.marker}
                </p>
                <h3 className="display-heading mt-1 text-xl text-white">{entry.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-[1.7] text-muted">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trainer credentials */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Credentials"
              title="CERTIFIED TO COACH"
              sub="Looking for a certified personal trainer in Coimbatore? Certification details for each JP Fitness trainer are being collected from the client."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-lg border border-line bg-surface p-6">
                <Award className="h-6 w-6 text-brand" aria-hidden="true" />
                <h3 className="display-heading mt-4 text-lg text-white">
                  TODO: certification name
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted-bright">
                  TODO: issuing body and trainer, from client.
                </p>
                <div className="mt-4">
                  <TodoTag />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition strip: verified items only */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Recognition"
              title="VERIFIED BY OUR MEMBERS"
              sub="Only numbers we can prove appear here."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-6">
              <Star className="h-8 w-8 shrink-0 fill-brand text-brand" aria-hidden="true" />
              <div>
                <p className="display-heading text-2xl text-white">
                  {business.rating.value} on Google
                </p>
                <p className="mt-1 text-sm text-muted-bright">
                  Average rating across all public reviews.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-6">
              <Star className="h-8 w-8 shrink-0 fill-brand text-brand" aria-hidden="true" />
              <div>
                <p className="display-heading text-2xl text-white">
                  {business.rating.count}+ five-star reviews
                </p>
                <p className="mt-1 text-sm text-muted-bright">
                  Counted on our Google listing in June 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
