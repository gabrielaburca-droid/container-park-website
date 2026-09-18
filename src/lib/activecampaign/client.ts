// Minimal server-only ActiveCampaign API v3 client. Credentials come from
// environment variables only (never hardcoded, never NEXT_PUBLIC_).
//
// IMPORTANT: only import this from server-only code (a "use server" Server
// Action, a Route Handler, or a Server Component) — never from a "use
// client" component. This project doesn't have the `server-only` package
// installed to enforce that at build time, so it's enforced by convention:
// the sole importer is src/lib/forms/submit.ts, a "use server" module whose
// function bodies Next.js already strips from client bundles by design
// (see node_modules/next/dist/docs/01-app/02-guides/server-actions.md).
//
// Scope is deliberately minimal — create/update a contact, and optionally
// add it to a marketing list. There is no real ActiveCampaign account
// connected yet (no API URL/key, no list ID), so nothing here has been
// exercised against the live API — see CLAUDE.md's "never invent" rule:
// no list ID, form ID, or automation ID is assumed or hardcoded.

interface ActiveCampaignConfig {
  apiUrl: string;
  apiKey: string;
}

function getConfig(): ActiveCampaignConfig | null {
  const apiUrl = process.env.ACTIVE_CAMPAIGN_API_URL;
  const apiKey = process.env.ACTIVE_CAMPAIGN_API_KEY;
  if (!apiUrl || !apiKey) return null;
  return { apiUrl: apiUrl.replace(/\/+$/, ""), apiKey };
}

// True once the two required env vars are present — lets callers no-op
// gracefully (matching this project's "fail safely, not silently" fetch
// philosophy — see CLAUDE.md) while no ActiveCampaign account is wired up.
export function isActiveCampaignConfigured(): boolean {
  return getConfig() !== null;
}

async function acRequest<T>(path: string, init: RequestInit): Promise<T> {
  const config = getConfig();
  if (!config) {
    throw new Error("ActiveCampaign is not configured (missing API URL/key)");
  }

  const response = await fetch(`${config.apiUrl}/api/3${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Api-Token": config.apiKey,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    // Deliberately not logging headers/body here — could contain the
    // Api-Token on the request side or contact PII on the response side.
    throw new Error(`ActiveCampaign request to ${path} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export interface ActiveCampaignContactFields {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface ContactSyncResponse {
  contact: { id: string };
}

// Create-or-update a contact by email (ActiveCampaign's own upsert
// endpoint — safe to call on every newsletter submission without needing
// to track whether the contact already exists).
export async function upsertContact(fields: ActiveCampaignContactFields): Promise<{ id: string }> {
  const data = await acRequest<ContactSyncResponse>("/contact/sync", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        email: fields.email,
        firstName: fields.firstName,
        lastName: fields.lastName,
        phone: fields.phone,
      },
    }),
  });
  return { id: data.contact.id };
}

// Subscribes an existing contact to a list. `status: 1` is ActiveCampaign's
// own API value for "active" (2 is "unsubscribed") — not a value invented
// here, part of the documented contactLists resource.
export async function subscribeContactToList(contactId: string, listId: string): Promise<void> {
  await acRequest("/contactLists", {
    method: "POST",
    body: JSON.stringify({
      contactList: {
        list: listId,
        contact: contactId,
        status: 1,
      },
    }),
  });
}

// Associates an existing tag with a contact (the documented contactTags
// resource — `tag` here is an existing tag's numeric ID, not a tag name;
// this call does not create tags, only applies one that already exists).
export async function addTagToContact(contactId: string, tagId: string): Promise<void> {
  await acRequest("/contactTags", {
    method: "POST",
    body: JSON.stringify({
      contactTag: {
        contact: contactId,
        tag: tagId,
      },
    }),
  });
}
