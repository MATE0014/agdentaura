"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons"

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
import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/site"

export function Navbar(): React.JSX.Element {
  const pathname = usePathname()
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-background/60 via-background/20 to-transparent backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black,black_40%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-[52px] border border-border/70 bg-card/85 px-5 py-3 shadow-[var(--shadow-pill)] backdrop-blur-md sm:px-6"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="AG Dentaura Dental Clinic home">
          <span className="flex size-11 items-center justify-center overflow-hidden rounded-[18px] bg-card shadow-[var(--shadow-pill)]">
            <Image
              src="/Logo.png"
              alt="AG Dentaura Dental Clinic logo"
              width={44}
              height={44}
              priority
              className="size-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-foreground">AG Dentaura</span>
            <span className="hidden text-xs tracking-tight text-muted-foreground sm:block">Care You Can Trust, Smile You Deserve</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm tracking-tight transition-colors hover:text-brand",
                  isActive ? "text-brand" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            type="button"
            onClick={() => openBooking()}
            className="h-11 rounded-full border border-foreground bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Book Appointment
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="size-11 rounded-full border border-border bg-card"
              >
                <FontAwesomeIcon icon={faBars} className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background">
              <SheetHeader>
                <SheetTitle>AG Dentaura</SheetTitle>
                <SheetDescription>Navigate the clinic website or request an appointment.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm tracking-tight text-foreground/80 transition-colors hover:border-brand hover:text-brand",
                        pathname === link.href && "border-brand text-brand"
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
                  onClick={() => openBooking()}
                  className="h-11 w-full rounded-full border border-foreground bg-background text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Book Appointment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
