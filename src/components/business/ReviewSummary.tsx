import { SECTION_HEADING_CLASSES } from "@/lib/ui/typography";

interface ReviewSummaryProps {
  businessName: string;
  rating: number;
  reviewCount: number;
}

// H2 uses the sitewide SECTION_HEADING_CLASSES (52px desktop, line-height 1
// — see CLAUDE.md's global H2 rule), same constant every other major H2 on
// the site already reuses (e.g. MediaGallery, PlanYourVisitBar).
export function ReviewSummary({ businessName, rating, reviewCount }: ReviewSummaryProps) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASSES}>
        {reviewCount} Review{reviewCount === 1 ? "" : "s"} for {businessName}
      </h2>
      {/* No longer its own separate white box — this now lives inside the
          single shared white container (see templates/
          BusinessDetailTemplate.tsx), so just a divider here, not another
          background/padding layer. */}
      <div className="mt-4 flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="flex items-center gap-2 text-sm">
          <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
          <span className="text-xl text-rating" aria-hidden="true">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
          </span>
        </p>
        <span className="text-sm text-muted">
          based on {reviewCount} review{reviewCount === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
