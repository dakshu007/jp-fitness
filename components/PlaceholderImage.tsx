/**
 * Solid #161616 placeholder block with a centered muted label, sized exactly
 * like the real image it stands in for (see image manifest in the README).
 * Swap for next/image once the client's photos arrive; the layout will not shift.
 */
export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-line bg-surface ${className}`}
    >
      <span className="px-4 text-center text-xs leading-relaxed text-muted">{label}</span>
    </div>
  );
}
