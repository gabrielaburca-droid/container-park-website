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

// Client feedback (round 2): the previous title ("Events Archive", the
// live site's own auto-generated archive-page title) and description
// ("One destination. Endless experiences.") both read as generic/
// archive-oriented rather than describing what's actually on this page.
// Replaced with client-supplied copy for both the <title>/meta
// description AND the visible Hero description below — the old
// description string was literally identical in both places, so leaving
// the visible copy unchanged would have shown the exact wording the
// client flagged as needing rewriting, right on the page itself.
const EVENTS_TITLE = "Events in Downtown Las Vegas | Downtown Container Park";
const EVENTS_DESCRIPTION =
  "Discover live music, family-friendly events, entertainment and special experiences at Downtown Container Park in Las Vegas.";

export function generateMetadata(): Metadata {
  const metadata = buildMetadata({
    title: EVENTS_TITLE,
    description: EVENTS_DESCRIPTION,
    path: "/events",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-events.jpg",
  });
  // EVENTS_TITLE is already a complete, client-specified string in its own
  // "Page | Downtown Container Park" format, not the sitewide
  // "{page} - Downtown Container Park" pattern buildMetadata()'s own
  // suffixing logic assumes (and its bypass only checks for a title that
  // *starts with* the site name, which this doesn't) — override the
  // title/OG/Twitter title fields it computed with the exact requested
  // string instead of letting them get a second, unwanted suffix
  // appended. Description/canonical/OG image/Twitter card type all still
  // come from the normal call above.
  return {
    ...metadata,
    title: { absolute: EVENTS_TITLE },
    openGraph: { ...metadata.openGraph, title: EVENTS_TITLE },
    twitter: { ...metadata.twitter, title: EVENTS_TITLE },
  };
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
        description={EVENTS_DESCRIPTION}
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
