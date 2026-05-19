"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
  faTooth,
} from "@fortawesome/free-solid-svg-icons"

import { footerLinks, socialLinks } from "@/lib/site"

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-900">
                <FontAwesomeIcon icon={faTooth} className="size-5" />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold text-slate-800 dark:text-slate-100">AG Dentaura</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your Smile, Our Priority</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-slate-50 text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-teal-400"
                >
                  <FontAwesomeIcon icon={link.icon} className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-slate-800 dark:text-slate-100">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="size-3 text-teal-600 dark:text-teal-400" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-slate-800 dark:text-slate-100">Contact Us</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
                <span>123 Dental Street, Your City - 000000</span>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faPhone} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
                <span>+91-XXXXXXXXXX</span>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
                <span>info@agdentaura.com</span>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faClock} className="mt-1 size-4 text-teal-600 dark:text-teal-400" />
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 AG Dentaura. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-teal-600 dark:hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-teal-600 dark:hover:text-teal-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
