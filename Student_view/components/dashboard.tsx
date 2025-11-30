"use client"

import { useState, useContext } from "react"
import NextClassWidget from "@/components/next-class-widget"
import { AlertCircle, Clock, TrendingUp, Download } from "lucide-react"
import { AlertBanner } from "@/components/alert-banner"
import { RecentActivity } from "@/components/recent-activity"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { ToastContext } from "./toast-provider"

export default function Dashboard() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAllVenues, setShowAllVenues] = useState(false)
  const toastContext = useContext(ToastContext)

  const handleViewGrades = () => {
    toastContext?.addToast({
      title: "Loading grades...",
      description: "Your current GPA is 3.85",
      type: "success",
      duration: 3000,
    })
  }

  const handleDownloadMaterials = () => {
    toastContext?.addToast({
      title: "Download started",
      description: "Course materials are being downloaded (5 files, ~45 MB)",
      type: "success",
      duration: 3000,
    })
  }

  const handleScheduleChange = () => {
    setShowConfirm(true)
  }

  const handleConfirmScheduleChange = () => {
    toastContext?.addToast({
      title: "Request submitted",
      description: "Your schedule change request has been sent to your advisors",
      type: "success",
      duration: 3000,
    })
    setShowConfirm(false)
  }

  const handleViewAllVenues = () => {
    setShowAllVenues(true)
    toastContext?.addToast({
      title: "Loading all venues...",
      description: "Displaying complete venue inventory",
      type: "info",
      duration: 2000,
    })
  }

  const recentActivities = [
    {
      id: "1",
      type: "enrollment" as const,
      title: "Enrolled in CS-220",
      description: "Data Structures course",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "assignment" as const,
      title: "Submitted Assignment",
      description: "HCI Project Prototype",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "booking" as const,
      title: "Booked Lab-1",
      description: "Study session scheduled",
      timestamp: "1 day ago",
    },
  ]

  return (
    <>
      <div
        className="p-4 md:p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen"
        id="main-content"
        role="main"
      >
        <BreadcrumbNav items={[{ label: "Dashboard", current: true }]} />

        <div className="mt-6">
          <AlertBanner
            type="warning"
            title="Assignment Deadline Approaching"
            message="Your 'Programming Assignment 3' for CS-101 is due in 2 days"
            action={{
              label: "View Assignment",
              onClick: () => console.log("Navigate to assignments"),
            }}
          />
          <AlertBanner
            type="info"
            title="Course Registration Open"
            message="Spring 2026 course registration is now available. Secure your spots before capacity fills up."
            action={{
              label: "Browse Courses",
              onClick: () => console.log("Navigate to courses"),
            }}
          />
        </div>

        <div className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm md:text-base">Admin overview — Spring 2026</p>
          <p className="text-gray-500 text-xs md:text-sm mt-2">Last updated: Today at 2:34 PM</p>
        </div>

        <div className="mb-8">
          <NextClassWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 md:p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg md:text-xl">Pending Tasks</h2>
                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded font-medium">2 Urgent</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: AlertCircle,
                    color: "orange",
                    title: "Approve Booking",
                    desc: "Music Society — Auditorium",
                  },
                  {
                    icon: AlertCircle,
                    color: "yellow",
                    title: "Assign Course Lecturer",
                    desc: "CS-220 — Data Structures",
                  },
                ].map((task, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-600 rounded p-3 bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <task.icon
                        className={`${task.color === "orange" ? "text-orange-400" : "text-yellow-400"} flex-shrink-0 mt-0.5`}
                        size={18}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{task.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{task.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <RecentActivity activities={recentActivities} />
          </div>

          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 md:p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h2 className="text-white font-bold text-lg md:text-xl mb-4">Quick Actions</h2>

            <div className="space-y-3">
              <button
                onClick={handleViewGrades}
                className="w-full px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                aria-label="View Grades"
              >
                <TrendingUp size={18} />
                View Grades
              </button>
              <button
                onClick={handleDownloadMaterials}
                className="w-full px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                aria-label="Download Course Materials"
              >
                <Download size={18} />
                Download Materials
              </button>
              <button
                onClick={handleScheduleChange}
                className="w-full px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                aria-label="Request Schedule Change"
              >
                <Clock size={18} />
                Schedule Change
              </button>
            </div>

            <div className="mt-6 p-4 bg-slate-800/30 border border-blue-500/20 rounded-lg">
              <p className="text-gray-400 text-xs md:text-sm">
                <span className="font-semibold text-blue-300">Quick Tip:</span> Use keyboard shortcuts (Cmd+K) to
                quickly navigate between sections.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 md:p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg md:text-xl">Venue Overview</h2>
              <button
                onClick={handleViewAllVenues}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-all"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "MLH-1", available: "5/8 slots", status: "available" },
                { name: "Lab-1", available: "2/6 slots", status: "limited" },
                { name: "Auditorium", available: "0/3 slots", status: "full" },
              ].map((venue) => (
                <div key={venue.name} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <div>
                    <p className="text-white text-sm font-medium">{venue.name}</p>
                    <p className="text-gray-500 text-xs">{venue.available}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      venue.status === "available"
                        ? "bg-green-500"
                        : venue.status === "limited"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    aria-label={`${venue.name} is ${venue.status}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-6 md:mt-8">
          {[
            { label: "Total Courses", value: "48", icon: "📚" },
            { label: "Active Users", value: "1,240", icon: "👥" },
            { label: "Bookings Today", value: "12", icon: "📅" },
            { label: "System Uptime", value: "99.8%", icon: "✓" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/30 rounded-lg p-3 md:p-4 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-gray-300 text-xs md:text-sm">{stat.label}</p>
                <span className="text-base md:text-lg" aria-hidden="true">
                  {stat.icon}
                </span>
              </div>
              <p className="text-white text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {showAllVenues && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">All Venues</h2>
              <button
                onClick={() => setShowAllVenues(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { name: "AcB MLH-1", capacity: "60 seats", available: "5/8 slots", status: "available" },
                { name: "AcB MLH-2", capacity: "50 seats", available: "3/8 slots", status: "available" },
                { name: "Lab-1", capacity: "30 PCs", available: "2/6 slots", status: "limited" },
                { name: "Seminar-3", capacity: "40 seats", available: "4/8 slots", status: "available" },
                { name: "Main Auditorium", capacity: "200 seats", available: "0/3 slots", status: "full" },
                { name: "EE Lab-2", capacity: "25 seats", available: "0/4 slots", status: "full" },
              ].map((venue) => (
                <div key={venue.name} className="p-4 bg-slate-800/50 border border-blue-500/20 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold">{venue.name}</p>
                      <p className="text-gray-400 text-sm">{venue.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold text-sm">{venue.available}</p>
                      <div
                        className={`w-2 h-2 rounded-full mt-1 ${
                          venue.status === "available"
                            ? "bg-green-500"
                            : venue.status === "limited"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllVenues(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ConfirmationDialog
        open={showConfirm}
        title="Change Schedule"
        description="Are you sure you want to request a schedule change? This will notify your advisors."
        confirmText="Request Change"
        cancelText="Cancel"
        type="info"
        onConfirm={handleConfirmScheduleChange}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
