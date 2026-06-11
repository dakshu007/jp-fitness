/**
 * Clearly visible marker for placeholder content awaiting client input.
 * Nothing on this site is invented; anything tagged TODO ships only after
 * the client supplies and confirms the real content.
 */
export default function TodoTag({ note }: { note?: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        TODO
      </span>
      {note ? <span className="text-xs text-muted">{note}</span> : null}
    </span>
  );
}
