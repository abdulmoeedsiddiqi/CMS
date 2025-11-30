"use client"

import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"
import { useState } from "react"

export type AlertType = "info" | "success" | "warning" | "error"

interface AlertBannerProps {
  type: AlertType
  title: string
  message: string
  dismissible?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export function AlertBanner({ type, title, message, dismissible = true, action }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const config = {
    info: {
      icon: Info,
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      title: "text-blue-300",
      text: "text-blue-200",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      title: "text-green-300",
      text: "text-green-200",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      title: "text-yellow-300",
      text: "text-yellow-200",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      title: "text-red-300",
      text: "text-red-200",
    },
  }

  const Icon = config[type].icon

  return (
    <div className={`${config[type].bg} border ${config[type].border} rounded-lg p-4 mb-6`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className={`font-semibold text-sm ${config[type].title}`}>{title}</h3>
          <p className={`text-sm mt-1 ${config[type].text}`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`text-xs font-semibold mt-2 ${config[type].title} hover:underline`}
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className={`${config[type].title} hover:opacity-70 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
