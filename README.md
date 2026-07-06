# 🏫 CampusX + | Centralized University Management Portal

A centralized digital platform for managing academic and campus-wide administrative activities at GIK Institute of Engineering Sciences & Technology. The system provides separate interfaces for students and administrators, offering a unified solution to replace fragmented manual processes.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Target Users](#target-users)
4. [Features](#features)
5. [Technology Stack](#technology-stack)
6. [Prerequisites](#prerequisites)
7. [Installation & Setup](#installation--setup)
8. [Project Structure](#project-structure)
9. [Screenshots](#screenshots)
10. [Current Status (Prototype)](#current-status-prototype)
11. [Usability Testing](#usability-testing)
12. [Future Enhancements](#future-enhancements)
13. [Contributors](#contributors)
14. [Course Information](#course-information)
15. [GitHub Link](#github-link)

---

## 📌 Project Overview

At GIKI, various campus operations — such as course management, class scheduling, lecturer assignments, and event bookings — are currently handled through separate manual processes or fragmented systems. This often leads to confusion, scheduling conflicts, and miscommunication between departments, faculty, and student organizations.

The **GIKI Campus Management System (CMS)** aims to provide a centralized digital platform for managing academic and campus-wide administrative activities. It allows administrators to assign classes to lecturers, schedule rooms, and approve club event bookings for fields or auditoriums. Students and faculty can view schedules, access course information, and stay updated on upcoming campus activities — all from a single, unified web interface.

---

## ❓ Problem Statement

Fragmented manual processes for campus operations at GIKI lead to:
- Scheduling conflicts
- Delayed communication
- Double-booking of venues
- Lack of visibility for rescheduled classes
- No unified event calendar
- Repetitive data entry for administrative staff

---

## 👥 Target Users

| User Type | Description | Goals | Pain Points |
|-----------|-------------|-------|-------------|
| **Students** | Regular users accessing daily | View timetables, class details, events, submit assignments | No visibility of rescheduled classes, no unified calendar |
| **Faculty** | Lecturers & TAs managing courses | Manage courses, upload assignments, request room changes | Scheduling overlaps, delayed course assignment communication |
| **Administrative Staff** | Core management users | Assign lecturers, allocate classrooms, approve bookings | Manual coordination, conflicting schedules, repetitive data entry |
| **Club Representatives** | Students organizing events | Request and book venues for events | Delayed approvals, double-booking, no online booking system |

---

## ✨ Features

### Student View
| Feature | Description |
|---------|-------------|
| **Dashboard** | Upcoming classes, pending tasks, weekly overview |
| **My Courses** | List of enrolled courses with lecturer, schedule, room details |
| **Timetable** | Weekly grid showing personal class schedule |
| **Room Booking** | Check availability and book rooms for study groups/projects |
| **Assignment Submission** | Upload assignments for enrolled courses |
| **Profile Management** | View and edit personal profile |
| **Settings** | Adjust application preferences |

### Admin View
| Feature | Description |
|---------|-------------|
| **Dashboard** | Approve bookings, quick assign tasks, view calendar |
| **Courses Page** | View, edit, and quick assign courses |
| **Timetable Page** | View and edit calendar schedules |
| **Venue Booking Page** | Book venues (Auditorium, lecture halls, sports ground) |
| **User Page** | Add, delete, view, edit users |
| **Settings Page** | Configure system preferences |

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|--------------|
| **Runtime & OS** | Windows 10/11 (64-bit), Node.js 18.18 LTS+ |
| **Framework** | Next.js 14 (App Router architecture) |
| **UI Library** | React 18 |
| **Language** | TypeScript (with SWC compiler) |
| **Package Manager** | pnpm 8+ (via Corepack), npx (optional) |
| **Styling** | Tailwind CSS 3 (utility-first) |
| **Component Library** | shadcn/ui (Radix UI primitives, CVA) |
| **Icons** | Lucide Icons |
| **Charts** | Recharts (bar, line, pie charts) |
| **Code Quality** | ESLint, Prettier (Next.js defaults) |
| **State Management** | React useState hooks (local mock data) |
| **Development Tools** | VS Code with TypeScript & ESLint extensions |

---

## 📦 Prerequisites

| Requirement | Specification |
|-------------|---------------|
| **Operating System** | Windows 10 or Windows 11 (64-bit) |
| **Node.js** | Version 18.18 LTS or higher |
| **Package Manager** | pnpm version 8 or above |
| **PowerShell** | Must allow local script execution |
| **Browser** | Google Chrome or Microsoft Edge (with dev tools) |
| **IDE** | Visual Studio Code with TypeScript & ESLint extensions |

---

## 🚀 Installation & Setup

### Step 1: Install Node.js
Download and install Node.js version 18 or later from [nodejs.org](https://nodejs.org/)

### Step 2: Enable Corepack
```bash
corepack enable

Step 3: Clone the Repository
bash
git clone https://github.com/abdulmoeedsiddiqi/CMS.git
cd CMS
Step 4: Run Student View
bash
cd Student_view
pnpm install
pnpm dev
Access at: http://localhost:3000

Step 5: Run Admin View (Open a second terminal)
bash
cd Admin_view/CMS
pnpm install
pnpm dev -- -p 3001
Access at: http://localhost:3001

Stopping the Servers
Press Ctrl + C in each terminal window where a server is running.

📁 Project Structure
text
CMS/
├── Student_view/                    # Student application
│   ├── app/                         # Next.js App Router pages
│   ├── components/                  # Reusable UI components
│   ├── public/                      # Static assets
│   └── package.json                 # Dependencies & scripts
│
├── Admin_view/
│   └── CMS/                         # Admin application
│       ├── app/                     # Admin pages (App Router)
│       ├── components/              # Admin UI components
│       ├── public/                  # Static assets
│       └── package.json             # Dependencies & scripts
│
├── media/                           # Screenshots & documentation assets
└── README.md                        # Project documentation
📸 Screenshots
Admin View
Page	Screenshot
Dashboard (Approve booking, quick assign, view calendar)	https://media/image2.png
Courses Page (View, edit, quick assign courses)	https://media/image3.png
Timetable Page (View, edit calendar)	https://media/image4.png
Venue Booking Page (Book Auditorium, lecture halls, sports ground)	https://media/image5.png
User Page (Add, delete, view, edit users)	https://media/image6.png
Settings Page (System configuration)	https://media/image7.png
Student View
Page	Screenshot
Dashboard (Upcoming classes, pending tasks, weekly overview)	https://media/image8.png
Timetable (Weekly class schedule)	https://media/image9.png
Room Booking (Check availability, book study rooms)	https://media/image10.png
My Courses (Enrolled courses with details)	https://media/image11.png
Profile (View personal information)	https://media/image12.png
Settings (Adjust preferences)	https://media/image13.png
⚠️ Current Status (Prototype)
This is a demonstration prototype. The following limitations apply:

Data Layer
All dashboard information and component data are hard-coded arrays stored directly in frontend code

No external database, server, or API connection

No data persistence — refreshing the page resets all application state

Actions & Form Handling
All user interactions operate only on temporary local state

No backend validation or data saving

All changes disappear upon browser refresh

File Upload & Drag-and-Drop
File drop areas visually accept files and display confirmation messages

No actual file upload or storage occurs

All file interactions are simulated for demonstration

Notifications & Activity Feed
Timetable, analytics, announcements, and activity cards display pre-defined demo information

No real-time update mechanism (WebSockets or SSE)

Access Control
Two separate applications (Student View + Admin View)

Role switching requires opening the respective application

No login system, session handling, or authentication logic

🧪 Usability Testing (Milestone 3)
Test Scenarios
Task	Description
Task 1	Enroll in a new course and check your course list
Task 2	Upload an assignment for a course you are enrolled in
Task 3	As a teacher, create a new course and upload an assignment
Task 4 (Optional)	Book a study room for a class or group session
Observations
Task	Finding
Task 1	"Enroll in Course" button easily found, but confirmation location unclear
Task 2	Successful uploads, but file format instructions caused confusion
Task 3	Course creation successful, but users expected confirmation message
Task 4	Booking clear, but available time slots not easily noticed
Identified Usability Problems
Problem	Solution Implemented
Missing confirmation feedback after key actions	Added confirmation messages for enrollments, uploads, and course creation
Unclear file upload instructions	Prominently highlighted file format guidelines
Available slots for room booking not visually clear	Improved visual display of available time slots
🔮 Future Enhancements
Backend integration with database persistence

User authentication and role-based access control

Real-time notifications via WebSockets

Actual file upload functionality

API integration for external services

Mobile-responsive design optimization

Email notifications for approvals/rejections

Export functionality (timetables, reports)

Integration with university calendar systems

👨‍💻 Contributors
Name	Registration Number
Abdul Moeed	2023009
Zouhair Azam Khan	2023789
📚 Course Information
Field	Details
Course	Human-Computer Interaction (CS-372)
Instructor	Sir Shahab Haider
Semester	Fall 2025
Project Title	GIKI Campus Management System (CMS)
Milestones Completed
Milestone	Description	Submission Date
Milestone 1	Problem Statement, User/Task/Domain Analysis, ER Diagram	-
Milestone 3	Prototype Screenshots, User Briefing, Usability Testing, Iterations	16/11/2025
Milestone 4	Platform Requirements, Tools, Startup Instructions, Shallow Functionality	1/12/2025
🔗 GitHub Link
Repository URL: https://github.com/abdulmoeedsiddiqi/CMS

📄 License
This project is developed for academic purposes as part of the Human-Computer Interaction course at GIK Institute of Engineering Sciences & Technology.

For any questions or feedback, please contact the contributors directly.

GIK INSTITUTE OF ENGINEERING SCIENCES & TECHNOLOGY
Faculty of Computer Science and Engineering
