"use client"

import { Menu, X } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  isOpen?: boolean
  onToggle?: () => void
}

export default function Sidebar({ currentPage, onPageChange, isOpen = false, onToggle }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "timetable", label: "Timetable", icon: "📅" },
    { id: "venue", label: "Venue Booking", icon: "🏛️" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onToggle} aria-hidden="true" />}

      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static w-56 h-screen bg-black border-r border-blue-500/30 flex flex-col p-6 shadow-lg transition-transform duration-300 z-40 md:z-0`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              G
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">GIKI CMS</h1>
              <p className="text-xs text-blue-400">Dashboard — Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1" role="menubar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              role="menuitem"
              aria-label={item.label}
              aria-current={currentPage === item.id ? "page" : undefined}
              className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-3 ${
                currentPage === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                  : "text-gray-300 hover:text-white hover:bg-slate-900/50 hover:shadow-md hover:shadow-blue-500/20"
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-slate-800">
          <p>Spring 2026</p>
        </div>
      </aside>
    </>
  )
}
