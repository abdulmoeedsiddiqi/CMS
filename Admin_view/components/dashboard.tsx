"use client"

export default function Dashboard() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Admin overview — Spring 2026</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h2 className="text-white font-bold mb-4">Pending Tasks</h2>

            <div className="space-y-3">
              <div className="border border-gray-600 rounded p-3 bg-slate-800/30">
                <p className="text-white font-medium text-sm mb-2">Approve Booking</p>
                <p className="text-gray-400 text-xs mb-3">Music Society — Auditorium — Mar 15</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                    Open
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-gray-300 text-xs rounded font-medium hover:border-blue-500 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                    Resolve
                  </button>
                </div>
              </div>

              <div className="border border-gray-600 rounded p-3 bg-slate-800/30">
                <p className="text-white font-medium text-sm mb-2">Assign Course</p>
                <p className="text-gray-400 text-xs mb-3">CS-220 — needs lecturer</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                    Open
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-gray-300 text-xs rounded font-medium hover:border-blue-500 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Assign */}
        <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <h2 className="text-white font-bold mb-4">Quick Assign</h2>

          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Course</label>
              <input
                type="text"
                placeholder="Start typing course code or name"
                className="w-full px-3 py-2 bg-slate-800/50 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Lecturer</label>
              <select className="w-full px-3 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                <option>Dr. Amina Khan</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Room</label>
              <select className="w-full px-3 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                <option>AcB MLH-2</option>
              </select>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              Assign
            </button>
          </div>
        </div>

        {/* Venue Calendar */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <h2 className="text-white font-bold mb-4">Venue Calendar (Week)</h2>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center">
                <div className="text-gray-400 text-xs font-medium mb-2">{day}</div>
                <div className="bg-slate-800/50 border border-gray-600 rounded p-1 text-white text-xs font-medium h-20 flex items-center justify-center text-center hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                  Slots
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-xs">Week: Mar 15-21</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {[
          { label: "Total Courses", value: "48", color: "from-blue-600" },
          { label: "Active Users", value: "1,240", color: "from-blue-500" },
          { label: "Bookings Today", value: "12", color: "from-blue-400" },
          { label: "System Uptime", value: "99.8%", color: "from-cyan-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} to-blue-700/50 rounded-lg p-4 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300`}
          >
            <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
