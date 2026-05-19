import type { Metadata } from "next"

import { ContactPageContent } from "@/components/pages/ContactPageContent"

export function generateMetadata(): Metadata {
  return {
    title: "Contact Us",
    description: "Contact AG Dentaura for appointments, questions, and clinic information.",
  }
}

export default function ContactPage(): React.JSX.Element {
  return <ContactPageContent />
}
