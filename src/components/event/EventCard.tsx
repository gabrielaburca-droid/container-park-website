import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/ui/Button";
import { CARD_IMAGE_HOVER_CLASSES } from "@/lib/ui/cardImageHover";
import { CARD_TITLE_CLASSES } from "@/lib/ui/typography";
import type { EventDoc } from "@/lib/sanity/types";

// The whole card is one link (not just the "View Event Info" button) — it
// wraps everything in a single <Link>, and the button is rendered in
// Button's `visual` mode (a styled <span>, not a second nested <a>) so
// there's exactly one interactive/focusable element per card. The image's
// hover-zoom and the button's hover-fill/arrow both key off the outer
// Link's own `group` class, so hovering anywhere on the card animates
// both together as one unit.
//
// Equal height: the <li>/Link/content column are all flex-col + h-full,
// so every card matches the tallest card in its row (grid's default
// align-items: stretch handles this in the two grid-based consumers;
// Carousel's flex track does the same). The subtitle is line-clamp-2'd so
// long copy truncates instead of growing the card, and mt-auto on the CTA
// pins it to the same baseline across every card regardless of how much
// title/subtitle text precedes it.
interface EventCardProps {
  event: EventDoc;
  /** Extra classes on the outer <li> — e.g. a fixed width when this card
   * sits in a horizontal carousel track instead of its usual CSS grid
   * (grid items stretch to their column automatically; a flex/carousel
   * track item needs an explicit width). Empty by default so the two
   * grid-based consumers (EventsListingClient, the event detail page's
   * related-events grid) are unaffected. */
  className?: string;
}

export function EventCard({ event, className = "" }: EventCardProps) {
  const imageUrl = event.heroImage?.asset
    ? urlForImage(event.heroImage).width(480).height(320).url()
    : null;
  const date = new Date(event.startDate);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  return (
    // list-none is required directly here (not just on the parent <ul>):
    // when this card sits in Carousel's plain <div> track (no <ul>
    // ancestor for Tailwind's Preflight ul/ol reset to target), the
    // browser's default UA list-item marker would otherwise render
    // unsuppressed.
    <li className={`list-none h-full border border-border ${className}`.trim()}>
      <Link
        href={`/events/${event.slug.current}`}
        className="group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-border">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={event.heroImage?.alt || event.title}
              fill
              className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
            />
          )}
          {/* Fixed size and flush to the image's top-right corner
              (top-0 right-0, no inset) — anchored to/overlapping the
              image rather than floating above it with a gap. Day is
              always 2 digits and month always a 3-letter abbreviation
              (Intl "2-digit"/"short"), so the box's rendered size is
              already naturally consistent card-to-card; the fixed width
              just guarantees it explicitly. Scales down proportionally
              at smaller breakpoints (day: 32px mobile / 40px tablet /
              54px desktop) rather than staying fixed at the desktop
              size, keeping the same box-to-type proportions throughout. */}
          <div className="absolute right-0 top-0 flex w-12 flex-col items-center justify-center bg-lime px-2 py-2 text-center text-lime-foreground sm:w-16 sm:py-2.5 lg:w-20 lg:py-3">
            <span className="font-display text-[32px] leading-none sm:text-[40px] lg:text-[54px]">
              {day}
            </span>
            <span className="mt-1 text-xs font-medium uppercase leading-none sm:text-sm lg:text-base">
              {month}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className={CARD_TITLE_CLASSES}>{event.title}</h3>
          {/* shortDescription: TODO SCHEMA GAP — see src/lib/sanity/types.ts */}
          {event.shortDescription && (
            <p className="mt-1 line-clamp-2 text-sm text-muted">{event.shortDescription}</p>
          )}
          <div className="mt-auto pt-3">
            <Button variant="outline" visual>
              View Event Info
            </Button>
          </div>
        </div>
      </Link>
    </li>
  );
}
