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

const eyebrow = "text-sm font-semibold uppercase tracking-[0.2em] text-brand"
const pillOutline =
  "h-12 rounded-full border border-foreground bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
const pillGhost =
  "h-12 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
const iconTile =
  "flex size-14 items-center justify-center rounded-[22px] bg-card text-brand shadow-[var(--shadow-pill)] ring-1 ring-border/50"

export function HomePageContent(): React.JSX.Element {
  const { openBooking } = useBooking()

  return (
    <div className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
      <section className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12 lg:gap-16">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm tracking-tight text-foreground/80 shadow-[var(--shadow-pill)]"
            >
              <FontAwesomeIcon icon={faWandSparkles} className="size-4 text-brand" />
              Premium dental care in a calm, modern setting
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.017em] text-brand sm:text-5xl lg:text-6xl">
                Care You Can Trust,
                <br />
                Smile You Deserve
              </h1>
              <p className="max-w-xl text-lg leading-8 tracking-tight text-muted-foreground">
                Your smile, our priority. AG Dentaura pairs careful diagnostics, gentle treatment, and a
                patient-first experience to make every visit feel clear and comfortable.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button type="button" onClick={() => openBooking()} className={pillOutline}>
                Book an Appointment
              </Button>
              <Button asChild variant="ghost" className={pillGhost}>
                <Link href="#services">Explore Services</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-5 pt-4 sm:grid-cols-3">
              {featuredServices.slice(0, 3).map((service) => (
                <div key={service.title} className="space-y-3">
                  <span className={iconTile}>
                    <FontAwesomeIcon icon={service.icon} className="size-5" />
                  </span>
                  <p className="text-base font-medium tracking-tight text-foreground">{service.title}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative">
            <Card className="relative overflow-hidden border-0 shadow-[var(--shadow-feature)] ring-1 ring-border/60">
              <CardHeader className="space-y-4 pb-4">
                <p className={eyebrow}>Why patients choose us</p>
                <CardTitle className="text-2xl leading-tight tracking-tight text-foreground">
                  Clear care. Calm visits. Consistent results.
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {whyChooseUs.slice(0, 3).map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-[24px] border border-border bg-background p-5 sm:flex-row sm:items-start"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[18px] bg-foreground text-background">
                      <FontAwesomeIcon icon={item.icon} className="size-4" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-medium tracking-tight text-foreground">{item.title}</h3>
                      <p className="text-sm leading-6 tracking-tight text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-3">
                  {clinicStats.map((stat) => (
                    <div key={stat.label} className="rounded-[20px] border border-border bg-background p-4 text-center">
                      <div className="text-2xl font-semibold tracking-tight text-brand">{stat.value}</div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="appointment" className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <BookingForm />
        </motion.div>
      </section>

      <section id="services" className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 max-w-3xl space-y-4"
        >
          <p className={eyebrow}>Services</p>
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            Find the right treatment for your smile
          </h2>
          <p className="text-base leading-7 tracking-tight text-muted-foreground">
            Explore the care paths available at AG Dentaura, from preventive dentistry to cosmetic and restorative work.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {serviceCards.slice(0, 6).map((item) => (
            <Card
              key={item.title}
              className="border-0 ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-feature)]"
            >
              <CardHeader className="space-y-4">
                <span className={iconTile}>
                  <FontAwesomeIcon icon={item.icon} className="size-5" />
                </span>
                <CardTitle className="text-xl tracking-tight text-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 tracking-tight text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}

          <div className="mt-2 flex justify-end md:col-span-3">
            <Button asChild variant="link" className="text-brand hover:text-brand/80">
              <Link href="/services" className="inline-flex items-center gap-2">
                View All Services <FontAwesomeIcon icon={faArrowRight} className="size-3.5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 max-w-3xl space-y-4"
        >
          <p className={eyebrow}>Why choose us</p>
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            A clinic experience shaped around trust
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-[30px] border border-border bg-card p-8 shadow-[var(--shadow-card)]"
            >
              <span className={iconTile}>
                <FontAwesomeIcon icon={item.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 tracking-tight text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 max-w-3xl space-y-4"
        >
          <p className={eyebrow}>Testimonials</p>
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            Patients trust the process, not just the result
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              className="rounded-[30px] border border-border bg-card p-8 shadow-[var(--shadow-card)]"
            >
              <div className="mb-4 flex items-center gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon key={`star-${index}`} icon={faStar} className="size-3.5" />
                ))}
              </div>
              <p className="text-base leading-7 tracking-tight text-foreground/90">“{testimonial.quote}”</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold tracking-tight text-foreground">{testimonial.name}</p>
                <p className="text-sm tracking-tight text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="rounded-[45px] border border-border bg-card px-8 py-14 shadow-[var(--shadow-feature)]">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {clinicStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-semibold tracking-[-0.017em] text-brand">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
