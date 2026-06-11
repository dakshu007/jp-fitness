import type { Metadata } from "next";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Dumbbell,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Ticket,
  Trophy,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import { eventWaLink, SITE_URL, strengthClassic as event } from "@/lib/data";

export const metadata: Metadata = {
  title: "JP Strength Classic 2026 | Powerlifting Championship in Coimbatore",
  description:
    "Open State and Open District bench press and deadlift championship by JP Fitness Centre on Sunday 28 June 2026 in Coimbatore. Entry ₹600 state, ₹500 district. Call 99659 72440 to enter.",
  alternates: { canonical: "/events/" },
};

/** SportsEvent structured data, built from the same verified poster facts. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: event.name,
  description: `${event.tagline}. ${event.organisers}. ${event.affiliations}.`,
  startDate: event.isoStart,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  sport: "Powerlifting",
  image: `${SITE_URL}${event.poster.src}`,
  url: `${SITE_URL}/events/`,
  location: {
    "@type": "Place",
    name: "Coimbatore (venue announced soon)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Amateur Powerlifting Association of Coimbatore",
  },
  offers: event.fees.map((fee) => ({
    "@type": "Offer",
    name: fee.label,
    price: fee.price.replace(/[^0-9]/g, ""),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  })),
};

const detailCard =
  "flex items-start gap-4 rounded-lg border border-line bg-surface p-5";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={
          <>
            JP STRENGTH <Slashed>CLASSIC</Slashed> 2026
          </>
        }
        sub={`${event.tagline}, presented by ${event.presenter}.`}
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
                        Date
                      </h2>
                      <p className="mt-1 font-semibold text-white">{event.dateDisplay}</p>
                    </div>
                  </div>
                  <div className={detailCard}>
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        Time
                      </h2>
                      <p className="mt-1 font-semibold text-white">{event.timeDisplay}</p>
                    </div>
                  </div>
                  <div className={detailCard}>
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        Venue
                      </h2>
                      <p className="mt-1 font-semibold text-white">{event.venue}</p>
                      <p className="mt-1 text-sm text-muted-bright">{event.venueNote}</p>
                    </div>
                  </div>
                  <div className={detailCard}>
                    <Scale className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        Body-weight check
                      </h2>
                      <p className="mt-1 font-semibold text-white">
                        {event.weighIn.dateDisplay}, {event.weighIn.timeDisplay}
                      </p>
                      <p className="mt-1 text-sm text-muted-bright">{event.weighIn.note}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Entry fees */}
              <Reveal delay={0.05}>
                <div className="mt-6 rounded-lg border border-line bg-surface p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
                    <Ticket className="h-5 w-5 text-brand" aria-hidden="true" />
                    Entry fees
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {event.fees.map((fee) => (
                      <div
                        key={fee.label}
                        className="rounded-lg border border-line p-5 text-center"
                      >
                        <p className="display-heading text-3xl text-brand">{fee.price}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{fee.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Lifts */}
              <Reveal delay={0.1}>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className={detailCard}>
                    <Dumbbell className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="font-semibold text-white">Bench press</h2>
                      <p className="mt-1 text-sm text-muted-bright">
                        Open state and open district categories.
                      </p>
                    </div>
                  </div>
                  <div className={detailCard}>
                    <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <h2 className="font-semibold text-white">Deadlift</h2>
                      <p className="mt-1 text-sm text-muted-bright">
                        Open state and open district categories.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-6 text-sm leading-[1.7] text-muted">
                  Organised by the {event.organisers}. {event.affiliations}.
                </p>
                <p className="mt-3 text-sm leading-[1.7] text-muted-bright">{event.invite}</p>
                <p className="display-heading mt-6 text-xl text-white">{event.motto}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts + register */}
      <section className="border-t border-line">
        <div className="container-jp py-16 md:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Enter the championship"
              title="CALL OR MESSAGE TO TAKE PART"
              sub="Reach the organisers for entries, rules and venue updates."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {event.contacts.map((contact) => (
              <a
                key={contact.phoneDisplay}
                href={contact.href}
                className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-brand"
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                  {contact.role}
                </p>
                <p className="mt-2 font-semibold text-white">{contact.phoneDisplay}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={eventWaLink} target="_blank" rel="noopener" className="btn-brand">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask about the championship
            </a>
          </div>
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
