"use client";

import { useState } from "react";
import Image from "next/image";
import { transformationPhotos } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

/**
 * Member before/after collages (supplied by the client) in a masonry grid
 * with the shared lightbox.
 */
export default function TransformationGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {transformationPhotos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo: ${photo.alt}`}
            className="group mb-4 block w-full break-inside-avoid"
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
          </button>
        ))}
      </div>

      <Lightbox
        items={transformationPhotos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
