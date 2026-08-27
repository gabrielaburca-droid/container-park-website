import { defineField, defineType } from "sanity";

// Singleton document — see sanity/structure.ts for the fixed "siteSettings" id.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "parkHours",
      title: "Park-Wide Hours",
      type: "array",
      of: [{ type: "dayHours" }],
    }),
    defineField({ name: "socialLinks", title: "Social Links", type: "socialLinks" }),
    defineField({ name: "address", title: "Address", type: "address" }),
    defineField({ name: "phone", title: "General Phone", type: "string" }),
    defineField({ name: "email", title: "General Email", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
