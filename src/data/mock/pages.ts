import type { PageDoc } from "@/lib/sanity/types";
import { missingImage, realImage } from "@/lib/mock/placeholder";

// Hero copy for these five pages lives as fallback text directly in their
// route files (see src/app/{page}/page.tsx) — the Visit Us / Leasing /
// Group Events copy there has since been re-verified (or corrected) against
// the live site during the content + SEO migration audit; see each route
// file's comments for specifics. This mock only supplies hero *images*.
// No distinct real hero photo could be identified for the remaining 4 pages
// during the live-site audit — genuinely MISSING, not a placeholder chosen
// out of laziness. The homepage hero photo (The Mantis fire sculpture at
// night) was supplied directly as a real asset during the Hero visual
// refinement pass — see public/assets/images/all/home-hero-image.jpg.
export const MOCK_PAGES: Record<string, PageDoc> = {
  "page-home": {
    _id: "page-home",
    title: "Homepage",
    hero: {
      image: realImage(
        "The Mantis, a fire-breathing praying mantis sculpture, at Downtown Container Park's entrance at night",
        "/assets/images/all/home-hero-image.jpg"
      ),
    },
  },
  "page-visit-us": {
    _id: "page-visit-us",
    title: "Visit Us",
    hero: { image: missingImage("Visit Us hero photo", "hero") },
  },
  "page-leasing": {
    _id: "page-leasing",
    title: "Leasing",
    hero: { image: missingImage("Leasing hero photo", "hero") },
  },
  "page-group-events": {
    _id: "page-group-events",
    title: "Group Events",
    hero: { image: missingImage("Group Events hero photo", "hero") },
  },
  "page-contact": {
    _id: "page-contact",
    title: "Contact",
    hero: { image: missingImage("Contact hero photo", "hero") },
  },
};
