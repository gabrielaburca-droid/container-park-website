"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

interface CarouselProps {
  children: ReactNode[];
  ariaLabel: string;
  /** Rendered top-left, alongside the prev/next arrows top-right — matches
   * the design's heading+arrows-in-one-row layout. Optional so Carousel
   * stays usable without a heading. Ignored (arrows move to the track
   * overlay instead) when `arrowsOverlay` is true. */
  heading?: ReactNode;
  /** When true, the card track bleeds past its container's right edge all
   * the way to the true viewport edge (via a calculated negative right
   * margin, not `100vw` — avoids the scrollbar-width overflow that
   * `100vw` tricks are prone to), while the heading/arrows row above it
   * stays aligned to the container as normal. This is what produces the
   * "2 full cards + a peek of the 3rd" composition — the track has room
   * to actually show that peek instead of being clipped at the same
   * width as the text content. Off by default so Carousel stays a plain,
   * self-contained component for any other consumer. */
  bleedRight?: boolean;
  /** Infinite loop: Next from the last slide continues to the first (and
   * vice versa), with no dead end and no visible jump. Implemented by
   * rendering 3 copies of `children` (a buffer copy before and after the
   * real, middle copy) and, once a scroll settles inside a buffer copy,
   * instantly (no animation) re-centering back to the equivalent position
   * in the middle copy — the buffer card is a pixel-identical duplicate
   * of its real counterpart, so the re-center is imperceptible. Covers
   * both button clicks and drag/swipe scrolling. Off by default. */
  loop?: boolean;
  /** Moves the prev/next arrows off the header row and overlays them on
   * the far left/right edges of the track itself, vertically centered
   * against the cards — a different composition from the default
   * heading-row arrows, used where the design floats the arrows over the
   * slider rather than above it. Off by default (preserves the existing
   * heading-row layout for other consumers). */
  arrowsOverlay?: boolean;
}

// CAROUSEL BEHAVIOR NEEDS CONFIRMATION — autoplay and exact slide count
// per breakpoint remain unconfirmed (see Figma analysis: only prev/next
// arrows + a partially-visible next slide are evidenced). This
// implementation uses native CSS scroll-snap, which gives touch
// drag/swipe "for free" without inventing custom gesture logic, plus
// prev/next buttons that step by one card. No autoplay.
export function Carousel({
  children,
  ariaLabel,
  heading,
  bleedRight = false,
  loop = false,
  arrowsOverlay = false,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loop) return;

    // Jump straight into the middle copy — visually identical to
    // starting at the real first slide, since copy 1's cards are
    // pixel-identical duplicates of the middle copy's.
    track.scrollLeft = track.scrollWidth / 3;

    function recenter() {
      if (!track) return;
      const third = track.scrollWidth / 3;
      if (track.scrollLeft < third) {
        track.scrollLeft += third;
      } else if (track.scrollLeft >= third * 2) {
        track.scrollLeft -= third;
      }
    }

    function handleScroll() {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(recenter, 120);
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [loop]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    // Synchronous safety check on every click, independent of the
    // debounced scroll-settle recenter above: if rapid repeated clicking
    // ever pushed the position past the halfway point into a buffer
    // copy, snap (instantly) back to the equivalent spot in the middle
    // copy *before* applying this step — keeps the buffer effectively
    // inexhaustible no matter how fast the user clicks, since the
    // debounced recenter alone only fires once scrolling fully stops.
    if (loop) {
      const third = track.scrollWidth / 3;
      if (track.scrollLeft < third * 0.5) {
        track.scrollLeft += third;
      } else if (track.scrollLeft > third * 1.5) {
        track.scrollLeft -= third;
      }
    }

    const card = track.querySelector<HTMLElement>("[data-carousel-slide]");
    const cardWidth = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  const displayChildren = loop ? [...children, ...children, ...children] : children;
  const arrowButtonClasses = "flex h-11 w-11 items-center justify-center border border-foreground";

  return (
    <div role="region" aria-label={ariaLabel} className="relative">
      <div className="flex items-end justify-between gap-4">
        {heading}
        {/* ml-auto (not just the row's justify-between) guarantees the
            arrows sit at the right edge even with no `heading` — e.g. a
            consumer with its own separately-centered heading above the
            whole Carousel, where justify-between alone would place a
            lone remaining flex child at the start, not the end. */}
        {!arrowsOverlay && (
          <div className="ml-auto flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous slide"
              className={arrowButtonClasses}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next slide"
              className={arrowButtonClasses}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      {/* This wrapper's own box is exactly the track's height (arrows are
          absolutely positioned and don't contribute to its flow height),
          so top-1/2 on the arrows centers them against the cards
          specifically — not the taller heading+track region above. */}
      <div className="relative mt-8">
        {arrowsOverlay && (
          <>
            {/* Arrows straddle the track's edge (partially outside the
                card area, per the reference) via a negative offset
                that's itself capped at whatever gutter space is actually
                available — up to 1.5rem (24px) outside on wide screens,
                but never more than the container's own 1rem (16px)
                padding budget at narrower widths, so the button can never
                be clipped or push the page into horizontal overflow. The
                1720px here is arrowsOverlay's one current consumer's own
                container width (home/HomeEventsSection.tsx's
                max-w-[1720px], not the sitewide --container-max) — if a
                future consumer uses arrowsOverlay with a different
                container width, this constant would need to become a
                prop. */}
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous slide"
              className={`absolute top-1/2 z-10 -translate-y-1/2 bg-background ${arrowButtonClasses} left-[calc(-1*min(1.5rem,max(1rem,calc((100vw-1720px)/2+1rem))))]`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next slide"
              className={`absolute top-1/2 z-10 -translate-y-1/2 bg-background ${arrowButtonClasses} right-[calc(-1*min(1.5rem,max(1rem,calc((100vw-1720px)/2+1rem))))]`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
        <div
          ref={trackRef}
          className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 ${
            bleedRight
              ? "mr-[calc(-1*max(1rem,calc((100vw-var(--container-max))/2+1rem)))] pr-4"
              : ""
          }`}
        >
          {displayChildren.map((child, index) => (
            <div key={index} data-carousel-slide className="shrink-0 snap-start">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
