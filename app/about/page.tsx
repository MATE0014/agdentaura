import type { Metadata } from "next"

import { AboutPageContent } from "@/components/pages/AboutPageContent"

export function generateMetadata(): Metadata {
  return {
    title: "About Us",
    description: "Learn about AG Dentaura, our mission, and our vision.",
  }
}

export default function AboutPage(): React.JSX.Element {
  return <AboutPageContent />
}
