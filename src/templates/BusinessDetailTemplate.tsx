import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MediaGallery, type MediaGalleryItem } from "@/components/ui/MediaGallery";
import { ReviewSummary } from "@/components/business/ReviewSummary";
import { ReviewsList } from "@/components/business/ReviewsList";
import { ReviewForm } from "@/components/business/ReviewForm";
import type { Review } from "@/components/business/ReviewCard";
import type { Business } from "@/lib/sanity/types";
import { buildDirectionsUrl, buildMapsEmbedUrl } from "@/lib/maps";
import { getOpenStatus, getTodayHours } from "@/lib/business/openStatus";

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
  const mapsEmbedUrl = buildMapsEmbedUrl(business.address);
  const category = business.categories[0];
  // Real per-business tagline (business/BusinessCard.tsx already shows the
  // same field over the Shop grid image) — shown as the small pill badge
  // above the headline block (Hero no longer also repeats it as a plain
  // line below the H1 — that line was removed entirely, see the PageHero
  // call below). Guarded against the one real data-quality case where a
  // business's own scraped tagline happens to equal its name (e.g. Black
  // Spade Tattoo) — showing that would reintroduce the exact
  // duplicate-business-name problem already fixed once, just via a
  // different field.
  const tagline = business.tagline && business.tagline !== business.name ? business.tagline : undefined;
  const openStatus = getOpenStatus(business.hours);
  const todayHours = getTodayHours(business.hours);

  return (
    <>
      {/* No `description` here — the Hero must contain only the category
          label, the H1, and the claimed/rating row below (see `children`),
          nothing between H1 and that row. PageHero's `description` slot is
          real, load-bearing content on almost every other page (Contact,
          Leasing, Shop, Events, etc.) — this only omits it at this one
          call site, not from the shared component. */}
      <PageHero
        eyebrow={category}
        title={business.name}
        image={business.heroImage}
        badgeLabel={tagline}
        detail
      >
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          {business.claimed && (
            <span className="flex items-center gap-1.5">
              {/* Real project asset (public/assets/images/all/claimed.svg)
                  — same one already used on the listing cards
                  (business/BusinessCard.tsx), not a generic dot. Only for
                  listings actually marked Claimed on the live site. */}
              <Image
                src="/assets/images/all/claimed.svg"
                alt="Claimed listing"
                width={18}
                height={18}
                className="h-4 w-4 shrink-0"
              />
              Claimed
            </span>
          )}
          {/* Decorative divider between the two groups, per the Figma
              reference — only shown when both are actually present. */}
          {business.claimed && typeof business.rating === "number" && (
            <span aria-hidden="true" className="h-4 w-px bg-white/40" />
          )}
          {typeof business.rating === "number" && (
            <span aria-label={`${business.rating} out of 5 stars`}>
              <span aria-hidden="true" className="text-rating">
                {"★".repeat(Math.round(business.rating))}
                {"☆".repeat(5 - Math.round(business.rating))}
              </span>{" "}
              {business.reviewCount ?? 0} Review{business.reviewCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </PageHero>

      {/* Full-bleed band (not confined to the 1380px Container's own inner
          content width — it wraps AROUND a Container below, same pattern as
          marketing/PlanYourVisitBar.tsx) — reusing that section's exact
          gradient implementation (bg-gradient-to-r, #F5F5F5 -> the
          `background` token, i.e. #FFFFFF) rather than a new one. Wraps the
          description, review content, AND the hours/map sidebar together
          since they all share this one row — matching how PlanYourVisitBar
          itself carries several distinct columns on one shared gradient
          band. */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        {/* Decorative blurred lime circle, top-right — purely visual, no
            real content. `isolate` on this <section> gives it its own
            stacking context, so the circle's negative z-index (below)
            keeps it contained/behind THIS section's own real content
            without bleeding behind the Hero or any other section on the
            page. `pointer-events-none` + `aria-hidden` keep it fully out
            of the way of clicks/keyboard/screen readers.

            The circle still visually bleeds past the 1380px inner
            Container's edge into this full-bleed section's own gutter,
            per spec — but this section (already flush with the viewport's
            own edge) needs `overflow-x-hidden` too: an absolutely
            positioned descendant still expands its nearest scrolling
            ancestor's scrollable width even with a negative z-index, so
            without this the page itself gained a real horizontal
            scrollbar at every breakpoint (confirmed via testing) despite
            the circle being purely decorative and behind everything
            visually. This clips it at the section's own edge — i.e. the
            actual viewport edge here — instead of the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />
        <Container>
          <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[2fr_1fr]">
            <div>
              {/* Real per-business description, transcribed as-is from the
                  live site (see data/mock/businesses.ts) — left column,
                  directly above the Reviews heading, per spec. */}
              {business.description && business.description.length > 0 && (
                // text-sm/sm:text-base cascades into PortableText's own
                // unstyled <p> tags (no size class of their own) — 14px on
                // mobile, back to the original 16px from sm: up.
                <div className="prose max-w-none text-sm sm:text-base">
                  <PortableText value={business.description} />
                </div>
              )}
              {business.tags && business.tags.length > 0 && (
                <p className="mt-4 text-sm text-muted">Keywords: {business.tags.join(", ")}</p>
              )}

              {/* Single white box for ALL Reviews content (heading, rating
                  summary, individual review cards, and the review form) —
                  not a separate box per part. Sits on top of the section's
                  own gradient background (see the <section> above), same
                  way the hours/map sidebar card does. Padding ramps
                  4/6/10 (16px/24px/40px) mobile/tablet/desktop — 40px
                  desktop per spec. */}
              <div className="mt-10 bg-white p-4 sm:p-6 lg:p-10">
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

            {/* Existing structure, unchanged — just capped at 400px on
                desktop (the column itself is already narrower than that on
                most viewports, but this makes the cap explicit/guaranteed
                per spec rather than incidental). No new wrapper divs. */}
            <aside className="space-y-6 lg:max-w-[400px]">
              <div className="border border-border bg-white p-6">
                {business.hours && business.hours.length > 0 ? (
                  <>
                    {/* Real-time, not a stored field — see
                        lib/business/openStatus.ts. Same real clock icon
                        asset used elsewhere in the project
                        (icon-clock.svg), not an invented one — replaces a
                        static "Opening Hours" label with the same live
                        status treatment used on the listing cards
                        (business/BusinessCard.tsx: "Closed now!" / "Open
                        now" — same exclamation-point convention reused
                        here), plus today's specific hours below it. Clock
                        icon isn't one of the three named 21x21 icons below,
                        so its size is unchanged. */}
                    {openStatus && (
                      <div className="flex items-start gap-3">
                        <Image
                          src="/assets/images/all/icon-clock.svg"
                          alt=""
                          width={30}
                          height={30}
                          className="h-6 w-6 shrink-0"
                        />
                        <div>
                          <p
                            className={`text-sm font-bold uppercase tracking-wide ${
                              openStatus === "closed" ? "text-status-closed" : "text-black"
                            }`}
                          >
                            {openStatus === "closed" ? "Closed Now!" : "Open Now"}
                          </p>
                          {todayHours && !todayHours.closed && todayHours.open && todayHours.close && (
                            <p className="mt-0.5 text-sm text-black">
                              {todayHours.open} - {todayHours.close}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <ul className="mt-4 divide-y divide-border text-sm text-black">
                      {business.hours.map((entry) => (
                        <li
                          key={entry.day}
                          className="flex justify-between gap-4 py-3 first:pt-0"
                        >
                          <span>{entry.day}</span>
                          <span className="font-bold">
                            {entry.closed ? "Closed" : `${entry.open} - ${entry.close}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-sm text-black">Hours not yet available.</p>
                )}

                {(business.phone || business.website) && (
                  <div className="mt-4 space-y-2 text-sm text-black">
                    {business.phone && (
                      <p className="flex items-center gap-2">
                        {/* Real project asset (icon-phone.svg), rendered at
                            exactly 21x21 via a fixed-size wrapper + `fill` +
                            object-contain — this box is 21x21 regardless of
                            the source SVG's own native size, and the glyph
                            inside it scales to fit without stretching (this
                            one happens to already be a 21x21 square
                            natively, so it fills the box exactly; the
                            location icon below is not square, and this same
                            pattern keeps it undistorted there too). */}
                        <span className="relative h-[21px] w-[21px] shrink-0">
                          <Image
                            src="/assets/images/all/icon-phone.svg"
                            alt=""
                            fill
                            sizes="21px"
                            className="object-contain"
                          />
                        </span>
                        <a href={`tel:${business.phone}`} className="hover:underline">
                          {business.phone}
                        </a>
                      </p>
                    )}
                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-black underline underline-offset-2"
                      >
                        <span className="relative h-[21px] w-[21px] shrink-0">
                          <Image
                            src="/assets/images/all/icon-web.svg"
                            alt=""
                            fill
                            sizes="21px"
                            className="object-contain"
                          />
                        </span>
                        <span className="min-w-0 truncate">{business.website}</span>
                      </a>
                    )}
                  </div>
                )}

                {business.address && (
                  <address className="mt-4 flex items-start gap-2 text-sm not-italic text-black">
                    <span className="relative mt-0.5 h-[21px] w-[21px] shrink-0">
                      <Image
                        src="/assets/images/all/icon-location.svg"
                        alt=""
                        fill
                        sizes="21px"
                        className="object-contain"
                      />
                    </span>
                    <span>
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
                    </span>
                  </address>
                )}
              </div>
              {/* Real, interactive Google Maps embed (keyless — see
                  lib/maps.ts) for the business's real address, directly
                  below the info box, same as the static placeholder it
                  replaces. Not rendered when there's no real address to
                  build a query from (no invented/default location). */}
              {mapsEmbedUrl && (
                <iframe
                  src={mapsEmbedUrl}
                  title={`Map showing ${business.name}'s location`}
                  className="aspect-video w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </aside>
          </div>
        </Container>
      </section>

      <MediaGallery items={galleryItems} />
    </>
  );
}
