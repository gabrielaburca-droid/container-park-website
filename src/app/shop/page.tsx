import type { Metadata } from "next";
import { ListingTemplate } from "@/templates/ListingTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getBusinessesByCategory, getSiteSettings } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { realImage } from "@/lib/mock/placeholder";
import type { MediaGalleryItem } from "@/components/ui/MediaGallery";

// Real photos (public/assets/images/all/gallery01.jpg..08.jpg), kept in
// that exact numeric order — the neutral, non-invented ordering, since
// nothing establishes a different intended sequence. gallery08 doubles as
// the one video tile's poster: it's the specific photo shown with the
// play-video treatment in the attached design (bottom-right tile), and the
// project has exactly one real video asset (video.mp4, the same file
// already used by home/VideoFeature.tsx) — reused as that video's own
// poster rather than pulling in an unrelated image for it.
const GALLERY_ITEMS: MediaGalleryItem[] = [
  {
    image: realImage("Guests enjoying drinks on the patio at Oak & Ivy", "/assets/images/all/gallery01.jpg"),
  },
  {
    image: realImage(
      "Treehouse play structure with rope netting and slide tower",
      "/assets/images/all/gallery02.jpg"
    ),
  },
  { image: realImage("Bartenders pouring drinks at the tap", "/assets/images/all/gallery03.jpg") },
  {
    image: realImage(
      "Bartender torching a citrus garnish on a cocktail",
      "/assets/images/all/gallery04.jpg"
    ),
  },
  {
    image: realImage(
      "Aerial view of the treehouse play structure at sunset",
      "/assets/images/all/gallery05.jpg"
    ),
  },
  {
    image: realImage(
      "Wide view of the treehouse structure with shade sails",
      "/assets/images/all/gallery06.jpg"
    ),
  },
  {
    image: realImage(
      "Guest exploring the treehouse walkway and slides",
      "/assets/images/all/gallery07.jpg"
    ),
  },
  {
    image: realImage("Guest holding a drink outside a Container Park shop", "/assets/images/all/gallery08.jpg"),
    isVideo: true,
    videoUrl: "/assets/images/all/video.mp4",
  },
];

// Copy transcribed verbatim from the current live site's Shop page — not
// invented, not reworded — to preserve existing SEO/indexed content. Keep
// the "…" and wording exactly as-is if this ever needs to change.
const SHOP_INTRO =
  "There’s more than a great selection of retails stores at The Downtown Container Park… We also feature some of the best restaurants and bars in Downtown Las Vegas. Located on historic Fremont Street, this open air shopping center offers a variety of dining experiences that are sure to please everyone.";

export function generateMetadata(): Metadata {
  // Real on-page copy as the meta description (previously fell back to the
  // generic sitewide default) — an improvement, not a substitution, since
  // it's the exact same text now rendered in the Hero.
  // Same real hero image already rendered on this page (see heroImageUrl
  // below) — not a new/invented asset.
  return buildMetadata({
    title: "Shop",
    description: SHOP_INTRO,
    path: "/shop",
    ogImage: "/assets/images/all/shop-hero.jpg",
  });
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
      <ListingTemplate
        eyebrow="Downtown"
        title="Shop"
        description={SHOP_INTRO}
        heroImageUrl="/assets/images/all/shop-hero.jpg"
        businesses={businesses}
        filterOptions={FILTER_OPTIONS}
        galleryItems={GALLERY_ITEMS}
      />
      <PageBottom settings={settings} />
    </>
  );
}
