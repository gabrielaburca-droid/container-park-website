"use client";

import { TextField, TextareaField } from "./fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { FormStatusMessage } from "./FormStatusMessage";

// NOTE: the live /book-an-event/ page actually embeds a third-party
// Tripleseat booking widget here, not a simple custom field set like this
// one. Replicating that is a real integration decision beyond this
// content+SEO migration phase's scope, so this form's existing field set
// (Name/Email/Phone/Company/Message) is kept as-is per instruction — see
// the migration report.
export function GroupEventForm() {
  const { status, handleSubmit } = useFormSubmit("group-event");

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-white p-6">
      <h3 className="font-display text-xl uppercase">Host Your Event at Container Park</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Name" name="name" required />
        <TextField label="Email Address" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Contact Number" name="phone" type="tel" required />
        <TextField label="Company Name" name="company" required />
      </div>
      <TextareaField label="Message" name="message" />
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
      <FormStatusMessage status={status} />
    </form>
  );
}
