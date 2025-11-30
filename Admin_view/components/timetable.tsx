"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

type EventItem = {
  id: string
  title: string
  day: string
  time: string
  room: string
  type?: string
  organizer?: string
}

export default function Timetable() {
  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00 (1:00 PM)", "14:00 (2:00 PM)", "15:00 (3:00 PM)"]

  const [events, setEvents] = useState<EventItem[]>(() => {
    // realistic-ish canned data
    const sample: EventItem[] = Array.from({ length: 18 }).map((_, i) => ({
      id: `e${i}`,
      title: i % 3 === 0 ? `CS-10${i}` : i % 3 === 1 ? `MATH-1${i}` : `EE-2${i}`,
      day: ["Mon", "Tue", "Wed", "Thu", "Fri"][i % 5],
      time: timeSlots[i % timeSlots.length],
      room: i % 4 === 0 ? "MLH-1" : i % 4 === 1 ? "Lab-1" : "Main Auditorium",
      type: i % 4 === 0 ? "Lecture" : i % 4 === 1 ? "Lab" : "Seminar",
      organizer: i % 2 === 0 ? "Dept of CS" : "Dept of Math",
    }))
    return sample
  })

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)

  function openAdd() {
    setEditing({ id: `e${Date.now()}`, title: "", day: "Mon", time: timeSlots[0], room: "MLH-1" })
    setShowForm(true)
  }

  function saveEvent(e: EventItem) {
    setEvents((prev) => {
      const exists = prev.find((p) => p.id === e.id)
      if (exists) return prev.map((p) => (p.id === e.id ? e : p))
      return [e, ...prev]
    })
    setShowForm(false)
    setEditing(null)
    toast({ title: `Event "${e.title}" saved`, description: '(canned)' })
  }

  function removeEvent(id: string) {
    setRemoveTarget(id)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Timetable</h1>
          <p className="text-gray-400">Spring 2026 Schedule — event-based (canned)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded">+ Add Event</button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-6">
        {[["Week","Week"],["Day","Day"],["Room","Room"]].map(([view]) => (
          <button key={view} className={`px-4 py-2 rounded font-medium transition-all duration-300 ${view === "Week" ? "bg-blue-600 text-white" : "bg-slate-900/60 text-gray-300"}`}>
            {view}
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg overflow-hidden backdrop-blur-sm mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/30">
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Time</th>
                {['Mon','Tue','Wed','Thu','Fri'].map((d)=> <th key={d} className="px-4 py-3 text-center text-gray-300 font-medium text-sm bg-slate-800/50">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-b border-blue-500/20">
                  <td className="px-4 py-3 text-gray-400 text-sm font-medium bg-slate-800/30">{time}</td>
                  {['Mon','Tue','Wed','Thu','Fri'].map((day)=> (
                    <td key={`${day}-${time}`} className="px-4 py-3 text-center">
                      {events.filter(ev=>ev.day===day && ev.time===time).map(ev=> (
                        <div key={ev.id} className="bg-gradient-to-br from-blue-600/80 to-blue-700/60 border border-blue-500/50 rounded px-2 py-1 text-white text-xs font-medium mb-1">
                          <div className="flex justify-between items-center gap-2">
                            <span>{ev.title}</span>
                            <div className="flex gap-1">
                              <button onClick={()=>{ setEditing(ev); setShowForm(true)}} className="text-xs text-blue-200">Edit</button>
                              <button onClick={()=>removeEvent(ev.id)} className="text-xs text-red-200">Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Events List (realistic scale) */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">All Scheduled Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev)=> (
            <div key={ev.id} className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold">{ev.title}</h3>
                  <p className="text-gray-400 text-sm">{ev.day} • {ev.time} • {ev.room}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>{ setEditing(ev); setShowForm(true)}} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Edit</button>
                  <button onClick={()=>removeEvent(ev.id)} className="px-3 py-1 border border-red-500 text-red-300 rounded text-sm">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showForm && !!editing} onOpenChange={(open)=>{ if(!open){ setShowForm(false); setEditing(null) } }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? (editing.title ? `Edit ${editing.title}` : 'Add Event') : ''}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div>
              <div className="grid grid-cols-1 gap-3">
                <input value={editing.title} onChange={(e)=>setEditing({...editing, title: e.target.value})} placeholder="Event Title" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <select value={editing.day} onChange={(e)=>setEditing({...editing, day: e.target.value})} className="px-3 py-2 bg-slate-800/50 rounded text-white">
                  {['Mon','Tue','Wed','Thu','Fri'].map(d=> <option key={d}>{d}</option>)}
                </select>
                <select value={editing.time} onChange={(e)=>setEditing({...editing, time: e.target.value})} className="px-3 py-2 bg-slate-800/50 rounded text-white">
                  {timeSlots.map(t=> <option key={t}>{t}</option>)}
                </select>
                <input value={editing.room} onChange={(e)=>setEditing({...editing, room: e.target.value})} placeholder="Room" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={()=>{ setShowForm(false); setEditing(null)}} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
                <button onClick={()=>saveEvent(editing)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove confirmation dialog */}
      <Dialog open={!!removeTarget} onOpenChange={(open)=>{ if(!open) setRemoveTarget(null) }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Remove</DialogTitle>
          </DialogHeader>
          <div className="text-gray-300">Remove this event? This is canned and cannot be undone.</div>
          <DialogFooter>
            <button onClick={()=>setRemoveTarget(null)} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
            <button onClick={()=>{ if(removeTarget){ setEvents(prev=>prev.filter(p=>p.id!==removeTarget)); toast({ title: 'Event removed', description: '(canned)' }); setRemoveTarget(null) } }} className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
