import type { Metadata } from "next"

import { ContactPageContent } from "@/components/pages/ContactPageContent"
import { siteConfig } from "@/lib/site"

const title = "Contact Us"
const description =
  "Contact AG Dentaura in Mansarovar, Jaipur for appointments, treatment questions, and clinic information. Find our address, phone number, email, opening hours, and location map."

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    keywords: ["contact dentist Jaipur", "dental clinic phone number Jaipur", "Mansarovar dental clinic address"],
    alternates: { canonical: "/contact" },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/contact`,
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

export default function ContactPage(): React.JSX.Element {
  return <ContactPageContent />
}
