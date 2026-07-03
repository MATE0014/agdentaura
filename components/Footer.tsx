"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"

import { footerLinks, socialLinks } from "@/lib/site"

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center overflow-hidden rounded-[18px] bg-card shadow-[var(--shadow-pill)]">
                <Image
                  src="/Logo.png"
                  alt="AG Dentaura Dental Clinic logo"
                  width={44}
                  height={44}
                  className="size-full object-contain"
                />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-foreground">AG Dentaura Dental Clinic</p>
                <p className="text-sm tracking-tight text-muted-foreground">Care You Can Trust, Smile You Deserve</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-brand hover:text-brand"
                >
                  <FontAwesomeIcon icon={link.icon} className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Quick Links</h2>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-brand"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="size-3 text-brand" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Contact Us</h2>
            <address className="space-y-3 text-sm not-italic tracking-tight text-muted-foreground">
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 size-4 text-brand" />
                <span>Shop No. C-76, C-Block, Narayan Vihar, Near Narayan Vihar Police Station, Mansarovar, Jaipur-302020</span>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faPhone} className="mt-1 size-4 text-brand" />
                <a href="tel:+919352696621" className="transition-colors hover:text-brand">+91-9352696621</a>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="mt-1 size-4 text-brand" />
                <a href="mailto:info@agdentaura.in" className="transition-colors hover:text-brand">info@agdentaura.in</a>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faClock} className="mt-1 size-4 text-brand" />
                  <span>Morning: 9:30 AM – 2:00 PM</span>
                </div>
                <span className="pl-6">Evening: 5:00 PM – 8:00 PM</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm tracking-tight text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 AG Dentaura Dental Clinic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-brand">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
