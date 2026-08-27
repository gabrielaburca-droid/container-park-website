interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Implementation strategy (client-side vs. server-side vs. URL-based) is
// NEEDS CONFIRMATION — implemented here as client-side paging over an
// already-fetched list, the simplest option given the current data layer.
// ACTIVE: current page is visually distinct (confirmed).
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-11 w-11 items-center justify-center border border-border disabled:opacity-40"
      >
        <span aria-hidden="true">◀</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-11 w-11 items-center justify-center border ${
            page === currentPage ? "border-lime bg-lime text-lime-foreground" : "border-border"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-11 w-11 items-center justify-center border border-border disabled:opacity-40"
      >
        <span aria-hidden="true">▶</span>
      </button>
    </nav>
  );
}
