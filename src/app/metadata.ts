import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Web Portal",
    template: "%s | Web Portal"
  },
  description: "A modern web portal built with Next.js and shadcn/ui",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  authors: [{ name: "Web Portal Team" }],
  creator: "Web Portal Team",
  metadataBase: new URL("https://your-domain.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.vercel.app",
    title: "Web Portal",
    description: "A modern web portal built with Next.js and shadcn/ui",
    siteName: "Web Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Portal",
    description: "A modern web portal built with Next.js and shadcn/ui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};