export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

// Single seam for connecting a real email/marketing provider later. No
// provider has been chosen yet (Contact/Group Events/Leasing forms need
// transactional email; Newsletter needs a marketing list provider — both
// still open decisions, see CLAUDE.md) — every form calls this same
// function, so wiring a provider is a one-file change, not a per-form one.
export async function submitForm(
  formName: string,
  payload: Record<string, unknown>
): Promise<FormSubmitResult> {
  // TODO: CONNECT PROVIDER — replace with a real request (e.g. POST to an
  // API route that calls Resend/SendGrid for transactional forms, or
  // Mailchimp/Klaviyo for the newsletter) once one is chosen.
  if (process.env.NODE_ENV !== "production") {
    console.info(`[form:${formName}] submission (no provider connected yet)`, payload);
  }
  return { success: true };
}
