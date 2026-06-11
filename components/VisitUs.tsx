import { MapPin } from "lucide-react";
import { business, hours } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import MapFacade from "@/components/MapFacade";
import Reveal from "@/components/Reveal";
import Slashed from "@/components/Slashed";

export default function VisitUs() {
  return (
    <section className="border-t border-line">
      <div className="container-jp py-20 md:py-28">
        <Reveal>
          <SectionHeader
            eyebrow="Visit us"
            title={
              <>
                VISIT US IN <Slashed>KALAPATTI</Slashed>
              </>
            }
            sub="Walk in any day of the week. We are on the 4th floor of DM Complex, above Grace and Bakes, near the Nehru Nagar signal."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Opening hours
            </h3>
            <table className="mt-4 w-full border-collapse text-sm">
              <caption className="sr-only">JP Fitness opening hours by day</caption>
              <thead>
                <tr className="border-b border-line text-left">
                  <th scope="col" className="py-3 pr-4 font-semibold text-muted">
                    Days
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-muted">
                    Morning
                  </th>
                  <th scope="col" className="py-3 font-semibold text-muted">
                    Evening
                  </th>
                </tr>
              </thead>
              <tbody>
                {hours.map((row) => (
                  <tr key={row.days} className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 text-left font-semibold text-white">
                      {row.days}
                    </th>
                    <td className="py-3 pr-4 text-muted">{row.morning}</td>
                    <td className="py-3 text-muted">{row.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted">Open 7 days a week.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Address
            </h3>
            <address className="mt-4 text-sm not-italic leading-[1.8] text-muted">
              {business.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-sm font-semibold text-white">{business.landmark}</p>
            <a
              href={business.phoneHref}
              className="mt-4 inline-block py-1 text-base font-semibold text-white hover:text-white/80"
            >
              {business.phoneDisplay}
            </a>
            <div className="mt-6">
              <a href={business.mapsUrl} target="_blank" rel="noopener" className="btn-brand">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </Reveal>
        </div>

        <MapFacade />
      </div>
    </section>
  );
}
