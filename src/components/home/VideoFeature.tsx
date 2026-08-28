import Image from "next/image";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";

interface VideoFeatureProps {
  eyebrow?: string;
  heading?: string;
  videoUrl?: string;
  posterUrl?: string;
  posterAlt?: string;
}

// Full-bleed background photo with left-aligned eyebrow/heading/play
// button overlaid on top — matches the Figma reference exactly, replacing
// the previous centered layout with a small boxed poster+button unit.
// Desktop (lg:) is a fixed 826px — the real poster asset's own native
// height (1920x826) — per spec; mobile/tablet stay flexible min-heights
// (unchanged from before) rather than also being forced to 826px.
export function VideoFeature({
  eyebrow = "Meet the Legend",
  heading = "The Iconic Fire Mantis",
  videoUrl,
  posterUrl,
  posterAlt = "",
}: VideoFeatureProps) {
  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden bg-near-black text-white sm:min-h-[550px] lg:h-[826px]">
      {posterUrl && (
        <Image src={posterUrl} alt={posterAlt} fill priority className="object-cover" />
      )}
      {/* Left-side scrim for text legibility — the photo's own left side is
          already quite dark in the reference, this is a safety net
          matching the same pattern already used elsewhere (HomeHero,
          PageHero), not a new treatment. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"
      />
      {/* Mobile-only: text-center cascades to the eyebrow/heading text and
          also horizontally centers the play button below (an inline-block
          <button>, per VideoPlayer.tsx, so it responds to its container's
          text-align like any other inline content) — one class covers
          every text element without touching each individually.
          sm:text-left restores the existing left-aligned layout at
          tablet/desktop unchanged. */}
      <div className="relative z-10 mx-auto w-full max-w-container px-4 text-center sm:text-left">
        <p className={EYEBROW_CLASSES}>{eyebrow}</p>
        <h2 className={`mt-2 ${SECTION_HEADING_CLASSES}`}>{heading}</h2>
        <div className="mt-8">
          <VideoPlayer videoUrl={videoUrl} title={heading} />
        </div>
      </div>
    </section>
  );
}
