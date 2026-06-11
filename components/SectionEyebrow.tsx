import { Dumbbell } from "lucide-react";

/** Small uppercase section label flanked by a dumbbell icon, per the poster style. */
export default function SectionEyebrow({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
      <Dumbbell className="h-4 w-4 text-brand" aria-hidden="true" />
      {label}
    </p>
  );
}
