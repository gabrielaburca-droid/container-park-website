import type { EventDoc } from "@/lib/sanity/types";

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

export function buildGoogleCalendarUrl(
  event: Pick<EventDoc, "title" | "startDate" | "endDate">,
  extras?: CalendarExtras
) {
  const start = toIcsDate(event.startDate);
  const end = event.endDate ? toIcsDate(event.endDate) : start;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
  });
  if (extras?.location) params.set("location", extras.location);
  if (extras?.details) params.set("details", extras.details);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsDataUrl(
  event: Pick<EventDoc, "title" | "startDate" | "endDate">,
  extras?: CalendarExtras
) {
  const start = toIcsDate(event.startDate);
  const end = event.endDate ? toIcsDate(event.endDate) : start;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    extras?.location ? `LOCATION:${extras.location}` : null,
    extras?.details ? `DESCRIPTION:${extras.details}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
