"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
}

// ANIMATION: NEEDS CONFIRMATION — no transition/motion is visible in the
// source design; panels toggle instantly (no slide/fade) — only the
// arrow's own rotation animates.
// INTERACTION: NEEDS CONFIRMATION whether this should be single-open
// (opening one closes the others) or multi-open. The design shows exactly
// one item expanded and three collapsed, which is suggestive but not
// conclusive either way — implemented below as independent multi-open
// toggles, the least-presumptuous default.
export function Accordion({ items }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((openId) => openId !== id) : [...current, id]
    );
  }

  return (
    // `divide-y` (not a `border-t` on the outer wrapper) is what gives
    // every item a border-top EXCEPT the first — divide-y only inserts a
    // border between adjacent children, never before the first or after
    // the last, so no first:-item override is needed for the border
    // itself (only for its own top padding, below).
    <div className="divide-y divide-border">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="pt-4 first:pt-0">
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 pb-4 text-left font-display text-sm uppercase lg:text-[24px]"
              >
                {item.title}
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    isOpen ? "bg-lime" : ""
                  }`}
                >
                  {/* Real project asset (public/assets/images/all/arrow-down.svg)
                      — same glyph in both states, rotated 180° when open
                      rather than swapped for a different icon. */}
                  <Image
                    src="/assets/images/all/arrow-down.svg"
                    alt=""
                    width={13}
                    height={8}
                    className={`h-2 w-auto transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={`accordion-panel-${item.id}`} className="pb-4 text-sm text-muted">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
