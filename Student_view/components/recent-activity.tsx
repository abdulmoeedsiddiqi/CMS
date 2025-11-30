"use client"

import type React from "react"

import { FileText, BookOpen, DoorOpen, CheckCircle, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "assignment" | "enrollment" | "booking" | "completion"
  title: string
  description: string
  timestamp: string
  icon?: React.ReactNode
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="w-4 h-4 text-blue-400" />
      case "enrollment":
        return <BookOpen className="w-4 h-4 text-green-400" />
      case "booking":
        return <DoorOpen className="w-4 h-4 text-purple-400" />
      case "completion":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-400" />
        Recent Activity
      </h3>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-blue-500/20 last:border-0">
            <div className="mt-1">{getIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{activity.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{activity.description}</p>
              <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
