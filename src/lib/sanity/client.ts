import { createClient, type ClientConfig } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

const config: ClientConfig = {
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

/**
 * Wraps sanityClient.fetch with two distinct failure modes:
 * - no project configured yet -> return the fallback silently (expected
 *   during the empty-content phase of this project).
 * - a real query/config error against a configured project -> rethrow in
 *   development so it's visible, only swallow-and-log in production.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      throw error;
    }
    console.error("Sanity query failed:", error);
    return fallback;
  }
}
