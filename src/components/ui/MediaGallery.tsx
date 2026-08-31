"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import type { SanityImage } from "@/lib/sanity/types";

export interface MediaGalleryItem {
  image: SanityImage;
  isVideo?: boolean;
  /** Required when isVideo is true — the real video source for this tile
   * (see VideoPlayer/VideoModal). Ignored otherwise. */
  videoUrl?: string;
}

interface MediaGalleryProps {
  heading?: string;
  eyebrow?: string;
  items: MediaGalleryItem[];
}

// DATA: NEEDS SCHEMA GAP — `business.gallery[]` is images-only today; the
// `isVideo`/`videoUrl` fields have no real field backing them yet (see
// CLAUDE.md gap list) for the per-business aggregation path (see
// templates/ListingTemplate.tsx's default) — only a page passing explicit
// `items` (e.g. the Shop page's curated gallery) can supply a video tile
// today.
//
// Two separate popups, matching the two separate kinds of tile:
// - Video tiles reuse VideoPlayer as-is (same ring asset, same hover-spin,
//   same VideoModal) — this component owns none of that itself, just
//   positions VideoPlayer over the tile's poster image.
// - Every non-video tile opens the SAME ImageLightbox instance (state
//   lives here, not per-tile), positioned at whichever photo was actually
//   clicked, with Previous/Next stepping through the photo-only subset —
//   the video tile is intentionally excluded from that navigation set
//   since it isn't a lightbox image.
export function MediaGallery({
  heading = "Featured Videos and Photos",
  eyebrow = "Media Gallery",
  items,
}: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const photoItems = items.filter((item) => !item.isVideo);
  const lightboxImages = photoItems.map((item) => ({
    url: item.image?.asset ? urlForImage(item.image).width(1600).height(1200).url() : "",
    alt: item.image.alt || heading,
  }));
  // Each item's position within the photo-only subset (null for the video
  // tile) — a pure derivation (no mutation across iterations) so it's safe
  // to compute directly in the render body.
  const photoIndexByItem = items.reduce<(number | null)[]>((acc, item) => {
    if (item.isVideo) return [...acc, null];
    return [...acc, acc.filter((value) => value !== null).length];
  }, []);

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
            const tile = url && (
              <Image
                src={url}
                alt={item.image.alt || ""}
                fill
                className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
              />
            );

            if (item.isVideo) {
              return (
                // `group` here (not just on VideoPlayer's own inner button)
                // so the hover darken/zoom responds to the whole tile, not
                // only the small play-button hitbox — VideoPlayer's own
                // separate `group` (its ring-spin animation) is scoped to
                // itself and unaffected by this outer one.
                <li key={index} className="group relative aspect-[4/3] overflow-hidden bg-white/10">
                  {tile}
                  <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <VideoPlayer videoUrl={item.videoUrl} title={item.image.alt || heading} />
                  </div>
                </li>
              );
            }

            const thisPhotoIndex = photoIndexByItem[index];
            return (
              <li key={index} className="relative aspect-[4/3] overflow-hidden bg-white/10">
                <button
                  type="button"
                  onClick={() => thisPhotoIndex !== null && setLightboxIndex(thisPhotoIndex)}
                  aria-label={`View image: ${item.image.alt || heading}`}
                  className="group block h-full w-full"
                >
                  {tile}
                  <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        title={heading}
      />
    </section>
  );
}
