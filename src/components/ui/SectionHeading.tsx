import { EYEBROW_CLASSES, SECTION_HEADING_CLASSES } from "@/lib/ui/typography";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  align?: "left" | "center";
  className?: string;
}

// Recurring "eyebrow + heading" pattern (e.g. "DISCOVER THE PARK" / heading)
// used across nearly every section in the design.
export function SectionHeading({
  eyebrow,
  heading,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`.trim()}>
      {eyebrow && <p className={EYEBROW_CLASSES}>{eyebrow}</p>}
      <h2 className={`mt-1 text-foreground ${SECTION_HEADING_CLASSES}`}>{heading}</h2>
    </div>
  );
}
