import Image from "next/image";
import type { CSSProperties } from "react";
import { STAT_LABEL_CLASSES } from "@/lib/ui/typography";

interface StatItem {
  label: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
}

// Source copy preserved exactly, including the "Availale" spelling shown
// in the source design — not silently corrected per instruction. Icons are
// the real assets provided in public/assets/images/all/ (icon-time,
// icon-location, icon-free-admision [sic], icon-parking) — order matches
// the Figma reference exactly, replacing the earlier inline-SVG
// approximations now that real assets exist.
const DEFAULT_ITEMS: StatItem[] = [
  {
    label: "Open Daily",
    iconSrc: "/assets/images/all/icon-time.svg",
    iconWidth: 50,
    iconHeight: 50,
  },
  {
    label: "Fremont Street",
    iconSrc: "/assets/images/all/icon-location.svg",
    iconWidth: 38,
    iconHeight: 50,
  },
  {
    label: "Free Admission",
    iconSrc: "/assets/images/all/icon-free-admision.svg",
    iconWidth: 50,
    iconHeight: 50,
  },
  {
    label: "Parking Availale",
    iconSrc: "/assets/images/all/icon-parking.svg",
    iconWidth: 50,
    iconHeight: 50,
  },
];

export function StatStrip({ items = DEFAULT_ITEMS }: { items?: StatItem[] }) {
  return (
    <section className="bg-lime py-6 sm:py-8">
      {/* Divider lines between items, matching the reference — only at
          sm:+ where the grid is genuinely one row (sm:grid-cols-4); at
          the 2-column mobile layout a plain "divide every item" rule
          would incorrectly draw a line at the start of the second row
          too, so dividers are skipped there and the existing gap alone
          separates items. .stat-strip-divider is hand-authored CSS (see
          globals.css) reading its color from the inline custom property
          below — the color has to be set inline (not written literally
          in any .css file) because this project's CSS build pipeline
          normalizes color values to 8-bit hex-alpha, which would round
          the required exact rgba(0, 0, 0, 0.1) to ~0.102 alpha. */}
      <ul
        className="stat-strip-divider mx-auto grid max-w-container grid-cols-2 gap-6 px-4 text-center text-lime-foreground sm:grid-cols-4"
        style={{ "--stat-divider-color": "rgba(0, 0, 0, 0.1)" } as CSSProperties}
      >
        {items.map(({ label, iconSrc, iconWidth, iconHeight }) => (
          <li key={label} className="flex flex-col items-center gap-3 sm:px-4">
            <Image
              src={iconSrc}
              alt=""
              width={iconWidth}
              height={iconHeight}
              className="h-10 w-auto"
            />
            <span className={STAT_LABEL_CLASSES}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
