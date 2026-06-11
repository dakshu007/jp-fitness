import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Trophy } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import InstagramIcon from "@/components/InstagramIcon";
import {
  achievementsTimeline,
  business,
  founder,
  founderMedalTotal,
  type MedalCount,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Achievements & Trainers | JP Fitness Kalapatti",
  description:
    "Meet Jaya Prakash, the competitive bodybuilder behind JP Fitness, with 17 podium finishes from Mr. Tirupur to Asian Powerlifting. A 5.0-rated unisex gym in Kalapatti, Coimbatore.",
  alternates: { canonical: "/achievements/" },
};

const medalStyles: { key: keyof MedalCount; label: string; dot: string }[] = [
  { key: "gold", label: "Gold", dot: "bg-[#E3B341]" },
  { key: "silver", label: "Silver", dot: "bg-[#C0C7D1]" },
  { key: "bronze", label: "Bronze", dot: "bg-[#C9824E]" },
];

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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-line">
                <Image
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  width={founder.photo.width}
                  height={founder.photo.height}
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                {founder.name}, known on stage as {founder.nickname}.
              </p>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeader
                  eyebrow="The founder"
                  title={
                    <>
                      THE <Slashed>JP</Slashed> IN JP FITNESS
                    </>
                  }
                  sub={founder.bio}
                />
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-8 flex items-center gap-4 rounded-lg border border-line bg-surface p-5">
                  <Trophy className="h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="display-heading text-2xl text-white">
                      {founderMedalTotal} podium finishes
                    </p>
                    <p className="mt-1 text-sm text-muted-bright">
                      Across powerlifting and bodybuilding, from the district stage to the Asian level.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {founder.titles.map((entry) => (
                    <div key={entry.title} className="rounded-lg border border-line bg-surface p-5">
                      <h3 className="display-heading text-lg text-white">{entry.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {medalStyles.map(({ key, label, dot }) => {
                          const count = entry.medals[key];
                          if (!count) return null;
                          return (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted-bright"
                            >
                              <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                              {count} {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={founder.instagramUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn-outline"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    Follow {founder.nickname}: {founder.instagramHandle}
                  </a>
                  <Link href="/success-stories" className="btn-outline">
                    See member transformations
                  </Link>
                </div>
              </Reveal>
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
              sub="From the competition stage to a gym of our own in Kalapatti."
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
