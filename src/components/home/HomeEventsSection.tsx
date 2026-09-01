"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event/EventCard";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FILTER_TAB_CLASSES } from "@/lib/ui/typography";
import type { EventDoc } from "@/lib/sanity/types";

const DATE_FILTERS = [
  { id: "all", label: "All Events" },
  { id: "today", label: "Today" },
  { id: "this-month", label: "This Month" },
  { id: "next-month", label: "Next Month" },
];

// Simplified filter (date pills only, no tabs/search) — distinct from the
// full EventFilterBar used on /events, matching the smaller control set
// shown for this homepage section in the design.
//
// This section uses its own wider max-w-[1720px] container (not the
// site's standard max-w-container/1380px) — per the Figma reference, this
// is specific to this section, not a new sitewide container size.
//
// Cards render inside the shared Carousel component (loop + no visible
// scrollbar, same architecture as home/FeatureCarousel.tsx) rather than a
// static CSS grid — the reference shows 5 full cards at the 1720px
// container width, with more reachable by scrolling, not a fixed
// 8-item grid. Card width (318px from sm: up) is tuned so exactly 5 cards
// + 4 gap-6 gaps fill the 1720px container's content width; narrower
// viewports naturally show fewer cards as the container itself narrows,
// without any redesign of the card or an explicit "N cards" breakpoint
// table.
export function HomeEventsSection({ events }: { events: EventDoc[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let result = events;
    if (filter === "today") {
      const today = new Date().toDateString();
      result = events.filter((event) => new Date(event.startDate).toDateString() === today);
    } else if (filter === "this-month" || filter === "next-month") {
      const now = new Date();
      const offset = filter === "next-month" ? 1 : 0;
      const targetMonth = (now.getMonth() + offset) % 12;
      const targetYear = now.getFullYear() + Math.floor((now.getMonth() + offset) / 12);
      result = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate.getMonth() === targetMonth && eventDate.getFullYear() === targetYear;
      });
    }

    // De-duplicated by slug (not _id): many events are expanded into one
    // row per real occurrence (see data/mock/events.ts) — this carousel
    // should showcase distinct events, not the same one repeated across
    // its many upcoming dates. Same pattern already used by the
    // Entertainment page's own Featured Events section. Keeps the first
    // (soonest, since `events` is pre-sorted chronologically) occurrence
    // of each real event within whatever date filter is active above.
    const seenSlugs = new Set<string>();
    return result.filter((event) => {
      if (seenSlugs.has(event.slug.current)) return false;
      seenSlugs.add(event.slug.current);
      return true;
    });
  }, [events, filter]);

  return (
    // overflow-x-hidden is a defensive backstop for the carousel's
    // overlay arrows (see Carousel.tsx's arrowsOverlay) — their outward
    // offset is itself calc()-capped to never exceed the available
    // gutter, so this should never actually need to clip anything; it's
    // just belt-and-suspenders against sub-pixel rounding.
    <section className="overflow-x-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-[1720px] px-4">
        <SectionHeading
          eyebrow="Discover the Park"
          heading="Experience Downtown in Real Time."
          align="center"
        />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {DATE_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`px-5 py-2.5 ${FILTER_TAB_CLASSES} ${
                filter === item.id ? "bg-lime text-lime-foreground" : "border border-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8">
            <Carousel ariaLabel="Upcoming events at Downtown Container Park" loop arrowsOverlay>
              {filtered.map((event) => (
                <EventCard key={event._id} event={event} className="w-64 sm:w-[318px]" />
              ))}
            </Carousel>
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-muted sm:text-base">
            No events match this filter yet.
          </p>
        )}

        <div className="mt-8 text-center">
          <Button href="/events">Explore Events</Button>
        </div>
      </div>
    </section>
  );
}
