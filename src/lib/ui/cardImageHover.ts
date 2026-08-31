// Shared hover treatment for image-based clickable cards and gallery tiles
// (business cards, event cards, feature/experience cards, the Instagram
// grid, the Media Gallery, etc.) — one consistent interaction language
// sitewide rather than each card/gallery reinventing its own scale/overlay/
// timing. Subtle and slow enough to read as premium/editorial, not an
// aggressive zoom.
//
// Usage: both constants go on elements that are DIRECT CHILDREN of the
// same `overflow-hidden`, non-static-positioned container, which also
// needs `group` on itself (or on whichever ancestor should trigger the
// hover — typically the card's own clickable root) for `group-hover:` to
// activate:
//   <Link className="group relative overflow-hidden ...">
//     <Image className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`} ... />
//     <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
//     {/* any real badge/title content goes AFTER the overlay div in the
//         DOM, so it paints on top and stays fully crisp/legible — never
//         darkened along with the photo */}
//   </Link>
// Only the image scales — never the card itself — so borders/clipping/text
// stay perfectly still and the card's own dimensions/layout never shift.
//
// 350ms/ease-out is shared by both the scale and the overlay so they read
// as one unified motion, not two independently-timed effects.
//
// Deliberately NOT applied to hero backgrounds, decorative single images,
// logos, or icons — only to images that sit inside an actual clickable
// card or gallery tile.
export const CARD_IMAGE_HOVER_CLASSES =
  "transition-transform duration-[350ms] ease-out group-hover:scale-[1.04]";

// Subtle dark scrim, fully transparent at rest, low-opacity on hover —
// `bg-black` (not `bg-near-black` or any custom color) since this needs to
// read as a neutral darkening of whatever photo is underneath, not a brand
// tint. `pointer-events-none` so it never intercepts clicks meant for the
// card/button/link beneath it.
export const CARD_IMAGE_OVERLAY_CLASSES =
  "pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-[350ms] ease-out group-hover:opacity-20";
