"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { BookingProvider } from "@/components/BookingProvider"
import { BookingModal } from "@/components/BookingModal"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

interface SiteShellProps {
  children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps): React.JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ag-dentaura-theme"
    >
      <BookingProvider>
        <div className="relative z-10 flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.08),_transparent_32%),linear-gradient(to_bottom,_#ffffff,_#f8fafc_24%,_#f8fafc_100%)] text-slate-800 dark:bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_32%),linear-gradient(to_bottom,_#0f172a,_#111827_24%,_#0f172a_100%)] dark:text-slate-100">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BookingModal />
          <Toaster position="top-right" richColors />
        </div>
      </BookingProvider>
    </ThemeProvider>
  )
}
