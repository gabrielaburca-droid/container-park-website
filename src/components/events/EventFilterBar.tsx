import Image from "next/image";
import { FILTER_TAB_CLASSES } from "@/lib/ui/typography";

interface EventFilterBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  activeDateFilter: string;
  onDateFilterChange: (id: string) => void;
}

const TABS = [
  { id: "all", label: "All Events" },
  { id: "recurring", label: "Recurring Events" },
  { id: "featured", label: "Featured Events" },
];

const DATE_FILTERS = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "this-month", label: "This Month" },
  { id: "next-month", label: "Next Month" },
];

// INTERACTION: NEEDS CONFIRMATION for search (live-filter vs. submit) —
// implemented as submit-only (Enter / search button), the more
// conservative of the two unconfirmed options. "Select Date" custom
// calendar popover is NOT implemented — a native <input type="date"> is
// used instead (NEEDS CONFIRMATION whether a custom picker widget is
// actually required).
// ACTIVE: tabs use an underline (confirmed), date pills use filled-lime
// (confirmed). Day-of-week filtering was removed by explicit instruction.
export function EventFilterBar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  onSearchSubmit,
  activeDateFilter,
  onDateFilterChange,
}: EventFilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Horizontally scrollable rather than wrapped — with 3 tab labels
          this can exceed narrow phone widths; scrolling avoids both page
          overflow and an awkward multi-row underline tab bar. */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {/* Mobile is 15px (text-[15px]); sm: restores the original
            text-sm (14px) so tablet/desktop stay exactly as they were. */}
        <div className="flex w-max gap-6 border-b border-border font-display text-[15px] uppercase tracking-wide sm:w-auto sm:text-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`-mb-px whitespace-nowrap border-b-2 py-3 ${
                activeTab === tab.id ? "border-lime" : "border-transparent text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: search on the left, date filters on the right, one row.
          Mobile: stacks naturally (flex-col), each control staying
          full-width and usable rather than squeezing together. */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            onSearchSubmit();
          }}
          className="flex gap-2"
        >
          <label htmlFor="event-search" className="sr-only">
            What event are you looking for?
          </label>
          <input
            id="event-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="What event are you looking for?"
            className="w-full max-w-sm border border-border px-4 py-2 text-sm focus:border-lime focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search events"
            className="flex items-center justify-center bg-lime px-4 py-2"
          >
            {/* Real project asset (public/assets/images/all/search-icon.svg) */}
            <Image src="/assets/images/all/search-icon.svg" alt="" width={16} height={16} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {DATE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => onDateFilterChange(filter.id)}
              aria-pressed={activeDateFilter === filter.id}
              className={`px-4 py-2 ${FILTER_TAB_CLASSES} ${
                activeDateFilter === filter.id
                  ? "bg-lime text-lime-foreground"
                  : "border border-border text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <label
            className={`flex items-center gap-2 border border-border px-4 py-2 ${FILTER_TAB_CLASSES}`}
          >
            Select Date
            <input
              type="date"
              onChange={(event) => onDateFilterChange(event.target.value)}
              className="bg-transparent"
              aria-label="Select a specific date"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
