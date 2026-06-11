"use client";

import { useMemo, useState } from "react";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

/** Filterable masonry grid (CSS columns) with a custom lightbox. */
export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory["id"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter gallery photos">
        {galleryCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              setFilter(category.id);
              setOpenIndex(null);
            }}
            aria-pressed={filter === category.id}
            className={`h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
              filter === category.id
                ? "border-brand bg-brand text-white"
                : "border-line bg-transparent text-muted hover:border-brand hover:text-white"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo: ${image.alt}`}
            className="group mb-4 block w-full break-inside-avoid"
          >
            <div
              className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-brand ${image.aspect}`}
            >
              <span className="max-w-[85%] px-4 text-center text-xs leading-relaxed text-muted">
                {image.label}
              </span>
              <span className="absolute bottom-3 left-3 rounded bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-bright">
                {image.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
