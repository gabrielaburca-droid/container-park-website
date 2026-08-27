// Shared hover-zoom treatment for image-based clickable cards (business
// cards, event cards, feature/experience cards, etc.) — one consistent
// interaction language sitewide rather than each card reinventing its own
// scale/timing. Subtle and slow enough to read as premium/editorial, not
// an aggressive zoom.
//
// Usage: apply to the <Image>'s own className. The image's direct parent
// needs `overflow-hidden` (already standard on this site's image
// containers) and the card's clickable root needs `group` for
// `group-hover:` to activate. Only the image scales — never the card
// itself — so borders/clipping/text stay perfectly still.
//
// Deliberately NOT applied to hero backgrounds, decorative images, logos,
// or icons — only to images that sit inside an actual clickable card.
export const CARD_IMAGE_HOVER_CLASSES =
  "transition-transform duration-500 ease-out group-hover:scale-[1.03]";
