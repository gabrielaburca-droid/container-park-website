import type { SiteSettings } from "@/lib/sanity/types";
import { DEFAULT_RETAIL_HOURS, DEFAULT_RESTAURANT_HOURS } from "@/data/parkHours";

// REAL CONTENT — address, phone, and general email re-verified directly
// against the live site during the content + SEO migration audit (address
// appears sitewide; phone "(702) 359-9982" and email
// "info@downtowncontainerpark.com" both found in the live homepage HTML).
// Social links (including Tripadvisor) are confirmed real URLs. TikTok was
// never confirmed anywhere on the live site, so it's left unset rather
// than guessed.
//
// TODO: SCHEMA GAP — the live Visit Us page exposes three MORE specific
// contact emails this type has no field for: bookings@downtowncontainerpark.com
// (booking inquiries), events@downtownproject.com (event & venue
// reservations), media@downtowncontainerpark.com (media inquiries). Also
// real: "Holiday Hours — Closed on Christmas & Thanksgiving Day." Documented
// here rather than bolted onto SiteSettings as ad-hoc fields.
export const MOCK_SITE_SETTINGS: SiteSettings = {
  address: {
    street: "707 Fremont Street",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  },
  phone: "(702) 359-9982",
  email: "info@downtowncontainerpark.com",
  socialLinks: {
    facebook: "https://www.facebook.com/downtowncontainerpark/",
    instagram: "https://www.instagram.com/containerpark/?hl=en",
    twitter: "https://x.com/dtcontainerpark",
    tripadvisor:
      "https://www.tripadvisor.com/Attraction_Review-g45963-d5577602-Reviews-Downtown_Container_Park-Las_Vegas_Nevada.html",
  },
  retailHours: DEFAULT_RETAIL_HOURS,
  restaurantHours: DEFAULT_RESTAURANT_HOURS,
  parkHours: DEFAULT_RETAIL_HOURS,
};
