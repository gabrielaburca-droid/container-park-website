import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
import { EventsListingClient } from "@/components/events/EventsListingClient";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings, getUpcomingEvents } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({ title: "Events", path: "/events" });
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
          <EventsListingClient events={events} />
        </div>
      </Container>
      <PageBottom settings={settings} />
    </>
  );
}
