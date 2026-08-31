"use client";

import { TextField, TextareaField } from "./fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { FormStatusMessage } from "./FormStatusMessage";

export function ContactForm() {
  const { status, handleSubmit } = useFormSubmit("contact");

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-white p-6 sm:p-8">
      <h3 className="font-display text-xl uppercase lg:text-[28px]">
        We&apos;d Love to Hear From You
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="First Name" name="firstName" required />
        <TextField label="Email Address" name="email" type="email" required />
      </div>
      <TextareaField
        label="Is there any additional information you would like to add?"
        name="message"
      />
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      <FormStatusMessage status={status} />
    </form>
  );
}
