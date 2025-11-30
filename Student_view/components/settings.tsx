"use client"

import { useState, useContext } from "react"
import { ToastContext } from "./toast-provider"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    institutionName: "GIKI Institute",
    academicYear: "2025-2026",
    semester: "Spring 2026",
    autoSave: true,
    emailNotifications: true,
    maintenanceMode: false,
    sessionTimeout: "30",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    pageSize: "25",
  })
  const [hasChanges, setHasChanges] = useState(false)
  const toastContext = useContext(ToastContext)

  const tabs = ["General", "Academic", "Notifications", "Security", "Backup", "System Info"]

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    setHasChanges(false)
    toastContext?.addToast({
      title: "Settings saved!",
      description: "Your changes have been saved successfully",
      type: "success",
      duration: 3000,
    })
  }

  const handleResetSettings = () => {
    setSettings({
      institutionName: "GIKI Institute",
      academicYear: "2025-2026",
      semester: "Spring 2026",
      autoSave: true,
      emailNotifications: true,
      maintenanceMode: false,
      sessionTimeout: "30",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12-hour",
      pageSize: "25",
    })
    setHasChanges(false)
    toastContext?.addToast({
      title: "Settings reset",
      description: "All settings have been reset to default values",
      type: "info",
      duration: 2000,
    })
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
                    value={settings.institutionName}
                    onChange={(e) => handleSettingChange("institutionName", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Academic Year</label>
                    <select
                      value={settings.academicYear}
                      onChange={(e) => handleSettingChange("academicYear", e.target.value)}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                    >
                      <option>2025-2026</option>
                      <option>2024-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Current Semester</label>
                    <select
                      value={settings.semester}
                      onChange={(e) => handleSettingChange("semester", e.target.value)}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                    >
                      <option>Spring 2026</option>
                      <option>Fall 2025</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-white font-bold mt-6">System Preferences</h3>

                <div className="space-y-3">
                  {["autoSave", "emailNotifications", "maintenanceMode"].map((pref) => (
                    <label key={pref} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={settings[pref as keyof typeof settings] as boolean}
                        onChange={(e) => handleSettingChange(pref, e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {pref === "autoSave"
                          ? "Auto-save changes"
                          : pref === "emailNotifications"
                            ? "Email notifications"
                            : "Maintenance mode"}
                      </span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <h3 className="text-white font-bold mt-6">Display Settings</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Time Format</label>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => handleSettingChange("timeFormat", e.target.value)}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                    >
                      <option>12-hour</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Default Page Size</label>
                  <input
                    type="number"
                    value={settings.pageSize}
                    onChange={(e) => handleSettingChange("pageSize", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-blue-500/30">
                  <button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      hasChanges
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleResetSettings}
                    className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    Reset to Defaults
                  </button>
                  <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-red-500 hover:text-red-400 hover:shadow-md hover:shadow-red-500/30 transition-all duration-300">
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
