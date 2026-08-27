import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/sanity/types";
import { MobileMenu } from "./MobileMenu";

// Used only when Sanity has no siteSettings document yet, so the site is
// still navigable during the empty-content phase. Order matches the
// literal order shown in the Figma header export.
const FALLBACK_NAV = [
  { label: "Shop", url: "/shop" },
  { label: "Eat & Drink", url: "/eat-drink" },
  { label: "Entertainment", url: "/entertainment" },
  { label: "Attractions", url: "/attractions" },
  { label: "Leasing", url: "/leasing" },
  { label: "Events", url: "/events" },
  { label: "Group Events", url: "/group-events" },
  { label: "Visit Us", url: "/visit-us" },
  { label: "Contact", url: "/contact" },
];

// Real brand icon assets (public/assets/images/all/) — order matches the
// Figma header exactly: Facebook, Instagram, X, Tripadvisor.
const SOCIAL_ICON_LABELS: {
  key: keyof NonNullable<SiteSettings["socialLinks"]>;
  label: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
}[] = [
  {
    key: "facebook",
    label: "Facebook",
    iconSrc: "/assets/images/all/facebook-icon.svg",
    iconWidth: 8,
    iconHeight: 14,
  },
  {
    key: "instagram",
    label: "Instagram",
    iconSrc: "/assets/images/all/instagram-icon.svg",
    iconWidth: 13,
    iconHeight: 13,
  },
  {
    key: "twitter",
    label: "X",
    iconSrc: "/assets/images/all/x-icon.svg",
    iconWidth: 17,
    iconHeight: 17,
  },
  {
    key: "tripadvisor",
    label: "Tripadvisor",
    iconSrc: "/assets/images/all/tripadvisor-icon.svg",
    iconWidth: 24,
    iconHeight: 14,
  },
];

// STICKY/SCROLL BEHAVIOR, ACTIVE-NAV-ITEM STYLING, HOVER: NEEDS
// CONFIRMATION — none of these are visible in the supplied Figma exports
// (all full-page, non-scroll-state captures). Static, non-sticky header only.
export function Header({ settings }: { settings: SiteSettings | null }) {
  const navItems = settings?.navigation?.length ? settings.navigation : FALLBACK_NAV;
  const socialLinks = settings?.socialLinks;

  return (
    // Figma shows the header as a vertical black-to-transparent scrim, not a
    // solid bar — 100% opaque at the very top, fading to 0% by the header's
    // own bottom edge, with whatever's beneath (every page's hero/PageHero
    // section, which already renders full-bleed at the top of <main>)
    // showing through. `absolute` pulls the header out of document flow so
    // it overlays that hero instead of pushing it down, on every page — not
    // just the homepage, since every page template starts with a dark,
    // image-backed hero section directly beneath the header.
    <header className="absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-near-black to-transparent text-near-black-foreground">
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3 md:py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/images/all/logo-downtown.svg"
            alt="Downtown Container Park"
            width={278}
            height={85}
            priority
            className="h-12 w-auto xl:h-14"
          />
        </Link>

        {/* Reveal breakpoint deliberately set to xl (1280px), not lg
            (1024px): at the nav's Figma text size, the full logo + 9-item
            nav + social icons don't fit in 1024px without overflow, and
            the mobile menu already covers that gap accessibly — see
            MobileMenu's matching `xl:hidden`. */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex flex-wrap gap-6 text-xs font-medium uppercase tracking-wide">
            {navItems.map((item) => (
              <li key={item.url}>
                <Link href={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {SOCIAL_ICON_LABELS.map(({ key, label, iconSrc, iconWidth, iconHeight }) => {
            const href = socialLinks?.[key];
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center bg-lime"
              >
                <Image
                  src={iconSrc}
                  alt=""
                  width={iconWidth}
                  height={iconHeight}
                  className="h-4 w-auto"
                />
              </a>
            );
          })}
        </div>

        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
}
