import { FaChalkboardTeacher, FaCog, FaFileAlt, FaSchool, FaUsers } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

export const MenuList = [
    {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": <MdDashboard />,
        "id": "dashboard",
    },
    {
        "title": "Students",
        "path": "/dashboard/students",
        "icon": <FaUsers />,
        "id": "students",
        "subItems": [
            {
                "title": "All Students",
                "path": "/dashboard/students/all",
                "id": "students-all"
            },
            {
                "title": "Add Student",
                "path": "/dashboard/students/add",
                "id": "students-add"
            },
            {
                "title": "Attendance",
                "path": "/dashboard/students/attendance",
                "id": "students-attendance"
            },
            {
                "title": "Grades",
                "path": "/dashboard/students/grades",
                "id": "students-grades"
            }
        ]
    },
    {
        "title": "Teachers",
        "path": "/dashboard/teachers",
        "icon": <FaChalkboardTeacher />,
        "id": "teachers",
        "subItems": [
            {
                "title": "All Teachers",
                "path": "/dashboard/teachers/all",
                "id": "teachers-all"
            },
            {
                "title": "Add Teacher",
                "path": "/dashboard/teachers/add",
                "id": "teachers-add"
            },
            {
                "title": "Attendance",
                "path": "/dashboard/teachers/attendance",
                "id": "teachers-attendance"
            },
            {
                "title": "Schedule",
                "path": "/dashboard/teachers/schedule",
                "id": "teachers-schedule"
            }
        ]
    },
    {
        "title": "Classes",
        "path": "/dashboard/classes",
        "icon": <FaSchool />,
        "id": "classes",
        "subItems": [
            {
                "title": "All Classes",
                "path": "/dashboard/classes/all",
                "id": "classes-all"
            },
            {
                "title": "Assign Teacher",
                "path": "/dashboard/classes/assign-teacher",
                "id": "classes-assign"
            },
            {
                "title": "Class Schedule",
                "path": "/dashboard/classes/schedule",
                "id": "classes-schedule"
            }
        ]
    },
    {
        "title": "Exams",
        "path": "/dashboard/exams",
        "icon": <FaFileAlt />,
        "id": "exams",
        "subItems": [
            {
                "title": "All Exams",
                "path": "/dashboard/exams/all",
                "id": "exams-all"
            },
            {
                "title": "Create Exam",
                "path": "/dashboard/exams/create",
                "id": "exams-create"
            },
            {
                "title": "Results",
                "path": "/dashboard/exams/results",
                "id": "exams-results"
            }
        ]
    },
    {
        "title": "Settings",
        "path": "/dashboard/settings",
        "icon": <FaCog />,
        "id": "settings",
        "subItems": [
            {
                "title": "General",
                "path": "/dashboard/settings/general",
                "id": "settings-general"
            },
            {
                "title": "User Management",
                "path": "/dashboard/settings/users",
                "id": "settings-users"
            }
        ]
    }
];







