// Standard share-intent URL schemes (Facebook, X, mailto) — not a native
// share-sheet or custom modal, since that specific mechanism was flagged
// NEEDS CONFIRMATION in the Figma spec. These are deterministic, well-known
// URL formats used as the conservative fallback.

export function buildFacebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function buildTwitterShareUrl(url: string, text: string) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

export function buildMailShareUrl(url: string, subject: string) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`;
}
