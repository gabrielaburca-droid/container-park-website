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

// ACTIVE: filled lime = active, outlined = inactive — confirmed visually in
// the Shop listing export.
// HOVER: NEEDS CONFIRMATION — not implemented.
export function CategoryFilterPills({ options, activeId, onSelect }: CategoryFilterPillsProps) {
  return (
    <ul className="flex flex-wrap gap-2" role="list">
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isActive}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wide ${
                isActive ? "bg-lime text-lime-foreground" : "border border-border text-foreground"
              }`}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
