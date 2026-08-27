import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/ui/Button";
import { CARD_IMAGE_HOVER_CLASSES } from "@/lib/ui/cardImageHover";
import type { Business } from "@/lib/sanity/types";

interface BusinessCardProps {
  business: Business;
  /** Defaults to /listing/[slug] — the confirmed, preserved production URL structure. */
  hrefBase?: string;
}

// CLICK: only the "View Shop" button is a real link — whether the whole
// card should also be clickable is NEEDS CONFIRMATION (see Figma spec), so
// the rest of the card is intentionally non-interactive. The image still
// gets the sitewide hover-zoom treatment (see cardImageHover.ts) — hovering
// anywhere on the card (the `group`) triggers it, independent of that
// open question.
export function BusinessCard({ business, hrefBase = "/listing" }: BusinessCardProps) {
  const imageUrl = business.heroImage?.asset
    ? urlForImage(business.heroImage).width(480).height(320).url()
    : null;
  const href = `${hrefBase}/${business.slug.current}`;

  return (
    <li className="group border border-border">
      <div className="relative aspect-[3/2] overflow-hidden bg-border">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={business.heroImage?.alt || business.name}
            fill
            className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
          />
        )}
        {business.badgeLabel && (
          <span className="absolute left-2 top-2 bg-lime px-2 py-1 text-[10px] font-semibold uppercase text-lime-foreground">
            {business.badgeLabel}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg uppercase">{business.name}</h3>

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

        {business.website && <p className="mt-1 truncate text-xs text-muted">{business.website}</p>}

        {business.status === "closed" && (
          <p className="mt-1 text-xs font-semibold text-status-closed">Closed now!</p>
        )}

        <div className="mt-3">
          <Button href={href} variant="outline">
            View Shop
          </Button>
        </div>
      </div>
    </li>
  );
}
