import type { EventDoc } from "@/lib/sanity/types";
import { laDateKey } from "@/lib/events/date";

// Standard, documented URL/file formats — not a chosen third-party
// integration, so implementing these doesn't require the "only if the
// project's architecture already supports it" caution applied to actual
// provider integrations (email, Instagram, newsletter). Both buttons in
// the design ("Add to Google Calendar", "iCal Export") name their exact
// mechanism, which is what's implemented here.

function toIcsDate(dateString: string) {
  return new Date(dateString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

interface CalendarExtras {
  location?: string;
  details?: string;
}

type CalendarEvent = Pick<EventDoc, "title" | "startDate" | "endDate" | "timeType">;

// Sunset-timed events (see EventDoc.timeType) have no real clock time, so
// they export as all-day entries on their Las Vegas calendar date instead
// of a fabricated midnight-to-midnight block. All-day end dates are
// exclusive in both Google Calendar and iCalendar, hence the next day.
function allDayDates(event: CalendarEvent): { start: string; end: string } | null {
  if (event.timeType !== "sunset") return null;
  const [y, m, d] = laDateKey(new Date(event.startDate)).split("-").map(Number);
  const toBasic = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, "");
  return {
    start: toBasic(new Date(Date.UTC(y, m - 1, d))),
    end: toBasic(new Date(Date.UTC(y, m - 1, d + 1))),
  };
}

export function buildGoogleCalendarUrl(event: CalendarEvent, extras?: CalendarExtras) {
  const allDay = allDayDates(event);
  const start = allDay?.start ?? toIcsDate(event.startDate);
  const end = allDay?.end ?? (event.endDate ? toIcsDate(event.endDate) : start);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
  });
  if (extras?.location) params.set("location", extras.location);
  if (extras?.details) params.set("details", extras.details);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsDataUrl(event: CalendarEvent, extras?: CalendarExtras) {
  const allDay = allDayDates(event);
  const start = allDay?.start ?? toIcsDate(event.startDate);
  const end = allDay?.end ?? (event.endDate ? toIcsDate(event.endDate) : start);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`,
    allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`,
    extras?.location ? `LOCATION:${extras.location}` : null,
    extras?.details ? `DESCRIPTION:${extras.details}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
