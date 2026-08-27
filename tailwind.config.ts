import type { Config } from "tailwindcss";

// Maps CSS custom properties (src/styles/tokens.css) into Tailwind's theme so
// components can use e.g. `bg-lime` instead of `bg-[var(--color-lime)]`.
// Token values themselves are estimates read from Figma JPEG exports —
// update tokens.css, not this file, once real values are confirmed.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: "var(--color-lime)",
          foreground: "var(--color-lime-foreground)",
        },
        "near-black": {
          DEFAULT: "var(--color-near-black)",
          foreground: "var(--color-near-black-foreground)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        "status-closed": "var(--color-status-closed)",
        rating: "var(--color-rating)",
        "footer-background": "var(--color-footer-background)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        full: "var(--radius-full)",
      },
    },
  },
  plugins: [],
};

export default config;
