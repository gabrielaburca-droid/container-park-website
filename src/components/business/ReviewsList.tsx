import { ReviewCard, type Review } from "./ReviewCard";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted">No reviews yet.</p>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
}
