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
//
// SECOND PASS — tagline/rating/reviewCount/claimed added below for every
// Shop-category listing, scraped directly from the live Shop page's own
// listing cards (https://downtowncontainerpark.com/shop/) at the time of
// this change. Same rule as above: a field left unset means the live
// listing genuinely doesn't show one (e.g. no rating yet), not a guess.
// Open/Closed status is intentionally NOT stored as a field here — the
// live site computes that in real time against each listing's hours, so
// it's derived the same way (see lib/business/openStatus.ts) rather than
// frozen as a value that would go stale the moment it's written down.

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
    description: [
      {
        _type: "block",
        _key: "bin_702b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "bin_702s2",
            text: "At Bin 702, we serve only the highest quality charcuterie and cheese selection, along with our famous mini sandwiches. We also offer a selection of both beer and wine on tap, as well as a hand-chosen variety of bottles, each tasted and personally approved by our team. Bin 702 has been with Container Park since it opened November 2013 and is made of two shipping containers totaling 640 sq. ft.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 4.9,
    reviewCount: 7,
    heroImage: realImage(
      "Bin 702 storefront photo (from live site)",
      "/assets/images/businesses/bin-702.jpg"
    ),
    gallery: [
      realImage(
        "Bin 702 — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-9-of-95.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-10-of-95.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/bin702pic2.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-43-of-95.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Bin702-pic.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/montaditos-2.jpg"
      ),
      realImage(
        "Bin 702 — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/bin702pic3.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "black_spade_tattoo_permanent_makeupb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "black_spade_tattoo_permanent_makeups2",
            text: "In a city where there are tattoo shops on every corner, Black Spade Tattoo & Permanent Makeup is comfortably situated in the downtown Las Vegas area where we strive to stand out from the crowds. Here at Black Spade Tattoo & Permanent Makeup we offer a unique tattooing experience. A calm and smooth vibe, with an intense energy of creativity that flows through the shop. We are a custom tattoo and Permanent Cosmetics studio where we do everything we can to make your experience a positive one. Black Spade Tattoo & Permanent Makeup is definitely one of the premier shops in Las Vegas, but without the exhausting high prices of some others. We attract clients searching for quality tattoos, from a one inch tattoo all the way to a full body suit and we are happy to do it ALL. Our expert services in Permanent Makeup are also the BEST IN TOWN…HANDS DOWN! We pride ourselves on our quality work and reasonable prices. Thank you for taking the time to check us out we hope to see you in a chair SOON.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Black Spade Tattoo & Permanent Makeup",
    rating: 5,
    reviewCount: 2,
    claimed: true,
    heroImage: realImage(
      "Black Spade Tattoo & Permanent Makeup storefront photo (from live site)",
      "/assets/images/businesses/black-spade-tattoo-permanent-makeup.jpg"
    ),
    gallery: [
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5756.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5754.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-75-of-95.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Bones.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5753.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-30-of-95.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5766.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-32-of-95.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_2730.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5757.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/2016tigereyes.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_1952.jpg"
      ),
      realImage(
        "Black Spade Tattoo & Permanent Makeup — gallery photo 13 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-5755.jpg"
      ),
    ],
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
    tagline:
      "Permanent Jewelry experience in 14K solid gold, sterling silver and gold filled. CinloCo also offers a jewelry line + accessories.",
    rating: 5,
    reviewCount: 1,
    claimed: false,
    heroImage: realImage(
      "CinloCo storefront photo (from live site)",
      "/assets/images/businesses/cinloco.jpg"
    ),
    gallery: [
      realImage(
        "CinloCo — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/DSCF1905-scaled.jpg"
      ),
      realImage(
        "CinloCo — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/DSCF1939-scaled.jpg"
      ),
      realImage(
        "CinloCo — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/DSCF8837-scaled.jpeg"
      ),
      realImage(
        "CinloCo — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/image_6483441-2.jpg"
      ),
      realImage(
        "CinloCo — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/image_67214849-scaled.jpg"
      ),
      realImage(
        "CinloCo — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/02/image_67223041-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "coming_soon_boutique_aztlanb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "coming_soon_boutique_aztlans2",
            text: "Boutique Aztlan was created in 2016 by this orgullosa Mexicana. Wanting to show the world our traditions along with the beauty, greatness, colorful and uniqueness work of these talented artisans. Sharing my Mexican culture which has been ingrained in my heart is the greatest feeling.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Supporting Mexico’s Artisans & U.S. Creators 🇲🇽 Mujer Owned",
    rating: 5,
    reviewCount: 2,
    claimed: false,
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
    description: [
      {
        _type: "block",
        _key: "downtown_terraceb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "downtown_terraces2",
            text: "Downtown Terrace is a gourmet quick service restaurant experience featuring a sophisticated, shareable menu and bird’s eye view of live music and entertainment. Our light and seasonal farm fresh dishes are complemented by a lush ambiance, featuring a signature palette of pomegranate and canary. Where old world elegance meets the busy Las Vegas urbanite, Downtown Terrace is Downtown’s newest destination to eat, drink, and brunch in a whimsical getaway with a commitment to dining artistry. Downtown Terrace offers $21 bottomless mimosas, bloody mary’s and belinis.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "downtown_terraceb3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "downtown_terraces4",
            text: "Breakfast, Brunch, Dinner and Kids Menu available.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 4.4,
    reviewCount: 8,
    heroImage: realImage(
      "Downtown Terrace storefront photo (from live site)",
      "/assets/images/businesses/downtown-terrace.jpg"
    ),
    gallery: [
      realImage(
        "Downtown Terrace — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-56-of-95.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Happier-Hours_-1080x1920-update.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9655.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1117-1.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/10/CP-Kareoke-1080x1080-1.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9615.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1070.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9646.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-47-of-95.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9683.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-59-of-95.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1048.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 13 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9649.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 14 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1049.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 15 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC0933-scaled.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 16 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9662.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 17 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1062.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 18 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9680.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 19 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1089.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 20 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Downtown-Terrace-Las-Vegas-1102.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 21 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9623.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 22 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC9672.jpg"
      ),
      realImage(
        "Downtown Terrace — gallery photo 23 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC0947-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "dream_dancenvb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "dream_dancenvs2",
            text: "Connecting the Las Vegas dance community with a variety of classes and elite training for children to adults. Our team has training from The Juilliard School and professional experience in Broadway classics like The Lion King, The Color Purple and Las Vegas shows like CHER, Vegas!The Show, Cirque Du Soleil, Toni Braxton and more!",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "dream_dancenvb3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "dream_dancenvs4",
            text: "Sumayah was born and raised in NYC, a graduate from The Fame School of New York and The Juilliard School. She loves to motivate and inspire dancers. In addition to opening Dream Dance NV, she is currently a dancer for singer, actress CHER and has a diverse background of performance experience ranging from Concert Dance, Broadway, Classical and Commercial Styles. She has found her home here in Las Vegas and is creating a space to give elite training to the dancers of this fabulous city.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "dream_dancenvb5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "dream_dancenvs6",
            text: "Youth Dance Schedule- Friday- 7pm Jazz/Modern Age 4-10 Saturday – 10am Ballet Age 4-10 11am Ballet Age 11-16 1pm Jazz/Modern Age 11-16 2:30pm Hip Hop – All kids 4pm Heels Class ADULTS/TEENS Sunday- 3pm Adult Hip Hop Beginner More classes to come!!",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    rating: 4.5,
    reviewCount: 2,
    claimed: true,
    heroImage: realImage(
      "Dream Dance Nv storefront photo (from live site)",
      "/assets/images/businesses/dream-dancenv.jpg"
    ),
    gallery: [
      realImage(
        "Dream Dance Nv — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/956272A1-04F7-4001-A581-D4631CA58E3C.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4583.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/FullSizeRender.jpeg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4263.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_2819.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_2756.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_2783.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4055.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4580.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4144.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_5345.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_4547.jpg"
      ),
      realImage(
        "Dream Dance Nv — gallery photo 13 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/IMG_5351.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "dtlv_merchb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "dtlv_merchs2",
            text: "Represent Downtown Las Vegas with awesome merch! Shop our shirts, hats, souvenirs and more.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Downtown Las Vegas Souvenir Shop",
    claimed: true,
    heroImage: realImage(
      "DTLV Merch storefront photo (from live site)",
      "/assets/images/businesses/dtlv-merch.png"
    ),
    gallery: [
      realImage(
        "DTLV Merch — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/10/CPcouple_1944x.jpg"
      ),
      realImage(
        "DTLV Merch — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/10/GS5_1944x.jpg"
      ),
      realImage(
        "DTLV Merch — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/10/O_IPatio_1000x.jpg"
      ),
      realImage(
        "DTLV Merch — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/10/IMG_7804_1000x.jpg"
      ),
      realImage(
        "DTLV Merch — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/10/CP3_1000x.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "erinn_water_designb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs2",
            text: "Handcrafted. Heartfelt. Occasionally a little whimsical.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "erinn_water_designb3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs4",
            text: "At Erinn Water Design, we believe in beauty with character. Each piece of jewelry—whether it’s a bold gemstone bracelet or a quirky acrylic necklace—carries the soul of something made by hand, not by machine. Our collections include designs for both men and women, from sleek and modern to wild and wonder-filled.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "erinn_water_designb5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs6",
            text: "But jewelry is just the beginning.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "erinn_water_designb7",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs8",
            text: "Wander through our shop and you’ll stumble upon hand-knitted scarves, plantable seed-paper tags, sparkling resin curiosities, and the occasional crafty experiment gone wonderfully right. We even have a growing Vintage section, filled with treasures unearthed while hunting for materials—because sometimes the past deserves a second debut.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "erinn_water_designb9",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs10",
            text: "Every item is made (or chosen) with intention, joy, and just enough unpredictability to keep things interesting. So whether you’re searching for a statement piece, a heartfelt gift, or a touch of the unexpected… you’ll find it here, at the crossroads of craft and curiosity.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "erinn_water_designb11",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "erinn_water_designs12",
            text: "Just remember, whenever you enter a room, you always want to Wear Something Worth Staring At .",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Handcrafted. Heartfelt. Occasionally a little whimsical.",
    claimed: false,
    heroImage: realImage(
      "Erinn Water Design storefront photo (from live site)",
      "/assets/images/businesses/erinn-water-design.png"
    ),
    gallery: [
      realImage(
        "Erinn Water Design — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/2_Gatsby_Steampunk_SQR.png"
      ),
      realImage(
        "Erinn Water Design — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/3_Crystal-Pearls-Sterling-Freshwater_SQR.png"
      ),
      realImage(
        "Erinn Water Design — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/4_Scarves_SQR.png"
      ),
      realImage(
        "Erinn Water Design — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/5_Butterfly-Resin-Purse_SQR.png"
      ),
      realImage(
        "Erinn Water Design — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/6_KTW_SQR.png"
      ),
      realImage(
        "Erinn Water Design — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/7_Quartz_Moonstone_SQR.png"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "gimme_5b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "gimme_5s2",
            text: "EVERYTHING $5 OR LESS. SOUVENIRS GIFTS JEWELRY TOYS",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Everything $5 or less. Gifts and Souvenirs",
    rating: 3.8,
    reviewCount: 12,
    claimed: true,
    heroImage: realImage(
      "Gimmie 5 storefront photo (from live site)",
      "/assets/images/businesses/gimme-5.png"
    ),
    gallery: [
      realImage(
        "Gimmie 5 — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/DSCF9265-scaled.jpg"
      ),
      realImage(
        "Gimmie 5 — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/DSCF9264-scaled.jpg"
      ),
      realImage(
        "Gimmie 5 — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/1000023308.png"
      ),
      realImage(
        "Gimmie 5 — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/DSCF9263-scaled.jpg"
      ),
      realImage(
        "Gimmie 5 — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/08/DSCF9262-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "krp_boutiqueb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "krp_boutiques2",
            text: "Custom printing T-shirts, Signs, Banners, Jewelry, Purses, Sunglasses and Accessories.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Custom Printing T-shirts",
    rating: 5,
    reviewCount: 1,
    claimed: true,
    heroImage: realImage(
      "Krp Boutique storefront photo (from live site)",
      "/assets/images/businesses/krp-boutique.jpg"
    ),
    gallery: [
      realImage(
        "Krp Boutique — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/KRP_CP2.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/IMG-9314-scaled.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/DSCF9202-scaled.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/IMG-9316-scaled.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/DSCF9203-scaled.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/IMG-9313-scaled.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/IMG-0119-e1583193364810.jpg"
      ),
      realImage(
        "Krp Boutique — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/01/IMG-9315-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "lovo_cigarsb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "lovo_cigarss2",
            text: "Lovo Cigars is a Boutique cigar company that has a passion for perfecting the smoking experience and a commitment to quality.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Boutique Cigar Company",
    rating: 5,
    reviewCount: 3,
    claimed: true,
    heroImage: realImage(
      "Lovo Cigars storefront photo (from live site)",
      "/assets/images/businesses/lovo-cigars.jpg"
    ),
    gallery: [
      realImage(
        "Lovo Cigars — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/20170504_115254.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/20170530_135445.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/20170414_133810.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/20170602_135817.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_20170911_105258_188.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Cigars-for-Warriors-Camo.jpg"
      ),
      realImage(
        "Lovo Cigars — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_20171010_165037_368.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "luna_devina_cob1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "luna_devina_cos2",
            text: "Step into Luna Divina, a charming little shop straight out of your dreams! With just one visit, you’ll be whisked back to your happiest childhood memories. Our carefully curated collection has something special for everyone like high-quality jewelry, adorable trinkets, and accessories featuring your favorite beloved cartoon characters.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline:
      "Whether you’re searching for a timeless treasure or a nostalgic delight, Luna Divina is your one-stop shop for magic, memories, and meaningful gifts!",
    claimed: false,
    heroImage: realImage(
      "Luna Divina Co. storefront photo (from live site)",
      "/assets/images/businesses/luna-devina-co.jpeg"
    ),
    gallery: [
      realImage(
        "Luna Divina Co. — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/03/DSC09743-scaled.jpg"
      ),
      realImage(
        "Luna Divina Co. — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/03/DSC09748-scaled.jpg"
      ),
      realImage(
        "Luna Divina Co. — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/03/DSC09758-scaled.jpg"
      ),
      realImage(
        "Luna Divina Co. — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/03/DSC09763-scaled.jpg"
      ),
      realImage(
        "Luna Divina Co. — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/03/IMG_0469-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "mikaelas_taste_of_asiab1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "mikaelas_taste_of_asias2",
            text: "Mikaela’s Taste of Asia, is where vibrant street food flavors and Asian food culture come together in one welcoming space. We serve comforting, bold, and memorable dishes inspired by traditions from across Asia, made with care and shared with heart.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "mikaelas_taste_of_asiab3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "mikaelas_taste_of_asias4",
            text: "Established in 2023 as a small food truck, Mikaela’s Taste of Asia was built on a dream to create something meaningful for our community. Through dedication and perseverance, we worked diligently toward opening our first brick and mortar location, bringing our Founder’s vision to life. Our Founder gifted Mikaela a business, and in return, we gift the world exceptional street food, made from our hands to yours.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    heroImage: realImage(
      "Mikaelas Taste of Asia storefront photo (from live site)",
      "/assets/images/businesses/mikaelas-taste-of-asia.png"
    ),
    gallery: [
      realImage(
        "Mikaelas Taste of Asia — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.30.05-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.30.27-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.30.43-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.30.53-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.31.09-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.31.28-AM.png"
      ),
      realImage(
        "Mikaelas Taste of Asia — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2026/08/Screenshot-2026-08-12-at-1.32.02-AM.png"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "ninth_island_gourmetb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "ninth_island_gourmets2",
            text: "TO PRESENT AND BRING THE TASTE OF GOURMET PRODUCTS TO YOUR TABLE NO MATTER WHERE YOU ARE!",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 5.0,
    reviewCount: 1,
    heroImage: realImage(
      "Ninth Island Gourmet storefront photo (from live site)",
      "/assets/images/businesses/ninth-island-gourmet.jpg"
    ),
    gallery: [
      realImage(
        "Ninth Island Gourmet — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/09/DSC00681-2-scaled.jpg"
      ),
      realImage(
        "Ninth Island Gourmet — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/09/DSC00689-2-scaled.jpg"
      ),
      realImage(
        "Ninth Island Gourmet — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/09/DSC00676-2-scaled.jpg"
      ),
      realImage(
        "Ninth Island Gourmet — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/09/DSC00668-2-scaled.jpg"
      ),
      realImage(
        "Ninth Island Gourmet — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/09/DSC00673-2-1-scaled.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "oak_ivyb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "oak_ivys2",
            text: "Oak & Ivy is an American craft whiskey cocktail bar dedicated to classic mixology, unique handcrafted drinks, high quality, fresh, seasonal ingredients, homemade garnishes, and mixers.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "oak_ivyb3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "oak_ivys4",
            text: "Featuring a selection of barrel-aged cocktails, rare beers and spirits; every drink we make is special and aged to perfection for a story-worthy sip every time.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 5.0,
    reviewCount: 5,
    heroImage: realImage(
      "Oak & Ivy storefront photo (from live site)",
      "/assets/images/businesses/oak-ivy.jpg"
    ),
    gallery: [
      realImage(
        "Oak & Ivy — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/20170713_OakIvy_web-16.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/IMG-3332-1.jpeg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/container.park-7-of-95.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/IMG-3372.jpeg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/20170713_OakIvy_web-13.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/IMG-3058.jpeg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/metalachi-78-of-88.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/20170713_OakIvy_web-11.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/metalachi-9-of-88.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/BulbStirTight2.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/20170713_OakIvy_web-7.jpg"
      ),
      realImage(
        "Oak & Ivy — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2017/12/20170713_OakIvy_web-9.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "pizza_zazzab1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pizza_zazzas2",
            text: "We are a family-owned business that ensures exceptional quality in everything from our pizzas to pasta and desserts. The quality of our ingredients are exceptional, we always use fresh produce and best cheese for our pizza. Stop by for a fast and fresh bite.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 4.3,
    reviewCount: 6,
    heroImage: realImage(
      "Mob Pie storefront photo (from live site)",
      "/assets/images/businesses/pizza-zazza.jpg"
    ),
    gallery: [
      realImage(
        "Mob Pie — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_3838-1.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-11-of-95.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-9169-1.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/PizzaZazza_LoadedBrownie_20201910-01-1-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/PizzaZazza_Peperoni_20201910-01-1-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC0261-2-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-12-of-95.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/DSC0266-2-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/PizzaZazza_Silvio_20201910-01-2-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/PizzaZazza2-scaled.jpg"
      ),
      realImage(
        "Mob Pie — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/PizzaZazza_Capone_20201910-03-1-scaled.jpg"
      ),
    ],
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
    claimed: true,
    heroImage: realImage(
      "Keep It Classic Las Vegas storefront photo (from live site)",
      "/assets/images/businesses/run-it-back.png"
    ),
    gallery: [
      realImage(
        "Keep It Classic Las Vegas — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.17.04-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.17.52-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.18.32-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.19.01-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.19.18-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.19.32-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.20.40-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.20.52-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.21.15-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.22.53-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.23.38-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.15.54-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 13 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.16.13-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 14 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.16.31-PM.png"
      ),
      realImage(
        "Keep It Classic Las Vegas — gallery photo 15 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2024/01/Screenshot-2024-01-01-at-3.16.50-PM.png"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "segway_las_vegasb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "segway_las_vegass2",
            text: "Segway Las Vegas is a 5-star tour company providing guided tours of Historic Downtown Las Vegas. We offer 1 and 2hr day tours.A Foodie tour on Tues, Thurs, and Saturdays, and a Fremont St night tour. At Segway Las Vegas our goal is to assist you in making the most out of your visit to Las Vegas. Everyone wants to feel like they really experienced the places they visit. After taking a tour with Segway Las Vegas you can rest assured that you really experienced Vegas. The best par is you will have the pictures to prove it!",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    claimed: false,
    heroImage: realImage(
      "Segway Las Vegas storefront photo (from live site)",
      "/assets/images/businesses/segway-las-vegas.jpg"
    ),
    gallery: [
      realImage(
        "Segway Las Vegas — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/11/WP_20180719_16_57_49_Pro.jpg"
      ),
      realImage(
        "Segway Las Vegas — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/11/WP_20160902_08_10_56_Pro.jpg"
      ),
      realImage(
        "Segway Las Vegas — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/11/IMG-2390.jpg"
      ),
      realImage(
        "Segway Las Vegas — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/11/WP_20160429_12_11_17_Pro.jpg"
      ),
      realImage(
        "Segway Las Vegas — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/11/kimandsteve-scaled.jpg"
      ),
    ],
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
    tagline: "A Vibey Little Shop!",
    rating: 5,
    reviewCount: 8,
    claimed: false,
    heroImage: realImage(
      "Shop Mama Sage storefront photo (from live site)",
      "/assets/images/businesses/shop-mama-sage.png"
    ),
    gallery: [
      realImage(
        "Shop Mama Sage — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7569.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7603.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7605.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7577.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7578.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7604.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7575.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7574.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7606.jpg"
      ),
      realImage(
        "Shop Mama Sage — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/05/IMG-7572.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "sugar_shop_candy_and_giftsb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "sugar_shop_candy_and_giftss2",
            text: "Sugar Shop Candy and Gifts is a modern version of an old fashion candy shop. Specializing in vintage sweets and treats you may not have seen in years. We also offer a unique assortment of gummy candies, premium chocolates and cane sugar sodas in glass bottles.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop", "eat-drink"] as Business["categories"],
    tagline: "Modern version of an old fashion candy shop",
    rating: 4.4,
    reviewCount: 13,
    claimed: true,
    heroImage: realImage(
      "Sugar Shop Candy & Gifts storefront photo (from live site)",
      "/assets/images/businesses/sugar-shop-candy-and-gifts.jpg"
    ),
    gallery: [
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/container.park-78-of-95.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/19105504_1451280038261814_3928786670641331182_n.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/47D11B2A-8283-45FA-99BE-DC101C821DA4.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/18920231_1446416735414811_1955510436781338433_n.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/23905484_1609148852474931_1417746449847935509_n.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/unnamed-4.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/24176932_1616015181788298_8873212378808309112_n.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-6543.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/15995301_1301066066616546_3876002036539588654_o.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/unnamed-3.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/7E552586-BD1B-4F4D-83F5-FCAC36901384.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 12 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/16708659_1333078030082016_3649715194482348104_n.jpg"
      ),
      realImage(
        "Sugar Shop Candy & Gifts — gallery photo 13 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/unnamed-2.jpg"
      ),
    ],
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
    // NEEDS CONFIRMATION: the live site's current Shop listing shows this
    // same URL (/listing/sunnys/) under the name "Pole Fitness Studio &
    // Boutique", not "Sunny's" — the business appears to have rebranded
    // since the original migration. Not renamed here since that's a bigger
    // change than this pass's scope (rating/review/claimed enrichment);
    // flagging for a decision rather than silently renaming it.
    _id: "real-sunnys",
    name: "Sunny's",
    slug: { current: "sunnys" },
    categories: ["shop"] as Business["categories"],
    rating: 5,
    reviewCount: 1,
    claimed: false,
    heroImage: realImage(
      "Sunny's storefront photo (from live site)",
      "/assets/images/businesses/sunnys.png"
    ),
    gallery: [
      realImage(
        "Sunny's — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/044261_2_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/60488594120__002CE75E-AB3F-4D01-B87A-2202AAAED24C-1-scaled.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/IMG-5494.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/Bodyd_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/Champdress_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/080263-_1_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/049300_1_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/a70159_10_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/Greeky_470x.jpg"
      ),
      realImage(
        "Sunny's — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/B5D3B369-E314-4941-86DB-3E1CB23734BE_900x.jpeg"
      ),
      realImage(
        "Sunny's — gallery photo 11 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2020/03/handzon_900x.jpg"
      ),
    ],
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
    rating: 1,
    reviewCount: 2,
    claimed: false,
    heroImage: realImage(
      "Taste Buzz Food Tours storefront photo (from live site)",
      "/assets/images/businesses/taste-buzz-food-tours.jpg"
    ),
    gallery: [
      realImage(
        "Taste Buzz Food Tours — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Downtown-BBQ-tasting.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Downtown-arts-alley-scaled.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Downtown-dessert-stop.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Downtown-local-history.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Strip-pizza.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/20220430_135316-scaled.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Souvenir-photo-Vegas-Mural-scaled.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Pork-Belly-Taco.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Downtown-Fergusons.jpg"
      ),
      realImage(
        "Taste Buzz Food Tours — gallery photo 10 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2023/07/Street-Food-Dirt-Dog.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "the_lawnb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "the_lawns2",
            text: "The Lawn at Container Park hosts a variety of fun activities throughout the week. Enjoy live entertainment on the stage, lego blocks, graffiti wall with an illuminating “DTLV” sign, checkers board, lounge chairs and much more!",
            marks: [],
          },
        ],
      },
    ],
    categories: ["attractions"] as Business["categories"],
    heroImage: realImage(
      "The Lawn storefront photo (from live site)",
      "/assets/images/businesses/the-lawn.jpg"
    ),
    gallery: [
      realImage(
        "The Lawn — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/222344374_349562996779968_8915138313680035224_n-1.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/274785802_4440587116045683_8158164360774857072_n.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/272195736_298562092328566_3530448245691377253_n.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/242426341_4462015313837581_1071928760963612612_n.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/266820720_598410711429679_7700228725437050172_n.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/241314817_540798570480340_3259907536691598858_n.jpg"
      ),
      realImage(
        "The Lawn — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/SherylCrowCP-139.jpeg"
      ),
      realImage(
        "The Lawn — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/The-Lawn-twilight-3.jpeg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "the_mantisb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "the_mantiss2",
            text: "The Mantis is 40 feet tall and 30 feet wide. She throws giant fire flames reaching six stories high. Built in 4,000 watt surround sound system, can speak more than 20 different languages, and is operated by a team of trained, licensed professionals.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "the_mantisb3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "the_mantiss4",
            text: "Every night at sundown (weather permitting) The Mantis is awakened by a drum circle celebration, where the public is welcome to participate.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["attractions"] as Business["categories"],
    rating: 5.0,
    reviewCount: 8,
    heroImage: realImage(
      "The Mantis storefront photo (from live site)",
      "/assets/images/businesses/the-mantis.jpeg"
    ),
    gallery: [
      realImage(
        "The Mantis — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/273491391_740763106896170_6157285395825608629_n-1.jpg"
      ),
      realImage(
        "The Mantis — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/mantis.jpeg"
      ),
      realImage(
        "The Mantis — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2022/03/CP-MS-2-scaled.jpg"
      ),
    ],
    address: PARK_ADDRESS,
    status: "open",
  },
  {
    _id: "real-the-nail-buzz",
    name: "The Nail Buzz",
    slug: { current: "the-nail-buzz" },
    description: [
      {
        _type: "block",
        _key: "the_nail_buzzb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "the_nail_buzzs2",
            text: "Located conveniently in the heart of Downtown Las Vegas, our salon is one of the best nail salons which are loved by all of our clients. We take our pride in delivering a great quality service.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["shop"] as Business["categories"],
    tagline: "Nail Salon in LAS VEGAS",
    rating: 5,
    reviewCount: 3,
    claimed: true,
    heroImage: realImage(
      "The Nail Buzz storefront photo (from live site)",
      "/assets/images/businesses/the-nail-buzz.png"
    ),
    gallery: [
      realImage(
        "The Nail Buzz — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/03/o.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/03/o1.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/17884208_2030366860523510_9006894652471680378_n.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/15284901_1957821967778000_93085362853992288_n.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/13895277_1894352520791612_208215902222272720_n.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/19060211_2059957444231118_4306067694511686916_n.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/16708254_1997085173851679_106963278052522432_n.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/03/NailBuzz.jpg"
      ),
      realImage(
        "The Nail Buzz — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2019/03/o2.jpg"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "the_poke_shack_grillb1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "the_poke_shack_grills2",
            text: "We are a small, locally owned Hawaiian restaurant serving fresh made-to-order appetizers, poké and plate lunch with high quality ingredients. We offer a variety of items on our menu that everyone can enjoy. Here at The Poke Shack & Grill, we strive to provide an excellent guest experience with our friendly customer service & flavorful food.",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 5.0,
    reviewCount: 1,
    heroImage: realImage(
      "The Poke Shack & Grill storefront photo (from live site)",
      "/assets/images/businesses/the-poke-shack-grill.png"
    ),
    gallery: [
      realImage(
        "The Poke Shack & Grill — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.45.56-PM.png"
      ),
      realImage(
        "The Poke Shack & Grill — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.46.06-PM.png"
      ),
      realImage(
        "The Poke Shack & Grill — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.46.17-PM.png"
      ),
      realImage(
        "The Poke Shack & Grill — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.46.30-PM.png"
      ),
      realImage(
        "The Poke Shack & Grill — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.46.59-PM.png"
      ),
    ],
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
    description: [
      {
        _type: "block",
        _key: "waffelatob1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "waffelatos2",
            text: "Delicious Gelato in our signature Hong Kong waffle made fresh in store!",
            marks: [],
          },
        ],
      },
    ],
    categories: ["eat-drink"] as Business["categories"],
    rating: 4.8,
    reviewCount: 8,
    heroImage: realImage(
      "Waffelato storefront photo (from live site)",
      "/assets/images/businesses/waffelato.jpg"
    ),
    gallery: [
      realImage(
        "Waffelato — gallery photo 1 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG_0626.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 2 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Waffle.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 3 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Cake1.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 4 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-9335.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 5 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Park-Screen.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 6 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/waffle2.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 7 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/Gelato1.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 8 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-9334.jpg"
      ),
      realImage(
        "Waffelato — gallery photo 9 (from live site)",
        "https://containerpark.wpenginepowered.com/wp-content/uploads/2018/01/IMG-9333.jpg"
      ),
    ],
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
