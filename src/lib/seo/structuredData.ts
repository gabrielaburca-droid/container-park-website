import type { Address, SiteSettings } from "@/lib/sanity/types";
import { SITE_NAME, SITE_URL } from "./metadata";

// Structured data URL fields (Event.url, BreadcrumbList item.item,
// LocalBusiness.url) must be absolute per schema.org/Google's guidance —
// every call site in this project already passes the same kind of
// relative path `buildMetadata()` takes for `path`, so resolving it
// against SITE_URL here once, rather than at each call site, keeps that
// existing convention intact everywhere it's used.
function toAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function buildOrganizationJsonLd(settings: SiteSettings | null) {
  if (!settings) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    ...(settings.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address.street,
        addressLocality: settings.address.city,
        addressRegion: settings.address.state,
        postalCode: settings.address.zip,
      },
    }),
    ...(settings.phone && { telephone: settings.phone }),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export function buildLocalBusinessJsonLd(business: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  telephone?: string;
  address?: Address;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: toAbsoluteUrl(business.url),
    image: business.image,
    telephone: business.telephone,
    ...(business.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
      },
    }),
  };
}

// Google's Event rich-result eligibility requires `location`; every real
// event in this project happens at the park, so `address` (the park's own
// real address) is always safe to include, and `locationName` falls back
// to the park's own name — same real, non-invented fallback already used
// on the Event Detail page itself (see events/[slug]/page.tsx).
function buildEventLocation(locationName: string | undefined, address?: Address) {
  return {
    "@type": "Place",
    name: locationName ?? SITE_NAME,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.zip,
      },
    }),
  };
}

// Only builds a real `Offer` when there's a real ticket URL AND a real,
// cleanly-numeric price to report — never invents a price or assumes an
// event is free just because it has no listed price. Most real events in
// this project have neither, and correctly get no `offers` field at all.
function buildEventOffers(price?: string, ticketUrl?: string) {
  if (!ticketUrl) return undefined;
  const numericPrice = price ? Number(price.replace(/[^0-9.]/g, "")) : NaN;
  if (!Number.isFinite(numericPrice)) return undefined;
  return {
    "@type": "Offer",
    url: ticketUrl,
    price: numericPrice,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  };
}

export function buildEventJsonLd(event: {
  name: string;
  startDate: string;
  endDate?: string;
  url: string;
  image?: string;
  description?: string;
  location?: string;
  address?: Address;
  price?: string;
  ticketUrl?: string;
}) {
  const offers = buildEventOffers(event.price, event.ticketUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    url: toAbsoluteUrl(event.url),
    // Same absolute-URL fix as `url` above — the mock data layer's local
    // images resolve to plain "/assets/..." paths (see lib/sanity/image.ts),
    // which schema.org/Google also expect to be fully-qualified for `image`.
    image: event.image ? toAbsoluteUrl(event.image) : undefined,
    description: event.description,
    location: buildEventLocation(event.location, event.address),
    ...(offers && { offers }),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };
}
