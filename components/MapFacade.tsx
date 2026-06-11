"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { business } from "@/lib/data";

/**
 * Click-to-load map facade: the Google Maps iframe is injected only on demand,
 * so third-party script weight never touches the initial page load.
 */
export default function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const src = `https://maps.google.com/maps?ll=${business.geo.lat},${business.geo.lng}&q=JP%20Fitness%20Kalapatti%20Coimbatore&z=16&output=embed`;

  return (
    <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface sm:aspect-[16/7]">
      {loaded ? (
        <iframe
          src={src}
          title="Map showing the JP Fitness location in Kalapatti, Coimbatore"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin className="h-8 w-8 text-brand" aria-hidden="true" />
          <p className="max-w-sm text-sm leading-[1.7] text-muted-bright">
            The interactive map loads only when you ask for it, keeping this page fast.
          </p>
          <button type="button" onClick={() => setLoaded(true)} className="btn-brand">
            Load map
          </button>
        </div>
      )}
    </div>
  );
}
