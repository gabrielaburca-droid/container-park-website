import type {
  Business,
  BusinessCategory,
  EventDoc,
  PageDoc,
  SiteSettings,
} from "@/lib/sanity/types";
import type { Review } from "@/components/business/ReviewCard";
import { MOCK_BUSINESSES } from "@/data/mock/businesses";
import { MOCK_EVENTS } from "@/data/mock/events";
import { MOCK_SITE_SETTINGS } from "@/data/mock/siteSettings";
import { MOCK_PAGES } from "@/data/mock/pages";
import { MOCK_REVIEWS_BY_BUSINESS_SLUG } from "@/data/mock/reviews";

// TEMPORARY mock data layer for local visual QA (see CLAUDE.md). Mirrors
// the function signatures in src/lib/sanity/queries.ts exactly, so route
// files can be pointed here or back at the real queries with a one-line
// import change and nothing else. Not imported by any reusable component —
// only by route-level files (app/**/page.tsx, layout.tsx).

export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  return MOCK_BUSINESSES.filter((business) =>
    business.categories.includes(category as BusinessCategory)
  ).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  return MOCK_BUSINESSES.find((business) => business.slug.current === slug) ?? null;
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  return MOCK_BUSINESSES.map((business) => business.slug.current);
}

export async function getUpcomingEvents(): Promise<EventDoc[]> {
  const now = Date.now();
  return MOCK_EVENTS.filter((event) => new Date(event.startDate).getTime() >= now).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  // Multiple occurrences of a recurring event (e.g. The Mantis) all share
  // the same real live slug/URL — one detail page per event, not per
  // date, matching the live site. Returns the soonest upcoming occurrence
  // (MOCK_EVENTS is pre-sorted chronologically) so the detail page shows
  // a real, currently-relevant date.
  //
  // Events with `externalUrl` set have no detail page of their own on the
  // live site (see EventDoc.externalUrl) — excluded here so navigating
  // straight to their slug 404s honestly instead of rendering an invented
  // on-site page. Listing cards for these already link straight to
  // `externalUrl` instead of this route (see EventCard).
  return MOCK_EVENTS.find((event) => event.slug.current === slug && !event.externalUrl) ?? null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const now = Date.now();
  // One sitemap entry per real event, not per occurrence — de-duplicated
  // by slug (see getEventBySlug). Events with `externalUrl` set have no
  // detail page of their own (see EventDoc.externalUrl) — excluded so the
  // sitemap never advertises an internal /events/[slug] URL that would
  // just 404.
  const slugs = new Set<string>();
  for (const event of MOCK_EVENTS) {
    if (event.externalUrl) continue;
    if (new Date(event.startDate).getTime() < now) continue;
    slugs.add(event.slug.current);
  }
  return Array.from(slugs);
}

export async function getPage(pageId: string): Promise<PageDoc | null> {
  return MOCK_PAGES[pageId] ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return MOCK_SITE_SETTINGS;
}

// Mock-only addition — no equivalent exists in src/lib/sanity/queries.ts
// because there's no `review` Sanity schema yet (see CLAUDE.md gap list).
export async function getReviewsForBusiness(slug: string): Promise<Review[]> {
  return MOCK_REVIEWS_BY_BUSINESS_SLUG[slug] ?? [];
}
