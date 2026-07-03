import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: "/" | "/services" | "/about" | "/contact"
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    lastModified: string
  }> = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      lastModified: "2026-07-04",
    },
    {
      path: "/services",
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: "2026-07-04",
    },
    {
      path: "/about",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: "2026-07-04",
    },
    {
      path: "/contact",
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: "2026-07-04",
    },
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
