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
  return MOCK_EVENTS.find((event) => event.slug.current === slug) ?? null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const now = Date.now();
  return MOCK_EVENTS.filter((event) => new Date(event.startDate).getTime() >= now).map(
    (event) => event.slug.current
  );
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
