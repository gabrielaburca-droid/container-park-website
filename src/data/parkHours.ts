import type { DayHours } from "@/lib/sanity/types";

// TODO: SCHEMA GAP — siteSettings.retailHours / restaurantHours don't
// exist in the Sanity schema yet (see CLAUDE.md). These hours are
// transcribed directly from the "Plan Your Visit" bar in the Figma
// exports (not invented) and used as a fallback until the schema is
// extended and this data lives in Sanity instead.
export const DEFAULT_RETAIL_HOURS: DayHours[] = [
  { day: "Monday", open: "11:30 AM", close: "8:00 PM" },
  { day: "Tuesday", open: "11:30 AM", close: "8:00 PM" },
  { day: "Wednesday", open: "11:30 AM", close: "8:00 PM" },
  { day: "Thursday", open: "11:30 AM", close: "8:00 PM" },
  { day: "Friday", open: "11:00 AM", close: "9:00 PM" },
  { day: "Saturday", open: "11:00 AM", close: "9:00 PM" },
  { day: "Sunday", open: "11:00 AM", close: "8:00 PM" },
];

export const DEFAULT_RESTAURANT_HOURS: DayHours[] = [
  { day: "Monday", open: "11:30 AM", close: "11:00 PM" },
  { day: "Tuesday", open: "11:30 AM", close: "11:00 PM" },
  { day: "Wednesday", open: "11:30 AM", close: "11:00 PM" },
  { day: "Thursday", open: "11:30 AM", close: "11:00 PM" },
  { day: "Friday", open: "11:00 AM", close: "1:00 AM" },
  { day: "Saturday", open: "11:00 AM", close: "1:00 AM" },
  { day: "Sunday", open: "11:00 AM", close: "8:00 PM" },
];
