// Shared black gradient scrim for every Hero section on the site (Home
// Hero + every inner page's PageHero) — extracted from Home Hero's own
// original treatment so every Hero uses the exact same layers instead of
// each page/component re-implementing (or, as PageHero previously did,
// approximating with a flat image opacity that dims the whole photo
// uniformly rather than concentrating darkness behind the text).
//
// Three stacked layers, not one flat overlay, because a single gradient
// can't be both "strong behind the text" and "still show the photo
// naturally everywhere else":
// - bottom-up: darkens toward the bottom generally, where every Hero's
//   text/content sits (every Hero on the site is bottom-aligned).
// - left-to-right: darkens further specifically on the left, where the
//   text itself sits (every Hero is also left-aligned), fading out toward
//   the right so the photo stays visible and undistorted there — this is
//   the "stronger on the text side, fading toward the opposite side"
//   layer specifically.
// - a light top-down layer: readability under the transparent Header,
//   which already has its own black-to-transparent gradient (see
//   Header.tsx) — deliberately the lightest of the three, since the
//   Header's own gradient already does most of that work.
//
// No mobile-specific variant: these same values were already carrying
// Home Hero's mobile layout (verified across earlier passes) without a
// legibility problem, so a second breakpoint-tuned recipe isn't needed —
// one consistent treatment stays true to "reuse one global treatment"
// rather than introducing per-breakpoint variants speculatively.
//
// pointer-events-none on every layer: purely decorative, must never
// intercept clicks meant for the Hero's real buttons/links (which sit in
// a later, higher-stacked layer regardless — see each Hero's own z-10
// content wrapper — but this is still correct/explicit on its own terms).
export function HeroGradientOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
      />
    </>
  );
}
