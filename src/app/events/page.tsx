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
      <PageHero
        eyebrow="Events"
        title="EVENTS"
        titleAccent="LIVE DOWNTOWN"
        description="One destination. Endless experiences."
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
