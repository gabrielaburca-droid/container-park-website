import type { EventDoc } from "@/lib/sanity/types";
import { realImage } from "@/lib/mock/placeholder";
import { portableText } from "./portableText";

// REAL CONTENT — migrated from the live site's events calendar
// (downtowncontainerpark.com/events/) during the content + SEO migration
// audit. These are the 6 events actually surfaced on the live site at
// audit time (2026-08-26): title, date, time, location, description, tags,
// and ticket links are all transcribed from the live event detail pages —
// nothing invented, no fake recurring instances created to pad the count.
// The live site has ~812 total event URLs going back to 2018 (see the
// earlier SEO audit) — only these currently-live/upcoming ones were
// migrated; the historical archive is a separate, deferred decision.
//
// Each recurring event is represented ONCE, using its real "next
// occurrence" date/time as currently shown live, with `isRecurring: true`
// — not expanded into multiple fabricated future instances.

const now = (day: string, month: string, year: string, time: string) => {
  // "Aug 26 2026" + "06:30 PM" -> ISO string, Pacific time (Las Vegas).
  const date = new Date(`${month} ${day}, ${year} ${time} GMT-0700`);
  return date.toISOString();
};

export const MOCK_EVENTS: EventDoc[] = [
  {
    _id: "real-canvas-and-cocktails-dtlv",
    title: "Canvas and Cocktails DTLV",
    slug: { current: "canvas-and-cocktails-dtlv" },
    startDate: now("02", "Sep", "2026", "7:00 PM"),
    endDate: now("02", "Sep", "2026", "8:30 PM"),
    isRecurring: true,
    time: "07:00 PM - 08:30 PM",
    category: "eat-drink",
    shortDescription:
      "Canvas and Cocktails DTLV specializes in using different mediums to bring art to life with a personal touch.",
    description: portableText([
      "Canvas and Cocktails DTLV specializes in using different mediums to bring art to life with a personal touch.",
      "We provide the supplies and guidance to create a personal masterpiece while allowing the venue to showcase their food and cocktails to keep the party going.",
      "Our goal is to make sure that each individual feels like their own personal artist. We want all of our new artists to walk away with a sense of confidence, and we found that good food and liquid courage always helps with these scenarios.",
      "$25 includes all supplies and a complimentary cocktail. Classes are every Wednesday. Party starts at 7:00pm. You paint when you arrive. You create your own design.",
    ]),
    tags: ["fun", "paint", "drink"],
    relatedBusiness: { _id: "real-oak-ivy", name: "Oak & Ivy", slug: { current: "oak-ivy" } },
    price: "$25",
    ticketUrl:
      "https://www.eventbrite.com/e/canvas-and-cocktails-dtlv-under-the-stars-tickets-292239645647",
    heroImage: realImage(
      "Canvas and Cocktails DTLV flyer (from live site)",
      "/assets/images/events/canvas-and-cocktails-dtlv.jpg"
    ),
    partnerOffers: [
      { businessName: "Downtown Terrace", offerText: "10% Off Entire Purchase" },
      { businessName: "Sugar Shop", offerText: "10% Off When You Mention This Ad" },
      { businessName: "Mob Pie", offerText: "$5 Cheese Slice" },
      {
        businessName: "Waffelato",
        offerText: "Couples Waffelato — 2 half sized Waffelatos for $10 (must mention this ad)",
      },
      { businessName: "Dream Dance NV", offerText: "10% off First Month" },
      {
        businessName: "Sunny's",
        offerText: "15% off any retail purchase or 15% off any Pole Fitness class/Pole Party",
      },
      { businessName: "Bin 702", offerText: "Happy Hour 3p-6p" },
    ],
  },
  {
    // Live URL slug is genuinely "community-sunset-drum-circle" but the
    // real content served there is about The Mantis — a live-site
    // slug/content mismatch, not something introduced during migration.
    // Kept as-is (title reflects the real content; slug preserves the real
    // live URL for continuity) — flagged in the migration report.
    _id: "real-community-sunset-drum-circle",
    title: "The Mantis",
    slug: { current: "community-sunset-drum-circle" },
    startDate: now("27", "Aug", "2026", "7:30 PM"),
    endDate: now("27", "Aug", "2026", "11:00 PM"),
    isRecurring: true,
    time: "07:30 PM - 11:00 PM (weather permitting)",
    category: "attractions",
    shortDescription:
      "The Mantis is 40 feet tall and 30 feet wide. She throws giant fire flames reaching six stories high.",
    description: portableText([
      "The Mantis is 40 feet tall and 30 feet wide. She throws giant fire flames reaching six stories high. Built with a 4,000 watt surround sound system, can speak more than 20 different languages, and is operated by a team of trained, licensed professionals.",
      "(Weather permitting)",
    ]),
    tags: ["fire", "burning man", "drum circle", "mantis"],
    relatedBusiness: {
      _id: "real-the-mantis",
      name: "The Mantis",
      slug: { current: "the-mantis" },
    },
    heroImage: realImage(
      "The Mantis (from live site)",
      "/assets/images/events/community-sunset-drum-circle.png"
    ),
  },
  {
    _id: "real-island-ohana-night",
    title: "Island Ohana Night",
    slug: { current: "island-ohana-night" },
    startDate: now("29", "Aug", "2026", "6:30 PM"),
    endDate: now("29", "Aug", "2026", "9:30 PM"),
    isRecurring: true,
    time: "06:30 PM - 09:30 PM",
    category: "general",
    shortDescription:
      "Come by on the last Saturdays of every month for live island music and food specials.",
    description: portableText([
      "Come by on the last Saturdays of every month and enjoy Island Ohana Night!",
      "Live music from 6:30pm to 9:30pm, with food specials from Ninth Island Gourmet and The Poke Shack & Grill, plus drink specials and tiki drinks at the bars!",
    ]),
    tags: ["island ohana", "reggae"],
    heroImage: realImage(
      "Island Ohana Night flyer (from live site)",
      "/assets/images/events/island-ohana-night.jpg"
    ),
  },
  {
    _id: "real-whiskey-wine-wednesday",
    title: "Whiskey & Wine Wednesday",
    slug: { current: "whiskey-wine-wednesday" },
    startDate: now("26", "Aug", "2026", "6:30 PM"),
    endDate: now("26", "Aug", "2026", "9:30 PM"),
    isRecurring: true,
    time: "06:30 PM - 09:30 PM",
    category: "eat-drink",
    shortDescription: "Come in and enjoy whiskey and wine specials throughout the park.",
    description: portableText([
      "Come in and enjoy whiskey and wine specials throughout the park.",
      "$30 rotating whiskey flight at Oak & Ivy. Wine specials at Bin 702. Power Hour: bottomless $12 draft beers, mimosas, house margaritas, or sangria from 6PM to 7PM with a $15 food order at Downtown Terrace. No mixing and matching, choose wisely!",
    ]),
    tags: ["whiskey", "wine", "drinks specials", "live music"],
    heroImage: realImage(
      "Whiskey & Wine Wednesday flyer (from live site)",
      "/assets/images/events/whiskey-wine-wednesday.jpg"
    ),
  },
  {
    _id: "real-yoga-in-the-park-5",
    title: "Yoga in the Park — Monday Nights",
    slug: { current: "yoga-in-the-park-5" },
    startDate: now("31", "Aug", "2026", "8:00 PM"),
    endDate: now("31", "Aug", "2026", "9:00 PM"),
    isRecurring: true,
    time: "08:00 PM - 09:00 PM",
    category: "general",
    shortDescription:
      "Downtown Yoga In The Park — Ashtanga-style classes for all levels, taught by Rayce Rayos.",
    description: portableText([
      "Young & old, active or sedentary — everyone is capable of reaching their unique challenge. Downtown Yoga In The Park is entering its fourth year of promoting health & wellness in the Las Vegas community.",
      "These recurring classes unfold at a welcoming pace for all, and are taught in the Ashtanga style by Rayce Rayos (RYT200 / CPT-ACE / BS-Kinesiology). Breathwork techniques (Pranayama) are introduced throughout.",
      "Water + mat + friends + an open mind — all recommended!",
    ]),
    tags: ["yoga", "health", "fitness", "stretch"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-yoga-in-the-park-las-vegas-tickets-123105540987",
    heroImage: realImage(
      "Yoga in the Park flyer (from live site)",
      "/assets/images/events/yoga-in-the-park-5.jpg"
    ),
  },
  {
    _id: "real-yoga-in-the-park-6",
    title: "Yoga in the Park — Sunday Morning",
    slug: { current: "yoga-in-the-park-6" },
    startDate: now("30", "Aug", "2026", "10:00 AM"),
    endDate: now("30", "Aug", "2026", "11:00 AM"),
    isRecurring: true,
    time: "10:00 AM - 11:00 AM",
    category: "general",
    shortDescription:
      "Downtown Yoga In The Park — Ashtanga-style classes for all levels, taught by Rayce Rayos.",
    description: portableText([
      "Young & old, active or sedentary — everyone is capable of reaching their unique challenge. Downtown Yoga In The Park is entering its fourth year of promoting health & wellness in the Las Vegas community.",
      "These recurring classes unfold at a welcoming pace for all, and are taught in the Ashtanga style by Rayce Rayos (RYT200 / CPT-ACE / BS-Kinesiology). Breathwork techniques (Pranayama) are introduced throughout.",
      "Water + mat + friends + an open mind — all recommended!",
    ]),
    tags: ["yoga", "health", "fitness", "stretch"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-yoga-in-the-park-las-vegas-tickets-123105540987",
    heroImage: realImage(
      "Yoga in the Park flyer (from live site)",
      "/assets/images/events/yoga-in-the-park-6.jpg"
    ),
  },
];
