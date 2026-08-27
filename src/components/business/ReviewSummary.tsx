interface ReviewSummaryProps {
  businessName: string;
  rating: number;
  reviewCount: number;
}

export function ReviewSummary({ businessName, rating, reviewCount }: ReviewSummaryProps) {
  return (
    <div>
      <h2 className="font-display text-xl uppercase">
        {reviewCount} Review{reviewCount === 1 ? "" : "s"} for {businessName}
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm">
        <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
        <span className="text-rating" aria-hidden="true">
          {"★".repeat(Math.round(rating))}
          {"☆".repeat(5 - Math.round(rating))}
        </span>
        <span className="text-muted">
          based on {reviewCount} review{reviewCount === 1 ? "" : "s"}
        </span>
      </p>
    </div>
  );
}
