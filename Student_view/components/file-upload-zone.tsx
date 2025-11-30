"use client"

import type React from "react"

import { useState } from "react"
import { Upload, type File, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void
  acceptedFormats?: string[]
  maxSize?: number // in MB
  instruction?: string
}

export function FileUploadZone({
  onFileSelect,
  acceptedFormats = ["pdf", "doc", "docx"],
  maxSize = 5,
  instruction = "Drag and drop your file here or click to select",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File) => {
    const sizeInMB = file.size / (1024 * 1024)
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""

    if (sizeInMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`)
      return false
    }

    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Only ${acceptedFormats.join(", ")} files are allowed`)
      return false
    }

    setError(null)
    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-slate-900/50"
        }`}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground mb-1">{instruction}</p>
        <p className="text-xs text-muted-foreground mb-4">
          {acceptedFormats.join(", ").toUpperCase()} • Max {maxSize}MB
        </p>
        <Button variant="outline" size="sm" asChild>
          <label className="cursor-pointer">
            Browse Files
            <input
              type="file"
              hidden
              accept={acceptedFormats.map((f) => `.${f}`).join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
            />
          </label>
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {selectedFile && !error && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      )}
    </div>
  )
}
