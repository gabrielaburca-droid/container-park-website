"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { laDateKey } from "@/lib/events/date";
import { CARD_IMAGE_HOVER_CLASSES, CARD_IMAGE_OVERLAY_CLASSES } from "@/lib/ui/cardImageHover";
import type { EventDoc } from "@/lib/sanity/types";

// REAL FUNCTIONALITY, reimplemented natively — the live
// /entertainment/ page embeds a Modern Events Calendar month grid:
// prev/next month navigation, a day is only clickable when it has a real
// event, and clicking one reveals that day's real events (image, time,
// title linking to the event's real detail page) in a side panel. Same
// interaction model here, driven by this project's own real event data
// (the same `events` array — including every recurring occurrence — the
// Events listing page itself uses) rather than the live site's markup,
// and rendered with this site's own typography/spacing/color system
// instead of MEC's.
//
// Unlike the live widget (which AJAX-fetches each month from the
// server), every month is derived client-side from `events`, already
// fully loaded — no server round-trip needed to flip months.

const WEEKDAY_LABELS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]; // Monday-start week, matching the live calendar
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DayCell {
  date: Date;
  key: string;
  inMonth: boolean;
}

// Formats already-known calendar components directly into "YYYY-MM-DD" —
// deliberately NOT `laDateKey(date)` here. Grid cells are built from
// `new Date(year, month, day)`, which is a LOCAL-machine-timezone
// midnight; piping that through `laDateKey` (which reinterprets a moment
// in America/Los_Angeles) shifts it a calendar day for any visitor whose
// local zone is far enough ahead of Pacific — local midnight "Sept 1" in
// UTC+3 is still "Aug 31" in Vegas. There's no instant-in-time to convert
// here, just calendar digits we already have; `laDateKey` is still the
// right tool below for the actual event timestamps, which really are
// specific instants that need that conversion.
function dateKeyFromParts(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// The inverse of the above — pulled apart as plain integers, never
// through a `Date` object. `selectedKey` ("YYYY-MM-DD") is the single
// source of truth for what's selected; every value shown to the right
// (month name, day-of-month, ordinal) is derived from these three
// numbers directly, with no Date construction/timezone conversion able
// to shift it even by accident.
function parseDateKey(key: string): { year: number; monthIndex: number; day: number } {
  const [year, month, day] = key.split("-").map(Number);
  return { year, monthIndex: month - 1, day };
}

function buildMonthGrid(year: number, month: number): DayCell[] {
  const first = new Date(year, month, 1);
  const firstWeekdayMondayFirst = (first.getDay() + 6) % 7; // JS Sun=0..Sat=6 -> Mon=0..Sun=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: DayCell[] = [];
  for (let i = firstWeekdayMondayFirst; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    cells.push({
      date,
      key: dateKeyFromParts(date.getFullYear(), date.getMonth(), date.getDate()),
      inMonth: false,
    });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({ date, key: dateKeyFromParts(year, month, day), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const prevDate = cells[cells.length - 1].date;
    const date = new Date(prevDate);
    date.setDate(date.getDate() + 1);
    cells.push({
      date,
      key: dateKeyFromParts(date.getFullYear(), date.getMonth(), date.getDate()),
      inMonth: false,
    });
  }
  return cells;
}

function ordinal(day: number): string {
  if (day % 10 === 1 && day !== 11) return `${day}st`;
  if (day % 10 === 2 && day !== 12) return `${day}nd`;
  if (day % 10 === 3 && day !== 13) return `${day}rd`;
  return `${day}th`;
}

export function EventCalendar({ events }: { events: EventDoc[] }) {
  // "Today" must be derived once, consistently, from the Pacific calendar
  // day — not by mixing `new Date().getFullYear()/getMonth()` (the
  // browser/server's own local timezone) with `laDateKey()` (explicitly
  // Pacific). Those two can disagree right at the day boundary (e.g. a
  // visitor in a UTC+3 timezone: it's already the 1st locally but still
  // the 31st in Las Vegas), which previously showed a month grid that
  // didn't even contain the day pre-selected as "today." Parsing the
  // Pacific key directly keeps the initial month and the initial
  // selected day in agreement no matter where this runs.
  const todayKey = useMemo(() => laDateKey(new Date()), []);
  const { year: todayYear, monthIndex: todayMonthIndex } = useMemo(
    () => parseDateKey(todayKey),
    [todayKey]
  );
  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonthIndex);
  // `selectedKey` is the single source of truth for the events panel on
  // the right — every value displayed there (month name, day, ordinal,
  // the event list itself) is derived from this one string, never from a
  // separately-tracked Date/month/day trio that could drift out of sync
  // with it.
  const [selectedKey, setSelectedKey] = useState(todayKey);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventDoc[]>();
    for (const event of events) {
      const key = laDateKey(new Date(event.startDate));
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonthIndex;

  function goToMonth(offset: number) {
    const next = new Date(viewYear, viewMonth + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  const { monthIndex: selectedMonthIndex, day: selectedDay } = parseDateKey(selectedKey);
  const selectedMonthLabel = MONTH_NAMES[selectedMonthIndex];
  const selectedEvents = eventsByDate.get(selectedKey) ?? [];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
      {/* White card, distinct from the section's own gray-to-white
          gradient background behind it. */}
      <div className="bg-white p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            disabled={isCurrentMonth}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center disabled:opacity-20"
          >
            {/* Real project asset (arrow-down.svg), rotated — same reuse
                pattern already established for the Parking accordion's
                arrow (see ui/Accordion.tsx). */}
            <Image
              src="/assets/images/all/arrow-down.svg"
              alt=""
              width={13}
              height={8}
              className="h-2 w-auto rotate-90"
            />
          </button>
          <h3 className="font-display text-xl uppercase lg:text-[28px]">{monthLabel}</h3>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center"
          >
            <Image
              src="/assets/images/all/arrow-down.svg"
              alt=""
              width={13}
              height={8}
              className="h-2 w-auto -rotate-90"
            />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center font-display text-xs uppercase text-muted">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label}>{label}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {cells.map((cell) => {
            const hasEvents = (eventsByDate.get(cell.key)?.length ?? 0) > 0;
            const isSelected = cell.key === selectedKey;
            // CURRENT DAY (today) and SELECTED DAY (clicked) are two
            // independent states — today keeps its own lime outline
            // regardless of what's selected, so the two never read as
            // the same thing.
            const isToday = cell.key === todayKey;
            // Only days with real events are selectable — matching the
            // live calendar exactly (there, a day with no events isn't a
            // link at all, just plain text).
            if (!cell.inMonth || !hasEvents) {
              return (
                <div
                  key={cell.key}
                  className={`flex aspect-square items-center justify-center text-sm ${
                    cell.inMonth ? "text-muted" : "text-border"
                  } ${isToday ? "border-2 border-lime" : ""}`}
                >
                  {cell.date.getDate()}
                </div>
              );
            }
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelectedKey(cell.key)}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                className={`flex aspect-square flex-col items-center justify-center gap-0.5 text-sm transition-colors duration-150 ${
                  isSelected
                    ? "bg-lime font-semibold text-lime-foreground"
                    : "text-foreground hover:bg-border"
                } ${isToday && !isSelected ? "border-2 border-lime" : ""}`}
              >
                {cell.date.getDate()}
                {!isSelected && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-lime" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-wide text-muted">Events For</p>
          <h4 className="mt-1 font-display text-2xl uppercase text-lime lg:text-[36px]">
            {selectedMonthLabel} {ordinal(selectedDay)}
          </h4>
        </div>

        {selectedEvents.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {selectedEvents.map((event) => {
              const imageUrl = event.heroImage?.asset
                ? urlForImage(event.heroImage).width(128).height(128).url()
                : null;
              const cardProps = event.externalUrl
                ? { href: event.externalUrl, target: "_blank", rel: "noopener noreferrer" }
                : { href: `/events/${event.slug.current}` };
              // The live site's own short "Location" field (e.g.
              // "Container Park - Stage and Lawn", "Oak and Ivy") — a
              // distinct field from the related business, category, or
              // tags. Falls back to the park's own name only for the
              // handful of real events that have no Location set on the
              // live site (e.g. Noche Latina), same as the live site's
              // own default event location.
              const locationName = event.location ?? "Downtown Container Park";
              return (
                <li key={event._id}>
                  <Link
                    {...cardProps}
                    className="group flex items-center gap-3 border border-border bg-white p-3 transition-colors duration-300 ease-out hover:border-lime"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-border">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={event.heroImage?.alt || event.title}
                          fill
                          // Fixed 64x64px (h-16 w-16, see the wrapper div
                          // above) at every breakpoint.
                          sizes="64px"
                          className={`object-cover ${CARD_IMAGE_HOVER_CLASSES}`}
                        />
                      )}
                      <div aria-hidden="true" className={CARD_IMAGE_OVERLAY_CLASSES} />
                    </div>
                    <div className="min-w-0">
                      {event.time && <p className="text-xs text-muted">{event.time}</p>}
                      <p className="truncate font-display text-base uppercase group-hover:text-lime">
                        {event.title}
                      </p>
                      {/* Location — real content, same hierarchy as the
                          live site's own event cards (title, then
                          location directly below it). */}
                      <p className="truncate text-xs text-muted">{locationName}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-center text-sm text-muted">No Events</p>
        )}
      </div>
    </div>
  );
}
