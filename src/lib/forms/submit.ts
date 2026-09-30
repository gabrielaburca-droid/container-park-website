"use server";

import {
  addTagToContact,
  isActiveCampaignConfigured,
  subscribeContactToList,
  upsertContact,
} from "@/lib/activecampaign/client";
import { isEmailConfigured, sendInquiryEmail, type InquiryEmail } from "@/lib/email/client";
import { submitTripleseatLead } from "@/lib/tripleseat/client";

export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

// Single seam for connecting a real provider per form. Contact and Leasing
// send a plain-text notification email to info@containerpark.com via
// Resend (see src/lib/email/client.ts). Group Events posts a real lead to
// Tripleseat, the same lead form the live site uses (see
// src/lib/tripleseat/client.ts). The newsletter
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

  if (formName === "contact" || formName === "leasing") {
    return submitInquiryEmail(formName, payload);
  }

  if (formName === "group-event") {
    return submitGroupEventLead(payload);
  }

  // TODO: CONNECT PROVIDER — replace with a real transactional-email
  // request (e.g. Resend/SendGrid) once a provider is chosen.
  if (process.env.NODE_ENV !== "production") {
    console.info(`[form:${formName}] submission (no provider connected yet)`, payload);
  }
  return { success: true };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(payload: Record<string, unknown>, name: string, maxLength = 200): string {
  const value = payload[name];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

// Header-bound values (subject) must not carry line breaks.
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

// Builds the notification email from each form's existing field names
// (see ContactForm.tsx / LeasingInquiryForm.tsx), re-checking server-side
// the same required/email rules the browser already enforces natively.
function buildInquiryEmail(
  formName: "contact" | "leasing",
  payload: Record<string, unknown>
): InquiryEmail | null {
  if (formName === "contact") {
    const name = field(payload, "firstName");
    const email = field(payload, "email");
    const message = field(payload, "message", 5000);
    if (!name || !EMAIL_PATTERN.test(email)) return null;
    return {
      subject: singleLine(`Website contact form: ${name}`),
      replyTo: email,
      text: [
        `First Name: ${name}`,
        `Email Address: ${email}`,
        "",
        "Additional information:",
        message || "(none)",
      ].join("\n"),
    };
  }

  const name = field(payload, "your-name");
  const email = field(payload, "email-add");
  const phone = field(payload, "phone-number", 50);
  const company = field(payload, "company");
  if (!name || !EMAIL_PATTERN.test(email) || !phone || !company) return null;
  return {
    subject: singleLine(`Website leasing inquiry: ${name} (${company})`),
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email Address: ${email}`,
      `Contact Number: ${phone}`,
      `Company Name: ${company}`,
    ].join("\n"),
  };
}

async function submitInquiryEmail(
  formName: "contact" | "leasing",
  payload: Record<string, unknown>
): Promise<FormSubmitResult> {
  const inquiry = buildInquiryEmail(formName, payload);
  if (!inquiry) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!isEmailConfigured()) {
    // Locally, keep the existing log-only stub so the form stays usable
    // without a Resend API key. In production, never tell a visitor their
    // inquiry was sent when it was silently dropped — surface the form's
    // normal error state and log the misconfiguration instead.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[form:${formName}] Resend is not configured — email not sent`, inquiry);
      return { success: true };
    }
    console.error(`[form:${formName}] Resend is not configured — inquiry email not sent`);
    return { success: false, error: "Something went wrong — please try again." };
  }

  try {
    await sendInquiryEmail(inquiry);
    return { success: true };
  } catch (error) {
    // Short message only — never the submitted data or the API key.
    console.error(
      `[form:${formName}] inquiry email failed:`,
      error instanceof Error ? error.message : "unknown error"
    );
    return { success: false, error: "Something went wrong — please try again." };
  }
}

const GENERIC_ERROR = "Something went wrong — please try again.";

// Native <input type="date"> value (YYYY-MM-DD) -> the mm/dd/yyyy the
// Tripleseat lead form itself submits.
function toTripleseatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[2]}/${match[3]}/${match[1]}` : value;
}

// Native <input type="time"> value (HH:MM, 24h) -> Tripleseat's own time
// format, e.g. "18:00" -> "6:00pm".
function toTripleseatTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  return `${hours % 12 || 12}:${match[2]}${hours >= 12 ? "pm" : "am"}`;
}

// Group Events: every "lead[...]" field from GroupEventForm.tsx (named
// after Tripleseat's own params) is forwarded to Tripleseat along with the
// visitor's reCAPTCHA answer, which Tripleseat requires for this lead form.
// Success is returned ONLY when Tripleseat confirms it created the lead —
// a validation error, failed robot check, network error or unexpected
// response all surface the form's error state instead.
async function submitGroupEventLead(payload: Record<string, unknown>): Promise<FormSubmitResult> {
  const firstName = field(payload, "lead[first_name]");
  const lastName = field(payload, "lead[last_name]");
  const email = field(payload, "lead[email_address]");
  const phone = field(payload, "lead[phone_number]", 50);
  if (!firstName || !lastName || !EMAIL_PATTERN.test(email) || !phone) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const recaptchaResponse = field(payload, "g-recaptcha-response", 4000);
  if (!recaptchaResponse) {
    return { success: false, error: "Please confirm you're not a robot." };
  }

  const eventsNeeded = Boolean(payload["lead[booking_events_needed]"]);
  const fields: Record<string, string> = { "g-recaptcha-response": recaptchaResponse };
  for (const name of Object.keys(payload)) {
    if (!name.startsWith("lead[") || name === "lead[booking_events_needed]") continue;
    const isEventField = name.startsWith("lead[lead_booking_events_attributes]");
    if (isEventField && !eventsNeeded) continue;
    let value = field(payload, name, 5000);
    if (name.endsWith("_date]")) value = toTripleseatDate(value);
    if (name.endsWith("_time]")) value = toTripleseatTime(value);
    fields[name] = value;
  }
  fields["lead[booking_events_needed]"] = eventsNeeded ? "1" : "0";

  try {
    const result = await submitTripleseatLead(fields);
    if (result.ok) {
      return { success: true };
    }
    // Tripleseat's own visitor-facing validation messages (e.g. "Phone
    // Number can't be blank") — no submitted data.
    console.error("[form:group-event] Tripleseat rejected the lead:", result.errors.join("; "));
    return { success: false, error: result.errors.join(" ") || GENERIC_ERROR };
  } catch (error) {
    // Short message only — never the submitted data.
    console.error(
      "[form:group-event] Tripleseat submission failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return { success: false, error: GENERIC_ERROR };
  }
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
