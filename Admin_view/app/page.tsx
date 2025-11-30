"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import Courses from "@/components/courses"
import Timetable from "@/components/timetable"
import VenueBooking from "@/components/venue-booking"
import Users from "@/components/users"
import Settings from "@/components/settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")

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
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  )
}
