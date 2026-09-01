import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type ButtonVariant = "filled" | "outline" | "dark" | "outline-light";

// Per the Figma normal/hover reference, every variant converges on the same
// lime-filled look on hover/focus — "filled" is already there (only its
// arrow animates), the others additionally cross-fade their
// background/text/border to match.
//
// IMPORTANT: every hover/focus/group-* variant below is written as a full,
// literal class string (two complete branches — real vs. `visual`), never
// built by interpolating a "hover"/"group-hover" prefix into a template
// literal (e.g. `${hoverPrefix}:bg-lime`). Tailwind's class scanner only
// ever sees the raw, unevaluated source text — it can't run this file's JS
// to resolve a variable prefix into `hover:bg-lime` — so an interpolated
// class name is silently never generated into the compiled CSS. That was
// the actual bug behind every Button-based CTA sitewide having a
// completely inert hover/focus state (color, arrow rotation, and arrow
// color-crossfade all no-ops): the classes referenced real, valid utilities,
// but under names that never made it into the stylesheet. Keep every
// variant spelled out in full here, however repetitive it looks.
const HOVER_FILL_CLASSES = {
  real: "hover:bg-lime hover:text-lime-foreground hover:border-lime focus-visible:bg-lime focus-visible:text-lime-foreground focus-visible:border-lime",
  visual:
    "group-hover:bg-lime group-hover:text-lime-foreground group-hover:border-lime group-focus-visible:bg-lime group-focus-visible:text-lime-foreground group-focus-visible:border-lime",
} as const;

function variantClasses(variant: ButtonVariant, visual: boolean) {
  const fill = visual ? HOVER_FILL_CLASSES.visual : HOVER_FILL_CLASSES.real;
  const classes: Record<ButtonVariant, string> = {
    filled: "bg-lime text-lime-foreground border border-lime",
    outline: `bg-transparent text-foreground border border-foreground ${fill}`,
    dark: `bg-near-black text-near-black-foreground border border-near-black ${fill}`,
    // Same shape/behavior as "outline", just light-on-dark at rest — for
    // outline buttons that sit directly on a dark/photo background (e.g.
    // the homepage Hero) instead of "outline"'s light-background use
    // elsewhere.
    "outline-light": `bg-transparent text-white border border-white ${fill}`,
  };
  return classes[variant];
}

// Real brand asset (public/assets/images/all/) — same diagonal arrow glyph,
// pre-colored per background. Rotated 90deg on hover/focus (up-right ->
// down-right) rather than swapped for a different shape, matching Figma.
const ARROW_ASSET = {
  black: "/assets/images/all/arrow-black-button.svg",
  white: "/assets/images/all/arrow-white-button.svg",
} as const;

// "dark" and "outline-light" both start with a white arrow (dark
// background) and must cross-fade to a black arrow once the background
// flips to lime on hover; "filled"/"outline" keep the same arrow color in
// both states.
const ARROW_VARIANT: Record<
  ButtonVariant,
  { rest: keyof typeof ARROW_ASSET; hover: keyof typeof ARROW_ASSET }
> = {
  filled: { rest: "black", hover: "black" },
  outline: { rest: "black", hover: "black" },
  dark: { rest: "white", hover: "black" },
  "outline-light": { rest: "white", hover: "black" },
};

// The arrow is always a *descendant* reacting to whichever element carries
// "group" — the Link/button itself in real (non-visual) mode (it adds
// "group" to its own class list below), or an external ancestor in visual
// mode (see the `visual` prop doc). Either way that's `group-hover:` /
// `group-focus-visible:`, never bare `hover:`/`focus-visible:` on the arrow
// itself — bare `hover:` on this small icon would only fire while the
// pointer sits exactly over its 16px box, not anywhere else on the button,
// which is the second bug this fixes (found via computed-style hover
// testing): color/background transitions now react to hovering the whole
// button, but the arrow only rotated when the icon itself was hovered.
const ARROW_ROTATE_CLASSES = "group-hover:rotate-90 group-focus-visible:rotate-90";
const ARROW_FADE_OUT_CLASSES = "group-hover:opacity-0 group-focus-visible:opacity-0";
const ARROW_FADE_IN_CLASSES = "group-hover:opacity-100 group-focus-visible:opacity-100";

// Bebas Neue (font-display), 16px at desktop (lg:) — global button
// typography. No font-weight utility: Bebas Neue only ships one real
// weight (already its bold-looking display cut), and no tracking-wide
// either — unlike Inter, a condensed display face doesn't need extra
// letter-spacing to read as a deliberate UI label, and stretching it
// further at 16px would start to look loose rather than crisp.
// Mobile is 15px (text-[15px]); sm: restores the original text-xs (12px)
// so tablet/desktop stay exactly as they were before this change.
//
// Two variants of the transition-property declaration, picked by
// `expandOnHover` (see that prop): the default only transitions color/
// border (`transition-colors`); the opt-in "expand" treatment (Newsletter's
// submit CTA) additionally needs `transform` in the same rule. These must
// be two complete, mutually-exclusive class strings rather than both
// `transition-colors` and `transition-transform` present together — two
// separate `transition-*` utilities both set the single `transition-
// property` CSS declaration, so whichever one Tailwind happens to emit
// later in the stylesheet would silently win and the other would be
// dropped, not merged. One arbitrary-value utility naming every property
// avoids that.
const TRANSITION_CLASSES = "transition-colors duration-200 ease-out";
const TRANSITION_WITH_SCALE_CLASSES =
  "transition-[color,background-color,border-color,transform] duration-200 ease-out";

