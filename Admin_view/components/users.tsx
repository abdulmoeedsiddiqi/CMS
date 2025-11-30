"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

type User = {
  name: string
  email: string
  role: string
  status: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { name: "Zouhair Azam", email: "zouhair@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Dr. Amina Khan", email: "amina.khan@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Abdul Moeed", email: "abdul.moeed@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Admin User", email: "admin@giki.edu.pk", role: "Admin", status: "Active" },
    { name: "Dr. Sarah Ahmed", email: "sarah.ahmed@giki.edu.pk", role: "Lecturer", status: "Inactive" },
  ])

  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)

  function openAdd() {
    setEditing({ name: "", email: "", role: "Lecturer", status: "Active" })
    setShowForm(true)
  }

  function saveUser(u: User) {
    setUsers((prev) => {
      const exists = prev.find((p) => p.email === u.email)
      if (exists) return prev.map((p) => (p.email === u.email ? u : p))
      return [u, ...prev]
    })
    setShowForm(false)
    setEditing(null)
    toast({ title: `User ${u.email} saved`, description: '(canned)' })
  }

  function removeUser(email: string) {
    setRemoveTarget(email)
  }

  const filtered = users.filter(u => `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Users</h1>
          <p className="text-gray-400">Manage admin and system users</p>
        </div>
        <button onClick={openAdd} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
          + Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300 flex-1 min-w-64"
        />
        <select className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Lecturer</option>
          <option>Staff</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/30">
                <th className="px-6 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Name</th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Email</th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Role</th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Status</th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium text-sm bg-slate-800/50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-blue-500/20 hover:bg-blue-500/10 transition-colors duration-300"
                >
                  <td className="px-6 py-3 text-gray-300 text-sm">{user.name}</td>
                  <td className="px-6 py-3 text-gray-400 text-sm">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        user.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button onClick={()=>{ setEditing(user); setShowForm(true)}} className="px-3 py-1 border border-blue-500/50 text-blue-400 rounded text-sm font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                      Edit
                    </button>
                    <button onClick={()=>removeUser(user.email)} className="px-3 py-1 border border-red-500/50 text-red-400 rounded text-sm font-medium hover:border-red-500 hover:text-red-300 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/30 transition-all duration-300">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showForm && !!editing} onOpenChange={(open)=>{ if(!open){ setShowForm(false); setEditing(null) } }}>
        <DialogContent className="bg-slate-900/80 rounded-lg p-6 w-11/12 max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? (editing.email ? `Edit ${editing.email}` : 'Add User') : ''}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div>
              <div className="grid grid-cols-1 gap-3">
                <input value={editing.name} onChange={(e)=>setEditing({...editing, name: e.target.value})} placeholder="Full Name" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <input value={editing.email} onChange={(e)=>setEditing({...editing, email: e.target.value})} placeholder="Email" className="px-3 py-2 bg-slate-800/50 rounded text-white" />
                <select value={editing.role} onChange={(e)=>setEditing({...editing, role: e.target.value})} className="px-3 py-2 bg-slate-800/50 rounded text-white">
                  <option>Lecturer</option>
                  <option>Admin</option>
                  <option>Staff</option>
                </select>
                <select value={editing.status} onChange={(e)=>setEditing({...editing, status: e.target.value})} className="px-3 py-2 bg-slate-800/50 rounded text-white">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={()=>{ setShowForm(false); setEditing(null)}} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
                <button onClick={()=>saveUser(editing)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
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
          <div className="text-gray-300">Remove user <strong className="text-white">{removeTarget}</strong>? This action is canned and cannot be undone.</div>
          <DialogFooter>
            <button onClick={()=>setRemoveTarget(null)} className="px-4 py-2 border rounded text-gray-300">Cancel</button>
            <button onClick={()=>{ if(removeTarget){ setUsers(prev=>prev.filter(u=>u.email!==removeTarget)); toast({ title: `User ${removeTarget} removed`, description: '(canned)' }); setRemoveTarget(null) } }} className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
