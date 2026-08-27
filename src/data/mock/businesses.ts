import type { Business } from "@/lib/sanity/types";
import { realImage } from "@/lib/mock/placeholder";

// REAL CONTENT — migrated from the live site (downtowncontainerpark.com)
// during the content + SEO migration audit. Every name, phone, website,
// hours, category, and Facebook link below was verified directly against
// the live business detail pages and category listing pages; nothing here
// is invented. Fields that could not be confirmed are simply omitted
// (undefined) rather than guessed — see the migration report for the full
// MISSING list.
//
// "Art Box" (the Figma design's flagship business-detail example, with 5
// transcribed reviews) does NOT exist on the live site — confirmed via a
// direct 404 on /listing/art-box/. It has been removed. It was FIGMA-ONLY
// content, never real. See the migration report.
//
// Entertainment: the live site's real "Entertainment" page is not a
// business directory at all — it's an events calendar. No business is
// confirmed as belonging to an "entertainment" category anywhere on the
// live site, so none are tagged that way here (not guessed).

const PARK_ADDRESS = {
  street: "707 Fremont Street",
  city: "Las Vegas",
  state: "NV",
  zip: "89101",
};

export const MOCK_BUSINESSES: Business[] = [
  {
    _id: "real-bin-702",
    name: "Bin 702",
    slug: { current: "bin-702" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Bin 702 storefront photo (from live site)",
      "/assets/images/businesses/bin-702.jpg"
    ),
    phone: "+1 702-826-2702",
    website: "http://bin702.com/",
    socialLinks: { facebook: "https://www.facebook.com/Bin-702-616108155106146/" },
    hours: [
      { day: "Monday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Tuesday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Wednesday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Thursday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Friday", open: "12:00 PM", close: "12:00 AM" },
      { day: "Saturday", open: "12:00 PM", close: "12:00 AM" },
      { day: "Sunday", open: "12:00 PM", close: "07:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-black-spade-tattoo-permanent-makeup",
    name: "Black Spade Tattoo & Permanent Makeup",
    slug: { current: "black-spade-tattoo-permanent-makeup" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Black Spade Tattoo & Permanent Makeup storefront photo (from live site)",
      "/assets/images/businesses/black-spade-tattoo-permanent-makeup.jpg"
    ),
    phone: "+1 702-413-7076",
    website: "http://blackspadetattoo.com/",
    socialLinks: { facebook: "https://www.facebook.com/blackspade1140" },
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-cinloco",
    name: "CinloCo",
    slug: { current: "cinloco" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "CinloCo storefront photo (from live site)",
      "/assets/images/businesses/cinloco.jpg"
    ),
    phone: "(725)726-0257",
    website: "http://cinloco.com/",
    hours: [
      { day: "Monday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Thursday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "08:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-coming-soon-boutique-aztlan",
    name: "Boutique Aztlan",
    slug: { current: "coming-soon-boutique-aztlan" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Boutique Aztlan storefront photo (from live site)",
      "/assets/images/businesses/coming-soon-boutique-aztlan.png"
    ),
    phone: "702-349-4597",
    website: "https://www.boutique-aztlan.com",
    address: PARK_ADDRESS,
    // Live URL slug is literally "coming-soon-boutique-aztlan" — treated as
    // a real signal of status, not a guess.
    status: "coming-soon",
  },
  {
    _id: "real-downtown-terrace",
    name: "Downtown Terrace",
    slug: { current: "downtown-terrace" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Downtown Terrace storefront photo (from live site)",
      "/assets/images/businesses/downtown-terrace.jpg"
    ),
    phone: "+1 702-854-1418",
    socialLinks: { facebook: "https://www.facebook.com/downtownterracelv" },
    hours: [
      { day: "Monday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "08:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "08:00 PM" },
      { day: "Sunday", open: "10:00 AM", close: "07:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-dream-dancenv",
    name: "Dream Dance Nv",
    slug: { current: "dream-dancenv" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Dream Dance Nv storefront photo (from live site)",
      "/assets/images/businesses/dream-dancenv.jpg"
    ),
    phone: "(702) 490-9423",
    website: "https://dream-dance-nv.business.site/",
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-dtlv-merch",
    name: "DTLV Merch",
    slug: { current: "dtlv-merch" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "DTLV Merch storefront photo (from live site)",
      "/assets/images/businesses/dtlv-merch.png"
    ),
    website: "https://dtlvmerch.com",
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "09:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "09:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-erinn-water-design",
    name: "Erinn Water Design",
    slug: { current: "erinn-water-design" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Erinn Water Design storefront photo (from live site)",
      "/assets/images/businesses/erinn-water-design.png"
    ),
    website: "https://erinnwaterdesign.com",
    hours: [
      { day: "Monday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Thursday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Friday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Saturday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Sunday", open: "11:30 AM", close: "07:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-gimme-5",
    name: "Gimmie 5",
    slug: { current: "gimme-5" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Gimmie 5 storefront photo (from live site)",
      "/assets/images/businesses/gimme-5.png"
    ),
    phone: "702-502-4626",
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-krp-boutique",
    name: "Krp Boutique",
    slug: { current: "krp-boutique" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Krp Boutique storefront photo (from live site)",
      "/assets/images/businesses/krp-boutique.jpg"
    ),
    phone: "702-608-8183",
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-lovo-cigars",
    name: "Lovo Cigars",
    slug: { current: "lovo-cigars" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Lovo Cigars storefront photo (from live site)",
      "/assets/images/businesses/lovo-cigars.jpg"
    ),
    phone: "+1 702-308-4682",
    website: "http://www.lovocigars.com/",
    socialLinks: { facebook: "https://www.facebook.com/LovoLasVegas/" },
    hours: [
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-luna-devina-co",
    name: "Luna Divina Co.",
    slug: { current: "luna-devina-co" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Luna Divina Co. storefront photo (from live site)",
      "/assets/images/businesses/luna-devina-co.jpeg"
    ),
    phone: "(725) 247-2110",
    website: "http://Lunadivinaco.com",
    hours: [
      { day: "Monday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Thursday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Friday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Saturday", open: "11:30 AM", close: "05:30 PM" },
      { day: "Sunday", open: "11:30 AM", close: "05:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-mikaelas-taste-of-asia",
    name: "Mikaelas Taste of Asia",
    slug: { current: "mikaelas-taste-of-asia" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Mikaelas Taste of Asia storefront photo (from live site)",
      "/assets/images/businesses/mikaelas-taste-of-asia.png"
    ),
    website: "https://www.mikaelaslv.com/",
    socialLinks: { facebook: "https://www.facebook.com/p/Mikaelas-Las-Vegas-61557001104897/" },
    hours: [
      { day: "Monday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Thursday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Friday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Saturday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Sunday", open: "11:30 AM", close: "07:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-ninth-island-gourmet",
    name: "Ninth Island Gourmet",
    slug: { current: "ninth-island-gourmet" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Ninth Island Gourmet storefront photo (from live site)",
      "/assets/images/businesses/ninth-island-gourmet.jpg"
    ),
    website: "https://ninth-island-gourmet.square.site",
    hours: [
      { day: "Monday", open: "09:00 AM", close: "05:00 PM" },
      { day: "Tuesday", open: "09:00 AM", close: "05:00 PM" },
      { day: "Wednesday", open: "09:00 AM", close: "05:00 PM" },
      { day: "Thursday", open: "09:00 AM", close: "05:00 PM" },
      { day: "Friday", open: "09:00 AM", close: "05:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-oak-ivy",
    name: "Oak & Ivy",
    slug: { current: "oak-ivy" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Oak & Ivy storefront photo (from live site)",
      "/assets/images/businesses/oak-ivy.jpg"
    ),
    phone: "702-553-2549",
    socialLinks: { facebook: "https://www.facebook.com/oakandivydtlv/" },
    hours: [
      { day: "Monday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Tuesday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Wednesday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Thursday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Friday", open: "12:00 PM", close: "01:00 AM" },
      { day: "Saturday", open: "12:00 PM", close: "01:00 AM" },
      { day: "Sunday", open: "12:00 PM", close: "11:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-pizza-zazza",
    name: "Mob Pie",
    slug: { current: "pizza-zazza" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Mob Pie storefront photo (from live site)",
      "/assets/images/businesses/pizza-zazza.jpg"
    ),
    phone: "702-769-3600",
    socialLinks: { facebook: "https://www.facebook.com/Pizza-zazza-370198120408267/" },
    hours: [
      { day: "Monday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Tuesday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Wednesday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Thursday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Friday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Saturday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Sunday", open: "12:00 PM", close: "07:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-run-it-back",
    name: "Keep It Classic Las Vegas",
    slug: { current: "run-it-back" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Keep It Classic Las Vegas storefront photo (from live site)",
      "/assets/images/businesses/run-it-back.png"
    ),
    phone: "7026053332",
    hours: [
      { day: "Monday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Thursday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Friday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Saturday", open: "11:30 AM", close: "08:30 PM" },
      { day: "Sunday", open: "11:30 AM", close: "08:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-segway-las-vegas",
    name: "Segway Las Vegas",
    slug: { current: "segway-las-vegas" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Segway Las Vegas storefront photo (from live site)",
      "/assets/images/businesses/segway-las-vegas.jpg"
    ),
    phone: "702-596-1111",
    website: "http://segwaylasvegas.com/",
    hours: [
      { day: "Monday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Thursday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Friday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Saturday", open: "10:00 AM", close: "07:30 PM" },
      { day: "Sunday", open: "10:00 AM", close: "07:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-shop-mama-sage",
    name: "Shop Mama Sage",
    slug: { current: "shop-mama-sage" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Shop Mama Sage storefront photo (from live site)",
      "/assets/images/businesses/shop-mama-sage.png"
    ),
    website: "https://shopmamasage.com",
    socialLinks: { facebook: "https://www.facebook.com/Shopmamasage" },
    hours: [
      { day: "Monday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Thursday", open: "11:30 AM", close: "08:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "08:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "08:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-sugar-shop-candy-and-gifts",
    name: "Sugar Shop Candy & Gifts",
    slug: { current: "sugar-shop-candy-and-gifts" },
    categories: ["shop", "eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Sugar Shop Candy & Gifts storefront photo (from live site)",
      "/assets/images/businesses/sugar-shop-candy-and-gifts.jpg"
    ),
    website: "https://www.sugarshoplv.com",
    socialLinks: {
      facebook:
        "https://www.facebook.com/SugarShopCandyStore/?__tn__=%2Cd%2CP-R&#038;eid=ARAOGiqMb08C8-Byx-OQ08PbgA7pwLLb1vp_sy8x3qjOeAjcW315kRFu9YjiNvfZ63aQyPT9fTqgXSfD",
    },
    hours: [
      { day: "Monday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Tuesday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Wednesday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Thursday", open: "12:00 PM", close: "08:00 PM" },
      { day: "Friday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Saturday", open: "12:00 PM", close: "10:00 PM" },
      { day: "Sunday", open: "12:00 PM", close: "07:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-sunnys",
    name: "Sunny's",
    slug: { current: "sunnys" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "Sunny's storefront photo (from live site)",
      "/assets/images/businesses/sunnys.png"
    ),
    website: "https://sunnysvegas.com",
    socialLinks: { facebook: "https://www.facebook.com/sunnysvegas/" },
    hours: [
      { day: "Tuesday", open: "02:00 AM", close: "07:00 PM" },
      { day: "Wednesday", open: "02:00 AM", close: "07:00 PM" },
      { day: "Thursday", open: "02:00 AM", close: "07:00 PM" },
      { day: "Friday", open: "01:00 AM", close: "08:00 PM" },
      { day: "Saturday", open: "01:00 AM", close: "08:00 PM" },
      { day: "Sunday", open: "01:00 AM", close: "05:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-taste-buzz-food-tours",
    name: "Taste Buzz Food Tours",
    slug: { current: "taste-buzz-food-tours" },
    categories: ["shop", "eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Taste Buzz Food Tours storefront photo (from live site)",
      "/assets/images/businesses/taste-buzz-food-tours.jpg"
    ),
    phone: "702-909-0337",
    website: "http://www.tastebuzzvegas.com/",
    socialLinks: { facebook: "https://www.facebook.com/tastebuzzfoodtours" },
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-the-lawn",
    name: "The Lawn",
    slug: { current: "the-lawn" },
    categories: ["attractions"] as Business["categories"],
    heroImage: realImage(
      "The Lawn storefront photo (from live site)",
      "/assets/images/businesses/the-lawn.jpg"
    ),
    hours: [
      { day: "Saturday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Monday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-the-mantis",
    name: "The Mantis",
    slug: { current: "the-mantis" },
    categories: ["attractions"] as Business["categories"],
    heroImage: realImage(
      "The Mantis storefront photo (from live site)",
      "/assets/images/businesses/the-mantis.jpeg"
    ),
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-the-nail-buzz",
    name: "The Nail Buzz",
    slug: { current: "the-nail-buzz" },
    categories: ["shop"] as Business["categories"],
    heroImage: realImage(
      "The Nail Buzz storefront photo (from live site)",
      "/assets/images/businesses/the-nail-buzz.png"
    ),
    phone: "(702) 483-5636",
    website: "https://the-nail-buzz.business.site/",
    hours: [
      { day: "Monday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "07:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "07:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-the-poke-shack-grill",
    name: "The Poke Shack & Grill",
    slug: { current: "the-poke-shack-grill" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "The Poke Shack & Grill storefront photo (from live site)",
      "/assets/images/businesses/the-poke-shack-grill.png"
    ),
    website: "https://pokeshacklv.com",
    socialLinks: {
      facebook: "https://www.facebook.com/p/The-Poke-Shack-And-Grill-61552899462149/",
    },
    hours: [
      { day: "Monday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Thursday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Friday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Saturday", open: "11:30 AM", close: "07:30 PM" },
      { day: "Sunday", open: "11:30 AM", close: "07:30 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-waffelato",
    name: "Waffelato",
    slug: { current: "waffelato" },
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Waffelato storefront photo (from live site)",
      "/assets/images/businesses/waffelato.jpg"
    ),
    phone: "(208) 520 0740",
    socialLinks: { facebook: "https://www.facebook.com/waffelatolv/" },
    hours: [
      { day: "Friday", open: "11:00 AM", close: "10:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "10:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "09:00 PM" },
      { day: "Monday", open: "11:30 AM", close: "09:00 PM" },
      { day: "Tuesday", open: "11:30 AM", close: "09:00 PM" },
      { day: "Wednesday", open: "11:30 AM", close: "09:00 PM" },
      { day: "Thursday", open: "11:30 AM", close: "09:00 PM" },
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
];
