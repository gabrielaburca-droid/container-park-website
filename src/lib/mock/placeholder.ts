import type { SanityImage } from "@/lib/sanity/types";

// Every image referenced by the mock data layer resolves through here.
// No real photography exists locally or was extractable from the supplied
// JPEG exports (they were provided as chat attachments, not files) — per
// instruction, nothing invented/downloaded to stand in for them. Every mock
// image is one of these labeled "MISSING IMAGE" placeholders instead, with
// `alt` describing exactly what's missing (also collected in the final
// report's asset list).

const VARIANT_PATHS = {
  hero: "/assets/images/placeholders/missing-hero.svg",
  card: "/assets/images/placeholders/missing-card.svg",
  square: "/assets/images/placeholders/missing-square.svg",
  poster: "/assets/images/placeholders/missing-poster.svg",
} as const;

export type PlaceholderVariant = keyof typeof VARIANT_PATHS;

export function missingImage(alt: string, variant: PlaceholderVariant = "card"): SanityImage {
  return {
    asset: { _ref: `local:${VARIANT_PATHS[variant]}`, _type: "reference" },
    alt: `MISSING IMAGE — ${alt}`,
  };
}

// Real images downloaded from the live site during the content migration
// (public/assets/images/) — genuinely real photography, not placeholders.
// Uses the same "local:" resolution mechanism as missingImage() so no
// component needs to know the difference.
export function realImage(alt: string, publicPath: string): SanityImage {
  return {
    asset: { _ref: `local:${publicPath}`, _type: "reference" },
    alt,
  };
}
