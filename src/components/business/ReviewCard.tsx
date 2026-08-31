import Image from "next/image";
import { ReviewReactions } from "./ReviewReactions";

export interface Review {
  id: string;
  authorName: string;
  date: string;
  /** Optional — a small number of real reviews on the live site show no
   * star rating at all (the reviewer never selected one); an honest
   * "unrated" omits the star row below rather than guessing a value. */
  rating?: number;
  title: string;
  body: string;
  reactions?: { interesting: number; lol: number; love: number };
}

// CLICK: the reaction row (see ReviewReactions.tsx) is real, working
// client-side state — each click bumps that review's own count
// immediately, no page reload. It's still not persisted anywhere (no
// `review` Sanity schema or public-write backend yet — see CLAUDE.md); the
// counts shown are real, scraped starting values from the live site, only
// mutated in the browser from here.
export function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="bg-[#FCFCFC] p-6">
      {/* Below 370px the star rating drops onto its own line under the
          name/date block instead of squeezing onto the same row (CSS-only
          via Tailwind's arbitrary `min-[370px]:` breakpoint, not JS) — at
          370px and up this is byte-identical to the original single-row
          layout. */}
      <div className="flex flex-col items-start gap-1 min-[370px]:flex-row min-[370px]:justify-between min-[370px]:gap-4">
        <div className="flex items-center gap-3">
          {/* Real project asset (public/assets/images/all/user.svg) — a
              generic reviewer avatar, not a specific person's photo (the
              data source has no per-reviewer image), same role as e.g.
              ui/MapPlaceholder's pin icon. */}
          <Image
            src="/assets/images/all/user.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{review.authorName}</p>
            <p className="text-xs text-muted">{review.date}</p>
          </div>
        </div>
        {typeof review.rating === "number" && (
          <p className="shrink-0 text-rating" aria-label={`${review.rating} out of 5 stars`}>
            <span aria-hidden="true">
              {"★".repeat(Math.round(review.rating))}
              {"☆".repeat(5 - Math.round(review.rating))}
            </span>
          </p>
        )}
      </div>
      {/* normal-case overrides the sitewide h1-h6 uppercase default (see
          globals.css) — review titles are real, verbatim user-submitted
          text, not a UI label, so they must render in their original
          case, not forced uppercase. */}
      <h4 className="mt-4 font-sans font-bold normal-case">{review.title}</h4>
      <p className="mt-2 text-sm text-muted">{review.body}</p>
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-sm font-bold">Was this review …?</p>
        <ReviewReactions reviewId={review.id} reactions={review.reactions} />
      </div>
    </li>
  );
}
