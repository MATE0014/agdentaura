"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"

import { GoogleMap } from "@/components/GoogleMap"
import { ContactForm } from "@/components/ContactForm"
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations"

export function ContactPageContent(): React.JSX.Element {
  return (
    <div className="space-y-24 pb-24">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2rem] border border-border bg-slate-50 px-6 py-12 shadow-sm dark:bg-slate-800 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Contact Us</p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-slate-800 dark:text-slate-100">Contact Us</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Reach out for appointment requests, treatment questions, or clinic information. We respond as quickly as possible during working hours.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Home / Contact Us</p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:bg-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Contact Details</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-slate-800 dark:text-slate-100">Clinic information</h2>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3 rounded-2xl border border-border bg-slate-50 p-4 transition-transform hover:-translate-y-0.5 dark:bg-slate-900/60">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Address</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">123 Dental Street, Your City - 000000</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border bg-slate-50 p-4 transition-transform hover:-translate-y-0.5 dark:bg-slate-900/60">
              <FontAwesomeIcon icon={faPhone} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Phone</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">+91-XXXXXXXXXX</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border bg-slate-50 p-4 transition-transform hover:-translate-y-0.5 dark:bg-slate-900/60">
              <FontAwesomeIcon icon={faEnvelope} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Email</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">info@agdentaura.com</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border bg-slate-50 p-4 transition-transform hover:-translate-y-0.5 dark:bg-slate-900/60">
              <FontAwesomeIcon icon={faClock} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Hours</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Mon–Sat, 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ContactForm />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6 max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Find Us</p>
          <h2 className="font-heading text-4xl font-bold text-slate-800 dark:text-slate-100">Visit the clinic or view the map below</h2>
        </motion.div>
        <GoogleMap />
      </section>
    </div>
  )
}
