import type { Metadata } from "next";
import { Bodoni_Moda, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const sourceSerif = Source_Serif_4({
  variable: "--font-body-serif",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AG Dentaura",
    template: "%s | AG Dentaura",
  },
  description: "AG Dentaura is a modern dental clinic website with premium care, online booking, and patient-first service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${bodoniModa.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
