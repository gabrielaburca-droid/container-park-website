import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

interface HomeHeroProps {
  heading?: string;
  accentHeading?: string;
  tagline?: string;
  image?: SanityImage | null;
  exploreEventsHref?: string;
  servicesHref?: string;
}

// Shared button markup for both responsive placements below (>=1500px vs
// 640-1499px need different positioning *contexts*, not just different
// classes on the same element — see the two call sites in HomeHero).
// Built as a normal horizontal row, then rotated as one rigid block — per
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
  const imageUrl = image?.asset ? urlForImage(image).width(1920).height(1000).url() : null;

  return (
    <section className="relative flex min-h-[620px] items-end overflow-hidden bg-near-black text-white sm:min-h-[820px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={image?.alt || ""}
          fill
          priority
          className="object-cover object-[30%_center] sm:object-center"
        />
      )}
      {/* Three stacked scrims rather than one flat overlay — lightened
          overall (photography stays visible/natural, no image filter used)
          while keeping enough shape behind the text and under the header
          for readability:
          - bottom-up + left-to-right: the reading area behind the text
            (bottom-left) stays darker than the rest of the photo — the
            flame, the Container Park signage on the right — matching the
            design's asymmetric vignette, just softer than before.
          - a light top-down layer, since the transparent Header (see
            Header.tsx) already sits above the Hero with its own strong
            black-to-transparent gradient. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
      />
      {/* Hidden below 640px entirely (no reserved space, see the two
          `hidden` bases below). Two separate placements rather than one
          responsive class list, because they're positioned relative to
          different boxes:
          - >=1500px: original reference position, hugging the Hero
            section's own edge (not the content container).
          - 640-1499px: right edge must align with the site's standard
            content container specifically, not the viewport edge. A fixed
            `right: Npx` can't do that once the container becomes centered
            above its 1380px cap (the gap to the viewport edge grows with
            viewport width), so this version is nested inside a wrapper
            replicating the exact same mx-auto/max-w-container/px-4 box as
            the real content div below, and right-aligned within it. */}
      <ScrollToDiscoverLink className="absolute left-2 top-1/2 hidden -translate-y-1/2 min-[1500px]:inline-flex" />
      <div className="pointer-events-none absolute inset-0 mx-auto hidden w-full max-w-container px-4 sm:block min-[1500px]:hidden">
        <ScrollToDiscoverLink className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-14 pt-24 sm:pb-20">
        {/* Desktop sizes are exact per spec: 140px heading / 100px accent.
            Ramped up through the intermediate breakpoints rather than
            jumping straight there, so mobile keeps the same oversized,
            editorial feel without overflowing a narrow viewport. */}
        <h1 className="font-display text-[48px] uppercase leading-[0.78] sm:text-[72px] md:text-[100px] lg:text-[140px]">
          {heading.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-2 font-display text-[34px] uppercase leading-[0.9] text-lime sm:text-[52px] md:text-[72px] lg:text-[100px]">
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
