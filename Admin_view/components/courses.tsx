"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

type Course = {
  code: string
  name: string
  lecturer: string
  schedule: string
  room: string
  enrollment: string
  credits: string
  department: string
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "CS-101",
      name: "Introduction to Programming",
      lecturer: "Zouhair Azam",
      schedule: "Tue/Thu 9:00-10:30",
      room: "Lab-1",
      enrollment: "65/70",
      credits: "4",
      department: "CS",
    },
    {
      code: "CS-372",
      name: "Human-Computer Interaction",
      lecturer: "Dr. Amina Khan",
      schedule: "Mon/Wed 10:00-11:30",
      room: "MLH-2",
      enrollment: "42/50",
      credits: "3",
      department: "CS",
    },
    {
      code: "CS-220",
      name: "Data Structures",
      lecturer: "Abdul Moeed",
      schedule: "Mon/Wed/Fri 14:00-15:00",
      room: "MLH-1",
      enrollment: "58/60",
      credits: "3",
      department: "CS",
    },
    {
      code: "MATH-101",
      name: "Calculus I",
      lecturer: "Dr. Sarah Ahmed",
      schedule: "Mon/Wed/Fri 11:00-12:00",
      room: "Main Auditorium",
      enrollment: "120/150",
      credits: "3",
      department: "MATH",
    },
  ])

  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Course | null>(null)
  const [viewing, setViewing] = useState<Course | null>(null)

  function openAdd() {
    setEditing({
      code: "",
      name: "",
      lecturer: "",
      schedule: "",
      room: "",
      enrollment: "0/0",
      credits: "0",
      department: "",
    })
    setShowForm(true)
  }

  function saveCourse(c: Course) {
    if (courses.some((x: Course) => x.code === c.code)) {
      // edit
      setCourses((prev: Course[]) => prev.map((p: Course) => (p.code === c.code ? c : p)))
      toast({ title: `Course ${c.code} updated`, description: "(canned)" })
    } else {
      setCourses((prev: Course[]) => [c, ...prev])
      toast({ title: `Course ${c.code} added`, description: "(canned)" })
    }
    setShowForm(false)
    setEditing(null)
  }

  function removeCourse(code: string) {
    // open confirm dialog instead (handled elsewhere)
    setRemoveTarget(code)
  }

  function quickAssign(code: string) {
    const faculties = ["Dr. Amina Khan", "Zouhair Azam", "Prof. Noor", "Dr. Sarah Ahmed"]
    const lecturer = faculties[Math.floor(Math.random() * faculties.length)]
    setCourses((prev: Course[]) => prev.map((c: Course) => (c.code === code ? { ...c, lecturer } : c)))
    toast({ title: `${code} quick-assigned`, description: `${lecturer} (canned)` })
  }

  const filtered = courses.filter((c: Course) => `${c.code} ${c.name} ${c.lecturer}`.toLowerCase().includes(query.toLowerCase()))
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Courses</h1>
          <p className="text-gray-400">Manage course offerings and assignments</p>
        </div>
        <button onClick={openAdd} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
          + Add New Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          type="text"
          placeholder="Search courses..."
          className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
        />
        <select className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
          <option>All Departments</option>
          <option>CS</option>
          <option>MATH</option>
        </select>
        <select className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
          <option>All Status</option>
          <option>Active</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((course) => (
          <div
            key={course.code}
            className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-bold text-lg">{course.code}</h3>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-medium">Active</span>
            </div>

            <p className="text-white font-medium mb-3">{course.name}</p>

            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <p>
                <span className="text-gray-500">Lecturer:</span> {course.lecturer}
              </p>
              <p>
                <span className="text-gray-500">Schedule:</span> {course.schedule}
              </p>
              <p>
                <span className="text-gray-500">Room:</span> {course.room}
              </p>
              <p>
                <span className="text-gray-500">Enrollment:</span> {course.enrollment} students
              </p>
              <p>
                <span className="text-gray-500">Credits:</span> {course.credits} • {course.department} Department
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => setViewing(course)} className="flex-1 px-3 py-2 border border-blue-500/50 text-blue-400 rounded font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300 text-sm">
                View
              </button>
              <button onClick={() => { setEditing(course); setShowForm(true) }} className="flex-1 px-3 py-2 border border-blue-500/50 text-blue-400 rounded font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300 text-sm">
                Edit
              </button>
              <button onClick={() => quickAssign(course.code)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-sm">
                Quick Assign
              </button>
            </div>
            <div className="mt-3 text-right">
              <button onClick={() => removeCourse(course.code)} className="text-red-400 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal (shared Dialog) */}
      <Dialog open={!!viewing} onOpenChange={(open) => { if (!open) setViewing(null) }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-xl">
          <DialogHeader>
            <DialogTitle>{viewing ? `${viewing.code} — ${viewing.name}` : ''}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div>
              <p className="text-gray-300 mb-4">Lecturer: <span className="text-white">{viewing.lecturer}</span></p>
              <p className="text-gray-400 text-sm mb-4">Schedule: {viewing.schedule} • Room: {viewing.room}</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Enrollment: {viewing.enrollment}</div>
                <div>Credits: {viewing.credits}</div>
                <div>Department: {viewing.department}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <button onClick={() => setViewing(null)} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
            <DialogClose />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form (Dialog) */}
      <Dialog open={showForm && !!editing} onOpenChange={(open) => { if (!open) { setShowForm(false); setEditing(null) } }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? (editing.code ? `Edit ${editing.code}` : 'Add Course') : ''}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={editing.code} onChange={(e: any) => setEditing({ ...editing, code: e.target.value })} placeholder="Code" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.name} onChange={(e: any) => setEditing({ ...editing, name: e.target.value })} placeholder="Name" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.lecturer} onChange={(e: any) => setEditing({ ...editing, lecturer: e.target.value })} placeholder="Lecturer" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.schedule} onChange={(e: any) => setEditing({ ...editing, schedule: e.target.value })} placeholder="Schedule" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.room} onChange={(e: any) => setEditing({ ...editing, room: e.target.value })} placeholder="Room" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.enrollment} onChange={(e: any) => setEditing({ ...editing, enrollment: e.target.value })} placeholder="Enrollment (e.g. 25/30)" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.credits} onChange={(e: any) => setEditing({ ...editing, credits: e.target.value })} placeholder="Credits" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.department} onChange={(e: any) => setEditing({ ...editing, department: e.target.value })} placeholder="Department" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => { setShowForm(false); setEditing(null) }} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
                <button onClick={() => { if (editing) { saveCourse(editing) } }} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog open={!!removeTarget} onOpenChange={(open) => { if (!open) setRemoveTarget(null) }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
          </DialogHeader>
          <div className="text-gray-300">Are you sure you want to remove <strong className="text-white">{removeTarget}</strong>? This action is canned and cannot be undone.</div>
            <DialogFooter>
            <button onClick={() => setRemoveTarget(null)} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
            <button onClick={() => { if (removeTarget) { setCourses((prev: Course[]) => prev.filter((c: Course) => c.code !== removeTarget)); toast({ title: `${removeTarget} removed`, description: '(canned)' }); setRemoveTarget(null) } }} className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