function baseClasses(expandOnHover: boolean) {
  const transition = expandOnHover ? TRANSITION_WITH_SCALE_CLASSES : TRANSITION_CLASSES;
  return `inline-flex items-center gap-2 px-5 py-3 font-display text-[15px] uppercase ${transition} disabled:pointer-events-none disabled:opacity-60 sm:text-xs lg:text-[16px]`;
}

// Opt-in, subtle "background opens up" hover treatment (Newsletter's dark
// submit CTA, per its Figma reference) — the whole button scales up
// slightly around its own center, so the label/arrow (which scale as one
// rigid unit with it) never shift relative to each other or jump, and nothing
// outside the button reflows (a CSS transform never affects layout/sibling
// positions, unlike animating width/padding directly would). Both
// real/visual branches are spelled out for the same reason as
// HOVER_FILL_CLASSES above, even though only the "real" branch has a
// consumer today — a `visual` + `expandOnHover` button in the future needs
// this to already be correct, not silently inert.
const EXPAND_HOVER_CLASSES = {
  real: "hover:scale-[1.04] focus-visible:scale-[1.04]",
  visual: "group-hover:scale-[1.04] group-focus-visible:scale-[1.04]",
} as const;

interface ButtonProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
  /** Renders a purely visual <span> with identical styling instead of a
   * real <a>/<button> — no href/onClick/disabled behavior, and no own
   * hover/focus state of its own; it reacts to an ancestor element's
   * hover/focus instead (that ancestor must carry className="group").
   * For cases where this button's look needs to appear nested inside a
   * larger element that's already the real interactive target (e.g. a
   * whole-card link) — using a real <a>/<button> there would create an
   * invalid nested interactive element. */
  visual?: boolean;
  /** Opt-in subtle scale-up on hover/focus (see EXPAND_HOVER_CLASSES above)
   * — off by default so every other Button call site keeps its existing
   * color-only hover. Turn on per call site for a design that specifically
   * asks for the background to "open/expand" on hover, not sitewide. */
  expandOnHover?: boolean;
}

// Fast (200ms), subtle rotation + color cross-fade — no scale/bounce/shadow,
// per the "premium, not exaggerated" brief. The button's own padding/border
// never changes between rest and hover (only `transition-colors` properties
// + the arrow's own transform/opacity animate), so the button never jumps,
// shifts, or changes dimensions, and the label text never moves.
function ButtonArrow({ variant }: { variant: ButtonVariant }) {
  const { rest, hover } = ARROW_VARIANT[variant];
  const colorChanges = rest !== hover;

  return (
    <span
      aria-hidden="true"
      className={`relative inline-block h-4 w-4 shrink-0 transition-transform duration-200 ease-out ${ARROW_ROTATE_CLASSES}`}
    >
      <Image
        src={ARROW_ASSET[rest]}
        alt=""
        width={22}
        height={22}
        className={`absolute inset-0 h-full w-full object-contain ${
          colorChanges ? `transition-opacity duration-200 ease-out ${ARROW_FADE_OUT_CLASSES}` : ""
        }`}
      />
      {colorChanges && (
        <Image
          src={ARROW_ASSET[hover]}
          alt=""
          width={22}
          height={22}
          className={`absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 ease-out ${ARROW_FADE_IN_CLASSES}`}
        />
      )}
    </span>
  );
}

export function Button({
  variant = "filled",
  showArrow = true,
  children,
  className = "",
  href,
  download,
  type = "button",
  disabled,
  title,
  onClick,
  visual = false,
  expandOnHover = false,
}: ButtonProps) {
  const expandClasses = expandOnHover
    ? visual
      ? EXPAND_HOVER_CLASSES.visual
      : EXPAND_HOVER_CLASSES.real
    : "";
  const classes = `${visual ? "" : "group "}${baseClasses(expandOnHover)} ${variantClasses(variant, visual)} ${expandClasses} ${className}`.trim();
  const arrow = showArrow && <ButtonArrow variant={variant} />;

  if (visual) {
    return (
      <span className={classes} title={title}>
        {children}
        {arrow}
      </span>
    );
  }

  if (href) {
    // Anything that isn't an internal app route (relative "/..." path) gets
    // a plain anchor — covers external https:// links AND non-navigable
    // schemes like the iCal export's "data:" URI, which next/link's
    // client-side router isn't meant to handle.
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={classes} title={title}>
          {children}
          {arrow}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        title={title}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} title={title} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
