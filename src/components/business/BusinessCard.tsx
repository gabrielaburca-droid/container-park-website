import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/ui/Button";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import { getOpenStatus } from "@/lib/business/openStatus";
import type { Business } from "@/lib/sanity/types";

interface BusinessCardProps {
  business: Business;
  /** Defaults to /listing/[slug] — the confirmed, preserved production URL structure. */
  hrefBase?: string;
}

// CLICK: the image and the title are both real links to the business
// detail page now, same destination as "View Shop" below — three
// independent, equally-real ways in, not one primary link with the others
// faked. The image still gets the sitewide hover-zoom treatment (see
// cardImageHover.ts) — hovering anywhere on the card (the `group`)
// triggers it, independent of which specific element is clicked.
export function BusinessCard({ business, hrefBase = "/listing" }: BusinessCardProps) {
  const imageUrl = business.heroImage?.asset
    ? urlForImage(business.heroImage).width(480).height(320).url()
    : null;
  const href = `${hrefBase}/${business.slug.current}`;
  // Real-time, not a stored field — see lib/business/openStatus.ts for why.
  const openStatus = getOpenStatus(business.hours);

  return (
    // flex + h-full: the grid (ListingTemplate) already stretches every
    // <li> to the tallest card in its row by default — this makes the
    // CONTENT inside actually fill that height too, so mt-auto on the
    // button wrapper below can pin "View Shop" to the bottom of every
    // card on the same row, regardless of how much text (tagline/rating/
    // website/status) any individual card has above it.
    <li className="group flex h-full flex-col border border-border">
      <Link
        href={href}
        aria-label={business.name}
        className="relative block aspect-[3/2] shrink-0 overflow-hidden bg-border"
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={business.heroImage?.alt || business.name}
            fill
            // ListingTemplate's grid: grid-cols-1 / sm:2 / md:3 / lg:4
            // inside max-w-container (1380px).
            sizes="(min-width: 1380px) 319px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
          />
        )}
        {/* Sits above the image but below the badge/tagline below it (DOM
            order), so those stay fully crisp/legible on hover instead of
            darkening along with the photo. */}
        <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
        {business.badgeLabel && (
          <span className="absolute left-2 top-2 bg-lime px-2 py-1 text-[10px] font-semibold uppercase text-lime-foreground">
            {business.badgeLabel}
          </span>
        )}
        {/* Real per-listing tagline (see data/mock/businesses.ts), not a
            generic category label — transcribed from the live site's own
            listing cards, so it's genuinely absent (no overlay rendered)
            for listings that don't have one set there. Green background
            sized to the text itself (w-fit), not a full-width strip —
            positioned exactly top:0 / left:20px per spec.
            A deliberate, card-specific exception to the sitewide Bebas
            Neue eyebrow treatment — Inter, 12px, not uppercase, normal
            (zero) letter-spacing, literal black text — not the shared
            EYEBROW_CLASSES scale used elsewhere, per spec. */}
        {business.tagline && (
          <p className="absolute left-5 top-0 line-clamp-2 w-fit max-w-[calc(100%-2.5rem)] bg-lime px-2 py-1 font-sans text-xs font-medium tracking-normal text-black">
            {business.tagline}
          </p>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-lg uppercase">
            <Link href={href}>{business.name}</Link>
          </h3>
          {/* Real provided asset (public/assets/images/all/claimed.svg) —
              only for listings actually marked "Claimed" on the live site
              (business.claimed), never shown universally. */}
          {business.claimed && (
            <Image
              src="/assets/images/all/claimed.svg"
              alt="Claimed listing"
              width={18}
              height={18}
              className="h-4 w-4 shrink-0"
            />
          )}
        </div>

        {typeof business.rating === "number" && (
          <p className="mt-1 text-sm text-rating" aria-label={`${business.rating} out of 5 stars`}>
            <span aria-hidden="true">
              {"★".repeat(Math.round(business.rating))}
              {"☆".repeat(5 - Math.round(business.rating))}
            </span>{" "}
            <span className="text-muted">
              {business.reviewCount ?? 0} Rating{business.reviewCount === 1 ? "" : "s"}
            </span>
          </p>
        )}

        {/* Real web-icon.svg asset immediately before the URL text, both
            in an items-center flex row so they're vertically centered
            against each other. Underline is unconditional (not
            hover:underline) — visible in the default state per spec, not
            only on hover. min-w-0 on the text span is required for
            truncate to actually work inside a flex row. */}
        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex w-full items-center gap-1 font-sans text-xs text-black underline underline-offset-2"
          >
            <Image
              src="/assets/images/all/web-icon.svg"
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 shrink-0"
            />
            <span className="min-w-0 truncate">{business.website}</span>
          </a>
        )}

        {openStatus === "closed" && (
          <p className="mt-1 text-xs font-semibold text-status-closed">Closed now!</p>
        )}
        {openStatus === "open" && (
          <p className="mt-1 text-xs font-semibold text-foreground">Open now</p>
        )}

        <div className="mt-auto pt-3">
          <Button href={href} variant="outline">
            View Shop
          </Button>
        </div>
      </div>
    </li>
  );
}
