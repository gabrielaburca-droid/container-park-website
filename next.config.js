/** @type {import('next').NextConfig} */
const redirects = require("./src/data/redirects.json");

// `redirects` is intentionally empty in Phase 1 — see src/data/redirects.json.
// The mechanism is wired up now so real redirect decisions can be dropped in
// later without any code changes.
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // TEMPORARY — the live site's own WP Engine media host. Business
      // gallery photos are real images pulled live from each business's
      // actual listing page (see data/mock/businesses.ts) rather than
      // downloaded and committed locally — there are ~230 of them across
      // the real businesses, too many to vendor into this repo for a
      // still-unconnected-to-Sanity phase. Safe to remove once real
      // gallery assets are migrated into Sanity.
      {
        protocol: "https",
        hostname: "containerpark.wpenginepowered.com",
      },
    ],
    // TEMPORARY — enables next/image to serve the local placeholder SVGs
    // under public/assets/images/placeholders/ (used by the temporary mock
    // data layer, see src/lib/mock/, CLAUDE.md). Every SVG there is static,
    // hand-authored content with no embedded scripts. Safe to remove this
    // flag once the mock layer is retired.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;
