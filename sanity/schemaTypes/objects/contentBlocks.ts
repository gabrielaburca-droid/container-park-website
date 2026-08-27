import { defineArrayMember, defineField, defineType } from "sanity";

// Minimal, intentionally small content-block set. This exists so page
// documents (Homepage, Visit Us, Leasing, Group Events, Contact) have
// somewhere to hold editable marketing content. It is NOT modeled after the
// Figma design yet — expect this list to grow once real page sections are
// known.

const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Hero", subtitle: "Hero block" }),
  },
});

const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Rich text block" }),
  },
});

const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption" },
    prepare: ({ title }) => ({ title: title || "Image", subtitle: "Image block" }),
  },
});

const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
    defineField({ name: "buttonUrl", title: "Button URL", type: "string" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "CTA", subtitle: "Call to action block" }),
  },
});

export const contentBlockTypes = [heroBlock, richTextBlock, imageBlock, ctaBlock];

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Content Blocks",
  type: "array",
  of: [
    defineArrayMember({ type: "heroBlock" }),
    defineArrayMember({ type: "richTextBlock" }),
    defineArrayMember({ type: "imageBlock" }),
    defineArrayMember({ type: "ctaBlock" }),
  ],
});
