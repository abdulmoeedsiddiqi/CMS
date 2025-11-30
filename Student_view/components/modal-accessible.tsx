"use client"

import { X } from "lucide-react"
import type React from "react"
import { useEffect, useRef } from "react"

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
}

export function AccessibleModal({ isOpen, onClose, title, children, size = "md" }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      modalRef.current?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    } else {
      previousActiveElement.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/40 rounded-xl p-8 w-full ${sizeClasses[size]} shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-all"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
        <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
