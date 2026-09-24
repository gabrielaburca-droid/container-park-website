import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

// Generic website privacy copy supplied for this page — not legally
// reviewed, and deliberately free of unverified specifics (named
// processors, retention periods, legal bases, "last updated" dates).
// `title` uses the exact literal string requested for this page (with its
// own "|" separator, not the sitewide " - Downtown Container Park" pattern
// buildMetadata()/the root layout's title template would otherwise apply)
// — `absolute` bypasses that template the same way buildMetadata() already
// does elsewhere (see lib/seo/metadata.ts). noindex stays until the client
// approves a final version.
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Downtown Container Park" },
  // The page's own opening sentence, not invented.
  description:
    "Downtown Container Park respects your privacy and is committed to handling personal information responsibly.",
  robots: { index: false, follow: true },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Same `large` Hero treatment as every other real inner page
          (Leasing, Contact, Visit Us, Events, Group Events) — no
          titleAccent/description, matching Leasing's own precedent of a
          plain page-header with nothing beyond the H1. No dedicated photo
          exists for this page, so this uses PageHero's own existing
          placeholder-hero.jpg fallback — the same asset every other Hero
          without a specific image already falls back to. The heading's
          own `uppercase` class handles display casing. */}
      <PageHero title="Privacy Policy" large />

      <Container>
        <div className="py-12">
          <p className="text-sm sm:text-base">
            Downtown Container Park respects your privacy and is committed to handling personal
            information responsibly. This Privacy Policy explains what information may be collected
            when you use our website, how it may be used, and the choices available to you.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">1. Information We Collect</h2>
          <p className="mt-4 text-sm sm:text-base">
            When you use our website, you may provide information such as your name, email address,
            phone number, company information, and the contents of messages or enquiries you submit
            through our forms.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            We may also collect limited technical information automatically, such as browser type,
            device information, approximate location, and website usage data.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">2. How We Use Information</h2>
          <p className="mt-4 text-sm sm:text-base">
            Information submitted through the website may be used to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
            <li>respond to enquiries and requests;</li>
            <li>provide information about Downtown Container Park;</li>
            <li>process newsletter subscriptions;</li>
            <li>communicate with you when necessary regarding a request you have submitted;</li>
            <li>maintain, secure, and improve the website.</li>
          </ul>

          <h2 className="mt-10 text-xl sm:text-2xl">3. Newsletter Communications</h2>
          <p className="mt-4 text-sm sm:text-base">
            If you subscribe to our newsletter, your email address may be used to send you updates
            and information from Downtown Container Park. You can unsubscribe from marketing
            communications at any time using the unsubscribe option included in the relevant email.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">4. Information Sharing</h2>
          <p className="mt-4 text-sm sm:text-base">
            We do not use the information submitted through this website for purposes unrelated to
            the service or request for which it was provided.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Information may be processed by service providers that help us operate the website,
            communications, forms, analytics, event services, or other website functionality. These
            providers may process information only as necessary to provide their services.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">5. Cookies and Similar Technologies</h2>
          <p className="mt-4 text-sm sm:text-base">
            The website may use cookies or similar technologies to support website functionality,
            understand how visitors use the website, and improve the user experience.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Cookie behavior may vary depending on the services and integrations active on the
            website.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">6. Data Security</h2>
          <p className="mt-4 text-sm sm:text-base">
            We take reasonable measures to protect information submitted through the website.
            However, no method of transmitting or storing information online can be guaranteed to be
            completely secure.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">7. Your Choices</h2>
          <p className="mt-4 text-sm sm:text-base">
            Depending on applicable law, you may have rights relating to the personal information we
            hold about you, including the right to request access, correction, or deletion of your
            information.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You may also unsubscribe from marketing communications at any time.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">8. Third-Party Services</h2>
          <p className="mt-4 text-sm sm:text-base">
            Some website functionality may rely on third-party services. Those services may process
            information according to their own privacy policies and terms.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">9. Changes to This Policy</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may update this Privacy Policy from time to time to reflect changes to the website,
            our services, or applicable requirements. The updated version will be posted on this
            page.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">10. Contact</h2>
          <p className="mt-4 text-sm sm:text-base">
            If you have questions about this Privacy Policy or how information submitted through the
            website is handled, please contact Downtown Container Park through the contact
            information provided on this website.
          </p>
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
