import Image from "next/image";
import type { ReactNode } from "react";
import { urlForImage } from "@/lib/sanity/image";
import { EYEBROW_CLASSES } from "@/lib/ui/typography";
import type { SanityImage } from "@/lib/sanity/types";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  /** Second headline line rendered in lime, e.g. "DOWNTOWN LAS VEGAS". */
  titleAccent?: string;
  description?: string;
  image?: SanityImage | null;
  badgeLabel?: string;
  /** Extra content below the description — rating row, date/time meta, CTA buttons. */
  children?: ReactNode;
}

// Shared hero used on every inner page (Visit Us, Event Detail, Business
// Detail, listings, Group Events, Contact, Leasing, Events Listing). The
// Homepage uses its own HomeHero (left-aligned, larger, different content
// shape) instead of this component — see src/components/home/HomeHero.tsx.
// ANIMATION: NEEDS CONFIRMATION — no ken-burns/parallax implemented (see
// Figma spec, no evidence of motion in the static exports).
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  badgeLabel,
  children,
}: PageHeroProps) {
  const imageUrl = image?.asset ? urlForImage(image).width(1920).height(800).url() : null;

  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden bg-near-black text-white sm:min-h-[520px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={image?.alt || ""}
          fill
          priority
          className="object-cover opacity-70"
        />
      )}
      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-10">
        {badgeLabel && (
          <span className="mb-3 inline-block bg-lime px-3 py-1 text-xs font-semibold uppercase text-lime-foreground">
            {badgeLabel}
          </span>
        )}
        {eyebrow && <p className={EYEBROW_CLASSES}>{eyebrow}</p>}
        <h1 className="font-display text-4xl uppercase leading-none sm:text-6xl">
          {title}
          {titleAccent && <span className="block text-lime">{titleAccent}</span>}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-sm text-white/90 sm:text-base">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
