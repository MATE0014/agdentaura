import type { Metadata } from "next"

import { HomePageContent } from "@/components/pages/HomePageContent"

export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description:
      "Welcome to AG Dentaura, a premium dental clinic with online appointment booking and modern patient care.",
  }
}

export default function HomePage(): React.JSX.Element {
  return <HomePageContent />
}
