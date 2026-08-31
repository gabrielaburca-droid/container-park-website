export interface SanityImage {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: unknown;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

export interface DayHours {
  day?: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  tripadvisor?: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export type BusinessCategory = "shop" | "eat-drink" | "entertainment" | "attractions";

export interface Business {
  _id: string;
  /** Sanity's own standard system field (ISO datetime), present on every
   * real document automatically — used for "Newest Added" sorting (see
   * templates/ListingTemplate.tsx). Optional here because the mock data
   * layer has no real creation timestamps to report (not invented — see
   * data/mock/businesses.ts); once real Sanity content is connected this
   * populates itself with no query changes needed. */
  _createdAt?: string;
  name: string;
  slug: { current: string };
  categories: BusinessCategory[];
  shortDescription?: string;
  description?: PortableTextBlock[];
  logo?: SanityImage;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  hours?: DayHours[];
  address?: Address;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: SocialLinks;
  tags?: string[];
  featured?: boolean;
  status?: "open" | "coming-soon" | "closed";
  seo?: SeoFields;
  // TODO: SCHEMA GAP — not yet fields on the `business` Sanity document.
  // Typed here (optional) so components can be built against this shape
  // now; will simply stay `undefined` until the schema is extended and the
  // query in src/lib/sanity/queries.ts is updated to select them.
  rating?: number;
  reviewCount?: number;
  badgeLabel?: string;
  /** Short tagline shown over the card image (see business/BusinessCard.tsx)
   * — real per-listing copy from the live site's own listing cards, not a
   * generic category label. Falls back to the business name on the live
   * site when no distinct tagline was set there; transcribed as-is. */
  tagline?: string;
  /** Whether this listing shows the live site's "Claimed" badge. */
  claimed?: boolean;
}

export interface RelatedBusinessRef {
  _id: string;
  name: string;
  slug: { current: string };
}

export interface EventPartnerOffer {
  businessName: string;
  offerText: string;
}

export interface EventDoc {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  isRecurring?: boolean;
  time?: string;
  description?: PortableTextBlock[];
  heroImage?: SanityImage;
  category?: string;
  relatedBusiness?: RelatedBusinessRef | null;
  ticketUrl?: string;
  price?: string;
  seo?: SeoFields;
  // TODO: SCHEMA GAP — not yet fields on the `event` Sanity document (see
  // Business note above for the pattern).
  shortDescription?: string;
  tags?: string[];
  partnerOffers?: EventPartnerOffer[];
  // Set only for events that exist on the live site's events calendar but
  // have no on-site detail page of their own (e.g. an externally-ticketed
  // event linked straight to Eventbrite from the live archive listing).
  // When present, listing cards link straight out to this URL instead of
  // an invented internal /events/[slug] page. Real field, not yet on the
  // Sanity schema — same schema-gap pattern as the fields above.
  externalUrl?: string;
}

export interface PageHero {
  heading?: string;
  subheading?: string;
  image?: SanityImage;
}

export interface PageDoc {
  _id: string;
  title: string;
  hero?: PageHero;
  content?: PortableTextBlock[];
  seo?: SeoFields;
}

export interface SiteSettings {
  navigation?: { label: string; url: string }[];
  footerLinks?: { label: string; url: string }[];
  parkHours?: DayHours[];
  socialLinks?: SocialLinks;
  address?: Address;
  phone?: string;
  email?: string;
  // TODO: SCHEMA GAP — `parkHours` above is a single hours array; the Plan
  // Your Visit bar needs two distinct sets. Not yet split in the Sanity
  // schema — typed here so PlanYourVisitBar can be built now.
  retailHours?: DayHours[];
  restaurantHours?: DayHours[];
  // TODO: SCHEMA GAP — services grid (Visit Us) has no field yet.
  services?: { label: string }[];
}
