"use client";

import Image from "next/image";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { Button } from "@/components/ui/Button";
import { CARD_TITLE_CLASSES } from "@/lib/ui/typography";

export function NewsletterBand() {
  const { status, handleSubmit } = useFormSubmit("newsletter");

  return (
    <section className="bg-lime">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:gap-4 sm:py-10"
      >
        <div className="flex items-center gap-4">
          <Image
            src="/assets/images/all/newsletter-icon.svg"
            alt=""
            width={64}
            height={60}
            className="h-9 w-auto shrink-0"
          />
          <div>
            <h2 className={`${CARD_TITLE_CLASSES} text-lime-foreground`}>Join the VIP List</h2>
            <p className="mt-1 text-sm text-lime-foreground">
              Get exclusive offers sent straight to your inbox!
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col gap-2 sm:w-auto lg:max-w-none">
          {/* Stacked below sm so the long button label never squeezes
              against the email input on narrow phones. */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="min-w-0 flex-1 border border-near-black bg-white px-4 py-3 text-sm lg:w-[390px] lg:flex-none"
            />
            <Button
              type="submit"
              variant="dark"
              expandOnHover
              disabled={status === "submitting"}
              className="shrink-0 justify-center whitespace-nowrap"
            >
              {status === "submitting" ? "Joining..." : "Join the VIP List"}
            </Button>
          </div>
          <FormStatusMessage status={status} successMessage="You're on the list!" />
        </div>
      </form>
    </section>
  );
}
