"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function Timetable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState("all")
  const [view, setView] = useState("week")

  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00 (1:00 PM)", "14:00 (2:00 PM)", "15:00 (3:00 PM)"]

  const weekSchedule = {
    Mon: ["", "", "CS-372", "CS-372", "", "", "CS-220", ""],
    Tue: ["", "CS-101", "CS-101", "", "", "EE-210", "", ""],
    Wed: ["", "", "CS-101", "MATH-101", "", "", "CS-220", ""],
    Thu: ["", "", "", "", "", "", "", "Guest Lecture"],
    Fri: ["", "", "MATH-101", "MATH-101", "", "", "CS-220", ""],
  }

  const roomAvailability = [
    { name: "AcB MLH-1", available: "8-9, 11-14, 15-17", capacity: "Cap: 60", status: "good" },
    { name: "Lab-1", available: "9-9, 11-13, 14-17", capacity: "Cap: 30", status: "moderate" },
    { name: "Seminar-3", available: "8-11, 12-15", capacity: "Cap: 40", status: "moderate" },
    { name: "Auditorium", available: "14-17", capacity: "Cap: 200", status: "limited" },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Timetable</h1>
        <p className="text-gray-400">Spring 2026 Schedule</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["Week", "Day", "Room"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v.toLowerCase())}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              view === v.toLowerCase()
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-slate-900/60 border border-blue-500/30 text-gray-300 hover:text-white hover:bg-slate-800/60 hover:shadow-md hover:shadow-blue-500/30"
            }`}
          >
            {v} View
          </button>
        ))}
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all text-sm"
          >
            <option value="all">All Departments</option>
            <option value="cs">CS</option>
            <option value="math">MATH</option>
            <option value="ee">EE</option>
          </select>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all text-sm"
          >
            <option value="all">All Rooms</option>
            <option value="lab1">Lab-1</option>
            <option value="mlh1">MLH-1</option>
            <option value="mlh2">MLH-2</option>
          </select>
        </div>
      </div>

      {view === "week" && (
        <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg overflow-hidden backdrop-blur-sm mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50 sticky left-0 z-10">
                    Time
                  </th>
                  {Object.keys(weekSchedule).map((day) => (
                    <th
                      key={day}
                      className="px-4 py-3 text-center text-gray-300 font-medium text-sm bg-slate-800/50 hover:bg-slate-700/50 transition-all"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, idx) => (
                  <tr key={time} className="border-b border-blue-500/20 hover:bg-slate-800/30 transition-all">
                    <td className="px-4 py-3 text-gray-400 text-sm font-medium bg-slate-800/30 sticky left-0 z-10 hover:bg-slate-800/50 transition-all">
                      {time}
                    </td>
                    {Object.entries(weekSchedule).map(([day, slots]) => (
                      <td key={`${day}-${time}`} className="px-4 py-3 text-center">
                        {slots[idx] && (
                          <div className="inline-block bg-gradient-to-br from-blue-600/80 to-blue-700/60 border border-blue-500/50 rounded px-3 py-1 text-white text-xs font-medium hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 hover:border-blue-400 transition-all duration-300 cursor-pointer">
                            {slots[idx]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Daily View - Monday</h2>
          <div className="space-y-3">
            {timeSlots.map((time, idx) => (
              <div
                key={time}
                className="flex items-center gap-4 p-4 bg-slate-800/30 border border-blue-500/20 rounded-lg hover:border-blue-500/50 transition-all"
              >
                <span className="text-gray-400 font-medium min-w-20">{time}</span>
                <div className="flex-1">
                  {weekSchedule.Mon[idx] ? (
                    <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded text-sm font-medium">
                      {weekSchedule.Mon[idx]}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">Available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "room" && (
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Room Schedule View</h2>
        </div>
      )}

      <div>
        <h2 className="text-white font-bold text-xl mb-4">Room Availability Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roomAvailability.map((room) => (
            <div
              key={room.name}
              className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold">{room.name}</h3>
                  <p className="text-gray-400 text-xs">{room.capacity}</p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${
                    room.status === "good"
                      ? "bg-green-500"
                      : room.status === "moderate"
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                  }`}
                />
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-gray-500 font-medium">Available:</span> {room.available}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
