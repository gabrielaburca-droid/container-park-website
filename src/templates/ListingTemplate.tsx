"use client";

import { useMemo, useState } from "react";
import { BusinessCard } from "@/components/business/BusinessCard";
import {
  CategoryFilterPills,
  type FilterPillOption,
} from "@/components/listing/CategoryFilterPills";
import { SortDropdown } from "@/components/listing/SortDropdown";
import { MediaGallery, type MediaGalleryItem } from "@/components/ui/MediaGallery";
import { Container } from "@/components/ui/Container";
import type { Business } from "@/lib/sanity/types";

interface ListingTemplateProps {
  title: string;
  description?: string;
  businesses: Business[];
  /**
   * Sub-category filter pills. Only Shop's taxonomy is confirmed by the
   * design (All Shops / Fashion / Art & Gifts / Home & Decor / Jewelry) —
   * the other three listing routes pass a single "All {Category}" pill
   * until their taxonomies are confirmed (NEEDS CONFIRMATION, see Figma
   * spec).
   */
  filterOptions?: FilterPillOption[];
  galleryItems?: MediaGalleryItem[];
}

const DEFAULT_FILTER: FilterPillOption = { id: "all", label: "All" };

// Shared by Shop, Eat & Drink, Entertainment, and Attractions.
// CLICK/INTERACTION: filter pills implemented as client-side filtering
// against `business.tags` — whether the real design intends client-side vs.
// URL/query-param-driven filtering is NEEDS CONFIRMATION.
export function ListingTemplate({
  title,
  description,
  businesses,
  filterOptions = [DEFAULT_FILTER],
  galleryItems = [],
}: ListingTemplateProps) {
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]?.id ?? "all");
  const [sort, setSort] = useState("");

  const filtered = useMemo(() => {
    const activeOption = filterOptions.find((option) => option.id === activeFilter);
    if (!activeOption?.tagMatch) return businesses;
    const tagMatch = activeOption.tagMatch;
    return businesses.filter((business) => business.tags?.includes(tagMatch));
  }, [businesses, filterOptions, activeFilter]);

  return (
    <>
      <Container>
        <div className="py-12">
          <h1 className="font-display text-3xl uppercase sm:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <CategoryFilterPills
              options={filterOptions}
              activeId={activeFilter}
              onSelect={setActiveFilter}
            />
            {/* Sort has no options confirmed yet — selecting a value is
                currently inert (see SortDropdown TODO). */}
            <SortDropdown options={[]} value={sort} onChange={setSort} />
          </div>

          {filtered.length > 0 ? (
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-muted">No businesses in this category yet.</p>
          )}
        </div>
      </Container>

      <MediaGallery items={galleryItems} />
    </>
  );
}
