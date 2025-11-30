"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import Courses from "@/components/courses"
import Timetable from "@/components/timetable"
import VenueBooking from "@/components/venue-booking"
import Assignments from "@/components/assignments"
import Users from "@/components/users"
import Settings from "@/components/settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "courses":
        return <Courses />
      case "timetable":
        return <Timetable />
      case "venue":
        return <VenueBooking />
      case "assignments":
        return <Assignments />
      case "users":
        return <Users />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page)
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="flex-1 overflow-auto focus:outline-none" role="main" tabIndex={-1}>
        {renderPage()}
      </main>
    </div>
  )
}
