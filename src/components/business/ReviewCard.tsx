export interface Review {
  id: string;
  authorName: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  reactions?: { interesting: number; lol: number; love: number };
}

// CLICK: reaction buttons render as static, disabled counters — voting
// logic is intentionally NOT implemented. Reviews have no backing Sanity
// schema and no confirmed public-write/moderation model yet (major
// architecture gap, see CLAUDE.md / Figma spec).
export function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="border-b border-border py-6">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-8 w-8 shrink-0 rounded-full bg-lime" />
        <div>
          <p className="text-sm font-semibold">{review.authorName}</p>
          <p className="text-xs text-muted">{review.date}</p>
        </div>
      </div>
      <p className="mt-2 text-rating" aria-label={`${review.rating} out of 5 stars`}>
        <span aria-hidden="true">
          {"★".repeat(Math.round(review.rating))}
          {"☆".repeat(5 - Math.round(review.rating))}
        </span>
      </p>
      <h4 className="mt-2 font-sans font-semibold">{review.title}</h4>
      <p className="mt-1 text-sm text-muted">{review.body}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Not yet implemented — see CLAUDE.md reviews gap"
          className="border border-border px-3 py-1 opacity-60"
        >
          Interesting? {review.reactions?.interesting ?? 0}
        </button>
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Not yet implemented — see CLAUDE.md reviews gap"
          className="border border-border px-3 py-1 opacity-60"
        >
          LOL {review.reactions?.lol ?? 0}
        </button>
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Not yet implemented — see CLAUDE.md reviews gap"
          className="border border-border px-3 py-1 opacity-60"
        >
          Love {review.reactions?.love ?? 0}
        </button>
      </div>
    </li>
  );
}
