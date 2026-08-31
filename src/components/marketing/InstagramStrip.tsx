import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import type { InstagramImage } from "@/lib/instagram/types";

interface InstagramStripProps {
  images?: InstagramImage[];
  handle?: string;
  profileUrl?: string;
}

const PLACEHOLDER_COUNT = 7;

// Purely presentational — data-fetching lives in
// src/lib/instagram/queries.ts (getInstagramPosts), called by
// layout/PageBottom.tsx and passed down as `images`. Renders the real
// latest posts when supplied, each tile linking out to its own permalink;
// otherwise shows 7 neutral placeholder tiles matching the design's grid
// (not real/invented photo content) rather than an empty state — this is
// the fallback while no Instagram Graph API credentials are configured
// (see CLAUDE.md). The placeholder path stays a plain static grid (no real
// interactive content to scroll through); only the real-posts path below
// is a Carousel.
export function InstagramStrip({
  images = [],
  handle = "@containerpark",
  profileUrl,
}: InstagramStripProps) {
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
            <p className={EYEBROW_CLASSES}>Follow the Flow</p>
            <h2 className={`mt-1 ${SECTION_HEADING_CLASSES}`}>{handle}</h2>
          </div>
          {profileUrl && (
            <Button href={profileUrl} variant="outline">
              Follow us on Instagram
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] px-4">
        {images.length > 0 ? (
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
            <Carousel ariaLabel="Latest Instagram posts from Downtown Container Park" loop arrowsOverlay>
              {images.map((image, index) => (
                <a
                  key={index}
                  href={image.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View this post on Instagram"
                  className="group relative block aspect-square w-28 overflow-hidden sm:w-40 lg:w-56"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
                  />
                  <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
                </a>
              ))}
            </Carousel>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-7" aria-hidden="true">
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
              <li key={index} className="aspect-square bg-border" />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
