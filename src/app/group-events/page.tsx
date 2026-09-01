import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { GroupEventForm } from "@/components/forms/GroupEventForm";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

const PAGE_ID = "page-group-events";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(PAGE_ID);
  return buildMetadata({
    title: page?.seo?.title || "Group Events",
    // Derived from the same real page copy rendered in the body
    // paragraph below (live-site text, not invented), trimmed to a
    // concise meta-description length.
    description:
      page?.seo?.description ||
      "Guarded by a 44-foot tall fire-breathing Praying Mantis, Downtown Container Park is a 1.1-acre open-air shopping center in Downtown Las Vegas.",
    path: "/group-events",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-leasing.jpg",
  });
}

export default async function GroupEventsPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);

  return (
    <>
      {/* Shared Hero treatment with Leasing: same real hero photo
          (hero-leasing.jpg — the Downtown Terrace building, matching the
          attached design), same `large` white-H1/lime-accent typography
          already established on the Events listing page. Per spec the H1
          is "GROUP EVENTS" (not the live page's literal "Book an Event")
          with "BOOK AN EVENT" as the accent line below it — an explicit
          design decision for this Hero, not an invented content
          substitution. No eyebrow/badge/description above the H1. */}
      <PageHero
        title={page?.hero?.heading || "GROUP EVENTS"}
        titleAccent="BOOK AN EVENT"
        imageUrl="/assets/images/all/hero-leasing.jpg"
        large
      />

      {/* Same full-bleed gradient + blurred lime circle treatment as the
          Shop single (Business Detail) and Event Detail pages — reused
          exactly, not a new background system. */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />
        <Container>
          {/* flex (not a fixed-fraction grid) so each column can grow
              toward its own max-width independently — content capped at
              560px, form capped at 770px, per spec — while a fixed gap
              (not a shared fr-track gap that shrinks as columns grow)
              keeps deliberate breathing room between them at every width
              above `md`. Below `md` both columns drop their max-width
              and stack at 100%. */}
          <div className="flex flex-col gap-8 py-12 md:flex-row md:gap-8 lg:gap-16">
            <div className="min-w-0 md:max-w-[560px] md:flex-1">
              {/* Real park-description copy, transcribed verbatim from
                  the live page's body (including its own "Central to the
                  park, and..." phrasing — not smoothed over, since
                  that's the live site's actual wording). No heading
                  precedes this on the live page — "Host Your Event at
                  Container Park" belongs to the form section only (see
                  GroupEventForm.tsx), not duplicated here. */}
              <p className="text-sm text-muted sm:text-base">
                Guarded by a 44-foot tall fire-breathing Praying Mantis, Downtown Container Park is
                a 1.1-acre urban open-air shopping center home to unique dining and live
                entertainment built from repurposed shipping containers. The innovative shopping
                space provides a colorfully eclectic vibe to your next corporate event or private
                reception.
                <br />
                <br />
                The Lawn at Container Park is a green space that can host up to 300 guests boasting
                a fully equipped 40&apos;x20&apos; live-entertainment stage complete with front
                canopy, lighting, and sound system. Central to the park, and NEOS play system
                provides ample entertainment options for more family-focused gatherings and
                occasions. Downtown Container Park is available for full buyouts for your late
                night events.
              </p>
            </div>
            <div className="min-w-0 md:max-w-[770px] md:flex-1">
              <GroupEventForm />
            </div>
          </div>
        </Container>
      </section>

      <PageBottom settings={settings} />
    </>
  );
}
