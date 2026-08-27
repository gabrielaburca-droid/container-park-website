"use client";

import { TextField, TextareaField, SelectField } from "./fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { FormStatusMessage } from "./FormStatusMessage";

// Date/time fields use native browser inputs — no custom picker exists in
// the project and none was requested. "How did you hear about us?" options
// are intentionally empty (see SelectField).
export function LeasingInquiryForm() {
  const { status, handleSubmit } = useFormSubmit("leasing");

  return (
    <form onSubmit={handleSubmit} className="space-y-8 border border-border bg-white p-6">
      <div>
        <h3 className="font-display text-xl uppercase">Send Us an Inquiry</h3>
        <p className="mt-1 text-sm text-muted">
          Birthdays, corporate buyouts, weddings, and everything in between. Tell us what
          you&apos;re planning — we&apos;ll take it from there.
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className="text-xs font-medium uppercase tracking-wide">
          Your Contact Information
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="First Name" name="firstName" required />
          <TextField label="Last Name" name="lastName" required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Contact Number" name="phone" type="tel" required />
          <TextField label="Email Address" name="email" type="email" required />
        </div>
        <TextField label="Company Name" name="company" required />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xs font-medium uppercase tracking-wide">Your Booking Details</legend>
        <TextField
          label="Nature of this Booking (e.g., Conference, Wedding)"
          name="bookingNature"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Arriving On" name="arrivingOn" type="date" />
          <TextField label="Departing On" name="departingOn" type="date" />
        </div>
        <TextareaField
          label="Is there any additional information you would like to add?"
          name="bookingNotes"
        />
        <SelectField label="How did you hear about us?" name="referralSource" options={[]} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xs font-medium uppercase tracking-wide">Your Event Details</legend>
        <TextField
          label="Nature of this Event (e.g., Birthday Party or Business Dinner)"
          name="eventNature"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label="Event Date" name="eventDate" type="date" />
          <TextField label="Start time" name="startTime" type="time" />
          <TextField label="End time" name="endTime" type="time" />
        </div>
        <TextField label="Number of People" name="guestCount" type="number" />
      </fieldset>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </Button>
      <FormStatusMessage status={status} />
    </form>
  );
}
