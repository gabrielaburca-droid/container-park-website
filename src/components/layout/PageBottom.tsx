import { InstagramStrip } from "@/components/marketing/InstagramStrip";
import { PlanYourVisitBar } from "@/components/marketing/PlanYourVisitBar";
import { NewsletterBand } from "@/components/marketing/NewsletterBand";
import { buildDirectionsUrl } from "@/lib/maps";
import { DEFAULT_RETAIL_HOURS, DEFAULT_RESTAURANT_HOURS } from "@/data/parkHours";
import type { SiteSettings } from "@/lib/sanity/types";

interface PageBottomProps {
  settings: SiteSettings | null;
  /** Absent on Visit Us, Contact, and 404 per the design — see spec. */
  showPlanYourVisit?: boolean;
}

// Shared bottom stack present on nearly every page in the design:
// Instagram strip -> Plan Your Visit bar (conditional) -> Newsletter band.
// InstagramStrip is self-contained (approved local assets, no fetch).
export function PageBottom({ settings, showPlanYourVisit = true }: PageBottomProps) {
  return (
    <>
      <InstagramStrip />
      {showPlanYourVisit && (
        <PlanYourVisitBar
          address={settings?.address}
          directionsUrl={buildDirectionsUrl(settings?.address)}
          retailHours={settings?.retailHours ?? DEFAULT_RETAIL_HOURS}
          restaurantHours={settings?.restaurantHours ?? DEFAULT_RESTAURANT_HOURS}
        />
      )}
      <NewsletterBand />
    </>
  );
}
