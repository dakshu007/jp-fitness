import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { business, hours, navLinks } from "@/lib/data";

const columnHeading =
  "text-xs font-semibold uppercase tracking-[0.22em] text-muted";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-jp pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={business.logoSrc}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-md"
              />
              <span className="display-heading text-xl tracking-[0.05em]">JP FITNESS</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-muted">
              {business.tagline} {business.type} in Kalapatti, Coimbatore.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener"
                aria-label="JP Fitness on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-white transition-colors hover:border-brand"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={business.phoneHref}
                aria-label={`Call JP Fitness on ${business.phoneDisplay}`}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-white transition-colors hover:border-brand"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className={columnHeading}>Quick links</h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className={columnHeading}>Opening hours</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {hours.map((row) => (
                <div key={row.days}>
                  <dt className="font-semibold text-white">{row.days}</dt>
                  <dd className="mt-1 text-muted">
                    {row.morning}
                    <br />
                    {row.evening}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h2 className={columnHeading}>Contact</h2>
            <address className="mt-4 text-sm not-italic leading-[1.7] text-muted">
              {business.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-2 block text-white/80">{business.landmark}</span>
            </address>
            <a
              href={business.phoneHref}
              className="mt-3 inline-block py-1 text-sm font-semibold text-white hover:text-white/80"
            >
              {business.phoneDisplay}
            </a>
            <div className="mt-4">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener"
                className="btn-brand h-11"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>
        </div>

        {/* App download row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-white">Train with the JP Fitness app</p>
            <p className="mt-1 text-sm text-muted">
              {business.appName}, free on Android.
            </p>
          </div>
          <a
            href={business.playStoreUrl}
            target="_blank"
            rel="noopener"
            aria-label="Download the JP Fitness app on Google Play"
            className="shrink-0"
          >
            <Image
              src="/images/google-play-badge.png"
              alt="Get it on Google Play"
              width={161}
              height={48}
            />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-line pt-6">
          <p className="text-sm text-muted">© 2026 JP Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
