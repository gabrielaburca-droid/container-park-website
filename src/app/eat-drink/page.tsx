import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

// TODO: NEEDS CONFIRMATION — only Shop's sub-category pills were shown in
// the design; Eat & Drink's equivalent taxonomy is unconfirmed, so only a
// single "All" pill is rendered.
const FILTER_OPTIONS = [{ id: "all", label: "All Eat & Drink" }];

// Copy provided verbatim for this page's intro — kept as-is, not reworded.
const EAT_DRINK_INTRO =
  "The Downtown Container Park located on historic Fremont Street is Las Vegas’ premier shopping destination for anyone and everyone. The open air shopping center features the best selection of retail stores, restaurants and nightlife.";

export function generateMetadata(): Metadata {
  return buildMetadata({ title: "Eat & Drink", description: EAT_DRINK_INTRO, path: "/eat-drink" });
}

export default async function EatDrinkPage() {
  const [businesses, settings] = await Promise.all([
    getBusinessesByCategory("eat-drink"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ListingTemplate
        eyebrow="Downtown"
        title="Eat & Drink"
        description={EAT_DRINK_INTRO}
        heroImageUrl="/assets/images/all/eat-hero.jpg"
        businesses={businesses}
        filterOptions={FILTER_OPTIONS}
      />
      <PageBottom settings={settings} />
    </>
  );
}
