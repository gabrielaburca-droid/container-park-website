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
// the current live site's own footer partner strip
// (https://downtowncontainerpark.com/ — the "middle"/"flex-gall" section of
// its rendered HTML), not invented. Four of the eleven logo assets have no
// matching entry in that strip (Oasis at Gold Spike, 701 Bridger, Gold
// Spike, The Bar) — their `link` is intentionally left unset rather than
// guessed; Footer.tsx renders those logos unlinked (no href) instead of a
// placeholder/dead link.
//
// "Corduroy" was previously mistranscribed as "Cornbury" here (no logo
// asset existed yet to check against) — corrected now that the real logo
// confirms the name.
export const PARTNERS: Partner[] = [
  { name: "Oasis at Gold Spike", logoUrl: "/assets/images/all/logo-partner01.png" },
  { name: "701 Bridger", logoUrl: "/assets/images/all/logo-partner02.png" },
  { name: "Gold Spike", logoUrl: "/assets/images/all/logo-partner03.png" },
  { name: "The Bar", logoUrl: "/assets/images/all/logo-partner04.png" },
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
