import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
import { EventsListingClient } from "@/components/events/EventsListingClient";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings, getUpcomingEvents } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  // Title matches the live site's indexed title verbatim ("Events Archive
  // - Downtown Container Park", confirmed against
  // https://downtowncontainerpark.com/events/ during the metadata
  // migration audit) to preserve existing SEO signal — the page's own H1
  // stays "Events" (see PageHero below), this only affects <title>.
  // Description: same real tagline rendered under the page's own H1
  // below, not invented (the live page has no meta description to match).
  return buildMetadata({
    title: "Events Archive",
    description: "One destination. Endless experiences.",
    path: "/events",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-events.jpg",
  });
}

export default async function EventsPage() {
  const [events, settings] = await Promise.all([getUpcomingEvents(), getSiteSettings()]);

  return (
    <>
      {/* `large` mode reuses the same big Hero treatment already
          established for the category listing pages (Shop, Eat & Drink,
          etc.) rather than inventing a new one. No `badgeLabel` here (by
          explicit instruction) — this page's Hero shows only the H1/
          accent/description over the real hero image, no eyebrow/label
          above the H1. PageHero itself is untouched: every other consumer
          that still passes `badgeLabel` (Business Detail's tagline badge,
          etc.) is unaffected. */}
      <PageHero
        title="EVENTS"
        titleAccent="LIVE DOWNTOWN"
        description="One destination. Endless experiences."
        imageUrl="/assets/images/all/hero-events.jpg"
        large
      />
      <Container>
        <div className="py-12">
          {/* `EventsListingClient` reads an optional `?search=` query
              param (real tag links from the Entertainment calendar/Event
              Detail land here — see EventsListingClient.tsx) via
              `useSearchParams()`, which Next.js requires a Suspense
              boundary for during static generation. */}
          <Suspense fallback={null}>
            <EventsListingClient events={events} />
          </Suspense>
        </div>
      </Container>
      <PageBottom settings={settings} />
    </>
  );
}
