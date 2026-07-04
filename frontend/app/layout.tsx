import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

// Sofia substitute — a geometric sans carrying the whole system at every weight.
const sofia = Manrope({
  variable: "--font-sofia",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Modern Dental Clinic | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  category: "health",
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.8894208;75.759616",
    ICBM: "26.8894208,75.759616",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Modern Dental Clinic`,
    description: siteConfig.description,
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Modern Dental Clinic`,
    description: siteConfig.description,
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/Logo.png", type: "image/png" }],
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sofia.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <StructuredData />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
