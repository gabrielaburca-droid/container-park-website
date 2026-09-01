import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessDetailTemplate } from "@/templates/BusinessDetailTemplate";
import { PageBottom } from "@/components/layout/PageBottom";
import { JsonLd } from "@/components/seo/JsonLd";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity. Note:
// getReviewsForBusiness has no Sanity equivalent yet (no `review` schema —
// see CLAUDE.md) so this whole import will need reworking, not just its
// source path, when reviews are eventually wired to a real backend.
import { getBusinessBySlug, getReviewsForBusiness, getSiteSettings } from "@/lib/mock/queries";
import { urlForImage } from "@/lib/sanity/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildLocalBusinessJsonLd } from "@/lib/seo/structuredData";
import { portableTextToPlainText, truncateDescription } from "@/lib/seo/textExtract";

// Preserves the current production URL structure (/listing/{slug}/). Do not
// change this path — see CLAUDE.md.

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return buildMetadata({ title: "Business Not Found", path: `/listing/${slug}` });
  }

  const ogImage = business.heroImage
    ? urlForImage(business.heroImage).width(1200).height(630).url()
    : undefined;

  // Fallback chain: real seo.description -> real shortDescription -> a
  // concise excerpt derived from the business's own real body copy
  // (description) -> buildMetadata's generic site description, only if
  // none of the above exist. Never invented content.
  const derivedDescription = business.description
    ? truncateDescription(portableTextToPlainText(business.description))
    : undefined;
  const description = business.seo?.description || business.shortDescription || derivedDescription;

  return buildMetadata({
    title: business.seo?.title || business.name,
    description,
    path: `/listing/${slug}`,
    ogImage,
  });
}

export default async function BusinessDetailPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const [business, settings, reviews] = await Promise.all([
    getBusinessBySlug(slug),
    getSiteSettings(),
    getReviewsForBusiness(slug),
  ]);

  if (!business) {
    notFound();
  }

  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: business.name,
    description: business.shortDescription,
    url: `/listing/${slug}`,
    telephone: business.phone,
    address: business.address,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: business.name, url: `/listing/${slug}` },
  ]);

  const galleryItems = (business.gallery ?? []).map((image) => ({ image }));

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <BusinessDetailTemplate business={business} reviews={reviews} galleryItems={galleryItems} />
      <PageBottom settings={settings} />
    </>
  );
}
