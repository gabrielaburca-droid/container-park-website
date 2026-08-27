import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({ title: "Shop", path: "/shop" });
}

// Sub-category pills confirmed by the Shop listing Figma export only — the
// other three category listings don't have a confirmed taxonomy (NEEDS
// CONFIRMATION, see Figma spec) so they render a single "All" pill.
const FILTER_OPTIONS = [
  { id: "all", label: "All Shops" },
  { id: "fashion", label: "Fashion", tagMatch: "fashion" },
  { id: "art-gifts", label: "Art & Gifts", tagMatch: "art-gifts" },
  { id: "home-decor", label: "Home & Decor", tagMatch: "home-decor" },
  { id: "jewelry", label: "Jewelry", tagMatch: "jewelry" },
];

export default async function ShopPage() {
  const [businesses, settings] = await Promise.all([
    getBusinessesByCategory("shop"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ListingTemplate title="Shop" businesses={businesses} filterOptions={FILTER_OPTIONS} />
      <PageBottom settings={settings} />
    </>
  );
}
