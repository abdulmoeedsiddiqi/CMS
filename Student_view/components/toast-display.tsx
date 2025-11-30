"use client"

import { useContext } from "react"
import { ToastContext } from "./toast-provider"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

export function ToastDisplay() {
  const context = useContext(ToastContext)
  if (!context) return null

  const { toasts, removeToast } = context

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg animate-in slide-in-from-bottom-2 duration-300 flex items-start gap-3 max-w-sm ${
            toast.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-100"
              : toast.type === "error"
                ? "bg-red-500/20 border-red-500/50 text-red-100"
                : "bg-blue-500/20 border-blue-500/50 text-blue-100"
          }`}
        >
          <div className="flex-shrink-0 pt-0.5">
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "error" && <AlertCircle size={18} />}
            {toast.type === "info" && <Info size={18} />}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{toast.title}</p>
            {toast.description && <p className="text-xs opacity-90">{toast.description}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-current/50 hover:text-current transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
