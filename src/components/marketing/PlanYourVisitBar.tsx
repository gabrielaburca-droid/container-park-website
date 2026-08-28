import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CARD_TITLE_CLASSES, EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";
import type { Address, DayHours } from "@/lib/sanity/types";

interface PlanYourVisitBarProps {
  address?: Address | null;
  directionsUrl?: string;
  retailHours?: DayHours[];
  restaurantHours?: DayHours[];
}

// Real brand icon assets (public/assets/images/all/), pre-colored lime —
// matching the Figma reference. No inline/placeholder SVGs per that design.
const ICON = {
  location: "/assets/images/all/location-icon-green.svg",
  retail: "/assets/images/all/retail-icon-green.svg",
  cocktail: "/assets/images/all/cocktail-icon-green.svg",
} as const;

// DATA: SCHEMA GAP — `siteSettings.parkHours` is currently a single hours
// array; this section needs two distinct sets (Retail vs. Restaurants &
// Bars). Both hour props below will render empty until that schema split
// is made — see CLAUDE.md "parkHours" gap.
// USED ON: Event Detail, Business Detail, Shop/Eat & Drink/Entertainment/
// Attractions listings, Group Events, Leasing, Events Listing, Homepage.
// NOT used on Visit Us, Contact, 404.
export function PlanYourVisitBar({
  address,
  directionsUrl,
  retailHours = [],
  restaurantHours = [],
}: PlanYourVisitBarProps) {
  return (
    // No border-b / divide-y on mobile (removed instead of just hidden, so
    // there's no stray 0-width rule left behind) — both restored at sm:
    // and up so tablet/desktop are pixel-identical to before.
    <section className="bg-gradient-to-r from-[#F5F5F5] to-background sm:border-b sm:border-border">
      <div className="mx-auto grid max-w-container grid-cols-1 px-4 py-10 sm:divide-y sm:divide-border sm:py-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:divide-y-0">
        {/* text-center on mobile only — the three icon columns below are
            already centered unconditionally at every breakpoint; this is
            the one block (eyebrow/heading/button) that was left-aligned
            before, so it's the only one that needs a responsive change. */}
        <div className="pb-8 text-center sm:text-left lg:pb-0 lg:pr-10">
          <p className={EYEBROW_CLASSES}>Plan Your Visit</p>
          <h2 className={`mt-2 ${SECTION_HEADING_CLASSES}`}>
            Easy to Get Here.
            <br />
            Hard to Leave.
          </h2>
          {directionsUrl && (
            <div className="mt-6">
              <Button href={directionsUrl} variant="filled">
                Get Directions
              </Button>
            </div>
          )}
        </div>

        {/* No left border on desktop — this item sits directly against the
            intro block, unlike Retail Hours/Restaurants & Bars which keep
            their divider (added explicitly on those two below since the
            grid no longer uses a blanket lg:divide-x). */}
        <div className="flex flex-col items-center py-8 text-center lg:py-0 lg:px-10">
          <Image src={ICON.location} alt="" width={51} height={68} className="h-12 w-auto" />
          <h4 className={`mt-3 ${CARD_TITLE_CLASSES}`}>Container Park</h4>
          {address && (
            <p className="mt-2 text-sm text-muted underline underline-offset-2">
              {address.street}
              <br />
              {[address.city, address.state].filter(Boolean).join(", ")} {address.zip}
            </p>
          )}
          <ArrowLink href={directionsUrl} className="mt-4">
            Get Directions
          </ArrowLink>
        </div>

        <HoursColumn
          icon={ICON.retail}
          label="Retail Hours"
          hours={retailHours}
          className="lg:border-l lg:border-border lg:px-10"
        />
        <HoursColumn
          icon={ICON.cocktail}
          label="Restaurants & Bars"
          hours={restaurantHours}
          className="lg:border-l lg:border-border lg:pl-10"
        />
      </div>
    </section>
  );
}

function HoursColumn({
  icon,
  label,
  hours,
  className = "",
}: {
  icon: string;
  label: string;
  hours: DayHours[];
  className?: string;
}) {
  const lines = groupConsecutiveDays(hours);
  return (
    <div className={`flex flex-col items-center py-8 text-center lg:py-0 ${className}`}>
      <Image src={icon} alt="" width={68} height={68} className="h-12 w-auto" />
      <h4 className={`mt-3 ${CARD_TITLE_CLASSES}`}>{label}</h4>
      {lines.length > 0 ? (
        <ul className="mt-2 space-y-0.5 text-sm text-black">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">Hours not yet available.</p>
      )}
      <ArrowLink href="/visit-us" className="mt-4">
        Visit Us
      </ArrowLink>
    </div>
  );
}

// Collapses consecutive days sharing the same open/close time into a single
// "Monday - Thursday: 11:30a to 8:00p" line instead of one line per day —
// per the Figma reference. Generic over whatever run of matching days the
// data contains (not hardcoded to Mon-Thu specifically), so it stays
// correct if the underlying hours ever change.
function groupConsecutiveDays(hours: DayHours[]): string[] {
  const groups: { days: string[]; closed?: boolean; open?: string; close?: string }[] = [];

  for (const entry of hours) {
    const day = entry.day ?? "";
    const last = groups[groups.length - 1];
    const sameAsLast =
      last && last.closed === entry.closed && last.open === entry.open && last.close === entry.close;
    if (sameAsLast) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], closed: entry.closed, open: entry.open, close: entry.close });
    }
  }

  return groups.map((group) => {
    const label =
      group.days.length > 1 ? `${group.days[0]} - ${group.days[group.days.length - 1]}` : group.days[0];
    const time = group.closed ? "Closed" : `${formatHour(group.open)} to ${formatHour(group.close)}`;
    return `${label}: ${time}`;
  });
}

// "11:30 AM" -> "11:30a", "8:00 PM" -> "8:00p" — matches the Figma's
// compact time format (single lowercase letter, no space).
function formatHour(time?: string): string {
  if (!time) return "";
  return time.replace(/\s?([AaPp])\.?[Mm]\.?$/, (_match, meridiem: string) => meridiem.toLowerCase());
}

// Small text-link CTA (icon columns only) — plain uppercase label + the
// same real arrow asset Button uses, distinct from Button's filled/outline
// pill treatment per the Figma reference (no padding/border/background).
function ArrowLink({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  if (!href) return null;
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-display text-xs uppercase text-foreground transition-colors duration-200 ease-out hover:text-lime ${className}`}
    >
      {children}
      <Image
        src="/assets/images/all/arrow-black-button.svg"
        alt=""
        width={14}
        height={14}
        className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:rotate-90"
      />
    </Link>
  );
}
