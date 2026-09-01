import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/event/EventCard";
import { Button } from "@/components/ui/Button";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings, getUpcomingEvents } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

// Internal replacement for the old WordPress site's /tag/[slug]/ archive
// pages — this project must never link out to those (see the "REMOVE ALL
// LINKS TO THE OLD LIVE WEBSITE" audit). Event tag links (Event Detail
// page) point here instead, using the same real tag slug the live site
// used. Deliberately NOT added to src/app/sitemap.ts — CLAUDE.md's
// sitemap rule already excludes tag/taxonomy archive pages from indexing;
// this route exists so a clicked tag link resolves to real, on-site
// content, not so it gets crawled as its own destination.
//
// De-duplicated by slug (not _id), same as the Entertainment page's
// Featured Events — a tag page should showcase each distinct real event
// once, not once per future occurrence.
function dedupeBySlug(events: Awaited<ReturnType<typeof getUpcomingEvents>>) {
  const seen = new Set<string>();
  return events.filter((event) => {
    if (seen.has(event.slug.current)) return false;
    seen.add(event.slug.current);
    return true;
  });
}

function findTagLabel(
  events: Awaited<ReturnType<typeof getUpcomingEvents>>,
  tagSlug: string
): string | null {
  for (const event of events) {
    const match = event.tags?.find((t) => t.slug === tagSlug);
    if (match) return match.label;
  }
  return null;
}

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const events = await getUpcomingEvents();
  const label = findTagLabel(events, tagSlug);

  // A slug that's never a real tag on any real event (garbage input, a
  // typo, etc.) — matches the real 404 the page component itself renders
  // below (see notFound() call), rather than describing a page that
  // won't actually be served.
  if (!label) {
    return buildMetadata({ title: "Tag Not Found", path: `/tag/${tagSlug}` });
  }

  return buildMetadata({
    title: `Tag: ${label}`,
    path: `/tag/${tagSlug}`,
    // Real, functional page (clicking a tag must still work) that
    // shouldn't be indexed as its own search-result destination — same
    // intent as CLAUDE.md's sitemap rule against resurrecting the old
    // site's tag/taxonomy archives, expressed here as a robots directive
    // instead of just a sitemap omission.
    robots: { index: false, follow: true },
    // Same placeholder-hero fallback this page's own PageHero renders
    // below (it has no dedicated hero image) — not a new/invented asset.
    ogImage: "/assets/images/all/placeholder-hero.jpg",
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const [allUpcoming, settings] = await Promise.all([getUpcomingEvents(), getSiteSettings()]);

  const label = findTagLabel(allUpcoming, tagSlug);

  // Same "unknown tag" condition as generateMetadata above — a slug no
  // real event has ever used. Every currently real tag slug is reachable
  // this way today (every real event in this project is upcoming, not
  // historical), so this can't yet 404 a real, currently-used tag link.
  if (!label) {
    notFound();
  }

  const matches = dedupeBySlug(
    allUpcoming.filter((event) => event.tags?.some((t) => t.slug === tagSlug))
  );

  return (
    <>
      <PageHero eyebrow="Tag" title={label.toUpperCase()} />

      {/* Same full-bleed gradient + blurred lime circle treatment as the
          other inner pages (Entertainment, Event Detail, Leasing, Group
          Events, Contact, Visit Us) — reused exactly, not a new
          background system. */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />
        <Container>
          <div className="py-12">
            {matches.length > 0 ? (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {matches.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </ul>
            ) : (
              // Honest empty state (CLAUDE.md — no invented content) for a
              // real tag with no currently-upcoming events, or an
              // unrecognized tag slug.
              <p className="text-center text-muted">No upcoming events tagged &ldquo;{label}&rdquo;.</p>
            )}

            <div className="mt-10 flex justify-center">
              <Button href="/events">View All Events</Button>
            </div>
          </div>
        </Container>
      </section>

      <PageBottom settings={settings} />
    </>
  );
}
