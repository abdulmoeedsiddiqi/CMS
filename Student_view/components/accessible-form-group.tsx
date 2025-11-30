"use client"

import React from "react"

interface AccessibleFormGroupProps {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
  required?: boolean
}

export function AccessibleFormGroup({ label, hint, error, children, required = false }: AccessibleFormGroupProps) {
  const id = `form-group-${Math.random().toString(36).substr(2, 9)}`
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {React.cloneElement(children as React.ReactElement, {
        id,
        "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
        "aria-invalid": !!error,
      })}

      {hint && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
