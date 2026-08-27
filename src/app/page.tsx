import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { FeatureCarousel } from "@/components/home/FeatureCarousel";
import { ImageTextSplit } from "@/components/home/ImageTextSplit";
import { StatStrip } from "@/components/home/StatStrip";
import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { VideoFeature } from "@/components/home/VideoFeature";
import { PageBottom } from "@/components/layout/PageBottom";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getPage, getSiteSettings, getUpcomingEvents } from "@/lib/mock/queries";
import { buildMetadata } from "@/lib/seo/metadata";

const PAGE_ID = "page-home";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(PAGE_ID);
  return buildMetadata({
    title: page?.seo?.title || "Downtown Container Park",
    description: page?.seo?.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [page, events, settings] = await Promise.all([
    getPage(PAGE_ID),
    getUpcomingEvents(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HomeHero image={page?.hero?.image} tagline={page?.hero?.subheading} />

      {/* No slides prop: FeatureCarousel's own default now carries the
          real category thumbnails + destinations (see FeatureCarousel.tsx)
          — no need to duplicate that list here. */}
      <FeatureCarousel />

      <ImageTextSplit
        eyebrow="Discover the Park"
        heading="Discover Downtown Las Vegas"
        paragraphs={[
          "Experience Downtown Container Park, an open-air shopping center filled with boutique retail shops, unique restaurants, and live entertainment for the whole family – located in the heart of Downtown Las Vegas.",
          "From gourmet quick service dining at Downtown Terrace to award winning cocktails from Oak & Ivy, there's something for everyone. Kids will love the interactive playground featuring The Treehouse, and adults can relax while enjoying free concerts, movies, and more on the main stage.",
        ]}
        ctaLabel="Discover More"
        ctaHref="/visit-us"
        imageUrl="/assets/images/all/about-home-image.jpg"
        imageAlt="Downtown Container Park aerial view at dusk"
      />

      <StatStrip />

      <HomeEventsSection events={events} />

      {/* Real video + poster now provided (public/assets/images/all/) —
          replacing the earlier unset-videoUrl placeholder state (see
          VideoModal.tsx for how a "video not yet available" state would
          render if this ever goes missing again). */}
      <VideoFeature
        videoUrl="/assets/images/all/video.mp4"
        posterUrl="/assets/images/all/video-placeholder.jpg"
        posterAlt="The Mantis, a fire-breathing praying mantis sculpture, at Downtown Container Park"
      />

      <PageBottom settings={settings} />
    </>
  );
}
