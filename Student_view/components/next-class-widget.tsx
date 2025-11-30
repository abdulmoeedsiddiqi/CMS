"use client"

import { Clock, MapPin, Book, ChevronRight } from "lucide-react"
import { useState, useContext } from "react"
import { ToastContext } from "./toast-provider"

export default function NextClassWidget() {
  const [showFullSchedule, setShowFullSchedule] = useState(false)
  const toastContext = useContext(ToastContext)

  const nextClass = {
    code: "CS-101",
    name: "Introduction to Programming",
    lecturer: "Zouhair Azam",
    time: "10:00 AM - 11:30 AM",
    room: "Lab-1",
    startsIn: "45 minutes",
    building: "Academic Block B",
  }

  const handleViewFullSchedule = () => {
    setShowFullSchedule(true)
    toastContext?.addToast({
      title: "Loading full schedule...",
      description: "Your complete class schedule for Spring 2026",
      type: "info",
      duration: 2000,
    })
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl p-8 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-blue-400/20">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-blue-100/80 text-sm font-semibold mb-2 tracking-wide uppercase">Your Next Class</p>
            <h2 className="text-4xl font-black text-white">{nextClass.code}</h2>
          </div>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-bold border border-white/30">
            {nextClass.startsIn}
          </span>
        </div>

        <p className="text-white/95 font-semibold text-lg mb-6">{nextClass.name}</p>

        <div className="space-y-4 mb-7 pb-7 border-b border-white/20">
          <div className="flex items-center gap-4 text-blue-50">
            <div className="bg-white/20 p-3 rounded-lg">
              <Clock size={20} className="flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Class Time</p>
              <p className="text-sm font-semibold">{nextClass.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-blue-50">
            <div className="bg-white/20 p-3 rounded-lg">
              <MapPin size={20} className="flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Location</p>
              <p className="text-sm font-semibold">
                {nextClass.room} • {nextClass.building}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-blue-50">
            <div className="bg-white/20 p-3 rounded-lg">
              <Book size={20} className="flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Lecturer</p>
              <p className="text-sm font-semibold">{nextClass.lecturer}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleViewFullSchedule}
          className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          View Full Schedule
          <ChevronRight size={18} />
        </button>
      </div>

      {showFullSchedule && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Your Full Schedule - Spring 2026</h2>
              <button
                onClick={() => setShowFullSchedule(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { code: "CS-101", name: "Introduction to Programming", time: "Tue/Thu 10:00-11:30", room: "Lab-1" },
                { code: "CS-372", name: "Human-Computer Interaction", time: "Mon/Wed 10:00-11:30", room: "MLH-2" },
                { code: "CS-220", name: "Data Structures", time: "Mon/Wed/Fri 14:00-15:00", room: "MLH-1" },
                { code: "MATH-101", name: "Calculus I", time: "Mon/Wed/Fri 11:00-12:00", room: "Main Auditorium" },
              ].map((course) => (
                <div key={course.code} className="p-4 bg-slate-800/50 border border-blue-500/20 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-blue-400 font-bold text-sm">{course.code}</p>
                      <p className="text-white font-semibold">{course.name}</p>
                      <p className="text-gray-400 text-sm mt-1">{course.time}</p>
                    </div>
                    <p className="text-gray-400 text-sm">{course.room}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFullSchedule(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
