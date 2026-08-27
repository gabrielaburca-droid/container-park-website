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
}

export function buildMetadata({ title, description, path, ogImage }: BuildMetadataInput): Metadata {
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const fullTitle = title === SITE_NAME ? title : `${title} - ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
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
