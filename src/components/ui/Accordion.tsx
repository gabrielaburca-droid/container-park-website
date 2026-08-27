"use client";

import { useState, type ReactNode } from "react";

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
// source design; panels toggle instantly (no slide/fade).
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
    <div className="divide-y divide-border border-t border-border">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium uppercase"
              >
                {item.title}
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    isOpen ? "bg-lime text-lime-foreground" : "text-foreground"
                  }`}
                >
                  {isOpen ? "▲" : "▼"}
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
