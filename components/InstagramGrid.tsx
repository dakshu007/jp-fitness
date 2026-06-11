import InstagramIcon from "@/components/InstagramIcon";
import { business, instagramTiles } from "@/lib/data";
import PlaceholderImage from "@/components/PlaceholderImage";
import SectionHeader from "@/components/SectionHeader";
import TodoTag from "@/components/TodoTag";
import Reveal from "@/components/Reveal";

/** Static tile grid linking to Instagram. No embed scripts, per the performance budget. */
export default function InstagramGrid() {
  return (
    <section className="border-t border-line">
      <div className="container-jp py-20 md:py-28">
        <Reveal>
          <SectionHeader
            eyebrow="Instagram"
            title="INSIDE JP FITNESS"
            sub="Posters, training clips and member moments from our Instagram."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((tile, index) => (
            <Reveal key={tile.id} delay={index * 0.04}>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener"
                aria-label={`${tile.alt} (opens Instagram)`}
                className="group block"
              >
                <PlaceholderImage
                  label={tile.label}
                  className="aspect-square w-full transition-colors group-hover:border-brand"
                />
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-4">
          <TodoTag note="Save 6 recent posts locally as images (open item 8); tiles link to the profile." />
        </div>
        <div className="mt-8 flex justify-center">
          <a href={business.instagramUrl} target="_blank" rel="noopener" className="btn-outline">
            <InstagramIcon className="h-4 w-4" />
            Follow {business.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
