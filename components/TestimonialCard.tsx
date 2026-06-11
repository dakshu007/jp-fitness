import { Star } from "lucide-react";
import TodoTag from "@/components/TodoTag";
import type { Review } from "@/lib/data";

export default function TestimonialCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
      <div className="flex items-center gap-1" role="img" aria-label="Rated 5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-[1.7] text-muted-bright">
        {review.text}
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
        <span className="text-sm font-medium text-white">{review.name}</span>
        <span className="text-xs text-muted">Google review</span>
      </figcaption>
      {review.todo ? (
        <div className="mt-3">
          <TodoTag note="Replace with verbatim review text + first name from the listing." />
        </div>
      ) : null}
    </figure>
  );
}
