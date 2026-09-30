/** @type {import('next').NextConfig} */
const redirects = require("./src/data/redirects.json");

// Approved redirects only — see src/data/redirects.json (currently the two
// renamed live URLs, /visit and /book-an-event, each with and without its
// trailing slash). Further redirect decisions
// can be dropped in there without any code changes.
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Next.js's dev server blocks cross-origin requests to dev-only assets
  // (JS chunks, HMR, RSC payloads) by default, allowing only `localhost`.
  // The Replit preview loads the app through a proxied *.replit.dev /
  // *.repl.co / *.replit.app domain, not localhost — the initial HTML
  // still renders (a plain SSR response), but every follow-up asset
  // request gets silently blocked, so React never hydrates and no click
  // handler (carousel arrows, filter tabs, etc.) ever runs. This
  // allow-lists Replit's own preview domains for that check; it has no
  // effect in production (`next start`) or outside Replit.
  allowedDevOrigins: ["**.replit.dev", "*.repl.co", "*.replit.app"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Instagram Graph API media/thumbnail URLs (see
      // src/lib/instagram/queries.ts) resolve to Facebook's own CDN, not a
      // single fixed host — real responses rotate across many
      // "scontent[-region].cdninstagram.com" and multi-label
      // "*.*.fbcdn.net" edge hostnames. `**` (any number of subdomain
      // levels, per Next's own remotePatterns syntax) is what actually
      // covers that rotation; a single `*` only matches one label and
      // would silently miss the multi-label fbcdn.net hosts. Still scoped
      // to exactly these two real, Meta-owned root domains — not a
      // blanket allow of arbitrary remote hosts.
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
    // Explicit opt-in to AVIF (checked first) + WebP (fallback) for the
    // built-in image optimizer — Next's own default is `['image/webp']`
    // only (confirmed against the installed Next 16.3.1 source), so AVIF
    // was never actually being served without this. Both are real,
    // already-supported output formats for the optimizer (via `sharp`,
    // already an installed dependency) — this doesn't add a new capability,
    // just turns on the one that was off by default.
    formats: ["image/avif", "image/webp"],
    // TEMPORARY — enables next/image to serve the local placeholder SVGs
    // under public/assets/images/placeholders/ (used by the temporary mock
    // data layer, see src/lib/mock/, CLAUDE.md). Every SVG there is static,
    // hand-authored content with no embedded scripts. Safe to remove this
    // flag once the mock layer is retired.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Next's built-in "strip the trailing slash" redirect always runs before
  // the redirects below, which turned the old site's /visit/ and
  // /book-an-event/ into two hops (/visit/ -> /visit -> /visit-us). It is
  // switched off here and re-added, unchanged, as the LAST rule in
  // redirects() so the approved redirects can match the trailing-slash URL
  // first and answer in a single hop.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...redirects,
      // Same rule Next applies by default (see above): /shop/ -> /shop.
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
};

module.exports = nextConfig;
