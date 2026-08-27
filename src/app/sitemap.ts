import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
// TEMPORARY: mock data layer, now holding REAL migrated content (not demo
// data) — see CLAUDE.md and the content migration report. Swap back to
// "@/lib/sanity/queries" once Sanity holds this same real content.
import { getAllBusinessSlugs, getAllEventSlugs } from "@/lib/mock/queries";

// Only valuable, indexable content — core routes, real businesses, and
// upcoming events. Deliberately does NOT reproduce the old site's tag/
// taxonomy archives or its ~800+ historical event URLs (see the SEO
// migration audit / CLAUDE.md).
const STATIC_ROUTES = [
  "",
  "/shop",
  "/eat-drink",
  "/entertainment",
  "/attractions",
  "/events",
  "/group-events",
  "/leasing",
  "/visit-us",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [businessSlugs, eventSlugs] = await Promise.all([
    getAllBusinessSlugs(),
    getAllEventSlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const businessEntries: MetadataRoute.Sitemap = businessSlugs.map((slug) => ({
    url: `${SITE_URL}/listing/${slug}`,
    lastModified: new Date(),
  }));

  const eventEntries: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${SITE_URL}/events/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...businessEntries, ...eventEntries];
}
