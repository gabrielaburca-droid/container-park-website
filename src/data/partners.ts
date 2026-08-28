export interface Partner {
  name: string;
  logoUrl: string;
  /** Left unset when no destination could be verified — see the note
   * below. Never guessed/invented. */
  link?: string;
  /** True only for a partner that points back into this site (Container
   * Park itself) — rendered as an internal Link, not an external anchor. */
  internal?: boolean;
}

// Real logo assets: public/assets/images/all/logo-partner01.png..11.png,
// kept in that exact numeric order — matches the "Our Partners" grid order
// in the Figma footer export.
//
// `link` values are the verified destinations transcribed directly from
// real, existing sources — not invented:
//  - the current live site's own footer partner strip
//    (https://downtowncontainerpark.com/ — the "middle"/"flex-gall" section
//    of its rendered HTML), and
//  - the DTP real-estate portfolio page (https://dtplv.com/real-estate/,
//    itself one of these verified partner links), whose own footer logo
//    gallery confirmed "701 Bridger" and "The Bar" both link to the DTP
//    parent site (https://dtplv.com) rather than a dedicated property
//    domain — a real, existing destination, not a placeholder.
//
// "Oasis at Gold Spike" (logo-partner01.png) had no matching entry in
// either source and was removed from this list entirely at the user's
// request, rather than rendered unlinked — the asset file itself is
// untouched in case a real link surfaces later.
//
// "Gold Spike" (logo-partner03.png) has the same problem — no verified
// link in either source — and is still in this list, still rendered
// unlinked by Footer.tsx (see PartnerLogo), because removing it wasn't
// part of that request. Flagging it here since it's the one remaining
// logo without a real destination.
//
// "Corduroy" was previously mistranscribed as "Cornbury" here (no logo
// asset existed yet to check against) — corrected now that the real logo
// confirms the name.
export const PARTNERS: Partner[] = [
  {
    name: "701 Bridger",
    logoUrl: "/assets/images/all/logo-partner02.png",
    link: "https://dtplv.com",
  },
  { name: "Gold Spike", logoUrl: "/assets/images/all/logo-partner03.png" },
  {
    name: "The Bar",
    logoUrl: "/assets/images/all/logo-partner04.png",
    link: "https://dtplv.com",
  },
  {
    name: "Explore DTLV",
    logoUrl: "/assets/images/all/logo-partner05.png",
    link: "https://exploredtlv.com/",
  },
  {
    name: "Container Park",
    logoUrl: "/assets/images/all/logo-partner06.png",
    link: "/",
    internal: true,
  },
  {
    name: "Oak & Ivy",
    logoUrl: "/assets/images/all/logo-partner07.png",
    link: "https://oakandivy.com/",
  },
  {
    name: "Fergusons Downtown",
    logoUrl: "/assets/images/all/logo-partner08.png",
    link: "https://www.fergusonsdowntown.com/",
  },
  {
    name: "Downtown Terrace",
    logoUrl: "/assets/images/all/logo-partner09.png",
    link: "https://downtownterracelv.com/",
  },
  {
    name: "Corduroy",
    logoUrl: "/assets/images/all/logo-partner10.png",
    link: "https://corduroylv.com/",
  },
  {
    name: "DTP",
    logoUrl: "/assets/images/all/logo-partner11.png",
    link: "https://dtplv.com/real-estate",
  },
];
