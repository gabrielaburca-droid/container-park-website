import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
import type { SanityImage } from "@/lib/sanity/types";

export interface MediaGalleryItem {
  image: SanityImage;
  isVideo?: boolean;
}

interface MediaGalleryProps {
  heading?: string;
  eyebrow?: string;
  items: MediaGalleryItem[];
}

// CLICK: NEEDS CONFIRMATION — tapping a tile (lightbox/modal/inline play vs.
// nothing) is not shown anywhere in the supplied design. Tiles are
// non-interactive for now.
// DATA: NEEDS SCHEMA GAP — `business.gallery[]` is images-only today; the
// `isVideo` flag has no real field backing it yet (see CLAUDE.md gap list).
export function MediaGallery({
  heading = "Featured Videos and Photos",
  eyebrow = "Media Gallery",
  items,
}: MediaGalleryProps) {
  if (items.length === 0) return null;

  return (
    <section className="bg-near-black py-16 text-near-black-foreground">
      <div className="mx-auto max-w-container px-4">
        <p className={EYEBROW_CLASSES}>{eyebrow}</p>
        <h2 className={`mt-1 ${SECTION_HEADING_CLASSES}`}>{heading}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item, index) => {
            const url = item.image?.asset
              ? urlForImage(item.image).width(400).height(300).url()
              : null;
            return (
              <li key={index} className="relative aspect-[4/3] overflow-hidden bg-white/10">
                {url && (
                  <Image src={url} alt={item.image.alt || ""} fill className="object-cover" />
                )}
                {item.isVideo && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 text-xs font-semibold uppercase text-white">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white"
                    >
                      ▶
                    </span>
                    Play Video
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
