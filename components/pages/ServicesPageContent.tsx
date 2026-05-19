"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingServiceOptions, serviceCards } from "@/lib/site"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { useBooking } from "@/components/BookingProvider"

function getBookingServiceValue(serviceTitle: string): string {
  return bookingServiceOptions.find((option) => option.label === serviceTitle)?.value ?? ""
}

export function ServicesPageContent(): React.JSX.Element {
  const { openBooking } = useBooking()

  return (
    <div className="space-y-24 pb-24">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2rem] border border-border bg-slate-50 px-6 py-12 shadow-sm dark:bg-slate-800 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Services</p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-slate-800 dark:text-slate-100">Services</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Browse the core treatments available at AG Dentaura, including preventive, restorative, cosmetic, and urgent dental care.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Home / Services</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service) => (
            <motion.div key={service.title} variants={fadeUp} whileHover={{ y: -4 }} className="h-full">
              <Card className="h-full border-border bg-white shadow-sm dark:bg-slate-800">
                <CardHeader className="space-y-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                    <FontAwesomeIcon icon={service.icon} className="size-6" />
                  </span>
                  <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <p>{service.description}</p>
                  <Button
                    type="button"
                    onClick={() => openBooking(getBookingServiceValue(service.title))}
                    className="h-11 rounded-full bg-teal-600 px-5 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-teal-600 px-6 py-10 text-center text-white shadow-xl shadow-teal-600/20 dark:bg-teal-500">
          <h2 className="font-heading text-4xl font-bold">Not sure which service you need?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Book a free consultation and let the doctor recommend the right treatment plan for your goals and timeline.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => openBooking()} className="h-11 rounded-full bg-white px-6 text-teal-700 hover:bg-white/90 dark:bg-slate-900 dark:text-teal-300">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
