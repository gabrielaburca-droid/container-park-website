// One tile in the homepage/footer Instagram strip (see
// marketing/InstagramStrip.tsx). `href` is the real permalink to the
// specific Instagram post — required so every tile can link out to the
// actual post, not just the profile.
export interface InstagramImage {
  url: string;
  alt: string;
  href: string;
}
