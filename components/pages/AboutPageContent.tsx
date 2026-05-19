"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullseye, faEye, faUserTie } from "@fortawesome/free-solid-svg-icons"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { clinicValues } from "@/lib/site"
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"

export function AboutPageContent(): React.JSX.Element {
  return (
    <div className="space-y-24 pb-24">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2rem] border border-border bg-slate-50 px-6 py-12 shadow-sm dark:bg-slate-800 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">About AG Dentaura</p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-slate-800 dark:text-slate-100">About AG Dentaura</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A patient-centered clinic built around calm communication, modern dental workflows, and treatment plans that respect your time.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Home / About Us</p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Our Story</p>
          <h2 className="font-heading text-4xl font-bold text-slate-800 dark:text-slate-100">A practice shaped by trust and modern dentistry</h2>
          <div className="space-y-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            <p>
              AG Dentaura began with a simple promise: dentistry should feel precise, honest, and reassuring. From our earliest days,
              we built every touchpoint around clarity, comfort, and long-term oral health.
            </p>
            <p>
              Our mission is to make every appointment purposeful. We use digital planning, evidence-based treatment, and a warm
              communication style so that patients know what is happening and why it matters.
            </p>
            <p>
              The long-term vision is to remain a trusted destination for families, working professionals, and anyone seeking a clinic
              that values both clinical quality and a calmer patient experience.
            </p>
          </div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
          <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[2rem] bg-teal-200/50 blur-2xl dark:bg-teal-500/10" />
          <div className="relative grid h-full gap-4 rounded-[2rem] border border-border bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(248,250,252,0.98))] p-6 shadow-lg dark:bg-[linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(30,41,59,0.95))]">
            <div className="rounded-3xl border border-border bg-white p-6 dark:bg-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Clinic Snapshot</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">15+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Years of patient-focused dentistry</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">1</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Specialist and clinical support</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">2000+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Patients cared for with consistency</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">4.9★</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Average patient rating and feedback</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full border-border bg-white dark:bg-slate-800">
            <CardHeader className="space-y-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                <FontAwesomeIcon icon={faBullseye} className="size-5" />
              </span>
              <CardTitle className="font-heading text-3xl text-slate-800 dark:text-slate-100">Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 text-slate-600 dark:text-slate-300">
              To provide ethical, modern, and comfortable dental care that helps patients make informed decisions and maintain better oral health for life.
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full border-border bg-white dark:bg-slate-800">
            <CardHeader className="space-y-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                <FontAwesomeIcon icon={faEye} className="size-5" />
              </span>
              <CardTitle className="font-heading text-3xl text-slate-800 dark:text-slate-100">Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 text-slate-600 dark:text-slate-300">
              To be the clinic families trust for clear communication, advanced treatment planning, and consistently excellent patient outcomes.
            </CardContent>
          </Card>
        </motion.div>
      </section>

      

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {clinicValues.map((value) => (
            <div key={value.title} className="flex gap-4 rounded-3xl border border-border bg-slate-50 p-6 dark:bg-slate-800">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-900">
                <FontAwesomeIcon icon={value.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
