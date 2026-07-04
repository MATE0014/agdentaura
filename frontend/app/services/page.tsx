import type { Metadata } from "next"

import { ServicesPageContent } from "@/components/pages/ServicesPageContent"
import { siteConfig } from "@/lib/site"

const title = "Dental Services"
const description =
  "Explore AG Dentaura's dental services in Jaipur: check-ups, cleaning and gum care, tooth-colored fillings, root canals, crowns and bridges, teeth whitening, braces and clear aligners, implants, kids' dentistry, and emergency care."

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    keywords: [
      "dental services",
      "teeth cleaning",
      "root canal",
      "crowns and bridges",
      "teeth whitening",
      "clear aligners",
      "dental implants",
      "emergency dentist",
      "dental services in Jaipur",
      "dental clinic in Mansarovar",
    ],
    alternates: { canonical: "/services" },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/services`,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      images: ["/Logo.png"],
    },
  }
}

export default function ServicesPage(): React.JSX.Element {
  return <ServicesPageContent />
}
