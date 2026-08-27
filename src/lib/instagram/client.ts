// Instagram Graph API config — mirrors src/lib/sanity/client.ts's
// isConfigured pattern. A business/creator Instagram account only exposes
// its media through the Graph API with a long-lived access token tied to
// that account's numeric user id; there's no key-less public endpoint, so
// until real credentials exist this stays unconfigured and callers fall
// back to placeholder content rather than guessing a request that would
// just fail.
export const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
export const instagramUserId = process.env.INSTAGRAM_USER_ID;

export const isInstagramConfigured = Boolean(instagramAccessToken && instagramUserId);

export const INSTAGRAM_GRAPH_API_VERSION = "v19.0";
