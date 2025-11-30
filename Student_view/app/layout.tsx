import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ToastProvider } from "@/components/toast-provider"
import { ToastDisplay } from "@/components/toast-display"
import { SkipToContent } from "@/components/skip-to-content"

export const metadata: Metadata = {
  title: "Campus Management System",
  description: "Student portal for courses, bookings, and assignments",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`font-sans antialiased`}>
        <SkipToContent />
        <ToastProvider>
          {children}
          <ToastDisplay />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
