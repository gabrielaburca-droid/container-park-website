import type { EventDoc, PortableTextBlock, SanityImage } from "@/lib/sanity/types";
import { realImage } from "@/lib/mock/placeholder";
import { portableText } from "./portableText";

// REAL CONTENT — the complete current event catalogue migrated directly
// from the live site's events calendar (downtowncontainerpark.com/events/),
// its "Load More" pagination, and every distinct event's own detail page.
//
// UPDATE (2026-08-31, second pass): the live archive's "Load More" is
// AJAX-driven (Modern Events Calendar), so the earlier static-HTML scrape
// only ever saw its first ~12 cards. Driving it with a real browser and
// clicking "Load More" repeatedly surfaced 8 more genuinely real, distinct
// events that were missing before: Yoga in the Park — Monday Nights,
// Slow Jams Saturdaze, Second Sunday Art & Entertainment, Modelo &
// Margaritas Football Mondays, Noche Latina, Island Ohana Night, and
// Musicology Academy Goes Country. Two of these (Island Ohana Night, Yoga
// Monday Nights) had been REMOVED from this file in the previous pass
// after a non-JS scrape made them look dropped from the live archive —
// that was wrong; they're both still live, just paginated further out.
// "Noche Latina" was also previously reported to this project as
// live-confirmed-fake (mistaken for the "Art Box" precedent) — that was
// also wrong. It has its own real, live detail page
// (downtowncontainerpark.com/events/noche-latina/) and is included here.
//
// One live post was excluded as a duplicate: "Slow Jam Saturdaze With
// Live Music By String And Beats" (event id 4530) has an empty
// description and a generically-named flyer image, and shares the exact
// same recurring date/time pattern as "Slow Jams Saturdaze" (event id
// 4546, which has real descriptive copy and a real branded flyer) — this
// reads as a leftover duplicate WordPress post for the same real event,
// not a second distinct event, so only the complete one is kept.
//
// OCCURRENCE MODEL: the live archive lists one card per date occurrence,
// not one per event — "The Mantis" alone is a nightly recurring
// attraction, and clicking "Load More" enough times on the live site
// keeps extending that occurrence list arbitrarily far into the future
// (confirmed out past 2,000 individual Mantis dates, into March of next
// year, before this scrape was stopped) — the live "Load More" has no
// real endpoint for a daily/weekly recurring event. Hand-authoring every
// literal date would be both unreadable and not meaningfully more "real"
// than generating them, since every one of those dates is 100%
// determined by the event's own real, live-confirmed cadence (verified
// against the actual scraped date sequence for every event below — see
// each entry's `recurrence`). So: each event is authored ONCE as a
// `EventSeries` with its real content + its real recurrence rule, and
// `expandSeries()` below generates one real EventDoc per occurrence,
// bounded to a 3-month look-ahead window (today through 2026-11-30) —
// a deliberate, reasonable cap standing in for the live site's own
// effectively-unbounded pagination, not an invented shortcut on any
// individual event's content. This is what makes "Load More" on our own
// Events page (see EventsListingClient) a real, non-trivial feature
// rather than a formality: ~174 real occurrences across 13 real events.
//
// One correction from the live data itself: "Pop Rocks" describes itself
// as happening "the first Saturdays of every month," and its own next
// three real occurrences (Oct 3, Nov 7, Dec 5) are all genuine first
// Saturdays — but the live site's *very first* upcoming instance was
// listed as "Sep 04 2026," which is a Friday, not a Saturday. That one
// date is inconsistent with the event's own description and with every
// other real occurrence of it — treated as a live-site data-entry slip
// and corrected to Sep 5 (the real first Saturday of September 2026)
// rather than propagated.

const TODAY = new Date("2026-08-31");
const WINDOW_END = new Date(2026, 10, 30); // Nov 30, 2026 — see note above.

// "Aug 26 2026" + "06:30 PM" -> ISO string, Pacific time (Las Vegas).
const toISO = (day: string, month: string, year: string, time: string) => {
  const date = new Date(`${month} ${day}, ${year} ${time} GMT-0700`);
  return date.toISOString();
};

