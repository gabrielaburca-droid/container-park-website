"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { TextField, TextareaField, SelectField } from "./fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { FormStatusMessage } from "./FormStatusMessage";
import { EYEBROW_CLASSES } from "@/lib/ui/typography";

// REAL CONTENT — the live /book-an-event/ page embeds a third-party
// Tripleseat lead form (lead_form_id=13110, injected client-side via
// api.tripleseat.com/v1/leads/ts_script.js — invisible to a plain HTML
// fetch, only found by rendering the page in a real browser). Every
// field/label/option/required-flag below is transcribed directly from
// that rendered widget's markup — nothing invented.
//
// Submissions go to that same Tripleseat lead form (see
// src/lib/forms/submit.ts -> src/lib/tripleseat/client.ts). Tripleseat
// rejects any lead without its reCAPTCHA answer, so the same "I'm not a
// robot" checkbox the live widget shows is rendered here too (see
// useRecaptcha below), along with the widget's "powered by Tripleseat"
// attribution. Every field, label, option, and the required/optional split
// matches the live widget.
//
// Two implementation choices favor this project's existing architecture
// over a byte-for-byte widget clone, per instruction ("preserve the
// existing project's functionality and architecture where possible"):
// date fields (Arriving On / Departing On / Event Date) use this
// project's existing native <input type="date"> convention rather than
// rebuilding Tripleseat's jQuery UI datepicker, and Start/End Time use
// native <input type="time"> (defaulted to the live widget's own real
// defaults, 6:00 PM / 9:00 PM) rather than its custom time-select widget.
// Field `name`s otherwise match the live form's real Rails-style
// attribute names (e.g. "lead[first_name]") for full parity — this
// project's generic submit handler doesn't care about naming convention.

const REFERRAL_OPTIONS = [
  { value: "7", label: "EventUp" },
  { value: "6", label: "Instagram" },
  { value: "5", label: "Facebook" },
  { value: "4", label: "Venues by Tripleseat" },
  { value: "3", label: "Search Engine" },
  { value: "2", label: "Email" },
  { value: "1", label: "Other" },
  { value: "1206", label: "Hotel" },
  { value: "1207", label: "DTP Events" },
];
// These three options show a "Please specify" textarea when selected,
// matching the live widget's `data-use_details="true"` options exactly.
const REFERRAL_OPTIONS_WITH_DETAILS = new Set(["1", "1206", "1207"]);

interface EventEntry {
  id: number;
}

// The reCAPTCHA site key Tripleseat's own lead-form widget uses (public —
// it is in the widget markup on the live page). The answer it produces is
// verified by Tripleseat, not by this project.
const RECAPTCHA_SITE_KEY = "6LeC4CkUAAAAAK39iB_y_XhgS1EhvArMwecdZmCr";
const RECAPTCHA_SCRIPT_ID = "tripleseat-recaptcha-script";
const RECAPTCHA_ONLOAD = "__tripleseatRecaptchaReady";

interface Recaptcha {
  render: (container: HTMLElement, options: { sitekey: string }) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
}

type RecaptchaWindow = Window & {
  grecaptcha?: Recaptcha;
  [RECAPTCHA_ONLOAD]?: () => void;
};

// Explicit render (not the script's auto-scan) so the checkbox also appears
// when this form mounts after a client-side navigation, when the script
// may already be loaded. The widget adds its own "g-recaptcha-response"
// field inside the container, so it is submitted with the form's other
// fields.
function useRecaptcha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    const win = window as RecaptchaWindow;

    function render() {
      if (!containerRef.current || widgetId.current !== null || !win.grecaptcha?.render) return;
      widgetId.current = win.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
      });
    }

    if (win.grecaptcha?.render) {
      render();
      return;
    }
    win[RECAPTCHA_ONLOAD] = render;
    if (!document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_ONLOAD}&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  function getResponse(): string {
    const recaptcha = (window as RecaptchaWindow).grecaptcha;
    return widgetId.current !== null && recaptcha ? recaptcha.getResponse(widgetId.current) : "";
  }

  // A reCAPTCHA answer can only be used once — clear it after every attempt.
  function reset() {
    const recaptcha = (window as RecaptchaWindow).grecaptcha;
    if (widgetId.current !== null && recaptcha) recaptcha.reset(widgetId.current);
  }

  return { containerRef, getResponse, reset };
}

