import type { Metadata } from "next";
import Link from "next/link";
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
    // Real first sentence of the page's own LocationBlock copy below,
    // not invented.
    description:
      page?.seo?.description ||
      "The Downtown Container Park is located at 707 Fremont Street, in the heart of Downtown Las Vegas at the corner of Fremont Street and S. 7th Street.",
    path: "/visit-us",
    // Same real hero image already rendered on this page's PageHero
    // below — not a new/invented asset.
    ogImage: "/assets/images/all/hero-visit.jpg",
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
          No fallback description: the live /visit/ hero is the title
          alone (the leasing-style line that used to sit here is not on
          the live page). */}
      <PageHero
        title={page?.hero?.heading || "VISIT US"}
        titleAccent="DOWNTOWN LAS VEGAS"
        description={page?.hero?.subheading}
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
          {/* Same five lines, in the same order, as the live /visit/
              page: the first two link to their pages, the rest are the
              live page's own mailto addresses. */}
          <p>
            <Link href="/contact" className="hover:underline">
              General Information
            </Link>
          </p>
          <p>
            <Link href="/leasing" className="hover:underline">
              Leasing Inquiries
            </Link>
          </p>
          <p>
            Event &amp; Venue Reservations:{" "}
            <a href="mailto:events@downtownproject.com" className="hover:underline">
              events@downtownproject.com
            </a>
          </p>
          <p>
            Booking Inquiries:{" "}
            <a href="mailto:bookings@downtowncontainerpark.com" className="hover:underline">
              bookings@downtowncontainerpark.com
            </a>
          </p>
          <p>
            Media Inquiries:{" "}
            <a href="mailto:media@downtowncontainerpark.com" className="hover:underline">
              media@downtowncontainerpark.com
            </a>
          </p>
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
                        118 S. 7th Street or the Llama parking is located just a block away at 910
                        Fremont Street.
                      </p>
                      <ul className="space-y-3">
                        <li>
                          <span className="font-semibold">Container Park Lot</span>
                          <br />
                          118 S. 7th Street
                          <br />
                          $3 Per Hour with Max of 5 hours
                        </li>
                        <li>
                          <span className="font-semibold">Downtowner Lot</span>
                          <br />
                          108 N. 8th Street
                          <br />
                          $2/hour – $10 flat rate
                        </li>
                        <li>
                          <span className="font-semibold">Llama Lot</span>
                          <br />
                          910 Fremont Street
                          <br />
                          $1/hour – $6 daily maximum
                          <br />
                          $5 flat rate on nights (after 6pm) and weekends
                        </li>
                        <li>
                          <span className="font-semibold">Place on 7th Lot</span>
                          <br />
                          115 7th Street
                          <br />
                          $3/hour
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  id: "parking-mobile-app",
                  title: "Parking Mobile App",
                  content: (
                    <div className="space-y-3">
                      <p>
                        PassportParking is the best and easiest way to pay for parking using your
                        mobile phone. No more quarters. No more running to the parking meters. In no
                        time, you can park, pay, and be on your way.
                      </p>
                      <p className="flex flex-wrap gap-x-6 gap-y-2">
                        <a
                          href="https://itunes.apple.com/us/app/passportparking%C2%ADmobile-pay/id501324867?mt=8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Download for iOS
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.passportparking.mobile&hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Download for Android
                        </a>
                      </p>
                    </div>
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
