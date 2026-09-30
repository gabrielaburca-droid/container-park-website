import type { FormStatus } from "./useFormSubmit";

interface FormStatusMessageProps {
  status: FormStatus;
  successMessage?: string;
  /** Specific reason to show instead of the generic error line, when the
   * form has one (e.g. Group Events' Tripleseat validation messages). */
  errorMessage?: string;
}

export function FormStatusMessage({
  status,
  successMessage = "Thanks — we'll be in touch soon.",
  errorMessage,
}: FormStatusMessageProps) {
  if (status === "idle" || status === "submitting") return null;

  return (
    <p role="status" aria-live="polite" className="text-sm font-semibold">
      {status === "success" ? (
        successMessage
      ) : (
        <span className="text-status-closed">
          {errorMessage || "Something went wrong — please try again."}
        </span>
      )}
    </p>
  );
}
