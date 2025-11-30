"use client"

import { Mail, BookOpen, Users, Edit as Credit, MapPin, Search, CheckCircle, Trash2, Plus } from "lucide-react"
import { useState, useContext } from "react"
import { ToastContext } from "./toast-provider"
import { ConfirmationDialog } from "./confirmation-dialog"

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [dropConfirm, setDropConfirm] = useState<{ open: boolean; course?: string }>({ open: false })
  const [courses, setCourses] = useState([
    {
      code: "CS-101",
      name: "Introduction to Programming",
      lecturer: "Zouhair Azam",
      email: "zouhair.azam@giki.edu.pk",
      schedule: "Tue/Thu 9:00-10:30",
      room: "Lab-1",
      enrollment: 65,
      capacity: 70,
      credits: "4",
      department: "CS",
      status: "active",
    },
    {
      code: "CS-372",
      name: "Human-Computer Interaction",
      lecturer: "Dr. Amina Khan",
      email: "amina.khan@giki.edu.pk",
      schedule: "Mon/Wed 10:00-11:30",
      room: "MLH-2",
      enrollment: 42,
      capacity: 50,
      credits: "3",
      department: "CS",
      status: "active",
    },
    {
      code: "CS-220",
      name: "Data Structures",
      lecturer: "Abdul Moeed",
      email: "abdul.moeed@giki.edu.pk",
      schedule: "Mon/Wed/Fri 14:00-15:00",
      room: "MLH-1",
      enrollment: 58,
      capacity: 60,
      credits: "3",
      department: "CS",
      status: "active",
    },
    {
      code: "MATH-101",
      name: "Calculus I",
      lecturer: "Dr. Sarah Ahmed",
      email: "sarah.ahmed@giki.edu.pk",
      schedule: "Mon/Wed/Fri 11:00-12:00",
      room: "Main Auditorium",
      enrollment: 120,
      capacity: 150,
      credits: "3",
      department: "MATH",
      status: "active",
    },
  ])
  const [addCourseModal, setAddCourseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const toastContext = useContext(ToastContext)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === "all" || course.department === selectedDept
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    return matchesSearch && matchesDept && matchesStatus
  })

  const handleEnroll = (courseCode: string) => {
    setEnrolledCourses((prev) => [...prev, courseCode])
    toastContext?.addToast({
      title: "Successfully enrolled!",
      description: `You've been added to ${courseCode}`,
      type: "success",
      duration: 3000,
    })
  }

  const handleDropCourse = (courseCode: string) => {
    setEnrolledCourses((prev) => prev.filter((c) => c !== courseCode))
    toastContext?.addToast({
      title: "Course dropped",
      description: `You have been removed from ${courseCode}`,
      type: "success",
      duration: 3000,
    })
    setDropConfirm({ open: false })
  }

  const handleAddCourse = () => {
    const newCourseCode = `NEW-${Math.floor(Math.random() * 1000)}`
    const newCourse = {
      code: newCourseCode,
      name: "New Course Title",
      lecturer: "To Be Assigned",
      email: "lecturer@giki.edu.pk",
      schedule: "Mon/Wed 10:00-11:30",
      room: "TBA",
      enrollment: 0,
      capacity: 40,
      credits: "3",
      department: "CS",
      status: "active",
    }
    setCourses((prev) => [newCourse, ...prev])
    setAddCourseModal(false)
    toastContext?.addToast({
      title: "Course created!",
      description: `New course ${newCourseCode} has been added`,
      type: "success",
      duration: 3000,
    })
  }

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course)
    setShowDetailsModal(true)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Courses</h1>
          <p className="text-gray-400">Manage {filteredCourses.length} course offerings</p>
        </div>
        <button
          onClick={() => setAddCourseModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by course code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300 text-sm"
          >
            <option value="all">All Departments</option>
            <option value="CS">Computer Science</option>
            <option value="MATH">Mathematics</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-slate-900/60 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-300 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/30 border border-blue-500/20 rounded-lg">
          <p className="text-gray-400 text-lg">No courses found matching your search</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedDept("all")
              setSelectedStatus("all")
            }}
            className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const enrollmentStatus = getEnrollmentStatus(course.enrollment, course.capacity)
            const isEnrolled = enrolledCourses.includes(course.code)
            return (
              <div
                key={course.code}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/60 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-blue-400 font-bold text-sm mb-1">{course.code}</h3>
                    <p className="text-white font-bold text-lg">{course.name}</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold border ${
                        enrollmentStatus.color === "green"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : enrollmentStatus.color === "yellow"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {enrollmentStatus.label}
                    </span>
                    {isEnrolled && (
                      <div className="p-1.5 rounded-lg bg-green-500/20">
                        <CheckCircle size={16} className="text-green-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-blue-500/20 rounded-lg p-4 mb-5">
                  <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Instructor</p>
                  <p className="text-white font-bold mb-3">{course.lecturer}</p>
                  <a
                    href={`mailto:${course.email}`}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 group text-sm"
                  >
                    <Mail size={16} className="flex-shrink-0" />
                    <span className="font-medium group-hover:underline truncate">{course.email}</span>
                  </a>
                </div>

                <div className="space-y-2 text-sm mb-5 pb-5 border-b border-blue-500/20">
                  <div className="flex items-center gap-2 text-gray-300">
                    <BookOpen size={16} className="text-blue-400 flex-shrink-0" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                    <span>{course.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={16} className="text-blue-400 flex-shrink-0" />
                    <span className="flex-1">
                      {course.enrollment}/{course.capacity} students
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded transition-all"
                      style={{ width: `${(course.enrollment / course.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <Credit size={14} className="text-blue-400" />
                    <span>
                      {course.credits} credits • {course.department}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="flex-1 px-3 py-2 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:border-blue-500 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-300 text-sm"
                  >
                    View Details
                  </button>
                  {isEnrolled ? (
                    <button
                      onClick={() => setDropConfirm({ open: true, course: course.code })}
                      className="flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center gap-1 bg-red-600/30 text-red-300 border border-red-500/30 hover:bg-red-600/40 hover:border-red-500/50"
                    >
                      <Trash2 size={16} />
                      Drop
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.code)}
                      className="flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center gap-1 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmationDialog
        open={dropConfirm.open}
        title="Drop Course"
        description={`Are you sure you want to drop ${dropConfirm.course}? This action cannot be undone.`}
        confirmText="Drop Course"
        cancelText="Keep Course"
        type="warning"
        onConfirm={() => handleDropCourse(dropConfirm.course!)}
        onCancel={() => setDropConfirm({ open: false })}
      />

      <ConfirmationDialog
        open={addCourseModal}
        title="Add New Course"
        description="A new course will be created with default values. You can edit the details afterwards."
        confirmText="Create Course"
        cancelText="Cancel"
        type="info"
        onConfirm={handleAddCourse}
        onCancel={() => setAddCourseModal(false)}
      />

      {showDetailsModal && selectedCourse && (
        <ConfirmationDialog
          open={showDetailsModal}
          title={`${selectedCourse.code}: ${selectedCourse.name}`}
          description={`Lecturer: ${selectedCourse.lecturer}\nSchedule: ${selectedCourse.schedule}\nRoom: ${selectedCourse.room}\nCapacity: ${selectedCourse.enrollment}/${selectedCourse.capacity}`}
          confirmText="Close"
          type="info"
          onConfirm={() => setShowDetailsModal(false)}
          onCancel={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  )
}

function getEnrollmentStatus(enrollment: number, capacity: number) {
  const percentage = (enrollment / capacity) * 100
  if (percentage >= 95) return { label: "Full", color: "red" }
  if (percentage >= 80) return { label: "Nearly Full", color: "yellow" }
  return { label: "Available", color: "green" }
}
