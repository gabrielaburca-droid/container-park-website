import type { Address, SiteSettings } from "@/lib/sanity/types";
import { SITE_NAME, SITE_URL } from "./metadata";

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
      item: item.url,
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
    url: business.url,
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

export function buildEventJsonLd(event: {
  name: string;
  startDate: string;
  endDate?: string;
  url: string;
  image?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    url: event.url,
    image: event.image,
    description: event.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };
}
