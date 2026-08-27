import { INSTAGRAM_GRAPH_API_VERSION, instagramAccessToken, instagramUserId, isInstagramConfigured } from "./client";
import type { InstagramImage } from "./types";

const DEFAULT_LIMIT = 7;

interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
}

/**
 * Fetches the account's most recent posts from the live Instagram Graph
 * API. Fail-safe in the same two-mode shape as sanityFetch (see
 * src/lib/sanity/client.ts):
 * - no credentials configured yet -> return [] silently (expected while
 *   this project has no Instagram app/token set up, see CLAUDE.md) — the
 *   caller (InstagramStrip) renders its placeholder tiles in this case.
 * - a real request against configured credentials fails -> rethrow in
 *   development so it's visible, swallow-and-log in production.
 *
 * CAROUSEL_ALBUM posts are skipped: this media fields set doesn't return a
 * reliable cover image for them, and this project doesn't invent one.
 */
export async function getInstagramPosts(limit = DEFAULT_LIMIT): Promise<InstagramImage[]> {
  if (!isInstagramConfigured) {
    return [];
  }

  try {
    const url =
      `https://graph.facebook.com/${INSTAGRAM_GRAPH_API_VERSION}/${instagramUserId}/media` +
      `?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${limit}` +
      `&access_token=${instagramAccessToken}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Instagram Graph API request failed: ${response.status}`);
    }

    const { data } = (await response.json()) as { data: InstagramMediaItem[] };

    return data
      .filter((item) => item.media_type !== "CAROUSEL_ALBUM")
      .map((item) => ({
        url: (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) || "",
        alt: item.caption?.slice(0, 140) || "Downtown Container Park on Instagram",
        href: item.permalink,
      }))
      .filter((image) => image.url)
      .slice(0, limit);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      throw error;
    }
    console.error("Instagram query failed:", error);
    return [];
  }
}
