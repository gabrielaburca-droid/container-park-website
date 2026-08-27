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

export function buildGoogleCalendarUrl(event: Pick<EventDoc, "title" | "startDate" | "endDate">) {
  const start = toIcsDate(event.startDate);
  const end = event.endDate ? toIcsDate(event.endDate) : start;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsDataUrl(event: Pick<EventDoc, "title" | "startDate" | "endDate">) {
  const start = toIcsDate(event.startDate);
  const end = event.endDate ? toIcsDate(event.endDate) : start;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
