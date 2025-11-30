"use client"

import { useState } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: (purpose: string) => void
  room: {
    name: string
    capacity: string
    type: string
  }
  timeSlot: string
}

export default function BookingModal({ isOpen, onClose, onConfirm, room, timeSlot }: BookingModalProps) {
  const [purpose, setPurpose] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)

  if (!isOpen) return null

  const handleConfirm = () => {
    if (purpose.trim()) {
      setIsConfirmed(true)
      setTimeout(() => {
        onConfirm?.(purpose)
        onClose()
        setIsConfirmed(false)
        setPurpose("")
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/40 rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-white text-2xl font-bold">Confirm Room Booking</h2>
            <p className="text-gray-400 text-sm mt-1">Review details before confirming</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-all"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-800/60 border border-blue-500/30 rounded-lg p-5 hover:border-blue-500/50 transition-all">
            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Room</p>
            <h3 className="text-white text-lg font-bold">{room.name}</h3>
            <p className="text-gray-500 text-sm mt-2">
              {room.capacity} • {room.type}
            </p>
          </div>

          <div className="bg-slate-800/60 border border-blue-500/30 rounded-lg p-5 hover:border-blue-500/50 transition-all">
            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Time Slot</p>
            <h3 className="text-white text-lg font-bold">{timeSlot}</h3>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-semibold mb-3 block">Purpose / Event Title *</label>
            <input
              type="text"
              placeholder="e.g., CS-220 Study Group"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            />
            <p className="text-gray-500 text-xs mt-2">Help others understand what this booking is for</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:bg-slate-800/50 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!purpose.trim()}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isConfirmed
                ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                : purpose.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                  : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isConfirmed ? (
              <>
                <CheckCircle size={18} />
                Booked!
              </>
            ) : purpose.trim() ? (
              "Confirm Booking"
            ) : (
              <>
                <AlertCircle size={18} />
                Add Purpose
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
