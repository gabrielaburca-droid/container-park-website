import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

// Generic website terms copy supplied for this page — not legally
// reviewed. Same metadata reasoning as src/app/privacy-policy/page.tsx:
// `absolute` for the exact requested title string, noindex until the
// client approves a final version.
export const metadata: Metadata = {
  title: { absolute: "Terms of Use | Downtown Container Park" },
  // The page's own opening sentence, not invented.
  description:
    "By using the Downtown Container Park website, you agree to use the website responsibly and in accordance with these Terms of Use.",
  robots: { index: false, follow: true },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Same `large` Hero treatment as every other real inner page — see
          privacy-policy/page.tsx for the full reasoning. */}
      <PageHero title="Terms of Use" large />

      <Container>
        <div className="py-12">
          <p className="text-sm sm:text-base">
            By using the Downtown Container Park website, you agree to use the website responsibly
            and in accordance with these Terms of Use.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">1. Website Use</h2>
          <p className="mt-4 text-sm sm:text-base">
            This website provides information about Downtown Container Park, its businesses, events,
            attractions, services, and related activities.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You may use the website for lawful, personal, and informational purposes.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">2. Website Content</h2>
          <p className="mt-4 text-sm sm:text-base">
            We make reasonable efforts to keep website information useful and current. However,
            event details, business information, hours, availability, pricing, and other information
            may change without notice.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You should confirm important details directly with the relevant business or Downtown
            Container Park before making plans based on information presented on the website.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">3. Events and Businesses</h2>
          <p className="mt-4 text-sm sm:text-base">
            Information about individual businesses, events, attractions, and services may be
            provided by Downtown Container Park or by third parties.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Downtown Container Park does not guarantee that third-party information will always be
            complete, accurate, or current.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">4. External Links and Services</h2>
          <p className="mt-4 text-sm sm:text-base">
            The website may contain links to third-party websites or services. These websites are
            operated independently and may have their own terms and privacy policies.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Downtown Container Park is not responsible for the content, availability, or policies of
            third-party websites.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">5. Intellectual Property</h2>
          <p className="mt-4 text-sm sm:text-base">
            Unless otherwise indicated, website content, branding, text, graphics, images, and other
            materials are owned by or used by Downtown Container Park and may not be reproduced,
            distributed, or used commercially without appropriate permission.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">6. Website Availability</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may modify, suspend, or discontinue parts of the website from time to time for
            maintenance, updates, or other operational reasons.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            We do not guarantee that the website will always be available or free from errors or
            interruptions.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">7. Limitation of Information</h2>
          <p className="mt-4 text-sm sm:text-base">
            The information provided on this website is for general informational purposes. Nothing
            on the website should be interpreted as a guarantee of availability, pricing, event
            schedules, business operating hours, or any other information that may change over time.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">8. Changes to These Terms</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may update these Terms of Use from time to time. Changes will become effective when
            the updated terms are posted on this page.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">9. Contact</h2>
          <p className="mt-4 text-sm sm:text-base">
            If you have questions about these Terms of Use, please contact Downtown Container Park
            through the contact information provided on this website.
          </p>
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
