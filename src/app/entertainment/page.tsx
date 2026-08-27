import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({ title: "Entertainment", path: "/entertainment" });
}

// TODO: NEEDS CONFIRMATION — sub-category taxonomy unconfirmed (see
// src/app/eat-drink/page.tsx for the same note).
const FILTER_OPTIONS = [{ id: "all", label: "All Entertainment" }];

export default async function EntertainmentPage() {
  const [businesses, settings] = await Promise.all([
    getBusinessesByCategory("entertainment"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ListingTemplate
        title="Entertainment"
        businesses={businesses}
        filterOptions={FILTER_OPTIONS}
      />
      <PageBottom settings={settings} />
    </>
  );
}
