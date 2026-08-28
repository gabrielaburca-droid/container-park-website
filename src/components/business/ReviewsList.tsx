import { ReviewCard, type Review } from "./ReviewCard";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="bg-[#FCFCFC] p-6 text-sm text-muted">No reviews yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
}
