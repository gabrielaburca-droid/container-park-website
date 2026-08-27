import { sanityFetch } from "./client";
import type { Business, EventDoc, PageDoc, SiteSettings } from "./types";

// NOTE: rating/reviewCount/badgeLabel are NOT selected here — they don't
// exist on the `business` document yet (see TODO: SCHEMA GAP in
// src/lib/sanity/types.ts). Add them to this projection once the schema is
// extended.
const businessListProjection = `{
  _id,
  name,
  slug,
  categories,
  shortDescription,
  heroImage,
  status,
  featured,
  tags
}`;

export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  return sanityFetch<Business[]>(
    `*[_type == "business" && $category in categories] | order(name asc) ${businessListProjection}`,
    { category },
    []
  );
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  return sanityFetch<Business | null>(
    `*[_type == "business" && slug.current == $slug][0]`,
    { slug },
    null
  );
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  const results = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "business" && defined(slug.current)]{ slug }`,
    {},
    []
  );
  return results.map((item) => item.slug.current);
}

// NOTE: shortDescription is NOT selected here — it doesn't exist on the
// `event` document yet (see TODO: SCHEMA GAP in src/lib/sanity/types.ts).
export async function getUpcomingEvents(): Promise<EventDoc[]> {
  return sanityFetch<EventDoc[]>(
    `*[_type == "event" && defined(startDate) && startDate >= now()] | order(startDate asc){
      _id, title, slug, startDate, endDate, time, heroImage, category
    }`,
    {},
    []
  );
}

export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  return sanityFetch<EventDoc | null>(
    `*[_type == "event" && slug.current == $slug][0]{
      ...,
      relatedBusiness->{ _id, name, slug }
    }`,
    { slug },
    null
  );
}

export async function getAllEventSlugs(): Promise<string[]> {
  const results = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "event" && defined(slug.current) && startDate >= now()]{ slug }`,
    {},
    []
  );
  return results.map((item) => item.slug.current);
}

export async function getPage(pageId: string): Promise<PageDoc | null> {
  return sanityFetch<PageDoc | null>(`*[_type == "page" && _id == $pageId][0]`, { pageId }, null);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`, {}, null);
}
