import Image from "next/image";
import { Check } from "lucide-react";
import { appBullets, appMockup, business } from "@/lib/data";
import SectionEyebrow from "@/components/SectionEyebrow";
import TodoTag from "@/components/TodoTag";
import Reveal from "@/components/Reveal";

export default function AppDownload() {
  return (
    <section className="border-t border-line">
      <div className="container-jp py-20 md:py-28">
        <Reveal>
          <div className="grid items-center gap-10 rounded-lg border border-line bg-surface p-8 md:grid-cols-2 md:p-12">
            <div className="mx-auto w-48 overflow-hidden rounded-[1.5rem] border-4 border-line bg-ink sm:w-56 md:w-64">
              <Image
                src={appMockup.src}
                alt={appMockup.alt}
                width={appMockup.width}
                height={appMockup.height}
                sizes="(min-width: 768px) 256px, 224px"
                className="h-auto w-full"
              />
            </div>
            <div>
              <SectionEyebrow label="Train anywhere" />
              <h2 className="display-heading mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] text-white">
                Carry your coach in your pocket
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-[1.7] text-muted-bright md:text-base">
                {appBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={business.playStoreUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="Download the JP Fitness app on Google Play"
                  className="inline-block"
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={188}
                    height={56}
                  />
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                {business.appName} on Android.{" "}
                <TodoTag note="add the App Store link if one exists" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
