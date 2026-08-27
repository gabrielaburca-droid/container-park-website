import type { Review } from "@/components/business/ReviewCard";

// The 5 reviews previously here were transcribed from the Figma "Art Box"
// business-detail export. During the live-site content migration audit,
// /listing/art-box/ was confirmed to 404 — Art Box does not exist on the
// live site, so those reviews were FIGMA-ONLY content, never real, and
// have been removed rather than attached to a different real business.
//
// None of the 27 real businesses migrated from the live site expose
// reviews in a way this scraping pass could reliably extract (and no
// `review` Sanity schema exists yet regardless — see CLAUDE.md). Every
// business's reviews list is genuinely empty for now: MISSING — needs
// confirmation, not invented.
export const MOCK_REVIEWS_BY_BUSINESS_SLUG: Record<string, Review[]> = {};
