"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryPhotos, type GalleryCategory } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

/** Filterable masonry grid (CSS columns) of the gym's real photos, with lightbox. */
export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory["id"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryPhotos
        : galleryPhotos.filter((photo) => photo.category === filter),
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
        {visible.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo: ${photo.alt}`}
            className="group relative mb-4 block w-full break-inside-avoid"
          >
            <span className="block overflow-hidden rounded-lg border border-line transition-colors group-hover:border-brand">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="h-auto w-full"
              />
            </span>
            <span className="absolute bottom-3 left-3 rounded bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-bright">
              {galleryCategories.find((c) => c.id === photo.category)?.label}
            </span>
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
