import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    description: page?.seo?.description,
    path: "/group-events",
  });
}

export default async function GroupEventsPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Group"
        title={page?.hero?.heading || "GROUP"}
        titleAccent="BOOK AN EVENT"
        description={
          page?.hero?.subheading ||
          "Join a vibrant community of local businesses in the heart of Downtown Las Vegas."
        }
      />

      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
          {/* REAL CONTENT — verified on the live /book-an-event/ page during
              the content + SEO migration audit. The Figma design's Group
              Events screen actually showed Leasing's real copy here
              ("Looking for space for your small business?") — corrected;
              see src/app/leasing/page.tsx and the migration report. The
              heading below and the form's own heading ("Host Your Event at
              Container Park...") were already correctly placed. */}
          <div>
            <SectionHeading eyebrow="Private Events" heading="Host Your Event at Container Park" />
            <p className="mt-4 text-muted">
              Guarded by a 44-foot tall fire-breathing Praying Mantis, Downtown Container Park is a
              1.1-acre urban open-air shopping center home to unique dining and live entertainment
              built from repurposed shipping containers. The innovative shopping space provides a
              colorfully eclectic vibe to your next corporate event or private reception.
              <br />
              <br />
              The Lawn at Container Park is a green space that can host up to 300 guests, boasting a
              fully equipped 40&apos;x20&apos; live-entertainment stage complete with front canopy,
              lighting, and sound system. The NEOS play system provides ample entertainment options
              for more family-focused gatherings and occasions. Downtown Container Park is available
              for full buyouts for your late night events.
            </p>
          </div>
          <GroupEventForm />
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
