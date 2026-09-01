// The park is in Las Vegas — event dates must compare by *that* calendar
// day, not the visitor's/server's local timezone. "YYYY-MM-DD" matches a
// native <input type="date"> value directly, so date filters/lookups can
// compare strings without round-tripping through Date parsing.
export function laDateKey(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}
