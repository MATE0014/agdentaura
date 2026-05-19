"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"

export function ThemeToggle(): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <FontAwesomeIcon icon={isDark ? faMoon : faSun} className="size-4 text-teal-600 dark:text-teal-400" />
          </motion.span>
        ) : (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon icon={faSun} className="size-4 text-teal-600 dark:text-teal-400" />
          </span>
        )}
      </AnimatePresence>
    </Button>
  )
}
