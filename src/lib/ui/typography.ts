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
//
// `leading-none` at each breakpoint (not just once, unscoped) is required,
// not decorative: Tailwind's text-3xl/text-4xl utilities each bundle their
// own default line-height (e.g. text-4xl -> line-height: 2.5rem), and that
// class-based rule beats the global bare `h2{line-height:1}` tag selector
// in globals.css on specificity, regardless of source order — confirmed via
// computed-style testing, where font-size correctly hit 52px at lg: but
// line-height stayed stuck at sm:text-4xl's bundled 40px instead of 52px.
// Repeating `leading-none` at sm:/lg: (matching the text-size breakpoints)
// ensures it always lands in the same cascade layer as — and after, per
// Tailwind's fontSize-before-lineHeight plugin order — the utility that
// would otherwise win.
export const SECTION_HEADING_CLASSES =
  "font-display text-3xl uppercase leading-none sm:text-4xl sm:leading-none lg:text-[52px] lg:leading-none";

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
// smaller (20px) size is kept below that breakpoint, unchanged.
// `leading-none` is required, not decorative — see the note above
// SECTION_HEADING_CLASSES: text-xl bundles its own line-height (1.75rem),
// which beats the global bare `h2{line-height:1}` tag rule regardless of
// this class having no sm:/lg: line-height step of its own — confirmed via
// computed-style testing (line-height stuck at 28px at every breakpoint,
// including at the 30px desktop size, until this was added).
export const CARD_TITLE_CLASSES = "font-display text-xl uppercase leading-none lg:text-[30px]";

// Stat-strip item label (see home/StatStrip.tsx) — a shared constant so
// this treatment stays consistent everywhere StatStrip is reused, not
// just the homepage instance. Desktop: 24px, Bebas Neue (previously
// Inter — a deliberate override for this specific label role, same
// reasoning as EYEBROW_CLASSES above). leading-none is an explicit
// line-height: 1, since this is a <span>, not a heading tag, so it isn't
// already covered by the global h1-h6 rule.
export const STAT_LABEL_CLASSES =
  "font-display uppercase leading-none text-sm sm:text-base lg:text-[24px]";

// Footer column heading (see layout/Footer.tsx's "Explore"/"Useful Links"/
// "Our Partners" <h4>s) — Bebas Neue, ramping to 20px at desktop like
// EYEBROW_CLASSES' size scale, but a distinct constant/role: this is a
// standalone UI label with no accompanying big headline and no baked-in
// color (defaults to the footer's foreground text), not the eyebrow-above-
// a-headline pattern EYEBROW_CLASSES covers.
// `leading-none` at each breakpoint — see the note above
// SECTION_HEADING_CLASSES: without it this was line-height 16px at the
// 12px base size and 20px at the 14px sm: size (only accidentally correct
// at the 20px lg: size), confirmed via computed-style testing.
export const FOOTER_HEADING_CLASSES =
  "font-display text-xs uppercase tracking-wide leading-none sm:text-sm sm:leading-none lg:text-[20px] lg:leading-none";

// Primary Hero H1 — Home Hero's own heading treatment (140px desktop,
// ramping down through mobile/tablet: 48px base, 72px sm:, 100px md:).
// Extracted here so PageHero's "large" heading mode (Shop and the other
// category listing pages — see templates/ListingTemplate.tsx) can reuse
// the exact same sizing rather than a second, slightly-different copy of
// it; HomeHero itself now reads from this constant too. leading-[0.78] is
// intentional, not a stand-in for line-height:1 — Bebas Neue's tall
// cap-height needs a tighter-than-1 value to read as tightly-set display
// type at this size, and this is HomeHero's own existing, already-tuned
// value, unchanged by this extraction.
export const HERO_HEADING_CLASSES =
  "font-display text-[48px] uppercase leading-[0.78] sm:text-[72px] md:text-[100px] lg:text-[140px]";

// Home Hero's lime accent line beneath HERO_HEADING_CLASSES (100px desktop,
// its own ramp: 34px base, 52px sm:, 72px md:) — same reasoning/pairing as
// HERO_HEADING_CLASSES above.
export const HERO_ACCENT_CLASSES =
  "font-display text-[34px] uppercase leading-[0.9] text-lime sm:text-[52px] md:text-[72px] lg:text-[100px]";

// Individual business/attraction/entertainment DETAIL page Hero's category
// label directly above the H1 (e.g. "SHOP") — see DETAIL_CATEGORY_CLASSES
// just below for its own styling; the two together read as one cohesive
// two-line stacked headline block (white category line, lime H1 line),
// matching the Figma reference for this Hero, not a small standalone label.
//
// Individual business/attraction/entertainment DETAIL page Hero's H1 (see
// templates/BusinessDetailTemplate.tsx, rendered at /listing/[slug]/) — the
// business name itself, e.g. "ART BOX". Lime, 100px at desktop specifically
// per spec, with its own smaller mobile/tablet ramp (36px/60px) so it stays
// legible as a primary heading at every breakpoint. `leading-none`
// (line-height: 1) is explicit per spec.
export const DETAIL_TITLE_CLASSES =
  "font-display text-4xl uppercase leading-none text-lime sm:text-6xl lg:text-[100px]";

// White (not lime) — pairs with DETAIL_TITLE_CLASSES above as the same
// stacked headline block's first line. Sized roughly 70% of the H1's own
// scale, estimated visually from the Figma reference (this project's
// established convention for values read from JPEG/image exports rather
// than Figma's own Inspect panel — see tokens.css's header comment; verify
// against the real Figma file if precision matters more than this).
export const DETAIL_CATEGORY_CLASSES =
  "font-display text-[28px] uppercase leading-none sm:text-[44px] lg:text-[72px]";

// Category listing page (Shop/Eat & Drink/Entertainment/Attractions) Hero's
// green subtitle directly below the H1 (e.g. "Downtown" — see PageHero.tsx's
// `large` branch). Same font/weight/color/uppercase/tracking and mobile/
// tablet sizing as EYEBROW_CLASSES, but 100px at desktop specifically for
// this role — not reusing EYEBROW_CLASSES directly here, since combining
// two different lg:text-* utilities in one class string creates an
// undefined-winner collision at render time (same category of bug already
// found/fixed in business/ReviewReactions.tsx: only one utility may own a
// given CSS property at a time). lg:leading-[0.9] matches HERO_ACCENT_CLASSES
// just above — the same tight leading every other 100px lime Bebas Neue
// display line on the site already uses; without it this size would
// inherit a much looser default line-height and read as broken/oversized
// vertically, not as tightly-set display type.
export const LISTING_HERO_SUBTITLE_CLASSES =
  "font-display text-xs uppercase tracking-wide text-lime sm:text-sm lg:text-[100px] lg:leading-[0.9]";

// Filter/date-pill label (see home/HomeEventsSection.tsx's date pills and
// events/EventFilterBar.tsx's date pills + "Select Date") — a shared
// constant so both stay in sync. Previously Inter; size (text-xs) and
// tracking-wide are unchanged from before this update, only the
// font-family and (implicitly, since Bebas Neue has no matching cut) the
// font-weight utility changed.
export const FILTER_TAB_CLASSES = "font-display text-xs uppercase tracking-wide";