function isoFromDate(date: Date, time: string): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return toISO(day, month, String(date.getFullYear()), time);
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// weekday: JS Date.getDay() convention (Sunday = 0 .. Saturday = 6).
type Recurrence =
  | { type: "none" }
  | { type: "daily" }
  | { type: "weekly" }
  | { type: "monthly"; weekday: number; nth: 1 | 2 | 3 | 4 | -1 }; // -1 = last

function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (nth - 1) * 7);
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const last = new Date(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - offset);
}

function occurrenceDates(anchor: Date, recurrence: Recurrence, windowEnd: Date): Date[] {
  if (recurrence.type === "none") return [anchor];

  const dates: Date[] = [];

  if (recurrence.type === "daily") {
    for (let d = new Date(anchor); d <= windowEnd; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }

  if (recurrence.type === "weekly") {
    for (let d = new Date(anchor); d <= windowEnd; d.setDate(d.getDate() + 7)) {
      dates.push(new Date(d));
    }
    return dates;
  }

  // Monthly: real cadence (e.g. "1st Saturday," "last Saturday") derived
  // from the live site's own scraped date sequence for this event — see
  // the file header note.
  const { weekday, nth } = recurrence;
  for (
    let cursor = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    cursor <= windowEnd;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
  ) {
    const occurrence =
      nth === -1
        ? lastWeekdayOfMonth(cursor.getFullYear(), cursor.getMonth(), weekday)
        : nthWeekdayOfMonth(cursor.getFullYear(), cursor.getMonth(), weekday, nth);
    if (occurrence >= anchor && occurrence <= windowEnd) {
      dates.push(occurrence);
    }
  }
  return dates;
}

interface EventSeries {
  id: string;
  title: string;
  slug: string;
  category?: string;
  isRecurring: boolean;
  startTime: string; // e.g. "7:30 PM" — fed to toISO()
  endTime: string;
  timeLabel: string; // display string, e.g. "07:30 PM - 11:00 PM"
  anchorDate: Date; // real first upcoming occurrence, from the live site
  recurrence: Recurrence;
  shortDescription?: string;
  description: PortableTextBlock[];
  tags?: string[];
  heroImage: SanityImage;
  relatedBusinessId?: string;
  relatedBusinessName?: string;
  relatedBusinessSlug?: string;
  ticketUrl?: string;
  externalUrl?: string;
  price?: string;
  partnerOffers?: { businessName: string; offerText: string }[];
}

const SERIES: EventSeries[] = [
  {
    // Live URL slug is genuinely "community-sunset-drum-circle" but the
    // real content served there is about The Mantis — a live-site
    // slug/content mismatch, not something introduced during migration
    // (confirmed directly against the live page's own <title>: "THE
    // MANTIS - Downtown Container Park").
    id: "community-sunset-drum-circle",
    title: "The Mantis",
    slug: "community-sunset-drum-circle",
    category: "attractions",
    isRecurring: true,
    startTime: "7:30 PM",
    endTime: "11:00 PM",
    timeLabel: "07:30 PM - 11:00 PM (weather permitting)",
    anchorDate: new Date(2026, 7, 31),
    recurrence: { type: "daily" },
    shortDescription:
      "The Mantis is 40 feet tall and 30 feet wide. She throws giant fire flames reaching six stories high.",
    description: portableText([
      "The Mantis is 40 feet tall and 30 feet wide. She throws giant fire flames reaching six stories high. Built with a 4,000 watt surround sound system, can speak more than 20 different languages, and is operated by a team of trained, licensed professionals.",
      "(Weather permitting)",
    ]),
    tags: ["fire", "mantis"],
    relatedBusinessId: "real-the-mantis",
    relatedBusinessName: "The Mantis",
    relatedBusinessSlug: "the-mantis",
    heroImage: realImage(
      "The Mantis (from live site)",
      "/assets/images/events/community-sunset-drum-circle.png"
    ),
  },
  {
    id: "whiskey-wine-wednesday",
    title: "Whiskey & Wine Wednesday",
    slug: "whiskey-wine-wednesday",
    category: "eat-drink",
    isRecurring: false,
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    timeLabel: "06:30 PM - 09:30 PM",
    anchorDate: new Date(2026, 8, 2),
    recurrence: { type: "weekly" },
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
    id: "canvas-and-cocktails-dtlv",
    title: "Canvas and Cocktails DTLV",
    slug: "canvas-and-cocktails-dtlv",
    category: "eat-drink",
    isRecurring: false,
    startTime: "7:00 PM",
    endTime: "8:30 PM",
    timeLabel: "07:00 PM - 08:30 PM",
    anchorDate: new Date(2026, 8, 2),
    recurrence: { type: "weekly" },
    shortDescription:
      "Canvas and Cocktails DTLV specializes in using different mediums to bring art to life with a personal touch.",
    description: portableText([
      "Canvas and Cocktails DTLV specializes in using different mediums to bring art to life with a personal touch.",
      "We provide the supplies and guidance to create a personal masterpiece while allowing the venue to showcase their food and cocktails to keep the party going.",
      "Our goal is to make sure that each individual feels like their own personal artist. We want all of our new artists to walk away with a sense of confidence, and we found that good food and liquid courage always helps with these scenarios.",
      "$25 includes all supplies and a complimentary cocktail. Classes are every Wednesday. Party starts at 7:00pm. You paint when you arrive. You create your own design.",
    ]),
    tags: ["fun", "paint", "drink"],
    relatedBusinessId: "real-oak-ivy",
    relatedBusinessName: "Oak & Ivy",
    relatedBusinessSlug: "oak-ivy",
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
    id: "pop-rocks",
    title: "Pop Rocks 90's Pop Rock & Alt Rock Night",
    slug: "pop-rocks",
    category: "general",
    isRecurring: false,
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    timeLabel: "06:30 PM - 09:30 PM",
    // Corrected anchor — see file header note on the live site's Sep 4
    // vs. Sep 5 discrepancy.
    anchorDate: new Date(2026, 8, 5),
    recurrence: { type: "monthly", weekday: 6, nth: 1 },
    shortDescription: "Come by on the first Saturdays of every month and enjoy Pop Rocks!",
    description: portableText([
      "Come by on the first Saturdays of every month and enjoy Pop Rocks!",
      "Take a trip back to the loud, raw, and unforgettable sounds of the 1990's with the DiDi West Band. 3 hours of high energy setlist packed with grunge, alternative rock and nu-metal classics.",
      "Live music from 6:30pm to 9:30pm by DiDi West Band playing 90's pop rock and alt rock.",
      "Food and drink specials throughout the park!",
    ]),
    tags: ["live music", "90s", "rock"],
    heroImage: realImage(
      "Pop Rocks 90's Pop Rock & Alt Rock Night flyer (from live site)",
      "/assets/images/events/pop-rocks.jpg"
    ),
  },
  {
    // No detail page on the live site — its archive card links straight
    // to Eventbrite. `externalUrl` mirrors that (see EventCard /
    // getAllEventSlugs) instead of inventing an on-site page for it.
    id: "chismosas-y-mimosas-night-market",
    title: "Chismosas Y Mimosas Night Market (All You Can Drink)",
    slug: "chismosas-y-mimosas-night-market",
    category: "eat-drink",
    isRecurring: false,
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    timeLabel: "06:00 PM - 10:00 PM",
    anchorDate: new Date(2026, 8, 5),
    recurrence: { type: "none" },
    shortDescription: "Labor Day Weekend at Downtown Container Park — 702 Market x Downtown...",
    description: portableText(["Labor Day Weekend at Downtown Container Park", "702 Market x Downtown..."]),
    tags: ["night market", "labor day"],
    externalUrl:
      "https://www.eventbrite.com/e/chismosas-y-mimosas-tickets-1996351653536?aff=oddtdtcreator",
    heroImage: realImage(
      "Chismosas Y Mimosas Night Market flyer (from live site)",
      "/assets/images/events/chismosas-y-mimosas-night-market.png"
    ),
  },
  {
    id: "yoga-in-the-park-6",
    title: "Yoga in the Park — Sunday Morning",
    slug: "yoga-in-the-park-6",
    category: "general",
    isRecurring: false,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    timeLabel: "10:00 AM - 11:00 AM",
    anchorDate: new Date(2026, 8, 6),
    recurrence: { type: "weekly" },
    shortDescription:
      "Downtown Yoga In The Park — Ashtanga-style classes for all levels, taught by Rayce Rayos.",
    description: portableText([
      "Young & old, active or sedentary — everyone is capable of reaching their unique challenge. Downtown Yoga In The Park is entering its fourth year of promoting health & wellness in the Las Vegas community.",
      "These Saturday & Sunday recurring classes unfold at a welcoming pace for all, and are taught in the Ashtanga style by Rayce Rayos (RYT200 / CPT-ACE / BS-Kinesiology).",
    ]),
    tags: ["yoga", "health", "fitness", "stretch"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-yoga-in-the-park-las-vegas-tickets-123105540987",
    heroImage: realImage(
      "Yoga in the Park flyer (from live site)",
      "/assets/images/events/yoga-in-the-park-6.jpg"
    ),
  },
  {
    id: "yoga-in-the-park-5",
    title: "Yoga in the Park — Monday Nights",
    slug: "yoga-in-the-park-5",
    category: "general",
    isRecurring: false,
    startTime: "8:00 PM",
    endTime: "9:00 PM",
    timeLabel: "08:00 PM - 09:00 PM",
    anchorDate: new Date(2026, 7, 31),
    recurrence: { type: "weekly" },
    shortDescription:
      "Downtown Yoga In The Park — Ashtanga-style classes for all levels, taught by Rayce Rayos.",
    description: portableText([
      "Young & old, active or sedentary — everyone is capable of reaching their unique challenge. Downtown Yoga In The Park is entering its fourth year of promoting health & wellness in the Las Vegas community.",
      "These recurring classes unfold at a welcoming pace for all, and are taught in the Ashtanga style by Rayce Rayos (RYT200 / CPT-ACE / BS-Kinesiology).",
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
    id: "slow-jams-saturdaze",
    title: "Slow Jams Saturdaze",
    slug: "slow-jams-saturdaze",
    category: "general",
    isRecurring: false,
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    timeLabel: "06:30 PM - 09:30 PM",
    anchorDate: new Date(2026, 8, 12),
    recurrence: { type: "monthly", weekday: 6, nth: 2 },
    shortDescription: "Come by on the second Saturdays of every month and enjoy Slow Jams Saturdaze!",
    description: portableText([
      "Come by on the second Saturdays of every month and enjoy Slow Jams Saturdaze!",
      "Live music from 6:30pm to 9:30pm by Strings & Beats playing your favorite R&B, hip-hop, and love songs.",
      "Food and drink specials throughout the park!",
    ]),
    tags: ["live music", "r&b", "hip-hop"],
    heroImage: realImage(
      "Slow Jams Saturdaze flyer (from live site)",
      "/assets/images/events/slow-jams-saturdaze.jpg"
    ),
  },
  {
    id: "second-sunday-3",
    title: "Second Sunday Art & Entertainment",
    slug: "second-sunday-3",
    category: "attractions",
    isRecurring: false,
    startTime: "5:00 PM",
    endTime: "9:00 PM",
    timeLabel: "05:00 PM - 09:00 PM",
    anchorDate: new Date(2026, 8, 13),
    recurrence: { type: "monthly", weekday: 0, nth: 2 },
    shortDescription:
      "Live local music and performances, plus over 20 vendors to shop from — put together by ISI Group.",
    description: portableText([
      "Come in and enjoy live local music and performances as well as over 20 vendors to shop from. This is all put together by our friends at ISI Group!",
    ]),
    tags: ["art", "live music", "vendors"],
    heroImage: realImage(
      "Second Sunday Art & Entertainment flyer (from live site)",
      "/assets/images/events/second-sunday.jpg"
    ),
  },
  {
    id: "modelo-margaritas-football-mondays",
    title: "Modelo & Margaritas Football Mondays",
    slug: "modelo-margaritas-football-mondays",
    category: "eat-drink",
    isRecurring: false,
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    timeLabel: "05:00 PM - 08:00 PM",
    anchorDate: new Date(2026, 8, 14),
    recurrence: { type: "weekly" },
    shortDescription:
      "Enjoy Monday Night Football at kickoff on our 18ft LED screen, with bucket and margarita specials.",
    description: portableText([
      "Come in and enjoy the Monday Football game at kickoff on our 18ft LED screen with audio! Enjoy bucket and margarita specials throughout the Container Park!",
    ]),
    tags: ["football", "drink specials"],
    heroImage: realImage(
      "Modelo & Margaritas Football Mondays flyer (from live site)",
      "/assets/images/events/modelo-margaritas-football-mondays.jpg"
    ),
  },
  {
    id: "noche-latina",
    title: "Noche Latina",
    slug: "noche-latina",
    category: "general",
    isRecurring: false,
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    timeLabel: "06:30 PM - 09:30 PM",
    anchorDate: new Date(2026, 8, 19),
    recurrence: { type: "monthly", weekday: 6, nth: 3 },
    shortDescription: "Come by on the third Saturdays of every month and enjoy Noche Latina!",
    description: portableText([
      "Come by on the third Saturdays of every month and enjoy Noche Latina!",
      "Live music from 6:30pm to 9:30pm playing Latin sounds. Food and drink specials throughout the park!",
    ]),
    tags: ["live music", "latin"],
    heroImage: realImage("Noche Latina flyer (from live site)", "/assets/images/events/noche-latina.jpg"),
  },
  {
    id: "island-ohana-night",
    title: "Island Ohana Night",
    slug: "island-ohana-night",
    category: "general",
    isRecurring: false,
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    timeLabel: "06:30 PM - 09:30 PM",
    anchorDate: new Date(2026, 8, 26),
    recurrence: { type: "monthly", weekday: 6, nth: -1 },
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
    id: "musicology-academy-goes-country",
    title: "Musicology Academy Goes Country",
    slug: "musicology-academy-goes-country",
    category: "general",
    isRecurring: false,
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    timeLabel: "06:00 PM - 08:00 PM",
    anchorDate: new Date(2026, 8, 27),
    recurrence: { type: "none" },
    shortDescription:
      "Enjoy the singers of Musicology Academy as they perform a variety of country hits.",
    description: portableText([
      "Come down to Container Park as Musicology goes country. Enjoy the singers of Musicology Academy as they perform a variety of country hits that will have you clicking your boots.",
    ]),
    tags: ["live music", "country"],
    heroImage: realImage(
      "Musicology Academy Goes Country flyer (from live site)",
      "/assets/images/events/musicology-academy-goes-country.png"
    ),
  },
];

function expandSeries(series: EventSeries): EventDoc[] {
  const dates = occurrenceDates(series.anchorDate, series.recurrence, WINDOW_END).filter(
    (date) => date >= TODAY
  );
  const multiple = dates.length > 1;

  return dates.map((date) => ({
    _id: multiple ? `real-${series.id}-${dateKey(date)}` : `real-${series.id}`,
    title: series.title,
    slug: { current: series.slug },
    startDate: isoFromDate(date, series.startTime),
    endDate: isoFromDate(date, series.endTime),
    isRecurring: series.isRecurring,
    time: series.timeLabel,
    category: series.category,
    shortDescription: series.shortDescription,
    description: series.description,
    tags: series.tags,
    heroImage: series.heroImage,
    relatedBusiness: series.relatedBusinessId
      ? {
          _id: series.relatedBusinessId,
          name: series.relatedBusinessName as string,
          slug: { current: series.relatedBusinessSlug as string },
        }
      : undefined,
    ticketUrl: series.ticketUrl,
    externalUrl: series.externalUrl,
    price: series.price,
    partnerOffers: series.partnerOffers,
  }));
}

export const MOCK_EVENTS: EventDoc[] = SERIES.flatMap(expandSeries).sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
);
