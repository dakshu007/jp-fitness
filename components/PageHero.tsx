import type { ReactNode } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
}

/** Short hero for inner pages. Static markup keeps LCP instant. */
export default function PageHero({ eyebrow, title, sub }: PageHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-jp pb-14 pt-32 md:pb-20 md:pt-44">
        <SectionEyebrow label={eyebrow} />
        <h1 className="display-heading mt-4 max-w-4xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] text-white">
          {title}
        </h1>
        {sub ? (
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-muted md:text-lg">{sub}</p>
        ) : null}
      </div>
    </section>
  );
}
