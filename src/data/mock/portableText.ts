import type { PortableTextBlock } from "@/lib/sanity/types";

let blockKey = 0;

// Minimal Portable Text builder for mock content — just enough shape for
// @portabletext/react to render plain paragraphs.
export function portableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: `mock-block-${blockKey++}`,
    style: "normal",
    children: [{ _type: "span", _key: `mock-span-${blockKey++}`, text, marks: [] }],
    markDefs: [],
  }));
}
