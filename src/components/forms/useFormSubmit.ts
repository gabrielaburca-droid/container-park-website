"use client";

import { useState, type FormEvent } from "react";
import { submitForm, type FormSubmitResult } from "@/lib/forms/submit";

export type FormStatus = "idle" | "submitting" | "success" | "error";

// Shared submit/validation/status handling for every form in the project.
// Native HTML5 validation (required/type=email/etc. on the fields) runs
// automatically before onSubmit fires — no custom validation library is
// used, matching "sensible minimal implementation."
export function useFormSubmit(formName: string) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<FormSubmitResult> {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const result = await submitForm(formName, payload);
    setStatus(result.success ? "success" : "error");
    return result;
  }

  return { status, handleSubmit };
}
