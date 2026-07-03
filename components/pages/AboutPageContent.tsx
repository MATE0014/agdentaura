"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullseye, faEye } from "@fortawesome/free-solid-svg-icons"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { clinicValues } from "@/lib/site"
import { slideInLeft, slideInRight, fadeUp } from "@/lib/animations"

const eyebrow = "text-sm font-semibold uppercase tracking-[0.2em] text-brand"
const iconTile =
  "flex size-14 items-center justify-center rounded-[22px] bg-card text-brand shadow-[var(--shadow-pill)] ring-1 ring-border/50"

export function AboutPageContent(): React.JSX.Element {
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
            Home / About Us
          </nav>
          <p className={`${eyebrow} mt-6`}>About the clinic</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.017em] text-brand sm:text-6xl">
            About AG Dentaura
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 tracking-tight text-muted-foreground">
            A patient-centered clinic built around calm communication, modern dental workflows, and treatment plans
            that respect your time.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className={eyebrow}>Our story</p>
          <h2 className="text-4xl font-semibold tracking-[-0.017em] text-foreground sm:text-5xl">
            A practice shaped by trust and modern dentistry
          </h2>
          <div className="space-y-4 text-base leading-7 tracking-tight text-muted-foreground">
            <p>
              AG Dentaura began with a simple promise: dentistry should feel precise, honest, and reassuring. From our
              earliest days, we built every touchpoint around clarity, comfort, and long-term oral health.
            </p>
            <p>
              Our mission is to make every appointment purposeful. We use digital planning, evidence-based treatment,
              and a warm communication style so that patients know what is happening and why it matters.
            </p>
            <p>
              The long-term vision is to remain a trusted destination for families, working professionals, and anyone
              seeking a clinic that values both clinical quality and a calmer patient experience.
            </p>
          </div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="rounded-[45px] border border-border bg-card p-8 shadow-[var(--shadow-feature)]">
            <p className={eyebrow}>Clinic snapshot</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { value: "15+", label: "Years of patient-focused dentistry" },
                { value: "10+", label: "Specialists and clinical support" },
                { value: "2000+", label: "Patients cared for with consistency" },
                { value: "4.9★", label: "Average patient rating and feedback" },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-border bg-background p-5">
                  <div className="text-3xl font-semibold tracking-tight text-brand">{item.value}</div>
                  <p className="mt-1 text-sm tracking-tight text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-6 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full border-0 ring-1 ring-border/60">
            <CardHeader className="space-y-4">
              <span className={iconTile}>
                <FontAwesomeIcon icon={faBullseye} className="size-6" />
              </span>
              <CardTitle className="text-3xl tracking-tight text-foreground">Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 tracking-tight text-muted-foreground">
              To provide ethical, modern, and comfortable dental care that helps patients make informed decisions and
              maintain better oral health for life.
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full border-0 ring-1 ring-border/60">
            <CardHeader className="space-y-4">
              <span className={iconTile}>
                <FontAwesomeIcon icon={faEye} className="size-6" />
              </span>
              <CardTitle className="text-3xl tracking-tight text-foreground">Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 tracking-tight text-muted-foreground">
              To be the clinic families trust for clear communication, advanced treatment planning, and consistently
              excellent patient outcomes.
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {clinicValues.map((value) => (
            <div
              key={value.title}
              className="flex gap-4 rounded-[30px] border border-border bg-card p-8 shadow-[var(--shadow-card)]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[18px] bg-foreground text-background">
                <FontAwesomeIcon icon={value.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 tracking-tight text-muted-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
