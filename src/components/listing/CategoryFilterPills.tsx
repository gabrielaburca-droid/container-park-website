import { FILTER_TAB_CLASSES } from "@/lib/ui/typography";

export interface FilterPillOption {
  id: string;
  label: string;
  /** business.tags value this pill filters by; omit to mean "show all". */
  tagMatch?: string;
}

interface CategoryFilterPillsProps {
  options: FilterPillOption[];
  activeId: string;
  onSelect: (id: string) => void;
}

// Byte-for-byte the same pill styling as the Homepage Events filter (see
// home/HomeEventsSection.tsx's DATE_FILTERS buttons) — same FILTER_TAB_CLASSES
// constant, same px-5 py-2.5 padding, same active (bg-lime) / inactive
// (border-foreground) treatment — so the two stay in sync automatically
// rather than two copies that can silently drift apart. Neither has a
// hover state defined (matching HomeEventsSection, which also has none).
export function CategoryFilterPills({ options, activeId, onSelect }: CategoryFilterPillsProps) {
  return (
    // Mobile: the outer div is the scroll container (no-scrollbar hides the
    // native scrollbar visually, scrolling itself is untouched) and the
    // <ul> is w-max so it takes its full intrinsic content width instead of
    // being squeezed to the container width — that's what forces a single
    // row instead of wrapping. sm+: reverts to the original flex-wrap
    // layout untouched (w-auto/flex-wrap/overflow-visible).
    <div className="no-scrollbar w-full overflow-x-auto sm:w-auto sm:overflow-visible">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap" role="list">
        {options.map((option) => {
          const isActive = option.id === activeId;
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                aria-pressed={isActive}
                className={`px-5 py-2.5 ${FILTER_TAB_CLASSES} whitespace-nowrap ${
                  isActive ? "bg-lime text-lime-foreground" : "border border-foreground"
                }`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
