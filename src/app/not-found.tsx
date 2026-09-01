import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroGradientOverlay } from "@/components/layout/HeroGradientOverlay";
import { PageBottom } from "@/components/layout/PageBottom";
import { HERO_HEADING_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Real, existing project asset (public/assets/images/all/404-hero.jpg
          — the same Downtown/7th Street night photo the approved design
          uses), not the placeholder-hero fallback: this page already has
          its own dedicated hero image, so that fallback rule doesn't apply
          here. Same shared gradient scrim (HeroGradientOverlay) as every
          other Hero on the site — reused exactly, not a new treatment. */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-near-black text-center text-white sm:min-h-[820px]">
        <Image
          src="/assets/images/all/404-hero.jpg"
          alt=""
          fill
          priority
          // Full-bleed section background at every breakpoint.
          sizes="100vw"
          className="object-cover"
        />
        <HeroGradientOverlay />
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          {/* Decorative numeral, not the page's real heading — the H1 stays
              on the actual descriptive text below (see CLAUDE.md's
              one-real-H1-per-page rule). "404" reuses Home Hero's own big
              display-numeral scale (HERO_HEADING_CLASSES); the H1 below it
              reuses the site's standard big-heading size (
              SECTION_HEADING_CLASSES, 52px desktop — the same size used for
              every other major section heading sitewide) rather than
              HERO_ACCENT_CLASSES' 100px, which wraps this longer line
              across two lines instead of the one line the design shows. */}
          <p className={HERO_HEADING_CLASSES}>404</p>
          <h1 className={`mt-2 text-lime ${SECTION_HEADING_CLASSES}`}>This Page Took a Detour</h1>
          <p className="mx-auto mt-6 max-w-md text-sm text-white/90 sm:text-base">
            Looks like the page you&apos;re looking for has wandered off somewhere around Downtown
            Las Vegas. Don&apos;t worry—there&apos;s still plenty to discover.
          </p>
          <div className="mt-8 flex justify-center">
            {/* Real internal route — never the old live site. */}
            <Button href="/" variant="outline-light">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
      <PageBottom settings={settings} showPlanYourVisit={false} />
    </>
  );
}
