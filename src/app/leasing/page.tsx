import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { LeasingInquiryForm } from "@/components/forms/LeasingInquiryForm";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

const PAGE_ID = "page-leasing";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(PAGE_ID);
  return buildMetadata({
    title: page?.seo?.title || "Leasing",
    description: page?.seo?.description,
    path: "/leasing",
  });
}

export default async function LeasingPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Leasing"
        title={page?.hero?.heading || "LEASING"}
        titleAccent="LEASE YOUR SPACE"
        description={
          page?.hero?.subheading ||
          "Join a vibrant community of local businesses in the heart of Downtown Las Vegas."
        }
      />

      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
          {/* REAL CONTENT — verified on the live /leasing/ page during the
              content + SEO migration audit. The Figma design's Leasing
              screen actually showed the park-description copy that's real
              content on the live /book-an-event/ (Group Events) page — the
              two pages' body copy was swapped in the Figma mockup relative
              to the live site. Corrected here; see the migration report. */}
          <p className="text-muted">
            The types of businesses we are looking to connect with are those that contribute to the
            community of Downtown Las Vegas. We are particularly looking for businesses that will
            provide the kinds of services that Downtown residents need to create a live, work, play
            environment in our neighborhood. We prefer owner-operated businesses that reflect the
            unique personality of the emerging Downtown rather than chains or franchises. We also
            have a limited number of office space available.
            <br />
            <br />
            Fill out the form below with all the information we will need to assess your idea and
            help it come to fruition. We look forward to seeing your submission and feeling your
            passion and will be contacting you in the near future!
            <br />
            <br />
            Note: As a result of high demand Downtown Container Park is often 100% leased, however
            we are always accepting applications for new tenants. If you are interested in being
            considered for a future vacancy in the Park, please submit the application to be placed
            on our waiting list.
          </p>
          <LeasingInquiryForm />
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
