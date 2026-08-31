"use client";

import { TextField } from "./fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { FormStatusMessage } from "./FormStatusMessage";

// REAL CONTENT — the live /leasing/ page's actual inquiry form is a
// 4-field Contact Form 7 form (Name, Email Address, Contact Number,
// Company Name; submit label "Send Inquiry"), not the larger
// booking-details form previously here (that field set — arrival/
// departure dates, event date/time, guest count — belonged to Group
// Events' real content, not Leasing's; it's never been reproduced here
// since it turned out to not be real Leasing content either, see the
// Group Events form's own note on why the live Tripleseat widget itself
// isn't replicated). Placeholders and the "250 ft²" note are transcribed
// verbatim from the live form's own markup.
export function LeasingInquiryForm() {
  const { status, handleSubmit } = useFormSubmit("leasing");

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8">
      <p className="text-sm text-muted">
        Please keep in mind that all available spaces in Downtown Container Park are approximately
        250 ft<sup>2</sup>.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Name" name="your-name" placeholder="Your Name" required />
        <TextField
          label="Email Address"
          name="email-add"
          type="email"
          placeholder="youremail@domain.com"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Contact Number"
          name="phone-number"
          type="tel"
          placeholder="123-456-789"
          required
        />
        <TextField
          label="Company Name"
          name="company"
          placeholder="Your Company Name"
          required
        />
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
      <FormStatusMessage status={status} />
    </form>
  );
}
