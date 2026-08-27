# CLAUDE.md — Downtown Container Park Website

Project rules for this repository. Read before making changes.

## Project

Rebuild of the Downtown Container Park (Las Vegas) website. Existing live site: https://downtowncontainerpark.com/ (WordPress — being replaced, not modified by this repo).

## Tech Stack (approved — do not change without explicit approval)

- Next.js, App Router, TypeScript, React Server Components by default
- CMS: Sanity (schemas in `sanity/schemaTypes`) — no other CMS, no custom database
- Styling: Tailwind CSS + CSS custom properties in `src/styles/tokens.css`
- Images: Sanity CDN → `next/image`
- Forms: Server Actions / API routes — email provider not yet chosen, not implemented yet
- Testing: Playwright — not yet configured, add when there's real UI to test
- Package manager: npm

## Current Phase

**Phase 1 — foundation.** No visual design implemented (Figma not yet provided). No real content exists. No redirects exist. Business detail URLs are frozen at `/listing/[slug]/`.

## Hard Rules

1. **Never invent content.** No fake businesses, events, hours, addresses, or marketing copy. Pages with no Sanity content must render an honest empty state, not placeholder data.
2. **Business detail URLs are `/listing/[slug]/`.** This matches the current production site and must be preserved. Do not create `/shop/[slug]/`, `/eat-drink/[slug]/`, `/entertainment/[slug]/`, or `/attractions/[slug]/` until the SEO migration decision is explicitly approved.
3. **Categories are multi-select.** A business can belong to more than one category. Filtering is always `categories contains X` (see `getBusinessesByCategory` in `src/lib/sanity/queries.ts`), never `category == X`.
4. **No redirects yet.** `src/data/redirects.json` is wired into `next.config.js` but must stay `[]` until an explicit redirect decision is approved. Do not add entries speculatively.
5. **Page documents use fixed IDs, not arbitrary slugs**: `page-home`, `page-visit-us`, `page-leasing`, `page-group-events`, `page-contact`. The Sanity Studio structure (`sanity/structure.ts`) only exposes these five — don't reintroduce free-form page creation without revisiting that file too.
6. **Images require alt text** at the schema level on `business.heroImage`, `business.gallery`, and `event.heroImage`.
7. **Every indexable page must produce real metadata** (title, description, canonical, OG, Twitter) via `buildMetadata()` in `src/lib/seo/metadata.ts`. The old site shipped a meta description only on its homepage — don't repeat that gap.
8. **Sitemap only includes valuable content**: core routes, real businesses, and *upcoming* events only (`src/app/sitemap.ts`). Do not resurrect the old site's tag/taxonomy archive pages or its ~812 historical event URLs.
9. **Production domain is `https://downtowncontainerpark.com`** (`NEXT_PUBLIC_SITE_URL`). Local development uses `http://localhost:3000`.
10. **Sanity fetches fail safely, but not silently.** `sanityFetch()` in `src/lib/sanity/client.ts` returns an empty-content fallback when no project is configured (expected right now). If a project *is* configured and a query genuinely fails, that error must throw in development — only production swallows-and-logs. Don't broaden this to hide real errors during local development.
11. **One real `<h1>` per page.** The old site's login modal injected multiple stray H1s on every page — don't repeat that pattern if/when auth UI is added.

## Content Model

- `business` — `categories[]` (multi-select), `hours[]`, `address`, `socialLinks`, `seo`, etc. Rendered by `src/templates/BusinessDetailTemplate.tsx` at `/listing/[slug]/`.
- `event` — single `category` (not an array — intentional, unlike business), optional `relatedBusiness` reference. Detail page implemented directly in `src/app/events/[slug]/page.tsx`, no separate template yet — extract one (mirroring `BusinessDetailTemplate`) only if a second consumer appears.
- `page` — fixed-ID singletons for Homepage / Visit Us / Leasing / Group Events / Contact, holding a minimal, intentionally small `pageBuilder` content-block array (hero, rich text, image, CTA — see `sanity/schemaTypes/objects/contentBlocks.ts` and its renderer `src/components/content/ContentBlocks.tsx`). Expect this block set to grow once the Figma design defines real, recurring page sections — extend both files together.
- `siteSettings` — singleton: navigation, footer links, park-wide hours, social links, contact info.

## Deferred / Pending Decisions (do not resolve unilaterally)

- Final business detail URL structure (may eventually move off `/listing/[slug]/`)
- Any redirects (`/visit/` → `/visit-us/`, `/book-an-event/` → `/group-events/`, `/listing-category/*` → clean category URLs, HTTP → HTTPS enforcement at the infra level, etc.)
- Fate of the old site's `/about-us/`, `/offers/`, `/insider/`, `/blog/`, `/photos/`, `/location/downtown-container-park/`
- Historical/expired event URL strategy (~812 old event URLs on the current site)
- Transactional email provider for the Contact / Leasing / Group Events forms
- Visual design — waiting on Figma

## Environment Variables

See `.env.example`. The app must build and run with all Sanity variables unset (empty-content fallback) — this is intentional while no Sanity project exists yet.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
