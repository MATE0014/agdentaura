"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faStar, faWandSparkles } from "@fortawesome/free-solid-svg-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingForm } from "@/components/BookingForm"
import { useBooking } from "@/components/BookingProvider"
import {
  clinicStats,
  featuredServices,
  serviceCards,
  testimonials,
  whyChooseUs,
} from "@/lib/site"
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations"

export function HomePageContent(): React.JSX.Element {
  const { openBooking } = useBooking()

  return (
    <div className="space-y-24 pb-24">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-300">
              <FontAwesomeIcon icon={faWandSparkles} className="size-4" />
              Premium dental care in a calm, modern setting
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <h1 className="font-heading text-5xl leading-[1.05] font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-6xl lg:text-7xl">
                Welcome to AG Dentaura
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Your Smile, Our Priority — Premium Dental Care. We combine careful diagnostics, gentle
                treatment, and a patient-first experience to make every visit feel clear and comfortable.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                type="button"
                onClick={() => openBooking()}
                className="h-12 rounded-full bg-teal-600 px-6 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
              >
                Book an Appointment
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-border px-6">
                <Link href="#services">Explore Services</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
              {featuredServices.slice(0, 3).map((service) => (
                <Card key={service.title} className="border-border bg-white/90 shadow-sm dark:bg-slate-800">
                  <CardHeader className="space-y-3 pb-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                      <FontAwesomeIcon icon={service.icon} className="size-5" />
                    </span>
                    <CardTitle className="text-base text-slate-800 dark:text-slate-100">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {service.description}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />
            <Card className="relative overflow-hidden border-border bg-white/95 shadow-2xl dark:bg-slate-800/95">
              <CardHeader className="space-y-4 border-b border-border bg-slate-50/80 dark:bg-slate-800/80">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                  Why patients choose us
                </p>
                <CardTitle className="font-heading text-3xl text-slate-800 dark:text-slate-100">
                  Clear care. Calm visits. Consistent results.
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-6">
                {whyChooseUs.slice(0, 3).map((item) => (
                  <div key={item.title} className="flex flex-col gap-4 rounded-2xl border border-border bg-slate-50 p-4 dark:bg-slate-900/60 sm:flex-row sm:items-start">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-900">
                      <FontAwesomeIcon icon={item.icon} className="size-4" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-medium text-slate-800 dark:text-slate-100">{item.title}</h3>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
                  {clinicStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-border bg-slate-50 p-4 text-center dark:bg-slate-900/60">
                      <div className="font-heading text-2xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="appointment" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <BookingForm />
        </motion.div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Services</p>
          <h2 className="font-heading text-4xl font-bold text-slate-800 dark:text-slate-100">Find the right treatment for your smile</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
            Explore the care paths available at AG Dentaura, from preventive dentistry to cosmetic and restorative work.
          </p>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
          {serviceCards.slice(0, 6).map((item) => (
            <Card key={item.title} className="border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800">
              <CardHeader className="space-y-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                  <FontAwesomeIcon icon={item.icon} className="size-5" />
                </span>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</CardContent>
            </Card>
          ))}

          <div className="md:col-span-3 mt-2 flex justify-end">
            <Button asChild variant="link" className="text-teal-600 hover:text-teal-500 dark:text-teal-400">
              <Link href="/services" className="inline-flex items-center gap-2">
                View All Services <FontAwesomeIcon icon={faArrowRight} className="size-3.5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Why choose us</p>
          <h2 className="font-heading text-4xl font-bold text-slate-800 dark:text-slate-100">A clinic experience shaped around trust</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseUs.map((item) => (
            <motion.div key={item.title} variants={fadeUp} whileHover={{ y: -4 }} className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:bg-slate-800">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                <FontAwesomeIcon icon={item.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Testimonials</p>
          <h2 className="font-heading text-4xl font-bold text-slate-800 dark:text-slate-100">Patients trust the process, not just the result</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp} className="rounded-3xl border border-border bg-slate-50 p-6 shadow-sm dark:bg-slate-800">
              <div className="mb-4 flex items-center gap-1 text-teal-600 dark:text-teal-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon key={`star-${index}`} icon={faStar} className="size-3.5" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-700 dark:text-slate-200">“{testimonial.quote}”</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-teal-600 px-6 py-10 text-white shadow-xl shadow-teal-600/20 dark:bg-teal-500">
          <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {clinicStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-4xl font-bold">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
