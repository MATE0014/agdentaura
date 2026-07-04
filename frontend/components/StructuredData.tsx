import { serviceCards, siteConfig } from "@/lib/site"

/**
 * Server-rendered JSON-LD for rich results.
 * Emits a Dentist (LocalBusiness) graph plus the service catalog and the
 * website entity, so search engines can surface the clinic, its hours,
 * location, offered treatments, and a sitelinks search box.
 */
export function StructuredData(): React.JSX.Element {
  const validSameAs = siteConfig.sameAs.filter((profileUrl) => {
    try {
      const parsed = new URL(profileUrl)
      return parsed.pathname !== "/" && parsed.pathname !== ""
    } catch {
      return false
    }
  })

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        "@id": `${siteConfig.url}/#clinic`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        image: `${siteConfig.url}/Logo.png`,
        logo: `${siteConfig.url}/Logo.png`,
        hasMap:
          "https://www.google.com/maps?q=AG+Dentaura+Dental+Clinic,+Shop+No.+C-76,+C-Block,+Narayan+Vihar,+Mansarovar,+Jaipur+302020",
        priceRange: "$$",
        currenciesAccepted: "INR",
        areaServed: {
          "@type": "City",
          name: "Jaipur",
        },
        availableLanguage: ["English", "Hindi"],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        openingHours: siteConfig.hours,
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        sameAs: validSameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.telephone,
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
        medicalSpecialty: "Dentistry",
        employee: {
          "@type": "Physician",
          name: siteConfig.doctor.name,
          jobTitle: siteConfig.doctor.qualification,
          identifier: siteConfig.doctor.registrationNumber,
          medicalSpecialty: "Dentistry",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dental Services",
          itemListElement: serviceCards.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#clinic` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/services?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
