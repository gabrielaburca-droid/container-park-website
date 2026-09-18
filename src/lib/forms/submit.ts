"use server";

import {
  addTagToContact,
  isActiveCampaignConfigured,
  subscribeContactToList,
  upsertContact,
} from "@/lib/activecampaign/client";

export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

// Single seam for connecting a real provider per form. Contact/Group
// Events/Leasing are inquiry/transactional forms and still need a
// transactional email provider (not chosen yet, see CLAUDE.md) — they
// fall through to the same log-only stub as before. The newsletter
// ("Join the VIP List") form is the one confirmed ActiveCampaign use case
// (client feedback: marketing list signup, account username
// "verycreative") — see src/lib/activecampaign/client.ts. Contact/Leasing/
// Group Events are deliberately NOT wired to ActiveCampaign: none of them
// collect marketing consent, only inquiry details.
//
// This file starts with "use server", making every export a Server
// Action: Next.js strips the implementation — including the
// ActiveCampaign client it imports and its env-var-sourced credentials —
// out of the client bundle and calls it over the network instead, so the
// browser never receives the API key. See node_modules/next/dist/docs/
// 01-app/02-guides/server-actions.md ("Security").
export async function submitForm(
  formName: string,
  payload: Record<string, unknown>
): Promise<FormSubmitResult> {
  if (formName === "newsletter") {
    return submitNewsletterForm(payload);
  }

  // TODO: CONNECT PROVIDER — replace with a real transactional-email
  // request (e.g. Resend/SendGrid) once a provider is chosen.
  if (process.env.NODE_ENV !== "production") {
    console.info(`[form:${formName}] submission (no provider connected yet)`, payload);
  }
  return { success: true };
}

async function submitNewsletterForm(payload: Record<string, unknown>): Promise<FormSubmitResult> {
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  if (!isActiveCampaignConfigured()) {
    // No ActiveCampaign account is connected yet (ACTIVE_CAMPAIGN_API_URL/
    // ACTIVE_CAMPAIGN_API_KEY unset) — matches this project's existing
    // "fail safely" fallback pattern (see CLAUDE.md's Sanity fetch rule)
    // rather than breaking the newsletter form before real credentials
    // exist. Intentionally not logging the email here.
    if (process.env.NODE_ENV !== "production") {
      console.info("[form:newsletter] ActiveCampaign is not configured — skipping submission");
    }
    return { success: true };
  }

  try {
    const contact = await upsertContact({ email });

    // Reproduces the old site's confirmed result state (its AC-hosted
    // "CP Homepage Form", Form ID 10, which the front end never referenced
    // directly — see the ActiveCampaign integration investigation) by
    // applying the same List + Tag via the REST API instead: List 3
    // ("DTP Master") + Tag 8 ("Container Park") in production. Both are
    // optional here only because no real ActiveCampaign account is
    // connected in this environment yet — production sets both env vars.
    const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID;
    if (listId) {
      await subscribeContactToList(contact.id, listId);
    }

    const tagId = process.env.ACTIVE_CAMPAIGN_TAG_ID;
    if (tagId) {
      await addTagToContact(contact.id, tagId);
    }

    return { success: true };
  } catch (error) {
    // Log only a short, non-sensitive message (path + HTTP status, no
    // Api-Token, no email) — never the raw error/response body.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[form:newsletter] ActiveCampaign submission failed:",
        error instanceof Error ? error.message : "unknown error"
      );
    }
    return { success: false, error: "Something went wrong — please try again." };
  }
}
