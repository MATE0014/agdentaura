"use client"

import { useEffect, useState } from "react"

export function useScrollPosition(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = (): void => {
      setScrolled(window.scrollY > threshold)
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [threshold])

  return scrolled
}
