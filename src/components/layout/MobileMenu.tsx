"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

interface MobileMenuProps {
  navItems: { label: string; url: string }[];
}

// The closed-state toggle button matches the mobile Figma header reference
// (plain hamburger lines, no border box). No mobile design was provided for
// the OPEN state (see Figma analysis — MOBILE: NEEDS CONFIRMATION
// throughout), so the revealed panel remains a minimal structural
// placeholder: a plain link list, no drawer/overlay/slide-in animation or
// backdrop — do not add one without a mobile design to match. Tap target
// sized to the 44x44px WCAG minimum as a baseline accessibility
// requirement, independent of that.
export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        className="flex h-11 w-11 items-center justify-center text-white"
      >
        {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full z-10 max-h-[calc(100vh-4rem)] overflow-y-auto bg-near-black px-4 pb-6"
        >
          <ul className="flex flex-col text-sm font-medium uppercase tracking-wide">
            {navItems.map((item) => (
              <li key={item.url} className="border-b border-white/10 last:border-none">
                <Link href={item.url} onClick={() => setIsOpen(false)} className="block py-3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
