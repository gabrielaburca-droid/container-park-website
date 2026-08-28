import { FILTER_TAB_CLASSES } from "@/lib/ui/typography";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

// Sort options are wired up per-page (see ListingTemplate.tsx's
// SORT_OPTIONS + sorting logic) — this component is just the control.
// Typography reuses FILTER_TAB_CLASSES, the same constant
// CategoryFilterPills uses, so "Sort by" stays visually consistent with
// the filter pills next to it rather than a second, slightly-different
// label style.
export function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  return (
    <div>
      <label htmlFor="sort-by" className="sr-only">
        Sort by
      </label>
      <select
        id="sort-by"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`border border-border bg-white px-4 py-2 ${FILTER_TAB_CLASSES}`}
      >
        <option value="">Sort by</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
