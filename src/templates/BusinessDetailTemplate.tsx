import { PortableText } from "@portabletext/react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MediaGallery, type MediaGalleryItem } from "@/components/ui/MediaGallery";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { ReviewSummary } from "@/components/business/ReviewSummary";
import { ReviewsList } from "@/components/business/ReviewsList";
import { ReviewForm } from "@/components/business/ReviewForm";
import type { Review } from "@/components/business/ReviewCard";
import type { Business } from "@/lib/sanity/types";
import { buildDirectionsUrl } from "@/lib/maps";

interface BusinessDetailTemplateProps {
  business: Business;
  /** No `review` schema exists yet — always empty until that's built. */
  reviews?: Review[];
  galleryItems?: MediaGalleryItem[];
}

// Shared by every business detail page, rendered at /listing/[slug]/ (see
// CLAUDE.md — this URL structure is preserved/confirmed, not to be changed
// to a category-prefixed route without explicit approval).
export function BusinessDetailTemplate({
  business,
  reviews = [],
  galleryItems = [],
}: BusinessDetailTemplateProps) {
  const directionsUrl = buildDirectionsUrl(business.address);
  const category = business.categories[0];

  return (
    <>
      <PageHero
        eyebrow={category}
        title={business.name}
        description={business.shortDescription}
        image={business.heroImage}
        badgeLabel={business.badgeLabel}
      >
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          {business.status && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime" />
              {business.status === "open" ? "Claimed" : business.status}
            </span>
          )}
          {typeof business.rating === "number" && (
            <span aria-label={`${business.rating} out of 5 stars`}>
              <span aria-hidden="true" className="text-rating">
                {"★".repeat(Math.round(business.rating))}
                {"☆".repeat(5 - Math.round(business.rating))}
              </span>{" "}
              {business.reviewCount ?? 0} Ratings
            </span>
          )}
        </div>
      </PageHero>

      <Container>
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[2fr_1fr]">
          <div>
            {business.description && business.description.length > 0 && (
              <div className="prose max-w-none">
                <PortableText value={business.description} />
              </div>
            )}
            {business.tags && business.tags.length > 0 && (
              <p className="mt-4 text-sm text-muted">Keywords: {business.tags.join(", ")}</p>
            )}

            <div className="mt-10">
              <ReviewSummary
                businessName={business.name}
                rating={business.rating ?? 0}
                reviewCount={business.reviewCount ?? reviews.length}
              />
              <div className="mt-6">
                <ReviewsList reviews={reviews} />
              </div>
              <ReviewForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-border p-6">
              {business.hours && business.hours.length > 0 ? (
                <>
                  <h3 className="font-display text-lg uppercase">Opening Hours</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {business.hours.map((entry) => (
                      <li key={entry.day} className="flex justify-between gap-4">
                        <span>{entry.day}</span>
                        <span>{entry.closed ? "Closed" : `${entry.open} - ${entry.close}`}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-muted">Hours not yet available.</p>
              )}

              {(business.phone || business.website) && (
                <div className="mt-4 space-y-1 text-sm">
                  {business.phone && <p>{business.phone}</p>}
                  {business.website && (
                    <p>
                      <a href={business.website} target="_blank" rel="noreferrer">
                        {business.website}
                      </a>
                    </p>
                  )}
                </div>
              )}

              {business.address && (
                <address className="mt-4 text-sm not-italic text-muted">
                  {[
                    business.address.street,
                    business.address.city,
                    business.address.state,
                    business.address.zip,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  {directionsUrl && (
                    <>
                      {" "}
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Get Directions
                      </a>
                    </>
                  )}
                </address>
              )}
            </div>
            <MapPlaceholder className="mt-4 aspect-video" />
          </aside>
        </div>
      </Container>

      <MediaGallery items={galleryItems} />
    </>
  );
}
