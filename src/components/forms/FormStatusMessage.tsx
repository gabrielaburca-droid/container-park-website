import type { FormStatus } from "./useFormSubmit";

interface FormStatusMessageProps {
  status: FormStatus;
  successMessage?: string;
}

export function FormStatusMessage({
  status,
  successMessage = "Thanks — we'll be in touch soon.",
}: FormStatusMessageProps) {
  if (status === "idle" || status === "submitting") return null;

  return (
    <p role="status" aria-live="polite" className="text-sm font-semibold">
      {status === "success" ? (
        successMessage
      ) : (
        <span className="text-status-closed">Something went wrong — please try again.</span>
      )}
    </p>
  );
}
