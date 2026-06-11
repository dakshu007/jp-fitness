import PlaceholderImage from "@/components/PlaceholderImage";
import TodoTag from "@/components/TodoTag";
import type { Trainer } from "@/lib/data";

export default function TrainerCard({ trainer, index }: { trainer: Trainer; index: number }) {
  return (
    <article className="w-60 shrink-0 snap-start">
      <PlaceholderImage
        label={`Photo: trainer ${index + 1} (800x1000)`}
        className="aspect-[4/5] w-full"
      />
      <h3 className="display-heading mt-3 text-lg text-white">{trainer.name}</h3>
      <p className="mt-1 text-sm text-muted">{trainer.specialisation}</p>
      {trainer.todo ? (
        <div className="mt-2">
          <TodoTag />
        </div>
      ) : null}
    </article>
  );
}
