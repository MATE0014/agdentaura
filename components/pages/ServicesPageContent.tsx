"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingServiceOptions, serviceCards } from "@/lib/site"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { useBooking } from "@/components/BookingProvider"

const eyebrow = "text-sm font-semibold uppercase tracking-[0.2em] text-brand"
const iconTile =
  "flex size-14 items-center justify-center rounded-[22px] bg-card text-brand shadow-[var(--shadow-pill)] ring-1 ring-border/50"
const pillOutline =
  "h-11 rounded-full border border-foreground bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"

function getBookingServiceValue(serviceTitle: string): string {
  return bookingServiceOptions.find((option) => option.label === serviceTitle)?.value ?? ""
}

export function ServicesPageContent(): React.JSX.Element {
  const { openBooking } = useBooking()

  return (
    <div className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
      <section className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-[28px] border border-border bg-card px-6 py-12 shadow-[var(--shadow-feature)] sm:rounded-[45px] sm:px-12 sm:py-16"
        >
          <nav aria-label="Breadcrumb" className="text-sm tracking-tight text-muted-foreground">
            Home / Services
          </nav>
          <p className={`${eyebrow} mt-6`}>What we treat</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.017em] text-brand sm:text-6xl">
            Dental services
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 tracking-tight text-muted-foreground">
            Browse the core treatments available at AG Dentaura, including preventive, restorative, cosmetic, and urgent
            dental care.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {serviceCards.map((service) => (
            <motion.div key={service.title} variants={fadeUp} whileHover={{ y: -4 }} className="h-full">
              <Card className="h-full border-0 ring-1 ring-border/60">
                <CardHeader className="space-y-4">
                  <span className={iconTile}>
                    <FontAwesomeIcon icon={service.icon} className="size-6" />
                  </span>
                  <CardTitle className="text-2xl tracking-tight text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm leading-6 tracking-tight text-muted-foreground">
                  <p>{service.description}</p>
                  <Button
                    type="button"
                    onClick={() => openBooking(getBookingServiceValue(service.title))}
                    className={pillOutline}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="rounded-[45px] border border-border bg-card px-8 py-16 text-center shadow-[var(--shadow-feature)]">
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            Not sure which service you need?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 tracking-tight text-muted-foreground">
            Book a free consultation and let the doctor recommend the right treatment plan for your goals and timeline.
          </p>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => openBooking()} className={pillOutline}>
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
