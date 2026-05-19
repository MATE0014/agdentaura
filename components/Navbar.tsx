"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronRight, faTooth } from "@fortawesome/free-solid-svg-icons"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useBooking } from "@/components/BookingProvider"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/site"

export function Navbar(): React.JSX.Element {
  const pathname = usePathname()
  const scrolled = useScrollPosition(16)
  const { openBooking } = useBooking()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-all duration-300",
        scrolled && "border-border bg-white/90 shadow-sm backdrop-blur-md dark:bg-slate-900/90"
      )}
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:min-h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/20 dark:bg-teal-400 dark:text-slate-900">
            <FontAwesomeIcon icon={faTooth} className="size-5" />
          </span>
          <span className="flex flex-col">
            <span className="font-heading text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
              AG Dentaura
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Smile care with precision</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400",
                  isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-700 dark:text-slate-200"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* service tabs removed from navbar per request */}

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            type="button"
            onClick={openBooking}
            className="h-11 rounded-full bg-teal-600 px-5 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
          >
            Book Appointment
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="rounded-full border border-border bg-background/80 backdrop-blur-sm"
              >
                <FontAwesomeIcon icon={faBars} className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white dark:bg-slate-900">
              <SheetHeader>
                <SheetTitle>AG Dentaura</SheetTitle>
                <SheetDescription>Navigate the clinic website or request an appointment.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-500 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400",
                        pathname === link.href && "border-teal-500 text-teal-600 dark:text-teal-400"
                      )}
                    >
                      <span>{link.label}</span>
                      <FontAwesomeIcon icon={faChevronRight} className="size-3.5" />
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-auto border-t border-border p-4">
                <Button
                  type="button"
                  onClick={openBooking}
                  className="h-11 w-full rounded-full bg-teal-600 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
                >
                  Book Appointment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
