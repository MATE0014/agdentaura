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
        <div className="relative z-10 flex min-h-screen flex-col bg-background text-foreground">
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
