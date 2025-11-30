"use client"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmationDialogProps {
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  type?: "warning" | "info" | "success" | "error"
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationDialogProps) {
  const iconMap = {
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
  }

  return (
    <AlertDialog open={open} onOpenChange={(newOpen) => !newOpen && onCancel()}>
      <AlertDialogContent className="gap-4">
        <div className="flex items-start gap-3">
          {iconMap[type]}
          <div>
            <AlertDialogHeader className="p-0">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription className="mt-1">{description}</AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
