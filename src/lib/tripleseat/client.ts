// Tripleseat lead submission for the Group Events ("Book an Event") form.
// Same endpoint, lead form and field names as the Tripleseat widget embedded
// on the live /book-an-event/ page (api.tripleseat.com/v1/leads/
// ts_script.js?lead_form_id=13110) — this posts the visitor's answers to it
// from the server instead of loading that widget's own markup.
//
// Server-side only: imported solely by the "use server" action in
// src/lib/forms/submit.ts. The lead form id and public key below are the
// ones already published in the live page's HTML (Tripleseat's "public
// key" is an embed identifier, not a secret); both can be overridden with
// TRIPLESEAT_LEAD_FORM_ID / TRIPLESEAT_PUBLIC_KEY.

const LEADS_ENDPOINT = "https://api.tripleseat.com/v1/leads/create.js";
const DEFAULT_LEAD_FORM_ID = "13110";
const DEFAULT_PUBLIC_KEY = "8ea369e35ab994c04c536bee09d3baff22b97c58";

export type TripleseatResult =
  { ok: true; leadId?: number | string } | { ok: false; errors: string[] };

interface TripleseatResponse {
  errors?: Record<string, string[]>;
  booking_event_errors?: Record<string, string[]>[];
  success_message?: string;
  lead_id?: number | string;
}

// Tripleseat's own validation messages, e.g. { "First Name": ["can't be
// blank"] } -> "First Name can't be blank". "Base" is its form-level key
// (used for the robot check), shown without a field prefix.
function flattenErrors(response: TripleseatResponse): string[] {
  const messages: string[] = [];
  for (const [field, fieldMessages] of Object.entries(response.errors ?? {})) {
    for (const message of fieldMessages) {
      messages.push(field === "Base" ? message : `${field} ${message}`);
    }
  }
  for (const eventErrors of response.booking_event_errors ?? []) {
    for (const [field, fieldMessages] of Object.entries(eventErrors)) {
      for (const message of fieldMessages) {
        messages.push(`${field.replace(/_/g, " ")} ${message}`);
      }
    }
  }
  return messages;
}

// `fields` are already-named Tripleseat params ("lead[first_name]", ...,
// plus "g-recaptcha-response"). Resolves ok only when Tripleseat itself
// confirms the lead was created; throws on a network/HTTP/parse failure so
// the caller can treat that as a failed submission too.
export async function submitTripleseatLead(
  fields: Record<string, string>
): Promise<TripleseatResult> {
  const query = new URLSearchParams({
    lead_form_id: process.env.TRIPLESEAT_LEAD_FORM_ID || DEFAULT_LEAD_FORM_ID,
    public_key: process.env.TRIPLESEAT_PUBLIC_KEY || DEFAULT_PUBLIC_KEY,
  });

  const response = await fetch(`${LEADS_ENDPOINT}?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams(fields).toString(),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Tripleseat lead request failed: ${response.status}`);
  }

  const data = JSON.parse(await response.text()) as TripleseatResponse;
  const errors = flattenErrors(data);
  if (data.errors || errors.length > 0) {
    return { ok: false, errors };
  }
  // No errors is not enough on its own — only a response that actually
  // carries Tripleseat's confirmation counts as a created lead.
  if (data.lead_id === undefined && !data.success_message) {
    throw new Error("Tripleseat lead response had no confirmation");
  }
  return { ok: true, leadId: data.lead_id };
}
