import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/sanity/types";
import { PARTNERS } from "@/data/partners";

const FALLBACK_EXPLORE = [
  { label: "Shop", url: "/shop" },
  { label: "Eat & Drink", url: "/eat-drink" },
  { label: "Entertainment", url: "/entertainment" },
  { label: "Attractions", url: "/attractions" },
];

// "Terms" has no `url` — no Terms/Privacy page exists on the current live
// site (checked its full footer + nav markup) or in this project's fixed
// page set (see CLAUDE.md's five approved page IDs), so there's no real
// destination to link to yet. Shown per the Figma reference but rendered
// unlinked (see FooterColumn below) rather than pointed at an invented
// route.
const FALLBACK_USEFUL_LINKS: { label: string; url?: string }[] = [
  { label: "Group Events", url: "/group-events" },
  { label: "Leasing", url: "/leasing" },
  { label: "Visit us", url: "/visit-us" },
  { label: "Terms" },
];

// logo-downtown.svg (used by Header.tsx) renders its "CONTAINER" wordmark
// and the train's body panels in white — fine on the dark Header
// background it was built for, invisible against this Footer's light
// background. This is the light-background counterpart, provided
// specifically for that use.
const FOOTER_LOGO_SRC = "/assets/images/all/logo-downtown-normal.svg";

// Real brand icon assets (public/assets/images/all/) — same order, same
// assets, same source URLs as the header (see Header.tsx): Facebook,
// Instagram, X, Tripadvisor.
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

const COLUMN_HEADING_CLASSES = "font-sans text-xs font-medium uppercase tracking-wide";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const exploreLinks = FALLBACK_EXPLORE;
  const usefulLinks = settings?.footerLinks?.length ? settings.footerLinks : FALLBACK_USEFUL_LINKS;
  const socialLinks = settings?.socialLinks;

  return (
    <footer className="bg-gradient-to-r from-footer-background to-lime/15">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-x-10 gap-y-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_2fr] lg:gap-x-12 lg:py-16">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src={FOOTER_LOGO_SRC}
              alt="Downtown Container Park"
              width={278}
              height={85}
              className="h-14 w-auto"
            />
          </Link>
          <div className="mt-5 flex gap-2">
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
                  className="flex h-10 w-10 items-center justify-center bg-lime"
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
        </div>

        <FooterColumn title="Explore" links={exploreLinks} />
        <FooterColumn title="Useful Links" links={usefulLinks} />

        <div>
          <h4 className={COLUMN_HEADING_CLASSES}>Our Partners</h4>
          <ul className="mt-5 grid grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="flex h-9 items-center">
                <PartnerLogo partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        {/* Source copy preserved exactly, including its casing/spacing, per instruction. */}© 2026
        Downtown container park. Allrights reserved.
      </div>
    </footer>
  );
}

function PartnerLogo({ partner }: { partner: (typeof PARTNERS)[number] }) {
  const logo = (
    <Image
      src={partner.logoUrl}
      alt={partner.name}
      width={140}
      height={96}
      className="h-9 w-auto object-contain"
    />
  );

  if (!partner.link) {
    // NEEDS CONFIRMATION — no destination verified on the current live
    // site for this partner; left unlinked rather than guessed (see
    // data/partners.ts).
    return (
      <span title={`${partner.name} — link needs confirmation`} className="opacity-90">
        {logo}
      </span>
    );
  }

  if (partner.internal) {
    return <Link href={partner.link}>{logo}</Link>;
  }

  return (
    <a href={partner.link} target="_blank" rel="noreferrer" aria-label={partner.name}>
      {logo}
    </a>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; url?: string }[];
}) {
  return (
    <div>
      <h4 className={COLUMN_HEADING_CLASSES}>{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) =>
          link.url ? (
            <li key={link.label}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ) : (
            <li key={link.label} title={`${link.label} — destination needs confirmation`}>
              {link.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
