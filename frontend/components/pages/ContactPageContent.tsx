"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"

import { GoogleMap } from "@/components/GoogleMap"
import { ContactForm } from "@/components/ContactForm"
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations"

const eyebrow = "text-sm font-semibold uppercase tracking-[0.2em] text-brand"

const details = [
  {
    icon: faLocationDot,
    label: "Address",
    value:
      "Shop No. C-76, C-Block, Narayan Vihar, Near Narayan Vihar Police Station, Mansarovar, Jaipur-302020",
  },
  { icon: faPhone, label: "Phone", value: "+91-9352696621" },
  { icon: faEnvelope, label: "Email", value: "info@agdentaura.in" },
  {
    icon: faClock,
    label: "Hours",
    value: "Morning: 9:30 AM – 2:00 PM · Evening: 5:00 PM – 8:00 PM",
  },
]

export function ContactPageContent(): React.JSX.Element {
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
            Home / Contact Us
          </nav>
          <p className={`${eyebrow} mt-6`}>Get in touch</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.017em] text-brand sm:text-6xl">
            Contact us
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 tracking-tight text-muted-foreground">
            Reach out for appointment requests, treatment questions, or clinic information. We respond as quickly as
            possible during working hours.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[30px] border border-border bg-card p-8 shadow-[var(--shadow-card)]"
        >
          <p className={eyebrow}>Contact details</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Clinic information</h2>

          <div className="mt-8 space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex gap-3 rounded-[20px] border border-border bg-background p-5 transition-transform hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={item.icon} className="mt-1 size-4 text-brand" />
                <div>
                  <p className="text-sm font-semibold tracking-tight text-foreground">{item.label}</p>
                  <p className="text-sm tracking-tight text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ContactForm />
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 max-w-3xl space-y-4"
        >
          <p className={eyebrow}>Find us</p>
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            Visit the clinic or view the map below
          </h2>
        </motion.div>
        <GoogleMap />
      </section>
    </div>
  )
}
