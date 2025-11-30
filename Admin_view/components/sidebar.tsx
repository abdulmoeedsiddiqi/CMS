"use client"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "D" },
    { id: "courses", label: "Courses", icon: "C" },
    { id: "timetable", label: "Timetable", icon: "T" },
    { id: "venue", label: "Venue Booking", icon: "V" },
    { id: "users", label: "Users", icon: "U" },
    { id: "settings", label: "Settings", icon: "S" },
  ]

  return (
    <aside className="w-56 bg-black border-r border-blue-500/30 flex flex-col p-6 shadow-lg">
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
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-3 ${
              currentPage === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                : "text-gray-300 hover:text-white hover:bg-slate-900/50 hover:shadow-md hover:shadow-blue-500/20"
            }`}
          >
            <span className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t border-slate-800">
        <p>Spring 2026</p>
      </div>
    </aside>
  )
}
