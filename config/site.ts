export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Survey App",
  description:
    "Survey application built with Vite, React, Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/vite-survey-app",
    docs: "https://github.com/yourusername/vite-survey-app#readme",
  },
}
