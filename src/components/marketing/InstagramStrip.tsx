import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import { InstagramVideo } from "./InstagramVideo";

interface InstagramStripProps {
  handle?: string;
}

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/containerpark/";

// The approved Instagram assets, served straight from
// public/assets/images/instagram/ — no Instagram Graph API call, no
// credentials, and no placeholder fallback (the old API path in
// src/lib/instagram/ is no longer used by this section). These are local
// copies with no per-post permalink, so every tile links to the profile.
const INSTAGRAM_ASSET_DIR = "/assets/images/instagram";
const INSTAGRAM_TILES: { type: "image" | "video"; src: string }[] = [
  { type: "video", src: `${INSTAGRAM_ASSET_DIR}/insta.mp4` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown1.jpg` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown2.jpg` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown3.jpg` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown4.jpg` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown5.jpg` },
  { type: "image", src: `${INSTAGRAM_ASSET_DIR}/instagram-downtown6.jpg` },
];

// Purely presentational and self-contained — rendered sitewide by
// layout/PageBottom.tsx.
export function InstagramStrip({ handle = "@containerpark" }: InstagramStripProps) {
  return (
    // Two independent containers, per the Figma reference: the
    // heading/eyebrow/button row stays in the site's standard
    // max-w-container (1380px), while only the posts row below widens to
    // the same max-w-[1720px] container used by home/HomeEventsSection.tsx
    // — the row is meant to visibly extend past the text above it, not
    // share one container. mx-auto + max-w-[...] + px-4 can never itself
    // exceed the viewport, so no extra overflow guard is needed on either.
    // overflow-x-hidden is a defensive backstop for the carousel's overlay
    // arrows below (see Carousel.tsx's arrowsOverlay) — same reasoning as
    // its other consumer, home/HomeEventsSection.tsx.
    <section className="overflow-x-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-container px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={EYEBROW_CLASSES}>On Instagram</p>
            <h2 className={`mt-1 ${SECTION_HEADING_CLASSES}`}>{handle}</h2>
          </div>
          <Button href={INSTAGRAM_PROFILE_URL} variant="outline">
            Follow us on Instagram
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] px-4">
        <div className="mt-8">
          {/* Reuses the shared Carousel (see ui/Carousel.tsx) rather than
              a bespoke slider — same loop/arrows/gap behavior as
              FeatureCarousel and HomeEventsSection, including its
              built-in 10px-mobile/24px-desktop gap. arrowsOverlay (not
              heading-row arrows) since this row has no heading of its
              own to share that row with — the real heading/button stays
              in the separate container above, unchanged — and its
              negative-offset math is already tuned for exactly this
              1720px container. */}
          <Carousel ariaLabel="Instagram posts from Downtown Container Park" loop arrowsOverlay>
            {INSTAGRAM_TILES.map((tile) => (
              <a
                key={tile.src}
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Downtown Container Park on Instagram"
                className="group relative block aspect-square w-28 overflow-hidden sm:w-40 lg:w-56"
              >
                {tile.type === "video" ? (
                  <InstagramVideo src={tile.src} className={CARD_IMAGE_HOVER_CLASSES} />
                ) : (
                  <Image
                    src={tile.src}
                    alt="Downtown Container Park on Instagram"
                    fill
                    // Matches the tile's own fixed width at each breakpoint
                    // (w-28 / sm:w-40 / lg:w-56, see the className above).
                    sizes="(min-width: 1024px) 224px, (min-width: 640px) 160px, 112px"
                    className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
                  />
                )}
                <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
              </a>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
