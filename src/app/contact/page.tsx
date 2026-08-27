import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildDirectionsUrl } from "@/lib/maps";

const PAGE_ID = "page-contact";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(PAGE_ID);
  return buildMetadata({
    title: page?.seo?.title || "Contact",
    description: page?.seo?.description,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPage(PAGE_ID), getSiteSettings()]);
  const directionsUrl = buildDirectionsUrl(settings?.address);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={page?.hero?.heading || "CONTACT"}
        titleAccent="LET'S CONNECT"
        description={
          page?.hero?.subheading ||
          "Join a vibrant community of local businesses in the heart of Downtown Las Vegas."
        }
      />

      <section className="mx-auto grid max-w-container grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-2">
        <MapPlaceholder className="aspect-[4/3] lg:aspect-auto" />
        <div>
          {/* REAL CONTENT — address/phone/email below come from
              siteSettings, re-verified against the live site during the
              content + SEO migration audit (see src/data/mock/siteSettings.ts). */}
          <h2 className="font-display text-2xl uppercase">Your Contact Information</h2>
          <div className="mt-4 space-y-2 text-sm">
            {settings?.address && (
              <p>
                {[
                  settings.address.street,
                  settings.address.city,
                  settings.address.state,
                  settings.address.zip,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            {settings?.phone && <p>{settings.phone}</p>}
            {settings?.email && <p>{settings.email}</p>}
          </div>
          {directionsUrl && (
            <div className="mt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold uppercase underline"
              >
                Get Directions
              </a>
            </div>
          )}
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <PageBottom settings={settings} showPlanYourVisit={false} />
    </>
  );
}
