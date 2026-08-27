"use client";

import { useState } from "react";
import { TextField, TextareaField } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";

// Reviews have no backing Sanity schema and no confirmed public-write/
// moderation model yet (a real architecture decision, not a simple field
// gap — see CLAUDE.md). This form uses the same submission abstraction as
// every other form for UI consistency, but `submitForm` doesn't persist
// anything anywhere yet — the success message below reflects that.
//
// TODO: CONFIRM SECOND FIELD LABEL. The source design labels a second field
// "Name *" but its placeholder text is an email address
// ("mail@website.com") — reads as a labeling error in the source design
// (likely meant to be "Email"). Rendered exactly as designed pending
// confirmation, not silently corrected.
export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const { status, handleSubmit } = useFormSubmit("review");

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t border-border pt-8">
      <h3 className="font-display text-lg uppercase">Rate Us and Write a Review</h3>

      <fieldset>
        <legend className="text-sm font-medium">Your rating</legend>
        <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              onClick={() => setRating(star)}
              className="text-2xl text-rating"
            >
              <span aria-hidden="true">{star <= rating ? "★" : "☆"}</span>
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Name" name="name" required />
        {/* TODO: CONFIRM SECOND FIELD LABEL — see file-level note above. */}
        <TextField
          label="Name"
          name="nameOrEmail"
          type="email"
          placeholder="mail@website.com"
          required
        />
      </div>
      <TextField
        label="Title"
        name="title"
        placeholder="Example: It was an awesome experience to be there"
      />
      <TextareaField
        label="Review"
        name="review"
        placeholder="Tip: A great review covers food, service, and ambiance. Got recommendations for your favorite dishes and drinks, or something everyone should try here? Include that too! And remember"
      />
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Review"}
      </Button>
      <FormStatusMessage
        status={status}
        successMessage="Thanks for your feedback — reviews aren't published live on the site yet."
      />
    </form>
  );
}
