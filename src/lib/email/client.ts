import nodemailer from "nodemailer";

// Transactional email for the Contact and Leasing inquiry forms, sent over
// plain SMTP via nodemailer — no paid third-party email service. Works with
// whatever mailbox/relay the client provides (Google Workspace, Microsoft
// 365, their host's SMTP, etc.). Server-side only: every value below is a
// non-NEXT_PUBLIC_ env var, and this module is only ever imported from the
// "use server" action in src/lib/forms/submit.ts, so none of it reaches
// the client bundle.
//
// Required: SMTP_HOST, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM.
// Optional: SMTP_PORT (default 587), SMTP_SECURE ("true" for implicit TLS,
// typically port 465; default false = STARTTLS on 587).

// Client-confirmed recipient for both Contact and Leasing submissions.
export const INQUIRY_RECIPIENT = "info@containerpark.com";

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.EMAIL_FROM
  );
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export interface InquiryEmail {
  subject: string;
  replyTo: string;
  text: string;
}

// Plain-text only — submitted values are never interpolated into HTML.
export async function sendInquiryEmail({ subject, replyTo, text }: InquiryEmail): Promise<void> {
  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM,
    to: INQUIRY_RECIPIENT,
    replyTo,
    subject,
    text,
  });
}
