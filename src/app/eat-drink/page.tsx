import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({ title: "Eat & Drink", path: "/eat-drink" });
}

// TODO: NEEDS CONFIRMATION — only Shop's sub-category pills were shown in
// the design; Eat & Drink's equivalent taxonomy is unconfirmed, so only a
// single "All" pill is rendered.
const FILTER_OPTIONS = [{ id: "all", label: "All Eat & Drink" }];

export default async function EatDrinkPage() {
  const [businesses, settings] = await Promise.all([
    getBusinessesByCategory("eat-drink"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ListingTemplate title="Eat & Drink" businesses={businesses} filterOptions={FILTER_OPTIONS} />
      <PageBottom settings={settings} />
    </>
  );
}
