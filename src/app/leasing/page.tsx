import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    // Real first sentence of the page's own body copy below, not invented.
    description:
      page?.seo?.description ||
      "The types of businesses we are looking to connect with are those that contribute to the community of Downtown Las Vegas.",
    path: "/leasing",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-leasing.jpg",
  });
}

export default async function LeasingPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);

  return (
    <>
      {/* Shared Hero treatment with Group Events: same real hero photo
          (hero-leasing.jpg — the Downtown Terrace building, matching the
          attached design), same `large` white-H1/lime-accent typography
          already established on the Events listing page. No eyebrow/
          badge/description — the live /leasing/ page's own Hero is a
          plain page-header with nothing beyond the H1 (see the Phase 1
          content report), and per spec nothing goes above the H1 here
          either. */}
      <PageHero
        title={page?.hero?.heading || "LEASING"}
        titleAccent="LEASE YOUR SPACE"
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
              {/* Real live H1 text ("Looking for space for your small
                  business?") — rendered as an H2 here (via SectionHeading)
                  since PageHero already supplies this page's one real H1
                  ("Leasing"); the live page itself has two H1s, which is
                  the same "stray extra H1" pattern CLAUDE.md already
                  flags elsewhere on the old site. */}
              <SectionHeading heading="Looking for space for your small business?" />
              <p className="mt-4 text-muted">
                The types of businesses we are looking to connect with are those that contribute to
                the community of Downtown Las Vegas. We are particularly looking for businesses
                that will provide the kinds of services that Downtown residents need to create a
                live, work, play environment in our neighborhood. We prefer owner-operated
                businesses that reflect the unique personality of the emerging Downtown rather than
                chains or franchises. We also have a limited number of office space available.
                <br />
                <br />
                Fill out the form below with all the information we will need to assess your idea
                and help it come to fruition. We look forward to seeing your submission and feeling
                your passion and will be contacting you in the near future!
                <br />
                <br />
                Note: As a result of high demand Downtown Container Park is often 100% leased,
                however we are always accepting applications for new tenants. If you are interested
                in being considered for a future vacancy in the Park, please submit the application
                to be placed on our waiting list.
              </p>
            </div>
            <div className="min-w-0 md:max-w-[770px] md:flex-1">
              <LeasingInquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <PageBottom settings={settings} />
    </>
  );
}
