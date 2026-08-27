import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue, Inter } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
// TEMPORARY: mock data layer for local visual QA — see CLAUDE.md.
// Swap back to "@/lib/sanity/queries" before connecting Sanity.
import { getSiteSettings } from "@/lib/mock/queries";
import { buildOrganizationJsonLd } from "@/lib/seo/structuredData";
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from "@/lib/seo/metadata";

// Bebas Neue ships one real weight (400, its display/bold-looking cut) —
// headings per Figma. Inter covers body/UI text across the weight range
// the design calls for (400/500/600/700).
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Favicon lives under the centralized asset folder (public/assets/images/all/,
// see CLAUDE.md) rather than the src/app/icon.* file convention, which would
// require duplicating it outside that folder.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/assets/images/all/favicon-downtown.png",
    shortcut: "/assets/images/all/favicon-downtown.png",
    apple: "/assets/images/all/favicon-downtown.png",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();
  const organizationJsonLd = buildOrganizationJsonLd(settings);

  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>
        {organizationJsonLd && <JsonLd data={organizationJsonLd} />}
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
