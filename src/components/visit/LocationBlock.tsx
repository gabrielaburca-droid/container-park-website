import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import type { Address } from "@/lib/sanity/types";

interface LocationBlockProps {
  heading?: string;
  description?: string;
  address?: Address | null;
  directionsUrl?: string;
  children?: ReactNode;
}

export function LocationBlock({
  heading = "Location",
  description,
  address,
  directionsUrl,
  children,
}: LocationBlockProps) {
  return (
    <section className="mx-auto grid max-w-container grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-2">
      <MapPlaceholder className="aspect-[4/3] lg:aspect-auto" />
      <div>
        <h2 className="font-display text-2xl uppercase">{heading}</h2>
        {description && <p className="mt-4 text-muted">{description}</p>}
        {address && (
          <p className="mt-4 text-sm text-muted">
            {[address.street, address.city, address.state, address.zip].filter(Boolean).join(", ")}
          </p>
        )}
        {directionsUrl && (
          <div className="mt-4">
            <Button href={directionsUrl} variant="outline">
              Get Directions
            </Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
