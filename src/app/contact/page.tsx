import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildDirectionsUrl, buildMapsEmbedUrl } from "@/lib/maps";

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
  const mapsEmbedUrl = buildMapsEmbedUrl(settings?.address);

  return (
    <>
      {/* RESTYLE ONLY: switched to the same `large` white-H1/lime-accent
          Hero treatment already established on Events/Leasing/Group
          Events (no small eyebrow above the H1, per the attached design)
          and wired in the real hero-contact.jpg asset — this Hero
          previously had no image at all. Title/titleAccent/description
          text values are exactly what was already there; nothing about
          the actual copy changed. */}
      <PageHero
        title={page?.hero?.heading || "CONTACT"}
        titleAccent="LET'S CONNECT"
        description={
          page?.hero?.subheading ||
          "Join a vibrant community of local businesses in the heart of Downtown Las Vegas."
        }
        imageUrl="/assets/images/all/hero-contact.jpg"
        large
      />

      {/* Same full-bleed gradient + blurred lime circle treatment as the
          Shop single (Business Detail), Event Detail, Leasing, and Group
          Events pages — reused exactly, not a new background system. */}
      <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
        />

        {/* Full-bleed 50/50 split (not confined to the Container's inner
            width) so the map can feel like a large editorial block
            flush to the viewport's left edge, matching the design —
            the right column gets its own Container-width constraint
            below instead. */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Real, interactive Google Maps embed (keyless — see
              lib/maps.ts), same mechanism already used on Business
              Detail and Event Detail — grayscale is a pure CSS filter on
              top of it, not a static replacement image. min-h ensures a
              substantial block on mobile before the grid's own row-
              stretch takes over at md:. */}
          {mapsEmbedUrl && (
            <iframe
              src={mapsEmbedUrl}
              title="Map showing Downtown Container Park's location"
              className="min-h-[360px] w-full grayscale md:h-full md:min-h-0"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}

          {/* Right padding is computed, not a fixed breakpoint value: this
              column is full-bleed (see the grid above), so at any
              viewport past the sitewide Container's own 1380px cap its
              content would otherwise keep growing past where Container's
              real right edge falls. `max(1rem, calc(50vw - 674px))`
              reproduces Container's own math exactly (674 = half of
              1380px, minus its 16px inner padding) — below that
              viewport, 1rem matches Container's own px-4; above it, the
              padding grows exactly enough to land on the same edge
              Container's content would use, so this column never
              extends past the rest of the page's normal content
              boundary. */}
          <div className="px-4 py-12 md:pl-12 md:pr-[max(1rem,calc(50vw-674px))] lg:pl-16">
            {/* REAL CONTENT — address/phone/email below come from
                siteSettings, re-verified against the live site during the
                content + SEO migration audit (see
                src/data/mock/siteSettings.ts). Text/values unchanged —
                only the layout/typography/icons are restyled here. */}
            <h2 className="font-display text-2xl uppercase lg:text-[36px]">
              Your Contact Information
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              {settings?.address && (
                <p className="flex items-start gap-3">
                  <Image
                    src="/assets/images/all/location-icon-green.svg"
                    alt=""
                    width={38}
                    height={50}
                    className="h-5 w-auto shrink-0"
                  />
                  <span>
                    {[
                      settings.address.street,
                      settings.address.city,
                      settings.address.state,
                      settings.address.zip,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </p>
              )}
              {settings?.phone && (
                <p className="flex items-center gap-3">
                  <Image
                    src="/assets/images/all/icon-phone-green.svg"
                    alt=""
                    width={21}
                    height={20}
                    className="h-5 w-auto shrink-0"
                  />
                  <span>{settings.phone}</span>
                </p>
              )}
              {settings?.email && (
                <p className="flex items-center gap-3">
                  <Image
                    src="/assets/images/all/icon-email-green.svg"
                    alt=""
                    width={23}
                    height={16}
                    className="h-5 w-auto shrink-0"
                  />
                  <a href={`mailto:${settings.email}`} className="hover:underline">
                    {settings.email}
                  </a>
                </p>
              )}
            </div>
            {directionsUrl && (
              <div className="mt-6">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-sm uppercase tracking-wide underline underline-offset-2"
                >
                  Get Directions
                </a>
              </div>
            )}
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <PageBottom settings={settings} showPlanYourVisit={false} />
    </>
  );
}
