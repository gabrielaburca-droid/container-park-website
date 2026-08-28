// Client-side-only vote persistence for review reactions (see
// business/ReviewReactions.tsx). Deliberately NOT a real backend: this
// project's approved tech stack has no database and no `review` Sanity
// schema yet (see CLAUDE.md), and no live Sanity project is connected in
// this phase either — so there's nowhere server-side to write a real,
// IP-scoped vote to right now. This is the explicitly-agreed interim: an
// anonymous visitor id + each review's chosen reaction, both kept in this
// browser's localStorage, so a refresh doesn't reset the restriction (the
// literal bar asked for) — it does NOT stop the same person voting again
// from a different browser/device/incognito window, and it is not a real
// IP-based limit. Swapping this module's three functions for real API
// calls is the whole migration path once a real backend exists.
export type ReactionKey = "interesting" | "lol" | "love";

const VISITOR_ID_KEY = "dcp_visitor_id";
const REACTIONS_KEY = "dcp_review_reactions";

type ReactionStore = Record<string, Partial<Record<string, ReactionKey>>>;

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    // Storage unavailable (private browsing, disabled storage, etc.) — a
    // shared fallback id still lets voting work for this page view, it
    // just won't persist across a refresh. Never throws past this point.
    return "anonymous";
  }
}

function readStore(): ReactionStore {
  try {
    const raw = localStorage.getItem(REACTIONS_KEY);
    return raw ? (JSON.parse(raw) as ReactionStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: ReactionStore): void {
  try {
    localStorage.setItem(REACTIONS_KEY, JSON.stringify(store));
  } catch {
    // Storage full/unavailable — the click still updates in-memory React
    // state for this session, it just won't survive a refresh.
  }
}

/** This browser's current reaction for a review, or null if none. */
export function getMyReaction(reviewId: string): ReactionKey | null {
  const store = readStore();
  return store[getVisitorId()]?.[reviewId] ?? null;
}

/** Sets (or, with null, clears) this browser's reaction for a review. */
export function setMyReaction(reviewId: string, reaction: ReactionKey | null): void {
  const visitorId = getVisitorId();
  const store = readStore();
  const mine = { ...(store[visitorId] ?? {}) };
  if (reaction === null) {
    delete mine[reviewId];
  } else {
    mine[reviewId] = reaction;
  }
  store[visitorId] = mine;
  writeStore(store);
}
