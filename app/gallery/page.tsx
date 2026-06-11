import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";
import TodoTag from "@/components/TodoTag";

export const metadata: Metadata = {
  title: "Gym Photos & Equipment Gallery | JP Fitness Kalapatti",
  description:
    "Take a look inside JP Fitness: modern equipment, training floor and events at our unisex gym on Kalapatti Main Road, Coimbatore.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            INSIDE THE <Slashed>GYM</Slashed>
          </>
        }
        sub="Photos of the training floor, equipment and events at our gym in Kalapatti."
      />

      <section>
        <div className="container-jp py-16 md:py-24">
          <div className="mb-8 rounded-lg border border-dashed border-line bg-surface p-5">
            <TodoTag note="Every tile is a placeholder sized like the real photo. Replace with 12 to 16 originals from the client via WhatsApp or Drive (open item 8)." />
          </div>
          <GalleryGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
