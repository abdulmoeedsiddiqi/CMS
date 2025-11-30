"use client"

import { useState, useContext } from "react"
import BookingModal from "@/components/booking-modal"
import { Users, DoorOpen, AlertCircle, CheckCircle, Calendar, Plus } from "lucide-react"
import { ToastContext } from "./toast-provider"

export default function VenueBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [view, setView] = useState("week")
  const [bookings, setBookings] = useState<any[]>([])
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const [detailsRoom, setDetailsRoom] = useState(null)
  const toastContext = useContext(ToastContext)

  const handleBookClick = (room, timeSlot) => {
    setSelectedRoom(room)
    setSelectedTimeSlot(timeSlot)
    setIsModalOpen(true)
  }

  const handleBookingConfirm = (purpose: string) => {
    if (selectedRoom) {
      setBookings((prev) => [
        ...prev,
        {
          id: Date.now(),
          room: selectedRoom.name,
          timeSlot: selectedTimeSlot,
          purpose,
          date: new Date().toLocaleDateString(),
        },
      ])
      toastContext?.addToast({
        title: "Room booked successfully!",
        description: `${selectedRoom.name} reserved for ${selectedTimeSlot}`,
        type: "success",
        duration: 3000,
      })
    }
  }

  const handleNewBooking = () => {
    toastContext?.addToast({
      title: "Select a room",
      description: "Choose a room below to make a new booking",
      type: "info",
      duration: 2000,
    })
  }

  const handleViewDetails = (room) => {
    setDetailsRoom(room)
    setShowRoomDetails(true)
    toastContext?.addToast({
      title: `${room.name} Details`,
      description: `Capacity: ${room.capacity} • Available slots: ${room.upcomingSlots}`,
      type: "info",
      duration: 2000,
    })
  }

  const rooms = [
    {
      name: "AcB MLH-1",
      capacity: "60 seats",
      type: "Main Lecture Hall",
      features: "Projector, AC",
      available: true,
      upcomingSlots: 12,
    },
    {
      name: "AcB MLH-2",
      capacity: "50 seats",
      type: "Main Lecture Hall",
      features: "Projector, AC",
      available: true,
      upcomingSlots: 8,
    },
    {
      name: "Main Auditorium",
      capacity: "200 seats",
      type: "Large events",
      features: "Projector, Mic",
      available: false,
      upcomingSlots: 0,
    },
    {
      name: "Lab-1",
      capacity: "30 PCs",
      type: "Computer lab",
      features: "30 Computers",
      available: true,
      upcomingSlots: 5,
    },
    {
      name: "Seminar-3",
      capacity: "40 seats",
      type: "Discussion room",
      features: "Round table",
      available: true,
      upcomingSlots: 6,
    },
    {
      name: "EE Lab-2",
      capacity: "25 seats",
      type: "Equipment lab",
      features: "Lab equipment",
      available: false,
      upcomingSlots: 0,
    },
  ]

  return (
    <>
      <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Venue Booking</h1>
            <p className="text-gray-400">Manage room reservations efficiently</p>
          </div>
          <button
            onClick={handleNewBooking}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            New Booking
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {["week", "day", "room"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded font-medium transition-all duration-300 capitalize ${
                view === v
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-slate-900/60 border border-blue-500/30 text-gray-300 hover:text-white hover:bg-slate-800/60 hover:shadow-md hover:shadow-blue-500/30"
              }`}
            >
              {v === "week" ? "Week View" : v === "day" ? "Day View" : "Room View"}
            </button>
          ))}
        </div>

        {view === "week" && (
          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg overflow-hidden backdrop-blur-sm mb-8">
            <div className="p-4 bg-slate-800/30 border-b border-blue-500/20 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <h3 className="text-white font-semibold text-sm">Week of March 15-21, 2026</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Time</th>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <th
                        key={day}
                        className="px-4 py-3 text-center text-gray-300 font-medium text-sm bg-slate-800/50 hover:bg-slate-700/50 transition-all"
                      >
                        <div>{day}</div>
                        <div className="text-xs text-gray-500 font-normal">Mar 15</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map(
                    (time) => (
                      <tr key={time} className="border-b border-blue-500/20">
                        <td className="px-4 py-3 text-gray-400 text-sm font-medium bg-slate-800/30 sticky left-0">
                          {time}
                        </td>
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                          <td key={`${time}-${day}`} className="px-4 py-3 hover:bg-slate-800/50 transition-all">
                            {Math.random() > 0.6 ? (
                              <button
                                onClick={() => handleBookClick(rooms[0], time)}
                                className="bg-gradient-to-br from-blue-600/80 to-blue-700/60 border border-blue-500/50 rounded px-2 py-1 text-white text-xs font-medium hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 hover:border-blue-400 transition-all duration-300 cursor-pointer"
                              >
                                CS-101 Lab
                              </button>
                            ) : (
                              <div className="text-xs text-gray-600 py-1">Available</div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "day" && (
          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm mb-8">
            <h2 className="text-white font-bold text-lg mb-4">Daily View - Monday, March 15</h2>
            <div className="space-y-3">
              {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map(
                (time) => (
                  <div
                    key={time}
                    className="flex items-center justify-between p-4 bg-slate-800/30 border border-blue-500/20 rounded-lg hover:border-blue-500/50 transition-all"
                  >
                    <span className="text-gray-400 font-medium min-w-20">{time}</span>
                    <button
                      onClick={() => handleBookClick(rooms[0], time)}
                      className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                      Book Slot
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {view === "room" && (
          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm mb-8">
            <h2 className="text-white font-bold text-lg mb-4">Room Schedule View</h2>
            <p className="text-gray-400 text-sm">Select a room from the list below to view its availability</p>
          </div>
        )}

        <div>
          <h2 className="text-white font-bold text-2xl mb-4 flex items-center justify-between">
            <span>Available Rooms</span>
            <span className="text-sm font-normal text-gray-400">
              {rooms.filter((r) => r.available).length} Available
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <div
                key={room.name}
                className={`bg-gradient-to-br ${room.available ? "from-slate-900/80 to-slate-800/60" : "from-slate-900/50 to-slate-800/40 opacity-70"} border ${room.available ? "border-blue-500/30" : "border-gray-600/30"} rounded-xl p-6 backdrop-blur-sm ${room.available ? "hover:shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/60" : ""} transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{room.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <Users size={14} />
                      {room.capacity}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${room.available ? "bg-blue-500/20" : "bg-gray-600/20"}`}>
                    <DoorOpen size={20} className={room.available ? "text-blue-400" : "text-gray-500"} />
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-3">{room.type}</p>
                <p className="text-gray-500 text-xs mb-4">{room.features}</p>

                <div className="mb-4 p-3 rounded-lg bg-slate-800/30 border border-blue-500/20">
                  {room.available ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                          <span className="text-xs font-semibold text-green-300">Slots Available</span>
                        </div>
                        <span className="text-sm font-bold text-green-300">{room.upcomingSlots}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
                          style={{ width: `${(room.upcomingSlots / 12) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">this week</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                      <span className="text-xs text-red-300 font-semibold">Fully booked</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(room)}
                    className="flex-1 px-3 py-2 border border-blue-500/50 text-blue-400 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleBookClick(room, "10:00 AM - 11:30 AM")}
                    disabled={!room.available}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      room.available
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {room.available ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRoom && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            room={selectedRoom}
            timeSlot={selectedTimeSlot}
            onConfirm={handleBookingConfirm}
          />
        )}

        {bookings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-white font-bold text-2xl mb-4">Your Bookings</h2>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-slate-900/60 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">{booking.room}</p>
                      <p className="text-gray-400 text-sm">
                        {booking.timeSlot} - {booking.purpose}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{booking.date}</p>
                    </div>
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showRoomDetails && detailsRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{detailsRoom.name}</h2>
              <button
                onClick={() => setShowRoomDetails(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Room Type</p>
                <p className="text-white font-semibold">{detailsRoom.type}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Capacity</p>
                <p className="text-white font-semibold">{detailsRoom.capacity}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Features</p>
                <p className="text-white font-semibold">{detailsRoom.features}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Available Slots This Week</p>
                <p className="text-white font-semibold">{detailsRoom.upcomingSlots}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Status</p>
                <p className={`font-semibold ${detailsRoom.available ? "text-green-400" : "text-red-400"}`}>
                  {detailsRoom.available ? "Available" : "Fully Booked"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowRoomDetails(false)}
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
