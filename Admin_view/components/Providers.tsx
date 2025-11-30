"use client"

import React from "react"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  )
}
