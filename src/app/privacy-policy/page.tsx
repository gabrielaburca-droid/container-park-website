import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

// DRAFT — client/legal-review copy, not final (see the [CLIENT TO CONFIRM]
// placeholders in the body below). `title` uses the exact literal string
// requested for this page (with its own "|" separator, not the sitewide
// " - Downtown Container Park" pattern buildMetadata()/the root layout's
// title template would otherwise apply) — `absolute` bypasses that
// template the same way buildMetadata() already does elsewhere (see
// lib/seo/metadata.ts). noindex is deliberate while this still contains
// unconfirmed placeholder sections — remove once the client approves a
// final version.
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Downtown Container Park" },
  // The draft copy's own opening sentence, not invented.
  description:
    "Downtown Container Park respects your privacy and is committed to protecting the information you provide when using our website.",
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
          without a specific image already falls back to. */}
      <PageHero title="PRIVACY POLICY" large />

      <Container>
        <div className="py-12">
          <p className="text-sm text-muted">Last updated: [CLIENT TO CONFIRM]</p>

          <p className="mt-6 text-sm sm:text-base">
            Downtown Container Park (&quot;Downtown Container Park,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to
            protecting the information you provide when using our website.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            This Privacy Policy explains what information we may collect through our website, how
            we may use it, and the choices available to you.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">1. Information We Collect</h2>
          <p className="mt-4 text-sm sm:text-base">
            Depending on how you interact with our website, we may collect information such as
            your name, email address, phone number, company name, and other information you
            choose to provide through our contact, event, leasing, or other forms.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            If you subscribe to communications from us, we may also collect the information
            necessary to provide those communications.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Our website may also automatically collect certain technical information, such as
            browser type, device information, IP address, pages visited, and general website
            usage information through cookies, analytics, or similar technologies.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">2. How We Use Information</h2>
          <p className="mt-4 text-sm sm:text-base">Information you provide may be used to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
            <li>respond to your inquiries;</li>
            <li>process requests submitted through our website;</li>
            <li>respond to event, leasing, booking, or other inquiries;</li>
            <li>provide information or communications you have requested;</li>
            <li>maintain and improve our website and services; and</li>
            <li>understand how visitors use our website.</li>
          </ul>

          <h2 className="mt-10 text-xl sm:text-2xl">3. Communications</h2>
          <p className="mt-4 text-sm sm:text-base">
            If you choose to subscribe to communications from Downtown Container Park, we may use
            the information you provide to send you updates, news, offers, or other
            communications.
          </p>
          <p className="mt-4 text-sm sm:text-base">
            You may unsubscribe from marketing communications at any time by using the unsubscribe
            option included in the relevant communication.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">4. Cookies and Analytics</h2>
          <p className="mt-4 text-sm sm:text-base">
            Our website may use cookies and similar technologies to provide functionality,
            understand website usage, and improve the visitor experience.
          </p>
          {/* Reuses the sitewide "needs attention" token (same red already
              used for e.g. business/BusinessCard.tsx's "Closed now!") to
              make every still-open placeholder easy for the client to spot
              during review — not new/invented styling. */}
          <p className="mt-4 text-sm font-semibold text-status-closed sm:text-base">
            [CLIENT TO CONFIRM which analytics, advertising, cookie, and tracking services are
            currently used on the website.]
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">5. Third-Party Services</h2>
          <p className="mt-4 text-sm sm:text-base">
            Our website may use third-party services for functions such as forms, analytics,
            embedded content, maps, social media, event functionality, communications, or other
            website features.
          </p>
          <p className="mt-4 text-sm font-semibold text-status-closed sm:text-base">
            [CLIENT TO CONFIRM the current third-party services/providers that should be listed in
            the final Privacy Policy.]
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">6. Data Retention</h2>
          <p className="mt-4 text-sm font-semibold text-status-closed sm:text-base">
            [CLIENT TO CONFIRM the applicable data retention periods and practices.]
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">7. Your Privacy Choices</h2>
          <p className="mt-4 text-sm sm:text-base">
            You may contact us regarding personal information you have submitted through the
            website or to ask questions about this Privacy Policy.
          </p>
          <p className="mt-6 text-sm font-semibold sm:text-base">Contact:</p>
          {/* Same real values already used sitewide (see Contact page),
              read from the same shared settings source rather than a
              second, independently-drifting hardcoded copy. Fallbacks are
              the exact literal values already in that source today —
              never guessed. */}
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

          <h2 className="mt-10 text-xl sm:text-2xl">8. Changes to This Privacy Policy</h2>
          <p className="mt-4 text-sm sm:text-base">
            We may update this Privacy Policy from time to time. Any updated version will be
            posted on this page with a revised &quot;Last updated&quot; date.
          </p>

          <h2 className="mt-10 text-xl sm:text-2xl">9. Contact Us</h2>
          <p className="mt-4 text-sm sm:text-base">
            If you have questions about this Privacy Policy or how information submitted through
            the website is handled, please contact us using the information above.
          </p>
        </div>
      </Container>

      <PageBottom settings={settings} />
    </>
  );
}
