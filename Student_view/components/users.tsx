"use client"

import { useState, useContext } from "react"
import { ToastContext } from "./toast-provider"
import { ConfirmationDialog } from "./confirmation-dialog"

export default function Users() {
  const [users, setUsers] = useState([
    { name: "Zouhair Azam", email: "zouhair@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Dr. Amina Khan", email: "amina.khan@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Abdul Moeed", email: "abdul.moeed@giki.edu.pk", role: "Lecturer", status: "Active" },
    { name: "Admin User", email: "admin@giki.edu.pk", role: "Admin", status: "Active" },
    { name: "Dr. Sarah Ahmed", email: "sarah.ahmed@giki.edu.pk", role: "Lecturer", status: "Inactive" },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [removeConfirm, setRemoveConfirm] = useState<{ open: boolean; email?: string }>({ open: false })
  const toastContext = useContext(ToastContext)

  const handleAddUser = () => {
    const newUser = {
      name: "New User",
      email: `newuser${Date.now()}@giki.edu.pk`,
      role: "Lecturer",
      status: "Active",
    }
    setUsers((prev) => [newUser, ...prev])
    setShowAddModal(false)
    toastContext?.addToast({
      title: "User added successfully!",
      description: "New user has been created",
      type: "success",
      duration: 3000,
    })
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    toastContext?.addToast({
      title: "User updated!",
      description: `${user.name} has been updated`,
      type: "success",
      duration: 2000,
    })
  }

  const handleRemoveUser = (email: string) => {
    setUsers((prev) => prev.filter((u) => u.email !== email))
    setRemoveConfirm({ open: false })
    toastContext?.addToast({
      title: "User removed",
      description: "User has been successfully removed",
      type: "success",
      duration: 3000,
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "All Roles" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Users</h1>
          <p className="text-gray-400">Manage admin and system users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          + Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300 flex-1 min-w-64"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
        >
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
              {filteredUsers.map((user) => (
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
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 border border-blue-500/50 text-blue-400 rounded text-sm font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setRemoveConfirm({ open: true, email: user.email })}
                      className="px-3 py-1 border border-red-500/50 text-red-400 rounded text-sm font-medium hover:border-red-500 hover:text-red-300 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/30 transition-all duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        open={showAddModal}
        title="Add New User"
        description="A new user account will be created with default values. Provide login credentials separately."
        confirmText="Create User"
        cancelText="Cancel"
        type="info"
        onConfirm={handleAddUser}
        onCancel={() => setShowAddModal(false)}
      />

      <ConfirmationDialog
        open={removeConfirm.open}
        title="Remove User"
        description="Are you sure you want to remove this user? This action cannot be undone."
        confirmText="Remove User"
        cancelText="Keep User"
        type="warning"
        onConfirm={() => handleRemoveUser(removeConfirm.email!)}
        onCancel={() => setRemoveConfirm({ open: false })}
      />
    </div>
  )
}
