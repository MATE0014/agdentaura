import type { Metadata } from "next"

import { HomePageContent } from "@/components/pages/HomePageContent"
import { siteConfig } from "@/lib/site"

const title = "Dentist in Jaipur | Dental Clinic in Mansarovar"
const description =
  "AG Dentaura is a trusted dental clinic in Mansarovar, Jaipur offering preventive, cosmetic, restorative, and emergency dentistry with painless procedures, modern diagnostics, and easy online appointment booking."

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${siteConfig.name} — ${title}`,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: "/Logo.png",
          width: 512,
          height: 512,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${title}`,
      description,
      images: ["/Logo.png"],
    },
  }
}

export default function HomePage(): React.JSX.Element {
  return <HomePageContent />
}
