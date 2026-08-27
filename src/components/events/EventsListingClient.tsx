"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event/EventCard";
import { EventFilterBar } from "@/components/events/EventFilterBar";
import { Pagination } from "@/components/events/Pagination";
import type { EventDoc } from "@/lib/sanity/types";

// Page size shown in the source design (12 = 3 rows x 4 cols) — NOT
// confirmed as the real page size, just what was visible.
const PAGE_SIZE = 12;

export function EventsListingClient({ events }: { events: EventDoc[] }) {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = events;

    if (tab === "recurring") {
      result = result.filter((event) => event.isRecurring);
    }
    if (tab === "special") {
      // TODO: SCHEMA GAP — event.isSpecial doesn't exist yet, so this tab
      // filters to nothing until that field is added (see CLAUDE.md).
      result = result.filter((event) => event.isSpecial);
    }

    if (submittedSearch.trim()) {
      const query = submittedSearch.trim().toLowerCase();
      result = result.filter((event) => event.title.toLowerCase().includes(query));
    }

    if (dateFilter === "today") {
      const today = new Date().toDateString();
      result = result.filter((event) => new Date(event.startDate).toDateString() === today);
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
      // A specific date was chosen via the native date input.
      const target = new Date(dateFilter).toDateString();
      result = result.filter((event) => new Date(event.startDate).toDateString() === target);
    }

    return result;
  }, [events, tab, submittedSearch, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <EventFilterBar
        activeTab={tab}
        onTabChange={(value) => {
          setTab(value);
          setPage(1);
        }}
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => {
          setSubmittedSearch(search);
          setPage(1);
        }}
        activeDateFilter={dateFilter}
        onDateFilterChange={(value) => {
          setDateFilter(value);
          setPage(1);
        }}
      />

      {pageItems.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-muted">No events match these filters yet.</p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
