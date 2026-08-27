import { Button } from "@/components/ui/Button";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="flex min-h-[600px] items-center justify-center bg-near-black text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <p className="font-display text-7xl sm:text-8xl">404</p>
          <h1 className="mt-2 font-display text-2xl uppercase text-lime sm:text-3xl">
            This Page Took a Detour
          </h1>
          <p className="mt-4 text-sm text-white/90">
            Looks like the page you&apos;re looking for has wandered off somewhere around Downtown
            Las Vegas. Don&apos;t worry—there&apos;s still plenty to discover.
          </p>
          <div className="mt-6">
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </section>
      <PageBottom settings={settings} showPlanYourVisit={false} />
    </>
  );
}
