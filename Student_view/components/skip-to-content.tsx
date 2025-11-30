"use client"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-blue-400"
    >
      Skip to main content
    </a>
  )
}
