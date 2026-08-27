interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

// TODO: NEEDS CONFIRMATION — no sort options were shown open in the source
// design; `options` is passed in empty from ListingTemplate until real
// values are confirmed. Selecting a value currently has no effect on the
// grid (see ListingTemplate).
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
        className="border border-border bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide"
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
