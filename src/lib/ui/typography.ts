// Global typography constants for the recurring "eyebrow + major section
// heading" pattern (e.g. "DISCOVER THE PARK" / "SO MANY WAYS TO HAVE
// FUN") — a single source of truth so every section using this pattern
// stays in sync, rather than each component repeating its own copy of
// these Tailwind classes. Colors are baked in here too since every real
// usage of this pattern uses the same lime eyebrow — heading text color
// stays per-call-site since it varies with the section's own background
// (near-black sections inherit white text; light sections set
// text-foreground explicitly).
//
// Scoped specifically to this eyebrow-paired pattern — the site's other,
// smaller <h2> sub-headings (page-local context labels like "Your Contact
// Information" or a review count heading, none of which pair with an
// eyebrow) are a visually distinct, smaller role and are NOT covered by
// these constants.

// Desktop: 52px, Bebas Neue (already the site's display font/family via
// the shared h1-h6 base rule in globals.css). Mobile/tablet sizes are
// unchanged from before this update — only the new lg: desktop size was
// added.
export const SECTION_HEADING_CLASSES = "font-display text-3xl uppercase sm:text-4xl lg:text-[52px]";

// Desktop: 20px, Bebas Neue — previously Inter; this is a deliberate,
// explicit override of the sitewide "labels/UI text use Inter" rule,
// scoped specifically to this eyebrow role. Bebas Neue only ships one
// real weight (400, already its bold-looking display cut, loaded in
// src/app/layout.tsx) — no synthetic font-bold is layered on top of it.
export const EYEBROW_CLASSES =
  "font-display text-xs uppercase tracking-wide text-lime sm:text-sm lg:text-[20px]";

// Card title (h3) inside slider/carousel cards (see ui/Carousel.tsx and
// its consumers, e.g. home/FeatureCarousel.tsx) — a shared constant so
// every card using the Carousel component gets the same title size, not
// just the homepage instance. Desktop: 30px, Bebas Neue; the existing
// smaller (20px) size is kept below that breakpoint, unchanged. No
// explicit line-height override — h3 already inherits line-height: 1
// from the global h2-h6 rule in globals.css, which this is meant to
// match, not replace with a different value.
export const CARD_TITLE_CLASSES = "font-display text-xl uppercase lg:text-[30px]";

// Stat-strip item label (see home/StatStrip.tsx) — a shared constant so
// this treatment stays consistent everywhere StatStrip is reused, not
// just the homepage instance. Desktop: 24px, Bebas Neue (previously
// Inter — a deliberate override for this specific label role, same
// reasoning as EYEBROW_CLASSES above). leading-none is an explicit
// line-height: 1, since this is a <span>, not a heading tag, so it isn't
// already covered by the global h1-h6 rule.
export const STAT_LABEL_CLASSES =
  "font-display uppercase leading-none text-sm sm:text-base lg:text-[24px]";

// Filter/date-pill label (see home/HomeEventsSection.tsx's date pills and
// events/EventFilterBar.tsx's date pills + "Select Date") — a shared
// constant so both stay in sync. Previously Inter; size (text-xs) and
// tracking-wide are unchanged from before this update, only the
// font-family and (implicitly, since Bebas Neue has no matching cut) the
// font-weight utility changed.
export const FILTER_TAB_CLASSES = "font-display text-xs uppercase tracking-wide";
