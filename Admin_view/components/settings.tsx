"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = ["General", "Academic", "Notifications", "Security", "Backup", "System Info"]

  function saveChanges() {
    // canned response
    toast({ title: 'Settings changed', description: 'Settings saved (canned).' })
  }

  function resetDefaults() {
    alert('Settings reset to defaults (canned).')
  }

  function cancelChanges() {
    alert('Changes cancelled (canned).')
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-2 bg-slate-900/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm h-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded font-medium text-sm transition-all duration-300 text-left ${
                  activeTab === tab.toLowerCase()
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-300 hover:text-white hover:bg-slate-800/50 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/60 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-white font-bold text-lg">General Settings</h2>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Institution Name</label>
                  <input
                    type="text"
                    defaultValue="GIKI Institute"
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Academic Year</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                      <option>2025-2026</option>
                      <option>2024-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Current Semester</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                      <option>Spring 2026</option>
                      <option>Fall 2025</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-white font-bold mt-6">System Preferences</h3>

                <div className="space-y-3">
                  {["Auto-save changes", "Email notifications", "Maintenance mode"].map((pref) => (
                    <label key={pref} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600"
                        defaultChecked={pref === "Email notifications"}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {pref}
                      </span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <h3 className="text-white font-bold mt-6">Display Settings</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Date Format</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Time Format</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300">
                      <option>12-hour</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Default Page Size</label>
                  <input
                    type="number"
                    defaultValue="25"
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-blue-500/30">
                  <button onClick={saveChanges} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                    Save Changes
                  </button>
                  <button onClick={resetDefaults} className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                    Reset to Defaults
                  </button>
                  <button onClick={cancelChanges} className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-red-500 hover:text-red-400 hover:shadow-md hover:shadow-red-500/30 transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Academic Settings</h2>
                <p className="text-gray-400">Configure academic calendar and policies</p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Notification Settings</h2>
                <p className="text-gray-400">Manage system notifications and alerts</p>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Security Settings</h2>
                <p className="text-gray-400">Configure security and access controls</p>
              </div>
            )}

            {activeTab === "backup" && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Backup Settings</h2>
                <p className="text-gray-400">Manage system backups and recovery</p>
              </div>
            )}

            {activeTab === "system info" && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">System Information</h2>
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex justify-between border-b border-blue-500/20 pb-2">
                    <span>CMS Version</span>
                    <span className="text-white font-medium">2.1.0</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/20 pb-2">
                    <span>Last Backup</span>
                    <span className="text-white font-medium">2025-03-15 02:00</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/20 pb-2">
                    <span>Database Size</span>
                    <span className="text-white font-medium">45.2 MB</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/20 pb-2">
                    <span>Active Users</span>
                    <span className="text-white font-medium">1,240</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Uptime</span>
                    <span className="text-white font-medium">15 days, 8 hours</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
