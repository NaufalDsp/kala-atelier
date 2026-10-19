export const siteConfig = {
  name: "Kala Atelier",
  shortName: "Kala",
  descriptor: "Arsitektur + Interior",
  tagline: "Arsitektur tropis yang kokoh, tenang, dan tahan lama.",
  description:
    "Studio arsitektur dan desain interior dengan pendekatan kontekstual tropis, presisi struktur, dan keabadian material.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kalaatelier.com",
  location: {
    city: "Jakarta",
    country: "Indonesia",
    timezone: "Asia/Jakarta",
  },
  links: {
    instagram: "https://instagram.com/kalaatelier",
  },
  contact: {
    email: "halo@kalaatelier.com",
    whatsapp: "+6281234567890",
  },
} as const;

export type SiteConfig = typeof siteConfig;

