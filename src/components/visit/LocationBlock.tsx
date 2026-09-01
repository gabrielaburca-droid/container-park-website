import type { ReactNode } from "react";
import type { Address } from "@/lib/sanity/types";
import { buildMapsEmbedUrl } from "@/lib/maps";

interface LocationBlockProps {
  heading?: string;
  description?: string;
  address?: Address | null;
  directionsUrl?: string;
  children?: ReactNode;
}

// Mirrors the Contact page's map + content layout exactly (see
// src/app/contact/page.tsx) — same real, interactive, grayscale-filtered
// Google Maps embed, same full-bleed gradient + blurred lime circle
// section, same computed right-padding so the content column never
// extends past the sitewide Container's own right edge on wide desktop
// screens.
export function LocationBlock({
  heading = "Location",
  description,
  address,
  directionsUrl,
  children,
}: LocationBlockProps) {
  const mapsEmbedUrl = buildMapsEmbedUrl(address);

  return (
    <section className="relative isolate overflow-x-hidden bg-gradient-to-r from-[#F5F5F5] to-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lime opacity-50 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 lg:-right-24 lg:-top-24 lg:h-96 lg:w-96"
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Real, interactive Google Maps embed (keyless — see
            lib/maps.ts), grayscale via a pure CSS filter — not a static
            replacement image. */}
        {mapsEmbedUrl && (
          <iframe
            src={mapsEmbedUrl}
            title="Map showing Downtown Container Park's location"
            className="min-h-[360px] w-full grayscale md:h-full md:min-h-0"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

        {/* Right padding is computed, not a fixed breakpoint value: this
            column is full-bleed (see the grid above), so at any viewport
            past the sitewide Container's own 1380px cap its content
            would otherwise keep growing past where Container's real
            right edge falls. max(1rem, calc(50vw - 674px)) reproduces
            Container's own math exactly (674 = half of 1380px, minus its
            16px inner padding). */}
        <div className="px-4 py-12 md:pl-12 md:pr-[max(1rem,calc(50vw-674px))] lg:pl-16">
          <h2 className="font-display text-2xl uppercase lg:text-[36px]">{heading}</h2>
          {description && <p className="mt-4 text-sm text-muted sm:text-base">{description}</p>}
          {address && (
            <p className="mt-4 text-sm text-muted">
              {[address.street, address.city, address.state, address.zip]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {directionsUrl && (
            <div className="mt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="font-display text-sm uppercase tracking-wide underline underline-offset-2"
              >
                Get Directions
              </a>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
