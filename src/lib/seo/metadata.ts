import type { Metadata } from "next";

export const SITE_NAME = "Downtown Container Park";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const DEFAULT_DESCRIPTION =
  "Downtown Container Park is a boutique shopping, dining, and entertainment destination in downtown Las Vegas, Nevada.";

interface BuildMetadataInput {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  // Opt-in only — every existing caller that omits this is unaffected
  // (falls through to Next's normal index/follow default). Currently
  // only /tag/[tag] passes this, to keep those real-but-not-search-
  // result-worthy pages functional/clickable without being indexed.
  robots?: Metadata["robots"];
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  robots,
}: BuildMetadataInput): Metadata {
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const fullTitle = title === SITE_NAME ? title : `${title} - ${SITE_NAME}`;

  return {
    // `absolute` bypasses the root layout's own `title.template`
    // ("%s - Downtown Container Park") — this string is already the full,
    // final title (built above), so letting the template wrap it again
    // would double the suffix (e.g. "Shop - Downtown Container Park -
    // Downtown Container Park"). OG/Twitter titles below are unaffected —
    // Next's title template only applies to the document <title>.
    title: { absolute: fullTitle },
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    ...(robots && { robots }),
    openGraph: {
      title: fullTitle,
      description: resolvedDescription,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: resolvedDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
