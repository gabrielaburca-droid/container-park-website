import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { EventCard } from "@/components/event/EventCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageBottom } from "@/components/layout/PageBottom";
import { JsonLd } from "@/components/seo/JsonLd";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getEventBySlug, getSiteSettings, getUpcomingEvents } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildEventJsonLd } from "@/lib/seo/structuredData";
import { buildGoogleCalendarUrl, buildIcsDataUrl } from "@/lib/calendar";
import { buildFacebookShareUrl, buildMailShareUrl, buildTwitterShareUrl } from "@/lib/share";
import { SITE_URL } from "@/lib/seo/metadata";

// Event detail implementation lives directly in this route rather than a
// shared template — only one page type consumes it today. Extract a
// template (mirroring BusinessDetailTemplate) if that changes.

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return buildMetadata({ title: "Event Not Found", path: `/events/${slug}` });
  }

  return buildMetadata({
    title: event.seo?.title || event.title,
    description: event.seo?.description,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const [event, settings, allUpcoming] = await Promise.all([
    getEventBySlug(slug),
    getSiteSettings(),
    getUpcomingEvents(),
  ]);

  if (!event) {
    notFound();
  }

  const eventUrl = `${SITE_URL}/events/${slug}`;
  const googleCalendarUrl = buildGoogleCalendarUrl(event);
  const icsUrl = buildIcsDataUrl(event);

  const eventJsonLd = buildEventJsonLd({
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    url: `/events/${slug}`,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
    { name: event.title, url: `/events/${slug}` },
  ]);

  const dateLabel = new Date(event.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Static grid, NOT a carousel — no arrows/dots evidenced for this
  // section in the design (see Figma spec).
  const relatedEvents = allUpcoming.filter((item) => item._id !== event._id).slice(0, 4);

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        eyebrow="Events"
        title={event.title}
        description={event.shortDescription}
        image={event.heroImage}
      >
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <span>{dateLabel}</span>
          {event.time && <span>{event.time}</span>}
        </div>
        <div className="mt-4">
          <Button href={googleCalendarUrl}>+ Add to Google Calendar</Button>
        </div>
      </PageHero>

      <Container>
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[2fr_1fr]">
          <article>
            {event.description && event.description.length > 0 && (
              <div className="prose max-w-none">
                <PortableText value={event.description} />
              </div>
            )}

            {/* partnerOffers: TODO SCHEMA GAP — see src/lib/sanity/types.ts */}
            {event.partnerOffers && event.partnerOffers.length > 0 && (
              <ul className="mt-6 space-y-1 text-sm">
                {event.partnerOffers.map((offer, index) => (
                  <li key={index}>
                    <strong>{offer.businessName}</strong> — {offer.offerText}
                  </li>
                ))}
              </ul>
            )}

            {event.tags && event.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2 text-xs uppercase text-muted">
                {event.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={icsUrl} download="event.ics" variant="outline">
                iCal Export
              </Button>
              <Button href={googleCalendarUrl}>+ Add to Google Calendar</Button>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="space-y-4 border border-border p-6 text-sm">
              <div>
                <p className="text-xs font-medium uppercase text-muted">Date</p>
                <p>{dateLabel}</p>
              </div>
              {event.time && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted">Time</p>
                  <p>{event.time}</p>
                </div>
              )}
              {event.relatedBusiness && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted">Location</p>
                  <p>{event.relatedBusiness.name}</p>
                </div>
              )}
              {event.category && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted">Category</p>
                  <p className="capitalize">{event.category}</p>
                </div>
              )}
              {/* Share: standard share-intent URLs, not a native share
                  sheet or custom modal (that mechanism is NEEDS
                  CONFIRMATION). */}
              <div>
                <p className="text-xs font-medium uppercase text-muted">Share</p>
                <div className="mt-1 flex gap-2">
                  <a
                    href={buildFacebookShareUrl(eventUrl)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Share on Facebook"
                    className="flex h-8 w-8 items-center justify-center border border-border text-xs"
                  >
                    FB
                  </a>
                  <a
                    href={buildTwitterShareUrl(eventUrl, event.title)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Share on X"
                    className="flex h-8 w-8 items-center justify-center border border-border text-xs"
                  >
                    X
                  </a>
                  <a
                    href={buildMailShareUrl(eventUrl, event.title)}
                    aria-label="Share by email"
                    className="flex h-8 w-8 items-center justify-center border border-border text-xs"
                  >
                    ✉
                  </a>
                </div>
              </div>
            </div>
            <MapPlaceholder className="aspect-video" />
          </aside>
        </div>

        {relatedEvents.length > 0 && (
          <div className="pb-16">
            <SectionHeading
              eyebrow="Discover the Park"
              heading="Other Events in Downtown"
              align="center"
            />
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedEvents.map((related) => (
                <EventCard key={related._id} event={related} />
              ))}
            </ul>
          </div>
        )}
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
