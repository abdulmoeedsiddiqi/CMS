"use client"

import type React from "react"

import { useState, useContext } from "react"
import { Upload, File, Calendar, CheckCircle, Clock, Trash2 } from "lucide-react"
import { ToastContext } from "./toast-provider"

export default function Assignments() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      course: "CS-101",
      title: "Programming Assignment 3",
      dueDate: "2024-01-15",
      submissionDeadline: "Jan 15, 2025",
      status: "pending",
      progress: 50,
      priority: "high",
    },
    {
      id: 2,
      course: "CS-372",
      title: "HCI Project Prototype",
      dueDate: "2024-01-20",
      submissionDeadline: "Jan 20, 2025",
      status: "submitted",
      priority: "medium",
    },
    {
      id: 3,
      course: "MATH-101",
      title: "Calculus Problem Set",
      dueDate: "2024-01-18",
      submissionDeadline: "Jan 18, 2025",
      status: "pending",
      progress: 75,
      priority: "medium",
    },
  ])
  const toastContext = useContext(ToastContext)

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files])
      toastContext?.addToast({
        title: "File uploaded successfully",
        description: `${files.length} file(s) ready to submit`,
        type: "success",
        duration: 3000,
      })
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  const handleSubmitAssignment = () => {
    toastContext?.addToast({
      title: "Assignment submitted successfully!",
      description: `${uploadedFiles.length} file(s) submitted to course`,
      type: "success",
    })
    setAssignments((prev) => prev.map((a) => (a.id === 1 ? { ...a, status: "submitted" } : a)))
    setUploadedFiles([])
  }

  const handleUpdateProgress = (assignmentId: number, newProgress: number) => {
    setAssignments((prev) => prev.map((a) => (a.id === assignmentId ? { ...a, progress: newProgress } : a)))
    toastContext?.addToast({
      title: "Progress updated!",
      description: `Assignment progress set to ${newProgress}%`,
      type: "success",
      duration: 2000,
    })
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Assignments</h1>
        <p className="text-gray-400">Submit coursework and track your progress</p>
      </div>

      {/* Upload Section - Prominent and Clear */}
      <div
        className={`bg-gradient-to-br ${dragActive ? "from-blue-500/30 to-blue-600/20" : "from-blue-600/20 to-blue-700/10"} border-2 border-dashed ${dragActive ? "border-blue-400" : "border-blue-500/50"} rounded-xl p-8 mb-8 transition-all hover:border-blue-500/80 hover:bg-blue-600/30`}
      >
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Upload size={32} className="text-blue-400" />
            </div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Upload Your Submission</h3>
          <p className="text-gray-400 mb-4">Drag and drop your files here or click to browse</p>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <button
              as="label"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer inline-block"
            >
              Select Files
            </button>
          </label>

          {/* Upload Instructions */}
          <div className="mt-6 pt-6 border-t border-blue-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-gray-400">
                <p className="font-semibold text-blue-300 mb-1">Max Size</p>
                <p>100 MB per file</p>
              </div>
              <div className="text-gray-400">
                <p className="font-semibold text-blue-300 mb-1">Formats</p>
                <p>PDF, DOC, ZIP</p>
              </div>
              <div className="text-gray-400">
                <p className="font-semibold text-blue-300 mb-1">Multiple Files</p>
                <p>Supported</p>
              </div>
              <div className="text-gray-400">
                <p className="font-semibold text-blue-300 mb-1">Auto-save</p>
                <p>Not submitted yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="bg-slate-900/60 border border-green-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-400" />
            Ready to Submit ({uploadedFiles.length} files)
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-800/50 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <File size={18} className="text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">{file.name}</p>
                    <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitAssignment}
            className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
          >
            Submit Assignment
          </button>
        </div>
      )}

      {/* Active Assignments */}
      <h2 className="text-white font-bold text-2xl mb-4">Your Assignments</h2>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-bold text-sm">{assignment.course}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold border ${
                      assignment.priority === "high"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    }`}
                  >
                    {assignment.priority === "high" ? "Urgent" : "Normal"}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">{assignment.title}</h3>
              </div>
              <div
                className={`p-2 rounded-lg ${assignment.status === "submitted" ? "bg-green-500/20" : "bg-blue-500/20"}`}
              >
                {assignment.status === "submitted" ? (
                  <CheckCircle size={20} className="text-green-400" />
                ) : (
                  <Clock size={20} className="text-blue-400" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
              <Calendar size={16} />
              <span>Due: {assignment.submissionDeadline}</span>
              {assignment.status === "submitted" && (
                <span className="ml-auto text-green-400 flex items-center gap-1">
                  <CheckCircle size={14} />
                  Submitted
                </span>
              )}
            </div>

            {assignment.status === "pending" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs font-semibold">Progress</span>
                  <span className="text-gray-400 text-xs">{assignment.progress}% complete</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${assignment.progress}%` }}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  {[50, 75, 100].map((progress) => (
                    <button
                      key={progress}
                      onClick={() => handleUpdateProgress(assignment.id, progress)}
                      className="px-3 py-1 text-xs bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded hover:bg-blue-600/30 hover:border-blue-500/50 transition-all"
                    >
                      {progress}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                assignment.status === "submitted"
                  ? "bg-slate-700 text-gray-400 cursor-default"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
              }`}
              disabled={assignment.status === "submitted"}
            >
              {assignment.status === "submitted" ? "Already Submitted" : "Upload Files"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
