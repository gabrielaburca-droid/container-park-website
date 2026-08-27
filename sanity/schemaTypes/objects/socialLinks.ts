import { defineField, defineType } from "sanity";

export const socialLinks = defineType({
  name: "socialLinks",
  title: "Social Links",
  type: "object",
  fields: [
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
    defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
    defineField({ name: "tripadvisor", title: "Tripadvisor URL", type: "url" }),
  ],
});
