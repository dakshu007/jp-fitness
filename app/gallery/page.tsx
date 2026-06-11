import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import Slashed from "@/components/Slashed";

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
          <GalleryGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
