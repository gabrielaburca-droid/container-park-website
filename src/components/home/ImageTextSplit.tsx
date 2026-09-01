import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ImageTextSplitProps {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// CTA destination ("Discover More") is NEEDS CONFIRMATION — rendered as a
// visually-present but unwired control when `ctaHref` isn't supplied, same
// pattern as HomeHero's "See Our Services".
export function ImageTextSplit({
  eyebrow,
  heading,
  paragraphs,
  imageUrl,
  imageAlt = "",
  ctaLabel,
  ctaHref,
}: ImageTextSplitProps) {
  return (
    // overflow-x-hidden is a defensive backstop for the image's left-bleed
    // margin below — that margin is itself calc()-capped to never exceed
    // the available gutter (so it can't cause real overflow), this is
    // just belt-and-suspenders against any sub-pixel rounding.
    <section className="overflow-x-hidden py-10 sm:py-16">
      {/* Columns are exactly 7:5 (not an even 50/50 split), matching the
          reference's proportions. Text is vertically centered against the
          image (items-center), not top-aligned. */}
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-4 md:grid-cols-[7fr_5fr]">
        {/* Bleeds left past the container by up to 4rem — capped via
            min() at whatever gutter is actually available, so it never
            overflows the viewport even right at the container's own
            1380px cap (where the gutter is thin) while still reaching a
            full 4rem "intentionally oversized" bleed on wide screens. */}
        <div className="relative aspect-[5/4] bg-border md:ml-[calc(-1*min(4rem,max(1rem,calc((100vw-var(--container-max))/2+1rem))))]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              // md:grid-cols-[7fr_5fr] inside max-w-container (1380px) —
              // this column is ~58% of the container (plus a left bleed,
              // see the className above) on desktop, full width on mobile.
              sizes="(min-width: 1380px) 820px, (min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        {/* Generous left padding on top of the grid gap, so the text
            column reads as clearly separated from the (now bleeding)
            image rather than merely gap-spaced from it. */}
        <div className="md:pl-10">
          <SectionHeading eyebrow={eyebrow} heading={heading} />
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4">
              {paragraph}
            </p>
          ))}
          {ctaLabel &&
            (ctaHref ? (
              <div className="mt-6">
                <Button href={ctaHref}>{ctaLabel}</Button>
              </div>
            ) : (
              <span
                className="mt-6 inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted"
                title="CTA destination NEEDS CONFIRMATION — see CLAUDE.md"
              >
                {ctaLabel}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