export function GroupEventForm() {
  const { status, handleSubmit } = useFormSubmit("group-event");
  const { containerRef, getResponse, reset } = useRecaptcha();
  const [robotCheckMissing, setRobotCheckMissing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [referralSource, setReferralSource] = useState("");
  const [eventsNeeded, setEventsNeeded] = useState(false);
  // Mirrors the live widget's own repeatable "Add Event" / "Remove Event"
  // pattern (lead[lead_booking_events_attributes][N][...]) — starts with
  // one event block once "Events Needed" is checked, same as live.
  const [events, setEvents] = useState<EventEntry[]>([{ id: 0 }]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!getResponse()) {
      event.preventDefault();
      setRobotCheckMissing(true);
      return;
    }
    setRobotCheckMissing(false);
    const result = await handleSubmit(event);
    setErrorMessage(result.success ? undefined : result.error);
    reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 bg-white p-6 sm:p-8">
      <div>
        <p className={EYEBROW_CLASSES}>Private Events</p>
        <h3 className="mt-1 font-display text-xl uppercase leading-none lg:text-[36px]">
          Host Your Event at Container Park
        </h3>
        <p className="mt-1 text-sm text-muted">
          Birthdays, corporate buyouts, weddings, and everything in between. Tell us what
          you&apos;re planning — we&apos;ll take it from there.
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className="font-display text-base uppercase leading-none text-black lg:text-[36px]">
          Your Contact Information
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="First Name" name="lead[first_name]" required />
          <TextField label="Last Name" name="lead[last_name]" required />
        </div>
        <TextField label="Email Address" name="lead[email_address]" required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Phone Number" name="lead[phone_number]" required />
          <TextField label="Ext." name="lead[phone_number_extension]" />
        </div>
        <TextField label="Company" name="lead[company]" />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-base uppercase leading-none text-black lg:text-[36px]">
          Your Booking Details
        </legend>
        <TextField
          label="Nature of this Booking (e.g., Conference, Wedding)"
          name="lead[booking_description]"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Arriving On" name="lead[booking_start_date]" type="date" />
          <TextField label="Departing On" name="lead[booking_end_date]" type="date" />
        </div>
        <TextareaField
          label="Is there any additional information you would like to add?"
          name="lead[additional_information]"
        />
        <div>
          <SelectField
            label="How did you hear about us?"
            name="lead[referral_source_id]"
            options={REFERRAL_OPTIONS}
            value={referralSource}
            onChange={setReferralSource}
          />
          {REFERRAL_OPTIONS_WITH_DETAILS.has(referralSource) && (
            <div className="mt-2">
              <TextareaField
                label="Please specify"
                name="lead[referral_source_other]"
                placeholder="Please Describe..."
              />
            </div>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-base uppercase leading-none text-black lg:text-[36px]">
          Your Event Details
        </legend>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="lead[booking_events_needed]"
            checked={eventsNeeded}
            onChange={(event) => setEventsNeeded(event.target.checked)}
            className="h-4 w-4 border-border accent-lime"
          />
          Events Needed
        </label>

        {eventsNeeded &&
          events.map((event, index) => (
            <div
              key={event.id}
              className="space-y-4 border-t border-border pt-4 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h4 className="text-sm font-semibold uppercase">Event</h4>
                {events.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    showArrow={false}
                    onClick={() => setEvents((prev) => prev.filter((e) => e.id !== event.id))}
                  >
                    Remove Event
                    <span aria-hidden="true">−</span>
                  </Button>
                )}
              </div>
              <TextField
                label="Nature of this Event (e.g., Birthday Party or Business Dinner)"
                name={`lead[lead_booking_events_attributes][${index}][event_description]`}
              />
              <TextField
                label="Event Date"
                name={`lead[lead_booking_events_attributes][${index}][event_date]`}
                type="date"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <input
                    type="time"
                    name={`lead[lead_booking_events_attributes][${index}][start_time]`}
                    defaultValue="18:00"
                    className="mt-1 w-full border border-border px-4 py-3 text-sm focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Time</label>
                  <input
                    type="time"
                    name={`lead[lead_booking_events_attributes][${index}][end_time]`}
                    defaultValue="21:00"
                    className="mt-1 w-full border border-border px-4 py-3 text-sm focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                  />
                </div>
              </div>
              <TextField
                label="Number of People"
                name={`lead[lead_booking_events_attributes][${index}][guest_count]`}
                type="number"
              />
            </div>
          ))}

        {eventsNeeded && (
          <Button
            type="button"
            variant="outline"
            showArrow={false}
            onClick={() =>
              setEvents((prev) => [
                ...prev,
                { id: Math.max(-1, ...prev.map((event) => event.id)) + 1 },
              ])
            }
          >
            Add Event
            <span aria-hidden="true">+</span>
          </Button>
        )}
      </fieldset>

      <div>
        <div ref={containerRef} />
        {robotCheckMissing && (
          <p role="alert" className="mt-2 text-sm font-semibold text-status-closed">
            Please confirm you&apos;re not a robot.
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </Button>
      <FormStatusMessage status={status} errorMessage={errorMessage} />
      <p className="text-xs text-muted">
        <a
          href="https://www.tripleseat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Private Event Software powered by Tripleseat
        </a>
      </p>
    </form>
  );
}
