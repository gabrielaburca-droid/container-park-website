import { Resend } from "resend";

// Transactional email for the Contact and Leasing inquiry forms, sent via
// Resend's official Node.js SDK. Server-side only: RESEND_API_KEY is a
// non-NEXT_PUBLIC_ env var, and this module is only ever imported from the
// "use server" action in src/lib/forms/submit.ts, so none of it reaches
// the client bundle.
//
// Required: RESEND_API_KEY.

// Client-confirmed recipient for both Contact and Leasing submissions.
export const INQUIRY_RECIPIENT = "info@containerpark.com";

// Must be on a domain verified in the Resend account.
const INQUIRY_SENDER = "Downtown Container Park <no-reply@downtowncontainerpark.com>";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface InquiryEmail {
  subject: string;
  replyTo: string;
  text: string;
}

// Plain-text only — submitted values are never interpolated into HTML.
export async function sendInquiryEmail({ subject, replyTo, text }: InquiryEmail): Promise<void> {
  // The SDK resolves with { error } rather than rejecting on an API
  // failure — rethrow so the caller's existing catch shows the form's
  // error state instead of reporting a send that never happened.
  const { error } = await getResend().emails.send({
    from: INQUIRY_SENDER,
    to: INQUIRY_RECIPIENT,
    replyTo,
    subject,
    text,
  });
  if (error) {
    throw new Error(`Resend ${error.name}: ${error.message}`);
  }
}
