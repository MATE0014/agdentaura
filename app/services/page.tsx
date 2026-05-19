import type { Metadata } from "next"

import { ServicesPageContent } from "@/components/pages/ServicesPageContent"

export function generateMetadata(): Metadata {
  return {
    title: "Services",
    description: "Explore AG Dentaura services including preventive, cosmetic, restorative, pediatric, and emergency dental care.",
  }
}

export default function ServicesPage(): React.JSX.Element {
  return <ServicesPageContent />
}
