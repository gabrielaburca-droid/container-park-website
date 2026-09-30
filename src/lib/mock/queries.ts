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
  return MOCK_BUSINESSES.filter(
    (business) => !business.unlisted && business.categories.includes(category as BusinessCategory)
  ).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  return MOCK_BUSINESSES.find((business) => business.slug.current === slug) ?? null;
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  return MOCK_BUSINESSES.map((business) => business.slug.current);
}

// The instant an occurrence stops counting as "upcoming". Fixed-time
// events: their start (unchanged behavior). Sunset-timed events have no
// real start time — startDate is just their day's midnight marker (see
// EventDoc.timeType) — so they stay upcoming until their day ends, keeping
// today's occurrence visible all day.
function upcomingUntil(event: EventDoc): number {
  const cutoff = event.timeType === "sunset" && event.endDate ? event.endDate : event.startDate;
  return new Date(cutoff).getTime();
}

// The instant an occurrence is over: its end (or its start, if it has no
// end). Used only to pick which occurrence a detail page shows, so an
// occurrence that's currently happening (e.g. The Mantis at 9 PM) stays
// the displayed one until it finishes. Sunset-timed events' endDate is
// already their Las Vegas day's end. Listings/sitemap keep using
// upcomingUntil() above, unchanged.
function occurrenceEndsAt(event: EventDoc): number {
  const start = new Date(event.startDate).getTime();
  return event.endDate ? Math.max(start, new Date(event.endDate).getTime()) : start;
}

export async function getUpcomingEvents(): Promise<EventDoc[]> {
  const now = Date.now();
  return MOCK_EVENTS.filter((event) => upcomingUntil(event) >= now).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  // Multiple occurrences of a recurring event (e.g. The Mantis) all share
  // the same real live slug/URL — one detail page per event, not per
  // date, matching the live site. Returns the current-or-next occurrence
  // (the first, in MOCK_EVENTS' chronological order, that hasn't ended
  // yet) so the detail page shows a real, currently-relevant date. If
  // every occurrence is already over, falls back to the most recent one —
  // for a one-off event that's simply its own real date.
  //
  // Events with `externalUrl` set have no detail page of their own on the
  // live site (see EventDoc.externalUrl) — excluded here so navigating
  // straight to their slug 404s honestly instead of rendering an invented
  // on-site page. Listing cards for these already link straight to
  // `externalUrl` instead of this route (see EventCard).
  const occurrences = MOCK_EVENTS.filter(
    (event) => event.slug.current === slug && !event.externalUrl
  );
  const now = Date.now();
  return occurrences.find((event) => occurrenceEndsAt(event) >= now) ?? occurrences.at(-1) ?? null;
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
    if (upcomingUntil(event) < now) continue;
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
