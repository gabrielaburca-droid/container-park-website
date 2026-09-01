import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  // Factual summary of this page's real content (the Attractions
  // business directory rendered below) — no page-specific intro copy
  // exists to extract verbatim, and the generic site description would
  // otherwise duplicate every other page's fallback.
  return buildMetadata({
    title: "Attractions",
    description:
      "Explore the attractions at Downtown Container Park, an open-air shopping and entertainment destination in Downtown Las Vegas.",
    path: "/attractions",
    // Same real hero image already rendered on this page (see
    // heroImageUrl below) — not a new/invented asset.
    ogImage: "/assets/images/all/attraction-hero.jpg",
  });
}

// TODO: NEEDS CONFIRMATION — sub-category taxonomy unconfirmed (see
// src/app/eat-drink/page.tsx for the same note).
const FILTER_OPTIONS = [{ id: "all", label: "All Attractions" }];

export default async function AttractionsPage() {
  const [businesses, settings] = await Promise.all([
    getBusinessesByCategory("attractions"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ListingTemplate
        eyebrow="Downtown"
        title="Attractions"
        heroImageUrl="/assets/images/all/attraction-hero.jpg"
        businesses={businesses}
        filterOptions={FILTER_OPTIONS}
      />
      <PageBottom settings={settings} />
    </>
  );
}
