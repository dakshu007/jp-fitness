import type { ReactNode } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}

export default function SectionHeader({ eyebrow, title, sub, center }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto flex flex-col items-center text-center" : ""}`}>
      <SectionEyebrow label={eyebrow} />
      <h2 className="display-heading mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] text-white">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-base leading-[1.7] text-muted">{sub}</p> : null}
    </div>
  );
}
