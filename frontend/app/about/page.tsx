import type { Metadata } from "next"

import { AboutPageContent } from "@/components/pages/AboutPageContent"
import { siteConfig } from "@/lib/site"

const title = "About Us"
const description =
  "Learn about AG Dentaura, a patient-first dental clinic in Mansarovar, Jaipur built around clear communication, modern dental workflows, experienced specialists, and treatment plans that respect your time."

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    keywords: ["about AG Dentaura", "dental clinic in Jaipur", "dentist in Mansarovar Jaipur"],
    alternates: { canonical: "/about" },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/about`,
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

export default function AboutPage(): React.JSX.Element {
  return <AboutPageContent />
}
