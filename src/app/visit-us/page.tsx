import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { LocationBlock } from "@/components/visit/LocationBlock";
import { ServicesGrid } from "@/components/visit/ServicesGrid";
import { ParkRulesList } from "@/components/visit/ParkRulesList";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildDirectionsUrl } from "@/lib/maps";

const PAGE_ID = "page-visit-us";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(PAGE_ID);
  return buildMetadata({
    title: page?.seo?.title || "Visit Us",
    description: page?.seo?.description,
    path: "/visit-us",
  });
}

export default async function VisitUsPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);
  const directionsUrl = buildDirectionsUrl(settings?.address);

  return (
    <>
      {/* RESTYLE ONLY: switched to the same `large` white-H1/lime-accent
          Hero treatment already established on Events/Leasing/Group
          Events/Contact (no small eyebrow above the H1, per the attached
          design) and wired in the real hero-visit.jpg asset.
          Title/titleAccent/description text values are exactly what was
          already there; nothing about the actual copy changed. */}
      <PageHero
        title={page?.hero?.heading || "VISIT US"}
        titleAccent="DOWNTOWN LAS VEGAS"
        description={
          page?.hero?.subheading ||
          "Join a vibrant community of local businesses in the heart of Downtown Las Vegas."
        }
        imageUrl="/assets/images/all/hero-visit.jpg"
        large
      />

      {/* REAL CONTENT — re-verified word-for-word against the live
          /visit/ page during the content + SEO migration audit (it
          matched what was already here). Holiday Hours line and the
          categorized contact emails below are newly migrated real content
          that wasn't present before. */}
      <LocationBlock
        description="The Downtown Container Park is located at 707 Fremont Street, in the heart of Downtown Las Vegas at the corner of Fremont Street and S. 7th Street. Conveniently located near the I15 FWY and the 93/95 FWY, just minutes from Summerlin or Henderson."
        address={settings?.address}
        directionsUrl={directionsUrl}
      >
        <ServicesGrid />

        <div className="mt-8 space-y-1 text-sm text-muted">
          <p className="font-semibold text-foreground">Holiday Hours</p>
          <p>Closed on Christmas &amp; Thanksgiving Day.</p>
        </div>

        <div className="mt-8 space-y-1 text-sm text-muted">
          <p className="font-semibold text-foreground">Contact</p>
          <p>Bookings: bookings@downtowncontainerpark.com</p>
          <p>Event &amp; Venue Reservations: events@downtownproject.com</p>
          <p>Media Inquiries: media@downtowncontainerpark.com</p>
        </div>
      </LocationBlock>

      <Container>
        {/* Single column, per spec — was a 2-column grid (Park Rules
            beside the accordion); the attached design stacks them in one
            column instead: Park Rules, then the accordion box below it.
            pt-12 matches LocationBlock's own top padding (py-12) so this
            section has the same breathing room above it as the other
            main sections on the page. */}
        <div className="pb-16 pt-12">
          <SectionHeading
            eyebrow="Discover the Park"
            heading="Parking in Downtown"
            align="center"
          />
          <div className="mt-8">
            <ParkRulesList directionsUrl={directionsUrl} />
            {/* REAL CONTENT — all 4 accordion items migrated from the live
                /visit/ page during the content + SEO migration audit. The
                Figma design only showed "Public Transportation" expanded;
                the other three were collapsed there and unreadable, but
                their real content was recovered directly from the live
                site (not invented, not left as filler). */}
            <div className="mt-8 bg-[#F5F5F5] p-6 sm:p-8">
              <Accordion
                items={[
                {
                  id: "public-transportation",
                  title: "Public Transportation",
                  defaultOpen: true,
                  content: (
                    <div className="space-y-3">
                      <p className="font-semibold">The Deuce – Las Vegas Blvd (Strip) Transportation</p>
                      <p>
                        The double-decker Deuce buses operate along Las Vegas Blvd. 24/7 with
                        several convenient stops around the Fremont Street Experience. Customers
                        heading north along the Strip could disembark at either:
                      </p>
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Fremont Street Experience on Las Vegas Blvd.</li>
                        <li>Mob Museum on Stewart &amp; 4th St.</li>
                        <li>Fremont Street Experience on 4th St</li>
                        <li>Fremont Street Experience on Carson east of Casino Center</li>
                      </ul>
                      <p>
                        Customers heading south along Las Vegas Blvd. can disembark at the Fremont
                        Street Experience on Las Vegas Blvd. near Fremont St.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "parking-locations",
                  title: "Parking Locations",
                  content: (
                    <div className="space-y-3">
                      <p>
                        The Container Park parking lot is conveniently located across the street at
                        118 S. 7th Street, or the Llama parking is located just a block away at 910
                        Fremont Street.
                      </p>
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Container Park Lot — 118 S. 7th Street — $3/hour, max of 5 hours</li>
                        <li>Downtowner Lot — 108 N. 8th Street — $2/hour, $10 flat rate</li>
                        <li>
                          Llama Lot — 910 Fremont Street — $1/hour, $6 daily maximum, $5 flat rate
                          on nights (after 6pm) and weekends
                        </li>
                        <li>Place on 7th Lot — 115 7th Street — $3/hour</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  id: "parking-mobile-app",
                  title: "Parking Mobile App",
                  content: (
                    <p>
                      PassportParking is the best and easiest way to pay for parking using your
                      mobile phone. No more quarters, no more running to the parking meters — in no
                      time you can park, pay, and be on your way. Available for iOS and Android.
                    </p>
                  ),
                },
                {
                  id: "additional-notice",
                  title: "Additional Notice",
                  content: (
                    <div className="space-y-2">
                      <p>
                        There is no on-site parking at Downtown Container Park. Individuals with
                        disabilities may use the 10 minute loading zone in front of Downtown
                        Container Park for pick-up and drop-off.
                      </p>
                      <p>
                        Due to extreme weather, we reserve the right to restrict access to the
                        Treehouse slide.
                      </p>
                    </div>
                  ),
                },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>

      <PageBottom settings={settings} showPlanYourVisit={false} />
    </>
  );
}
