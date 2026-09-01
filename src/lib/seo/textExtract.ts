import type { PortableTextBlock } from "@/lib/sanity/types";

// Plain text from Portable Text blocks — just the real span text within
// "block" nodes, concatenated. No formatting/markup is added or invented;
// this only reads out text that's already there, for use as a meta
// description when no dedicated short description exists.
export function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks) return "";
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      const children = (block.children as { text?: string }[] | undefined) ?? [];
      return children.map((child) => child.text ?? "").join("");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const META_DESCRIPTION_MAX_LENGTH = 155;

// Cuts at the last word boundary within the limit rather than mid-word —
// only ever shortens real existing text, never pads or invents content.
export function truncateDescription(
  text: string,
  maxLength = META_DESCRIPTION_MAX_LENGTH
): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
