"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

type VenueEvent = {
  id: string
  title: string
  type: string
  organizer: string
  day: string
  time: string
  venue: string
  attendees?: number
}

export default function VenueBooking() {
  const [events, setEvents] = useState<VenueEvent[]>([
    { id: 'v1', title: 'Spring Concert', type: 'Concert', organizer: 'Music Dept', day: 'Fri', time: '7:00 PM', venue: 'Main Auditorium', attendees: 180 },
    { id: 'v2', title: 'Student Play', type: 'Play', organizer: 'Drama Club', day: 'Sat', time: '6:00 PM', venue: 'Main Auditorium', attendees: 120 },
    { id: 'v3', title: 'Guest Lecture', type: 'Lecture', organizer: 'Visiting', day: 'Thu', time: '11:00 AM', venue: 'MLH-1', attendees: 80 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<VenueEvent | null>(null)
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)

  function openAdd() {
    setEditing({ id: `v${Date.now()}`, title: '', type: 'Concert', organizer: '', day: 'Fri', time: '7:00 PM', venue: 'Main Auditorium', attendees: 0 })
    setShowForm(true)
  }

  function saveEvent(ev: VenueEvent) {
    setEvents((prev) => {
      const exists = prev.find((p) => p.id === ev.id)
      if (exists) return prev.map((p) => (p.id === ev.id ? ev : p))
      return [ev, ...prev]
    })
    setShowForm(false)
    setEditing(null)
    toast({ title: `Event "${ev.title}" saved`, description: '(canned)' })
  }

  function removeEvent(id: string) {
    setRemoveTarget(id)
  }

  const venues = [
    { name: 'Main Auditorium', capacity: '200 seats', desc: 'Large events and lectures' },
    { name: 'MLH-1', capacity: '60 seats', desc: 'Main Lecture Hall - Projector' },
    { name: 'Lab-1', capacity: '30 PCs', desc: 'Computer lab - 30 PCs' },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Venue Events</h1>
          <p className="text-gray-400">Manage venue events (concerts, plays, lectures) — canned responses</p>
        </div>
        <button onClick={openAdd} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">+ New Event</button>
      </div>

      {/* View Controls */}
      <div className="flex gap-2 mb-6">
        {['Week View','Day View','Venue View'].map((view)=> (
          <button key={view} className={`px-4 py-2 rounded font-medium ${view==='Week View'?'bg-blue-600 text-white':'bg-slate-900/60 text-gray-300'}`}>{view}</button>
        ))}
      </div>

      {/* Weekly list (simplified) */}
      <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 mb-6">
        <h2 className="text-white font-bold mb-3">This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map(ev=> (
            <div key={ev.id} className="bg-slate-900/80 border border-blue-500/20 rounded p-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-white font-semibold">{ev.title}</h3>
                  <p className="text-gray-400 text-sm">{ev.type} • {ev.day} {ev.time}</p>
                  <p className="text-gray-400 text-sm">Venue: {ev.venue} • Organizer: {ev.organizer}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>{ setEditing(ev); setShowForm(true)}} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Edit</button>
                  <button onClick={()=>removeEvent(ev.id)} className="px-2 py-1 border border-red-500 text-red-300 rounded text-sm">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Venues */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Available Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((room) => (
            <div key={room.name} className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-white font-bold mb-1">{room.name}</h3>
              <p className="text-gray-400 text-sm mb-1">{room.capacity}</p>
              <p className="text-gray-500 text-xs mb-3">{room.desc}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-1 border border-blue-500/50 text-blue-400 rounded text-sm">View</button>
                <button onClick={()=>{ openAdd(); setEditing((ed)=> ({...ed!, venue: room.name})) }} className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm">Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showForm && !!editing} onOpenChange={(open)=>{ if(!open){ setShowForm(false); setEditing(null) } }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? (editing.title ? `Edit ${editing.title}` : 'New Event') : ''}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div>
              <div className="grid grid-cols-1 gap-3">
                <input value={editing.title} onChange={(e)=>setEditing({...editing, title: e.target.value})} placeholder="Event Title" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <select value={editing.type} onChange={(e)=>setEditing({...editing, type: e.target.value})} className="px-3 py-2 bg-slate-800/50 rounded text-white">
                  <option>Concert</option>
                  <option>Play</option>
                  <option>Lecture</option>
                  <option>Seminar</option>
                </select>
                <input value={editing.organizer} onChange={(e)=>setEditing({...editing, organizer: e.target.value})} placeholder="Organizer" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={editing.day} onChange={(e)=>setEditing({...editing, day: e.target.value})} placeholder="Day" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                  <input value={editing.time} onChange={(e)=>setEditing({...editing, time: e.target.value})} placeholder="Time" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                </div>
                <input value={editing.venue} onChange={(e)=>setEditing({...editing, venue: e.target.value})} placeholder="Venue" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
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
