import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import { CARD_TITLE_CLASSES } from "@/lib/ui/typography";

export interface FeatureCarouselSlide {
  label: string;
  subtitle: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Real destination for the whole card. Omit rather than invent one —
   * the card still renders, just non-interactive (see FeatureCarousel). */
  href?: string;
}

// Slide copy transcribed directly from the Figma export (not invented).
// Images are the real category thumbnails provided in
// public/assets/images/all/ (*-category-thumb.jpg) — "Shop Local" wasn't
// in the original 3-slide set but is clearly the 4th slide in the Figma
// carousel export (its own real thumbnail + copy are both provided), so
// it's included here too. Each card links to the matching real category
// listing page — the closest existing, non-invented destination for each
// (no more specific route exists per CLAUDE.md's confirmed routes).
// THIS IS THE ONLY CONFIRMED CAROUSEL in the design (see CLAUDE.md /
// Figma spec) — arrows + a partially-visible next slide are the evidence.
// Autoplay/loop remain NEEDS CONFIRMATION and are not implemented.
const DEFAULT_SLIDES: FeatureCarouselSlide[] = [
  {
    label: "Live Music",
    subtitle: "From local talent to headline performances.",
    imageUrl: "/assets/images/all/live-music-category-thumb.jpg",
    imageAlt: "Live music performance at Downtown Container Park",
    href: "/entertainment",
  },
  {
    label: "Food & Drink",
    subtitle: "Craft cocktails, chef-driven concepts and hidden gems.",
    imageUrl: "/assets/images/all/food-drink-category-thumb.jpg",
    imageAlt: "Craft cocktails at Downtown Container Park",
    href: "/eat-drink",
  },
  {
    label: "Family Fun",
    subtitle: "From treehouse adventures to evening entertainment.",
    imageUrl: "/assets/images/all/family-fun-category-thumb.jpg",
    imageAlt: "Family fun activities at Downtown Container Park",
    href: "/attractions",
  },
  {
    label: "Shop Local",
    subtitle: "Unique retailers and handmade treasures.",
    imageUrl: "/assets/images/all/shop-local-category-thumb.jpg",
    imageAlt: "Local shops at Downtown Container Park",
    href: "/shop",
  },
];

export function FeatureCarousel({ slides = DEFAULT_SLIDES }: { slides?: FeatureCarouselSlide[] }) {
  return (
    // id="discover" is the scroll target for the homepage Hero's "Scroll to
    // Discover" control (see HomeHero.tsx) — this is the first section
    // directly below the Hero. overflow-x-hidden is a defensive backstop
    // for the track's bleedRight negative-margin trick below (see
    // ui/Carousel.tsx) — belt-and-suspenders against any sub-pixel
    // rounding ever leaking into page-level horizontal scroll.
    <section id="discover" className="overflow-x-hidden py-10 sm:py-16">
      <Container>
        <Carousel
          ariaLabel="Ways to have fun at Downtown Container Park"
          bleedRight
          loop
          // 20px above the track, specific to this slider only (see
          // trackWrapperClassName on Carousel) — every other gap/spacing
          // value (including the mobile 10px inter-slide gap) is
          // untouched, inherited as-is from the shared component.
          trackWrapperClassName="mt-5"
          heading={
            <SectionHeading eyebrow="Discover the Park" heading="So Many Ways to Have Fun" />
          }
        >
          {slides.map((slide) => {
            // Card width is tuned so 2 full cards + ~2/3 of a 3rd land
            // inside the visible area at a ~1920px desktop viewport,
            // matching the Figma reference's own apparent width (see the
            // FeatureCarousel report for the underlying math). The
            // aspect-[5/4] ratio matches the real category thumbnails'
            // native ~1.24:1 proportions (572-588 x 464px).
            const cardClassName =
              "group relative flex w-64 items-end overflow-hidden bg-near-black p-6 text-white aspect-[5/4] sm:w-80 lg:w-[576px]";

            const content = (
              <>
                {slide.imageUrl && (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.imageAlt || ""}
                    fill
                    className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
                  />
                )}
                {/* Sits between the image and the permanent legibility
                    gradient below it — on hover the two blend into one
                    slightly-deeper darken, while the title/subtitle/arrow
                    (both z-10 above everything here) stay exactly as crisp
                    as always. */}
                <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                />
                <div className="relative z-10">
                  <h3 className={CARD_TITLE_CLASSES}>{slide.label}</h3>
                  <p className="mt-1 text-sm">{slide.subtitle}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center border border-white/70"
                >
                  {/* Same rotate-90-on-hover treatment as ui/Button.tsx's
                      ButtonArrow — only the glyph rotates, the bordered box
                      around it stays put, so the badge's position never
                      shifts. */}
                  <Image
                    src="/assets/images/all/arrow-white-button.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:rotate-90"
                  />
                </span>
              </>
            );

            // Whole card is one link when a real destination exists;
            // otherwise it stays a plain, visually-intact but
            // non-interactive card rather than guessing a URL. Carousel
            // already wraps each child in its own plain <div
            // data-carousel-slide> (see ui/Carousel.tsx), so no extra
            // wrapper element is needed here.
            return slide.href ? (
              <Link key={slide.label} href={slide.href} className={cardClassName}>
                {content}
              </Link>
            ) : (
              <div key={slide.label} className={cardClassName}>
                {content}
              </div>
            );
          })}
        </Carousel>
      </Container>
    </section>
  );
}
