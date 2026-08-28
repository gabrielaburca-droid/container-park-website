"use client";

import { useSyncExternalStore } from "react";
import { getMyReaction, setMyReaction, type ReactionKey } from "@/lib/business/reviewReactions";

interface ReviewReactionsProps {
  /** Unique per review — the localStorage key this browser's selection is
   * stored under (see lib/business/reviewReactions.ts). */
  reviewId: string;
  reactions?: Record<ReactionKey, number>;
}

// No dedicated icon assets exist for these three reactions (checked
// public/assets/images/all/) — reusing the project's existing pattern of a
// plain decorative emoji for small non-brand UI chrome where no asset
// exists (see ui/MapPlaceholder.tsx's 📍, events/EventFilterBar.tsx's 🔍)
// rather than inventing new SVG art. Labels are the real three reaction
// types from the live site's own review widget (Interesting/LOL/Love —
// see data/mock/reviews.ts), not invented ones like "Helpful"/"Not
// helpful", which don't exist in the real data this counts reflect.
const REACTIONS: {
  key: ReactionKey;
  label: string;
  icon: string;
  rest: string;
  selected: string;
}[] = [
  {
    key: "interesting",
    label: "Interesting",
    icon: "👍",
    rest: "border-sky-500 bg-white text-sky-600",
    selected: "border-sky-500 bg-sky-500 text-white",
  },
  {
    key: "lol",
    label: "LOL",
    icon: "😂",
    rest: "border-amber-500 bg-white text-amber-600",
    selected: "border-amber-500 bg-amber-500 text-white",
  },
  {
    key: "love",
    label: "Love",
    icon: "❤️",
    rest: "border-rose-400 bg-white text-rose-500",
    selected: "border-rose-400 bg-rose-400 text-white",
  },
];

// localStorage has no same-tab change event of its own (only 'storage',
// which only fires in OTHER tabs) — this custom event is dispatched right
// after every write (see handleClick below) so useSyncExternalStore's
// subscription actually re-reads and re-renders in the tab that made the
// change, not just other open tabs.
const REACTION_CHANGE_EVENT = "dcp-review-reaction-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(REACTION_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(REACTION_CHANGE_EVENT, onChange);
  };
}

function getServerSnapshot(): ReactionKey | null {
  return null;
}

// Client boundary kept as small as possible — just this reaction row, not
// the whole ReviewCard, so the review's own text/title/rating stay in the
// server-rendered tree (SEO/indexability unaffected by this being
// interactive).
//
// Exactly one reaction can be selected per review, per visitor (browser) —
// not a free-for-all increment counter:
//   - clicking the currently-selected reaction again clears it (-1)
//   - clicking a different reaction moves the vote (-1 old, +1 new)
//   - clicking with nothing selected yet just adds it (+1)
// The visible count is always the review's real starting count (never
// mutated — see data/mock/reviews.ts) plus 1 if THIS browser currently has
// that reaction selected, derived fresh on every render rather than stored
// as a separately-drifting number.
//
// `selected` is read via useSyncExternalStore — the React-sanctioned way
// to subscribe to state that lives outside React (localStorage here) —
// rather than useState+useEffect, which would call setState from inside an
// effect body (flagged by this project's react-hooks/set-state-in-effect
// rule; see ui/ImageLightbox.tsx for another case of the same fix
// elsewhere in this codebase). It also sidesteps any hydration-mismatch
// concern: getServerSnapshot always returns null (matching what the server
// rendered, since localStorage doesn't exist there), and the real
// localStorage value is read synchronously on the client's very first
// render — no post-mount flicker.
export function ReviewReactions({ reviewId, reactions }: ReviewReactionsProps) {
  const baseline: Record<ReactionKey, number> = {
    interesting: reactions?.interesting ?? 0,
    lol: reactions?.lol ?? 0,
    love: reactions?.love ?? 0,
  };

  const selected = useSyncExternalStore(
    subscribe,
    () => getMyReaction(reviewId),
    getServerSnapshot
  );

  function handleClick(key: ReactionKey) {
    const next = selected === key ? null : key;
    setMyReaction(reviewId, next);
    window.dispatchEvent(new Event(REACTION_CHANGE_EVENT));
  }

  return (
    <div className="mt-3 flex flex-wrap gap-3 text-xs">
      {REACTIONS.map((reaction) => {
        const isSelected = selected === reaction.key;
        const count = baseline[reaction.key] + (isSelected ? 1 : 0);
        return (
          <button
            key={reaction.key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => handleClick(reaction.key)}
            className={`flex h-10 w-28 items-center justify-center gap-1.5 border font-medium transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isSelected ? reaction.selected : `${reaction.rest} hover:bg-black/[0.03]`
            }`}
          >
            <span aria-hidden="true">{reaction.icon}</span>
            {reaction.label} {count}
          </button>
        );
      })}
    </div>
  );
}
