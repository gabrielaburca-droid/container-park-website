import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
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
import { buildDirectionsUrl, buildMapsEmbedUrl } from "@/lib/maps";
import { urlForImage } from "@/lib/sanity/image";
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

  // Every business/event in this project shares one physical address (see
  // data/mock/businesses.ts's PARK_ADDRESS) — everything happens at the
  // park itself, so `settings.address` is real for every event, not a
  // fallback/invented one. `event.relatedBusiness`, when present, is
  // shown as the specific location name above that shared address (e.g.
  // "Oak & Ivy"); otherwise the park's own name is used.
  const locationName = event.relatedBusiness?.name ?? "Downtown Container Park";
  const addressLine = settings?.address
    ? [settings.address.street, settings.address.city, settings.address.state, settings.address.zip]
        .filter(Boolean)
        .join(", ")
    : undefined;
  const directionsUrl = buildDirectionsUrl(settings?.address);
  const mapsEmbedUrl = buildMapsEmbedUrl(settings?.address);
  const calendarExtras = { location: addressLine, details: event.shortDescription };
  const googleCalendarUrl = buildGoogleCalendarUrl(event, calendarExtras);
  const icsUrl = buildIcsDataUrl(event, calendarExtras);
  const eventTypeLabel = event.isRecurring ? "Recurring" : "Featured";

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
  // section in the design (see Figma spec). De-duplicated by slug (not
  // just _id): with many events now expanded into one row per real
  // occurrence (see data/mock/events.ts), the plain upcoming list can
  // contain several dates of the same recurring event back-to-back —
  // "Other Events in Downtown" should showcase distinct events, not the
  // same one repeated.
  const seenSlugs = new Set([event.slug.current]);
  const relatedEvents = allUpcoming
    .filter((item) => {
      if (seenSlugs.has(item.slug.current)) return false;
      seenSlugs.add(item.slug.current);
      return true;
    })
    .slice(0, 4);

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Static "Events" label above the H1 on every individual event page
          (not the event's own category) — `detail` mode gives the white
          label + large lime H1 pairing already established for Business
          Detail (templates/BusinessDetailTemplate.tsx), reused as-is here
          rather than the plain small green eyebrow used elsewhere on the
          site (explicitly not wanted for this page). Hero background is
          the project's real, dedicated single-event Hero photo — NOT the
          event's own flyer image, which moves into the body below as the
          featured image instead (see `article` below). */}
      <PageHero
        eyebrow="Events"
        title={event.title}
        description={event.shortDescription}
        imageUrl="/assets/images/all/hero-event-single.jpg"
        detail
      >
        {/* Icon-led, no text labels ("Event Date"/"Event Time") — per
            spec, the icon itself (the same event-date.svg/event-time.svg
            used in the sidebar, not a generic pair) stands in for the
            label. */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <Image
              src="/assets/images/all/event-date.svg"
              alt=""
              width={29}
              height={30}
              className="h-5 w-5 shrink-0"
            />
            {dateLabel}
          </span>
          {event.time && (
            <span className="flex items-center gap-2">
              <Image
                src="/assets/images/all/event-time.svg"
                alt=""
                width={30}
                height={30}
                className="h-5 w-5 shrink-0"
              />
              {event.time}
            </span>
          )}
        </div>
        <div className="mt-4">
          <Button href={googleCalendarUrl}>+ Add to Google Calendar</Button>
        </div>
      </PageHero>

      {/* Same full-bleed gradient + blurred lime circle treatment as
          Business Detail (templates/BusinessDetailTemplate.tsx) — reused
          exactly, not a new background system. Scoped to just the main
          content/sidebar grid, same as that template scopes it to just
          its own description/reviews/sidebar grid (Other Events below
          sits on a plain white background, same relationship as that
          template's MediaGallery). */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />
        <Container>
          <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[2fr_1fr]">
            <article>
              {/* Featured image — the event's own real flyer/graphic
                  (heroImage), moved out of the Hero and placed here, above
                  the description, per spec. */}
              {event.heroImage?.asset && (
                <div className="relative aspect-square w-full max-w-md overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={urlForImage(event.heroImage).width(900).height(1125).url()}
                    alt={event.heroImage.alt || event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {event.description && event.description.length > 0 && (
                <div className="prose mt-8 max-w-none">
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

              {/* Visually separated from the description above/CTAs below
                  by its own border-top + border-bottom, per the attached
                  design — two rows: icon + "Tags" label, then the tags
                  themselves as flat light-gray boxes (not pills/rounded
                  badges, not "#"-prefixed inline text) indented to align
                  under the label rather than the icon. */}
              {event.tags && event.tags.length > 0 && (
                <div className="mt-6 border-y border-border py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/images/all/icon-tags.svg"
                      alt=""
                      width={29}
                      height={29}
                      className="h-6 w-6 shrink-0"
                    />
                    <span className="text-sm text-black">Tags</span>
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-2 pl-8">
                    {event.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-border px-3 py-1 text-xs font-bold uppercase text-black"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Desktop: one full-width row, iCal Export anchored left and
                  Add to Google Calendar anchored right via
                  justify-between — not grouped together. Mobile: stacks
                  full-width in the same order, each button centered on
                  its own row rather than shrinking to its label width. */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  href={icsUrl}
                  download="event.ics"
                  variant="outline"
                  className="w-full justify-center sm:w-auto"
                >
                  iCal Export
                </Button>
                <Button href={googleCalendarUrl} className="w-full justify-center sm:w-auto">
                  + Add to Google Calendar
                </Button>
              </div>
            </article>

            <aside className="space-y-4 lg:max-w-[400px]">
              {/* `divide-y` puts a thin border-top between adjacent items
                  only — never before the first one — which is exactly the
                  "border-top on every item except the first" rule from
                  spec, with no first:-item special-casing needed. Each
                  item's own `py-4` gives it vertical padding independent
                  of that border. */}
              <div className="divide-y divide-border bg-white p-6 text-sm text-black">
                <div className="flex items-start gap-3 py-4">
                  <Image
                    src="/assets/images/all/event-date.svg"
                    alt=""
                    width={29}
                    height={30}
                    className="h-6 w-6 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium uppercase text-muted">Date</p>
                    <p className="font-bold">{dateLabel}</p>
                  </div>
                </div>
                {event.time && (
                  <div className="flex items-start gap-3 py-4">
                    <Image
                      src="/assets/images/all/event-time.svg"
                      alt=""
                      width={30}
                      height={30}
                      className="h-6 w-6 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-medium uppercase text-muted">Time</p>
                      <p className="font-bold">{event.time}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 py-4">
                  <Image
                    src="/assets/images/all/event-location.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="h-6 w-6 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium uppercase text-muted">Location</p>
                    <p className="font-bold">{locationName}</p>
                    {addressLine && <p>{addressLine}</p>}
                    {directionsUrl && (
                      <a href={directionsUrl} target="_blank" rel="noreferrer" className="underline">
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <Image
                    src="/assets/images/all/event-category.svg"
                    alt=""
                    width={31}
                    height={31}
                    className="h-6 w-6 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium uppercase text-muted">Category</p>
                    <p className="font-bold">{eventTypeLabel}</p>
                  </div>
                </div>
                {/* Share: standard share-intent URLs, not a native share
                    sheet or custom modal (that mechanism is NEEDS
                    CONFIRMATION). */}
                <div className="flex items-start gap-3 py-4">
                  <Image
                    src="/assets/images/all/event-share.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="h-6 w-6 shrink-0"
                  />
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
              </div>
              {/* Real, interactive Google Maps embed (keyless — see
                  lib/maps.ts) for the park's real address — same pattern
                  as Business Detail. */}
              {mapsEmbedUrl && (
                <iframe
                  src={mapsEmbedUrl}
                  title={`Map showing ${locationName}'s location`}
                  className="aspect-video w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </aside>
          </div>

          {/* "Other Events" stays inside the SAME gradient section (not a
              separate plain-white one below it) — one continuous
              background/decoration system, not two. */}
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
      </section>

      <PageBottom settings={settings} />
    </>
  );
}
