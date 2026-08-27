import { defineField, defineType } from "sanity";

export const dayHours = defineType({
  name: "dayHours",
  title: "Day Hours",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      options: {
        list: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    }),
    defineField({ name: "open", title: "Open Time", type: "string" }),
    defineField({ name: "close", title: "Close Time", type: "string" }),
    defineField({
      name: "closed",
      title: "Closed",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { day: "day", open: "open", close: "close", closed: "closed" },
    prepare: ({ day, open, close, closed }) => ({
      title: day || "Day",
      subtitle: closed ? "Closed" : [open, close].filter(Boolean).join(" – "),
    }),
  },
});
