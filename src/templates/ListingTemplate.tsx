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
import { PageHero } from "@/components/layout/PageHero";
import type { Business } from "@/lib/sanity/types";

interface ListingTemplateProps {
  /** Small lime label above the H1 (see PageHero's `eyebrow` — Bebas Neue,
   * 20px desktop, EYEBROW_CLASSES). E.g. "Downtown" above Shop's H1. */
  eyebrow?: string;
  title: string;
  /** Second Hero headline line in lime, e.g. Shop's "Local" — page-specific,
   * only set it where the real design/copy confirms one. */
  titleAccent?: string;
  description?: string;
  /** Hero background photo (plain public/ asset path — see PageHero's
   * `imageUrl`). Real per-category asset, not invented — e.g. the same
   * category thumbnail already used by home/FeatureCarousel.tsx. Omit
   * rather than guess one for a category with no confirmed image. */
  heroImageUrl?: string;
  businesses: Business[];
  /**
   * Sub-category filter pills. Only Shop's taxonomy is confirmed by the
   * design (All Shops / Fashion / Art & Gifts / Home & Decor / Jewelry) —
   * the other three listing routes pass a single "All {Category}" pill
   * until their taxonomies are confirmed (NEEDS CONFIRMATION, see Figma
   * spec).
   */
  filterOptions?: FilterPillOption[];
  /** Defaults to the real gallery images already attached to `businesses`
   * (business.gallery[]) rather than an empty/invented set — see the
   * fallback below. Pass explicitly only to override that aggregation. */
  galleryItems?: MediaGalleryItem[];
}

const DEFAULT_FILTER: FilterPillOption = { id: "all", label: "All" };

const SORT_OPTIONS = [
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest Added" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
];

// Shared by Shop, Eat & Drink, Entertainment, and Attractions.
// CLICK/INTERACTION: filter pills implemented as client-side filtering
// against `business.tags` — whether the real design intends client-side vs.
// URL/query-param-driven filtering is NEEDS CONFIRMATION.
export function ListingTemplate({
  eyebrow,
  title,
  titleAccent,
  description,
  heroImageUrl,
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

  // Client-side only (same as the filter pills above) — no URL/query-param
  // involved, so this can't create a second indexable/crawlable copy of
  // the page or affect the canonical URL either way.
  //
  // Each comparator pushes businesses missing the relevant real field to
  // the end rather than treating "missing" as the lowest real value (e.g.
  // an unrated business isn't a 0-star business) — an honest sort, not one
  // that fabricates a ranking for data that doesn't exist.
  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const list = [...filtered];
    switch (sort) {
      case "rating":
        return list.sort((a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity));
      case "newest":
        return list.sort((a, b) => {
          const aTime = a._createdAt ? new Date(a._createdAt).getTime() : -Infinity;
          const bTime = b._createdAt ? new Date(b._createdAt).getTime() : -Infinity;
          return bTime - aTime;
        });
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  }, [filtered, sort]);

  // Real per-business photos already modeled on Business (gallery[]), not
  // an invented/placeholder set — see the galleryItems prop doc above.
  // Renders nothing extra (MediaGallery itself no-ops on an empty array)
  // until businesses actually have gallery images attached.
  const resolvedGalleryItems = useMemo(() => {
    if (galleryItems.length > 0) return galleryItems;
    return businesses.flatMap((business) => (business.gallery ?? []).map((image) => ({ image })));
  }, [galleryItems, businesses]);

  return (
    <>
      {/* H1 = title, per the site's one-H1-per-page rule (see CLAUDE.md) —
          this replaces the plain in-page h1 that used to live below, not
          an addition on top of it. */}
      <PageHero
        eyebrow={eyebrow}
        title={title}
        titleAccent={titleAccent}
        description={description}
        imageUrl={heroImageUrl}
        large
      />
      <Container>
        <div className="py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CategoryFilterPills
              options={filterOptions}
              activeId={activeFilter}
              onSelect={setActiveFilter}
            />
            <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
          </div>

          {sorted.length > 0 ? (
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sorted.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-muted">No businesses in this category yet.</p>
          )}
        </div>
      </Container>

      <MediaGallery items={resolvedGalleryItems} />
    </>
  );
}
