"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event/EventCard";
import { EventFilterBar } from "@/components/events/EventFilterBar";
import { Button } from "@/components/ui/Button";
import type { EventDoc } from "@/lib/sanity/types";

// Page size shown in the source design (12 = 3 rows x 4 cols) — NOT
// confirmed as the real page size, just what was visible. Also the
// "Load More" batch size: each click reveals another PAGE_SIZE items
// from the current filtered set.
const PAGE_SIZE = 12;

// The park is in Las Vegas — event dates must compare by *that* calendar
// day, not the visitor's/server's local timezone. Comparing via
// `.toDateString()` (implicitly machine-local) put an event stored as
// "7:30 PM Pacific" on the wrong UTC calendar day for anyone not already
// in Pacific time (including this app's own server-rendered date math),
// so a date-picker match against the event's real intended day silently
// failed. "YYYY-MM-DD" here matches the native <input type="date"> value
// exactly, so the date filter can compare strings directly.
function laDateKey(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}

export function EventsListingClient({ events }: { events: EventDoc[] }) {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // All filters compose (each narrows `result` further) rather than being
  // mutually exclusive, so e.g. Featured Events + search, or
  // Recurring Events + a date, work together as expected.
  const filtered = useMemo(() => {
    let result = events;

    // `isRecurring` is the single real classification field (already on
    // the Sanity schema) — Recurring Events shows only events with it set
    // (currently just "The Mantis"), Featured Events shows every other
    // imported event.
    if (tab === "recurring") {
      result = result.filter((event) => event.isRecurring);
    }
    if (tab === "featured") {
      result = result.filter((event) => !event.isRecurring);
    }

    if (submittedSearch.trim()) {
      const query = submittedSearch.trim().toLowerCase();
      result = result.filter((event) => event.title.toLowerCase().includes(query));
    }

    if (dateFilter === "today") {
      const today = laDateKey(new Date());
      result = result.filter((event) => laDateKey(new Date(event.startDate)) === today);
    } else if (dateFilter === "this-month" || dateFilter === "next-month") {
      const now = new Date();
      const monthOffset = dateFilter === "next-month" ? 1 : 0;
      const targetMonth = (now.getMonth() + monthOffset) % 12;
      const targetYear = now.getFullYear() + Math.floor((now.getMonth() + monthOffset) / 12);
      result = result.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate.getMonth() === targetMonth && eventDate.getFullYear() === targetYear;
      });
    } else if (dateFilter && dateFilter !== "all") {
      // A specific date was chosen via the native date input — its value
      // is already "YYYY-MM-DD", so compare directly against the event's
      // Pacific-calendar-day key instead of round-tripping through Date.
      result = result.filter((event) => laDateKey(new Date(event.startDate)) === dateFilter);
    }

    return result;
  }, [events, tab, submittedSearch, dateFilter]);

  // visibleCount is a cumulative reveal over the CURRENT filtered set —
  // "Load More" appends the next PAGE_SIZE items rather than replacing
  // the page, so it must reset back to PAGE_SIZE whenever the active
  // filters change (a new tab/search/date), not just grow forever across
  // unrelated filter changes. Adjusting state during render (rather than
  // in a useEffect) per React's own guidance for "reset state when a prop
  // changes" — this runs synchronously as part of the same render instead
  // of triggering a second, cascading one.
  const filterKey = `${tab}|${submittedSearch}|${dateFilter}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  let effectiveVisibleCount = visibleCount;
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
    effectiveVisibleCount = PAGE_SIZE;
  }

  const visibleItems = filtered.slice(0, effectiveVisibleCount);
  const hasMore = effectiveVisibleCount < filtered.length;

  return (
    <div>
      <EventFilterBar
        activeTab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setSubmittedSearch(search)}
        activeDateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {visibleItems.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleItems.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-muted">No events match these filters yet.</p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
