import type { Address } from "@/lib/sanity/types";

export function buildDirectionsUrl(address?: Address | null): string | undefined {
  if (!address) return undefined;
  const query = [address.street, address.city, address.state, address.zip]
    .filter(Boolean)
    .join(", ");
  if (!query) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Real, interactive Google Maps embed for a given address — the keyless
// "output=embed" form, not the Maps Embed API's `/maps/embed/v1/place`
// endpoint, since that requires a Google Maps API key and none is
// configured anywhere in this project (see .env.example — only Sanity,
// Instagram, and site-URL vars exist). This form needs no key and still
// renders a fully interactive, scrollable/zoomable map, not a static
// image.
export function buildMapsEmbedUrl(address?: Address | null): string | undefined {
  if (!address) return undefined;
  const query = [address.street, address.city, address.state, address.zip]
    .filter(Boolean)
    .join(", ");
  if (!query) return undefined;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
