import type { Metadata } from "next";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Gamepad2,
  Gift,
  Heart,
  MessageCircle,
  Moon,
  Phone,
  Scale,
  Sun,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import {
  anniversaryCompetition as event,
  business,
  competitionWaLink,
  SITE_URL,
  strengthClassic as pastEvent,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "JP Fitness 1st Anniversary Fitness Competition | Events in Kalapatti",
  description:
    "JP Fitness 1st Anniversary Fitness Competition for all members: men's and women's categories below and above 70 kg. Competition on 27 October, fun games on 28 October, prize distribution on 3 November. Call 99659 72440.",
  alternates: { canonical: "/events/" },
};

/** SportsEvent structured data, built from the same verified poster facts. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: event.name,
  description: `${event.tagline} ${event.eligibility}. Men's events: deadlift, dead hang, plank, push-up. Women's events: deadlift, wall sit, plank. Weight categories below and above 70 kg.`,
  startDate: event.isoStart,
  endDate: event.isoEnd,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  sport: "Fitness",
  image: `${SITE_URL}${event.poster.src}`,
  url: `${SITE_URL}/events/`,
  location: {
    "@type": "Place",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "DM Complex, 800/6, Kalapatti Main Rd, Nehru Nagar West",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641048",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: business.name,
    url: SITE_URL,
  },
};

const scheduleIcon = { morning: Sun, evening: Moon, games: Gamepad2 } as const;
const highlightIcons = [Users, Gift, TrendingUp, Heart];

const detailCard =
  "flex items-start gap-4 rounded-lg border border-line bg-surface p-5";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Upcoming event"
        title={
          <>
            1ST ANNIVERSARY FITNESS <Slashed>COMPETITION</Slashed>
          </>
        }
        sub={`${event.tagline} ${event.eligibility}.`}
      />

      {/* Poster + key details */}
      <section>
        <div className="container-jp py-16 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,400px)_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-line">
                <Image
                  src={event.poster.src}
                  alt={event.poster.alt}
                  width={event.poster.width}
                  height={event.poster.height}
                  sizes="(min-width: 1024px) 400px, 92vw"
                  priority
                  className="h-auto w-full"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={detailCard}>
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        Competition dates
                      </h2>
                      <p className="mt-1 font-semibold text-white">{event.dateRangeDisplay}</p>
                    </div>
                  </div>
                  <div className={detailCard}>
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        Who can take part
                      </h2>
                      <p className="mt-1 font-semibold text-white">{event.eligibility}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Categories */}
              <Reveal delay={0.05}>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {event.categories.map((category) => (
                    <div
                      key={category.title}
                      className="rounded-lg border border-line bg-surface p-6"
                    >
                      <h2 className="display-heading text-2xl text-white">{category.title}</h2>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {category.focus.join(" · ")}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {category.events.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-white">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                        <Scale className="h-4 w-4 text-brand" aria-hidden="true" />
                        Weight category
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {category.weightClasses.map((weight) => (
                          <span
                            key={weight}
                            className="rounded-md border border-line px-3 py-2 text-center text-sm font-semibold text-white"
                          >
                            {weight}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Schedule */}
              <Reveal delay={0.1}>
                <div className="mt-6 rounded-lg border border-line bg-surface p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
                    <Clock className="h-5 w-5 text-brand" aria-hidden="true" />
                    Event schedule
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {event.schedule.map((slot) => {
                      const Icon = scheduleIcon[slot.kind];
                      return (
                        <div
                          key={`${slot.dateDisplay}-${slot.title}`}
                          className="rounded-lg border border-line p-5"
                        >
                          <Icon className="h-5 w-5 text-[#ffd400]" aria-hidden="true" />
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                            {slot.dateDisplay}
                          </p>
                          <p className="display-heading mt-1 text-xl text-white">{slot.title}</p>
                          <p className="text-sm text-muted-bright">{slot.detail}</p>
                          <p className="mt-2 font-semibold text-brand">{slot.timeDisplay}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 rounded-lg border border-[#ffd400]/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 shrink-0 text-[#ffd400]" aria-hidden="true" />
                      <span className="display-heading text-xl text-[#ffd400]">
                        Prize distribution
                      </span>
                    </p>
                    <p className="font-semibold text-white">
                      {event.prizeDistribution.dateDisplay}, {event.prizeDistribution.timeDisplay}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Highlights */}
              <Reveal delay={0.15}>
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {event.highlights.map((item, index) => {
                    const Icon = highlightIcons[index % highlightIcons.length];
                    return (
                      <li key={item} className="text-center">
                        <Icon className="mx-auto h-6 w-6 text-brand" aria-hidden="true" />
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white">
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <p className="display-heading mt-8 text-xl text-white">{event.motto}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Register */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Register now"
              title="CALL OR MESSAGE TO TAKE PART"
              sub="Reach the JP Fitness team to register, pick your batch and get the rules."
            />
          </Reveal>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={competitionWaLink} target="_blank" rel="noopener" className="btn-brand">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Register on WhatsApp
            </a>
            <a href={business.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader eyebrow="Past events" title="COMPLETED EVENTS" />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 grid items-center gap-6 rounded-lg border border-line bg-surface p-5 sm:grid-cols-[160px_1fr] md:p-6">
              <div className="overflow-hidden rounded-md border border-line">
                <Image
                  src={pastEvent.poster.src}
                  alt={pastEvent.poster.alt}
                  width={pastEvent.poster.width}
                  height={pastEvent.poster.height}
                  sizes="160px"
                  className="h-auto w-full grayscale"
                />
              </div>
              <div>
                <span className="inline-flex items-center rounded-full border border-line bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  Event closed
                </span>
                <h3 className="display-heading mt-3 text-2xl text-white">{pastEvent.name}</h3>
                <p className="mt-1 text-sm font-semibold text-muted-bright">
                  {pastEvent.dateDisplay} · {pastEvent.venue}
                </p>
                <p className="mt-3 text-sm leading-[1.7] text-muted">
                  {pastEvent.tagline}, presented by {pastEvent.presenter}. Entries for this
                  championship are closed. Thank you to every athlete, coach and supporter who
                  took part.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Train where champions are made."
        sub="Join JP Fitness in Kalapatti and get contest-level coaching all year round."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </>
  );
}
