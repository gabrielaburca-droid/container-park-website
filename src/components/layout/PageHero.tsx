import Image from "next/image";
import type { ReactNode } from "react";
import { urlForImage } from "@/lib/sanity/image";
import { HeroGradientOverlay } from "@/components/layout/HeroGradientOverlay";
import {
  EYEBROW_CLASSES,
  HERO_HEADING_CLASSES,
  HERO_ACCENT_CLASSES,
  DETAIL_TITLE_CLASSES,
  DETAIL_CATEGORY_CLASSES,
  LISTING_HERO_SUBTITLE_CLASSES,
} from "@/lib/ui/typography";
import type { SanityImage } from "@/lib/sanity/types";

interface PageHeroProps {
  /** Small lime label. Renders ABOVE the H1 in the default (small) heading
   * mode — every existing non-large consumer (Leasing, Contact, Visit Us,
   * Events, Group Events, Business/Event Detail) keeps that unchanged. In
   * `large` mode it renders BELOW the H1 instead, matching Home Hero's own
   * H1-then-accent visual relationship (see the `large` branch below). */
  eyebrow?: string;
  title: string;
  /** Second headline line rendered in lime, e.g. "DOWNTOWN LAS VEGAS". */
  titleAccent?: string;
  description?: string;
  image?: SanityImage | null;
  /** Plain local/public asset path, for pages with a real photo but no
   * Sanity-backed hero image field yet (e.g. the category listing pages —
   * see ListingTemplate.tsx). Takes precedence over `image` when both are
   * given. */
  imageUrl?: string;
  badgeLabel?: string;
  /** Opt into Home Hero's own H1/accent sizing (140px desktop H1, matching
   * lime accent line below it — see HERO_HEADING_CLASSES/HERO_ACCENT_CLASSES
   * in lib/ui/typography.ts) instead of this component's smaller default
   * heading. Used by the category listing pages (Shop, Eat & Drink,
   * Entertainment, Attractions — see templates/ListingTemplate.tsx) only;
   * every other PageHero consumer (Visit Us, Contact, Leasing, Group
   * Events, Business/Event Detail, Events listing) is untouched and keeps
   * its existing smaller heading. */
  large?: boolean;
  /** Opt into the individual business/attraction/entertainment DETAIL page
   * Hero treatment (see templates/BusinessDetailTemplate.tsx) — a large
   * white category label (e.g. "SHOP") directly above a large lime H1 (the
   * business name), read together as one stacked headline block — instead
   * of this component's default small-eyebrow-then-heading pairing.
   * Mutually exclusive with `large`. */
  detail?: boolean;
  /** Extra content below the description — rating row, date/time meta, CTA buttons. */
  children?: ReactNode;
}

// Shared hero used on every inner page (Visit Us, Event Detail, Business
// Detail, listings, Group Events, Contact, Leasing, Events Listing). The
// Homepage uses its own HomeHero (left-aligned, larger, different content
// shape) instead of this component — see src/components/home/HomeHero.tsx.
// ANIMATION: NEEDS CONFIRMATION — no ken-burns/parallax implemented (see
// Figma spec, no evidence of motion in the static exports).
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  imageUrl,
  badgeLabel,
  large = false,
  detail = false,
  children,
}: PageHeroProps) {
  const resolvedImageUrl =
    imageUrl || (image?.asset ? urlForImage(image).width(1920).height(800).url() : null);

  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden bg-near-black text-white sm:min-h-[520px]">
      {resolvedImageUrl && (
        <Image src={resolvedImageUrl} alt={image?.alt || ""} fill priority className="object-cover" />
      )}
      {/* Shared across every Hero on the site — see
          HeroGradientOverlay.tsx for the full reasoning. Replaces the
          previous flat `opacity-70` on the image above, which dimmed the
          whole photo uniformly instead of concentrating darkness behind
          the text. */}
      <HeroGradientOverlay />
      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-10">
        {badgeLabel && (
          <span className="mb-3 inline-block max-w-[500px] bg-lime px-3 py-1 text-xs font-semibold text-lime-foreground">
            {badgeLabel}
          </span>
        )}
        {/* `detail` mode: large white category label, paired with the
            large lime H1 below it as one stacked headline block (per the
            Figma reference for this Hero). Every other non-large consumer
            keeps the small green EYEBROW_CLASSES label, unchanged. */}
        {!large && eyebrow && (
          <p className={detail ? DETAIL_CATEGORY_CLASSES : EYEBROW_CLASSES}>{eyebrow}</p>
        )}
        {large ? (
          <>
            <h1 className={HERO_HEADING_CLASSES}>{title}</h1>
            {/* Directly below the H1, same spacing as Home Hero's own
                H1-to-accent gap (mt-[5px] mobile / mt-2 sm:+ — see
                home/HomeHero.tsx) — matching that visual relationship, not
                just its typography. 100px at desktop (see
                LISTING_HERO_SUBTITLE_CLASSES) — a distinct constant from
                EYEBROW_CLASSES used everywhere else on the site, since this
                one role now has its own larger desktop size. */}
            {eyebrow && (
              <p className={`mt-[5px] sm:mt-2 ${LISTING_HERO_SUBTITLE_CLASSES}`}>{eyebrow}</p>
            )}
            {titleAccent && <p className={HERO_ACCENT_CLASSES}>{titleAccent}</p>}
          </>
        ) : (
          <h1
            className={
              detail
                ? DETAIL_TITLE_CLASSES
                : "font-display text-4xl uppercase leading-none sm:text-6xl"
            }
          >
            {title}
            {titleAccent && (
              <span className={`block ${detail ? "text-white" : "text-lime"}`}>
                {titleAccent}
              </span>
            )}
          </h1>
        )}
        {description && (
          <p className="mt-4 max-w-xl text-sm text-white/90 sm:text-base">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
