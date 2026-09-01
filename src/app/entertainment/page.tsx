import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/event/EventCard";
import { EventCalendar } from "@/components/events/EventCalendar";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getUpcomingEvents, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  // Factual summary of this page's real content (Featured Events + Event
  // Calendar, both rendered below) — no page-specific intro copy exists
  // to extract verbatim, and the generic site description would
  // otherwise duplicate every other page's fallback.
  return buildMetadata({
    title: "Entertainment",
    description:
      "Upcoming events, live entertainment, and the full event calendar at Downtown Container Park in Las Vegas.",
    path: "/entertainment",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-events.jpg",
  });
}

// REAL CONTENT — the live /entertainment/ page is not a business directory
// (see data/mock/businesses.ts's header note: no business on the live site
// is confirmed as belonging to an "entertainment" category anywhere).
// Its actual real content is a "Featured Events" widget listing the same
// events already migrated for the Events section — The Mantis, Yoga in
// the Park, Whiskey & Wine Wednesday, Canvas and Cocktails DTLV, Pop
// Rocks, Chismosas Y Mimosas — plus a month calendar. Rebuilt here as a
// "Featured Events" section reusing the same real event data and the same
// EventCard component already used on the Events listing/detail pages,
// rather than the empty business grid this page showed before (which had
// nothing real to display) or an invented new calendar widget.
export default async function EntertainmentPage() {
  const [allUpcoming, settings] = await Promise.all([getUpcomingEvents(), getSiteSettings()]);

  // De-duplicated by slug (not _id): many events are expanded into one
  // row per real occurrence (see data/mock/events.ts) — "Featured Events"
  // should showcase distinct events, not the same one repeated across
  // its many upcoming dates.
  const seenSlugs = new Set<string>();
  const featuredEvents = allUpcoming
    .filter((event) => {
      if (seenSlugs.has(event.slug.current)) return false;
      seenSlugs.add(event.slug.current);
      return true;
    })
    .slice(0, 8);

  return (
    <>
      {/* Same `large` white-H1 Hero treatment already established on
          Events/Leasing/Group Events/Contact/Visit Us — no eyebrow above
          the H1. Real park photo (hero-events.jpg) — no dedicated
          Entertainment hero asset exists in the project (checked), and
          this page's real content ends up being events anyway. */}
      <PageHero title="ENTERTAINMENT" imageUrl="/assets/images/all/hero-events.jpg" large />

      {/* Same full-bleed gradient + blurred lime circle treatment as the
          other redesigned inner pages (Shop single/Business Detail,
          Event Detail, Leasing, Group Events, Contact, Visit Us) —
          reused exactly, not a new background system. */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />
        <Container>
          <div className="py-12">
            {featuredEvents.length > 0 ? (
              <>
                {/* "Featured Events" is the live page's own real heading
                    text (its second H1, after "Entertainment" — the same
                    stray-extra-H1 pattern CLAUDE.md already flags
                    elsewhere on the old site; rendered as an H2 here
                    since PageHero already supplies this page's one real
                    H1). */}
                <SectionHeading heading="Featured Events" align="center" />
                <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {featuredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </ul>
                <div className="mt-10 flex justify-center">
                  <Button href="/events">View All Events</Button>
                </div>
              </>
            ) : (
              <p className="text-muted">No upcoming events yet.</p>
            )}
          </div>

          {/* REAL FUNCTIONALITY — the live /entertainment/ page's own
              real calendar (a Modern Events Calendar month grid with
              prev/next navigation and click-a-day-to-see-its-events),
              reimplemented natively against this project's own real
              event data instead of copying MEC's markup/styling. See
              EventCalendar.tsx for the full reasoning. Uses `allUpcoming`
              (every real occurrence, not just the deduped "Featured
              Events" slice above) so every date with a real event is
              represented. */}
          {allUpcoming.length > 0 && (
            <div className="pb-16">
              <SectionHeading heading="Event Calendar" align="center" />
              <div className="mt-8">
                <EventCalendar events={allUpcoming} />
              </div>
            </div>
          )}
        </Container>
      </section>

      <PageBottom settings={settings} />
    </>
  );
}
