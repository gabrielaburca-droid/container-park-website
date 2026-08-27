import type { Address } from "@/lib/sanity/types";

export function buildDirectionsUrl(address?: Address | null): string | undefined {
  if (!address) return undefined;
  const query = [address.street, address.city, address.state, address.zip]
    .filter(Boolean)
    .join(", ");
  if (!query) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
