import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "endDate", title: "End Date", type: "datetime" }),
    defineField({
      name: "isRecurring",
      title: "Recurring Event",
      type: "boolean",
      description:
        "Drives the Events page's Recurring/Featured tabs — on means this shows under Recurring Events, off means Featured Events.",
      initialValue: false,
    }),
    defineField({
      name: "time",
      title: "Time (display text)",
      type: "string",
      description: 'e.g. "6:00 PM – 9:00 PM"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Shop", value: "shop" },
          { title: "Eat & Drink", value: "eat-drink" },
          { title: "Entertainment", value: "entertainment" },
          { title: "Attractions", value: "attractions" },
          { title: "General", value: "general" },
        ],
      },
    }),
    defineField({
      name: "relatedBusiness",
      title: "Related Business",
      type: "reference",
      to: [{ type: "business" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description:
        'Short venue label shown under the event title (e.g. "Container Park - Lawn", "Container Park - Stage and Lawn", "Oak and Ivy"). Not the same as Related Business or a street address.',
    }),
    defineField({ name: "ticketUrl", title: "Ticket / RSVP URL", type: "url" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "startDate" },
  },
});
