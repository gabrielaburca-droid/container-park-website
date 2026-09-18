import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

// DRAFT — client/legal-review copy, not final (see the [CLIENT / LEGAL
// COUNSEL TO CONFIRM] placeholder in the body below). Same metadata
// reasoning as src/app/privacy-policy/page.tsx: `absolute` for the exact
// requested title string, noindex while unconfirmed sections remain.
export const metadata: Metadata = {
  title: { absolute: "Terms & Conditions | Downtown Container Park" },
  // The draft copy's own opening sentence, not invented.
  description: "These Terms & Conditions govern your use of the Downtown Container Park website.",
  robots: { index: false, follow: true },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Same `large` Hero treatment as every other real inner page — see
          privacy-policy/page.tsx for the full reasoning. */}
      <PageHero title="TERMS & CONDITIONS" large />

      <Container>
        <div className="py-12">
          <p className="text-sm text-muted">Last updated: [CLIENT TO CONFIRM]</p>

          <p className="mt-6 text-sm sm:text-base">
            These Terms &amp; Conditions govern your use of the Downtown Container Park website.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            By accessing or using this website, you agree to use it in accordance with these
            terms.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">1. Website Use</h2>
          <p className="mt-4 text-sm sm:text-base">
            You may use this website for lawful purposes and for obtaining information about
            Downtown Container Park, its businesses, events, services, and activities.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You agree not to use the website in a way that could damage, disable, overburden, or
            interfere with the operation of the website or its associated services.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">2. Website Content</h2>
          <p className="mt-4 text-sm sm:text-base">
            The information and materials published on this website are provided for general
            informational purposes.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Business information, event details, hours, availability, prices, promotions, and
            other information may change from time to time.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            While we aim to keep information accurate and current, Downtown Container Park does
            not guarantee that all website content will always be complete, accurate, or up to
            date.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">3. Events, Businesses and Third-Party Services</h2>
          <p className="mt-4 text-sm sm:text-base">
            Downtown Container Park features information about businesses, restaurants, shops,
            attractions, events, and other activities.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Some products, services, reservations, transactions, promotions, or activities may be
            provided by individual businesses or third parties.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Those businesses or third parties may have their own terms, policies, pricing,
            availability, and conditions.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Users should contact the relevant business or event organizer for specific information
            before making a purchase, reservation, or other commitment.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">4. External Links</h2>
          <p className="mt-4 text-sm sm:text-base">
            The website may contain links to websites or services operated by third parties.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Downtown Container Park is not responsible for the content, availability, privacy
            practices, or policies of third-party websites.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">5. Intellectual Property</h2>
          <p className="mt-4 text-sm sm:text-base">
            Unless otherwise indicated, website content, branding, graphics, text, images, and
            other materials are owned by or used with permission by Downtown Container Park or
            their respective owners.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You may not reproduce, distribute, modify, or commercially use website content without
            appropriate permission.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">6. Website Availability</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may modify, suspend, or discontinue portions of the website or its functionality at
            any time.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            We do not guarantee that the website will always be available, uninterrupted, or free
            of errors.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">7. Disclaimer</h2>
          <p className="mt-4 text-sm sm:text-base">
            The website and its content are provided for general informational purposes.
          </p>
          {/* Reuses the sitewide "needs attention" token (same red already
              used for e.g. business/BusinessCard.tsx's "Closed now!") to
              make this still-open placeholder easy for the client/counsel
              to spot during review — not new/invented styling or legal
              language. */}
          <p className="mt-4 text-sm font-semibold text-status-closed sm:text-base">
            [CLIENT / LEGAL COUNSEL TO CONFIRM the appropriate warranty and liability language for
            the final version.]
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">8. Changes to These Terms</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may update these Terms &amp; Conditions from time to time.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Any updated version will be posted on this page with a revised &quot;Last
            updated&quot; date.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">9. Contact Us</h2>
          <p className="mt-4 text-sm sm:text-base">
            Questions regarding these Terms &amp; Conditions may be directed to:
          </p>
          {/* Same real values already used sitewide, read from the same
              shared settings source — see privacy-policy/page.tsx. */}
          <address className="mt-2 text-sm not-italic sm:text-base">
            Downtown Container Park
            <br />
            {settings?.address?.street || "707 Fremont Street"}
            <br />
            {settings?.address?.city || "Las Vegas"}, {settings?.address?.state || "NV"}{" "}
            {settings?.address?.zip || "89101"}
            <br />
            <a
              href={`mailto:${settings?.email || "info@downtowncontainerpark.com"}`}
              className="hover:underline"
            >
              {settings?.email || "info@downtowncontainerpark.com"}
            </a>
            <br />
            <a
              href={`tel:+1${(settings?.phone || "(702) 359-9982").replace(/\D/g, "")}`}
              className="hover:underline"
            >
              {settings?.phone || "(702) 359-9982"}
            </a>
          </address>
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
