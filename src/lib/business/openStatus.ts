import type { DayHours } from "@/lib/sanity/types";

// "11:00 AM" / "09:00 PM" / "12:00 AM" -> minutes since midnight.
function parseTimeToMinutes(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10) % 12;
  if (match[3].toUpperCase() === "PM") hour += 12;
  return hour * 60 + parseInt(match[2], 10);
}

// Shared by getOpenStatus and getTodayHours below — the park's own weekday,
// evaluated in its timezone (Las Vegas, America/Los_Angeles) regardless of
// where this runs, same reasoning as getOpenStatus itself.
function getParkWeekday(): string | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
  }).formatToParts(new Date());
  return parts.find((p) => p.type === "weekday")?.value ?? null;
}

/**
 * Today's hours entry from a business's own `hours` — used to show e.g.
 * "11:00 AM - 09:00 PM" alongside the Open/Closed Now label (see
 * templates/BusinessDetailTemplate.tsx). Returns null when there's no
 * hours data or today isn't represented, an honest "unknown" rather than
 * guessing.
 */
export function getTodayHours(hours?: DayHours[]): DayHours | null {
  if (!hours || hours.length === 0) return null;
  const weekday = getParkWeekday();
  if (!weekday) return null;
  return hours.find((entry) => entry.day === weekday) ?? null;
}

/**
 * Real-time "Open Now" / "Closed Now" — computed from the business's own
 * `hours` (already-migrated real data), the same way the live site
 * evaluates it against the current time rather than a fixed field that
 * would go stale the moment it's written down. Evaluated in the park's own
 * timezone (Las Vegas, America/Los_Angeles) regardless of where this runs,
 * since that's what the business's posted hours actually refer to.
 *
 * Returns null (render nothing) when there's no hours data to evaluate —
 * an honest "unknown" rather than guessing open or closed.
 */
export function getOpenStatus(hours?: DayHours[]): "open" | "closed" | null {
  if (!hours || hours.length === 0) return null;

  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  if (!weekday || hour === undefined || minute === undefined) return null;
  const nowMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

  const today = hours.find((entry) => entry.day === weekday);
  if (!today || today.closed || !today.open || !today.close) return "closed";

  const openMinutes = parseTimeToMinutes(today.open);
  let closeMinutes = parseTimeToMinutes(today.close);
  if (openMinutes === null || closeMinutes === null) return null;

  // Overnight close (e.g. open 12:00 PM, close 01:00 AM) — close time is
  // "earlier" in raw minutes than open time, so treat it as past midnight.
  if (closeMinutes <= openMinutes) closeMinutes += 24 * 60;
  const effectiveNow = nowMinutes < openMinutes ? nowMinutes + 24 * 60 : nowMinutes;

  return effectiveNow >= openMinutes && effectiveNow < closeMinutes ? "open" : "closed";
}
