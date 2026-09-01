import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { urlForImage } from "@/lib/sanity/image";
import { HeroGradientOverlay } from "@/components/layout/HeroGradientOverlay";
import { HERO_HEADING_CLASSES, HERO_ACCENT_CLASSES } from "@/lib/ui/typography";
import type { SanityImage } from "@/lib/sanity/types";

// Real, existing project asset — the shared fallback for when the Home
// page's Sanity content has no hero image set yet, so the Hero is never
// left with no background at all (see PageHero.tsx's identical fallback).
const PLACEHOLDER_HERO_URL = "/assets/images/all/placeholder-hero.jpg";

interface HomeHeroProps {
  heading?: string;
  accentHeading?: string;
  tagline?: string;
  image?: SanityImage | null;
  exploreEventsHref?: string;
  servicesHref?: string;
}

// Shared button markup for both responsive placements below (>=1600px on
// the left vs 640-1599px on the right — see the two call sites in
// HomeHero, both now plain absolutely-positioned children of the same
// section). Built as a normal horizontal row, then rotated as one rigid
// block — per
// the reference, the short line sits BELOW the text with a gap. Row order
// matters here: after a -90deg rotation the block reads bottom-to-top
// (whatever comes first in the row lands at the screen-bottom), so the
// LINE is placed first in the row — it renders below the text, not
// after/above it. The line's hover-shrink is isolated to a fixed-size
// track so it never reflows the row and drags the text along with it.
function ScrollToDiscoverLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="#discover"
      className={`group inline-flex -rotate-90 items-center gap-3 whitespace-nowrap py-3 ${className}`}
    >
      <span aria-hidden="true" className="relative h-px w-10 shrink-0">
        <span className="absolute right-0 top-0 h-px w-full bg-white transition-[width] duration-300 ease-out group-hover:w-3" />
      </span>
      <span className="text-xs font-medium uppercase tracking-widest">Scroll to Discover</span>
    </a>
  );
}

// CTA destinations: "Explore Events" -> /events. "See Our Services" -> the
// Visit Us page, which is where the site's actual "Services" content lives
// (see ServicesGrid in src/components/visit/ServicesGrid.tsx, rendered on
// /visit-us) — there's no standalone "/services" route anywhere in the
// approved sitemap (see CLAUDE.md), so this is the closest real, existing
// destination rather than an invented URL.
// ANIMATION: NEEDS CONFIRMATION — no parallax/ken-burns implemented.
// "Scroll to Discover" is a real in-page anchor link to #discover (the
// FeatureCarousel section directly below, see FeatureCarousel.tsx), using
// native `scroll-behavior: smooth` (src/styles/globals.css) rather than a
// JS scroll handler — no client component needed.
export function HomeHero({
  heading = "EAT.\nPLAY.\nSHOP.",
  accentHeading = "Live Downtown",
  tagline = "One destination. Endless experiences.",
  image,
  exploreEventsHref = "/events",
  servicesHref = "/visit-us",
}: HomeHeroProps) {
  const imageUrl = image?.asset
    ? urlForImage(image).width(1920).height(1000).url()
    : PLACEHOLDER_HERO_URL;

  return (
    <section className="relative flex min-h-[400px] items-end overflow-hidden bg-near-black text-white sm:min-h-[820px]">
      <Image
        src={imageUrl}
        alt={image?.alt || ""}
        fill
        priority
        // Full-bleed section background at every breakpoint.
        sizes="100vw"
        className="object-cover object-[30%_center] sm:object-center"
      />
      {/* Shared across every Hero on the site — see
          layout/HeroGradientOverlay.tsx for the full reasoning. */}
      <HeroGradientOverlay />
      {/* Hidden below 640px entirely (no reserved space, see the two
          `hidden` bases below). Two separate placements, not one
          responsive class list, since they sit on opposite sides:
          - >=1600px: current desktop position, hugging the Hero section's
            own left edge (not any content container) — unchanged.
          - 640-1599px: right side, exactly 20px from the viewport/body
            edge. This one needs its own wrapper: `-rotate-90` spins the
            link around the CENTER of its *un-rotated* box by default, and
            that un-rotated box is wide (sized to the "Scroll to Discover"
            text, ~200px) but short (~40px, just padding + line-height).
            Positioning via `right-[20px]` directly on the rotated link
            would offset that wide un-rotated box, not the actual rotated
            (visually narrow) shape — confirmed via bounding-box testing,
            where this produced a ~102px gap instead of 20px, because half
            the *text length* leaks into the offset math. Wrapping it in a
            div whose width (w-10 = 40px) matches the rotated element's
            true visual width, and centering the link inside that via
            flex, makes the rotated shape's edges land exactly on the
            wrapper's own edges — so `right-[20px]` on the wrapper is
            genuinely 20px from the viewport edge to the visible control,
            regardless of the label text's length.
          Both carry z-20, above the content div's z-10 below — without an
          explicit z-index, an element's stacking position falls back to
          DOM order only among OTHER z-index:auto siblings; it still loses
          to any sibling with an explicit z-index (even a low one) placed
          later in the document, regardless of DOM order. That's what made
          this control visually present but unclickable before: the
          content div's z-10 put its full-width (if mostly empty) box
          above this link in stacking order, even though the link's own
          markup came first in the DOM. */}
      <ScrollToDiscoverLink className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 min-[1600px]:inline-flex" />
      <div className="absolute right-[20px] top-1/2 z-20 hidden w-10 -translate-y-1/2 sm:flex sm:justify-center min-[1600px]:hidden">
        <ScrollToDiscoverLink />
      </div>
      {/* Mobile-only breathing room bump (pb-14/pt-24 -> pb-20/pt-[9rem]): the
          sm: pair below restores the original tablet/desktop values
          exactly, so this is scoped to mobile only, not a shift of the
          existing sm:pb-20/sm:pt-24 breakpoint values themselves. */}
      <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-20 pt-[9rem] sm:pb-20 sm:pt-24">
        {/* Desktop sizes are exact per spec: 140px heading / 100px accent.
            Ramped up through the intermediate breakpoints rather than
            jumping straight there, so mobile keeps the same oversized,
            editorial feel without overflowing a narrow viewport. */}
        <h1 className={HERO_HEADING_CLASSES}>
          {heading.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
        {/* Mobile-only spacing to the title above (mt-2 -> mt-[5px]); sm:mt-2
            restores the original tablet/desktop gap unchanged. */}
        <p className={`mt-[5px] sm:mt-2 ${HERO_ACCENT_CLASSES}`}>
          {accentHeading}
        </p>
        {tagline && <p className="mt-4 max-w-md text-sm sm:text-base">{tagline}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={exploreEventsHref}>Explore Events</Button>
          <Button href={servicesHref} variant="outline-light">
            See Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
