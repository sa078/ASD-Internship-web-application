import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const students = {
    1: {
        fullname: "John Smith",
        course: "Computer Science",
        email: "john.smith@example.com",
        studentNumber: "CS2023001",
        internship: "Software Developer at TechCorp",
        cvUrl: "#",
        nustLetterUrl: "#",
    },
    2: {
        fullname: "Sarah Johnson",
        course: "Business Administration",
        email: "sarah.johnson@example.com",
        studentNumber: "BA2023002",
        internship: "Marketing Intern at BrandCo",
        cvUrl: "#",
        nustLetterUrl: "#",
    },
    3: {
        fullname: "Michael Brown",
        course: "Electrical Engineering",
        email: "michael.brown@example.com",
        studentNumber: "EE2023003",
        internship: "Engineering Intern at PowerGrid",
        cvUrl: "#",
        nustLetterUrl: "#",
    },
};

function StudentCard({ id, onView, onApprove, onReject, isAccepted }) {
    const student = students[id];

    return (
        <div className="profile-card bg-[#111828] rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <i className="fas fa-user-graduate text-2xl"></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">{student.fullname}</h3>
                        <p className="text-gray-300">{student.course}</p>
                        {isAccepted && (
                            <span className="inline-flex items-center mt-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                <i className="fas fa-check mr-1"></i>
                                Accepted
                            </span>
                        )}
                    </div>
                </div>
                {!isAccepted && (
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => onApprove(id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
                        >
                            <i className="fas fa-check"></i>
                            <span>Approve</span>
                        </button>
                        <button
                            onClick={() => onReject(id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
                        >
                            <i className="fas fa-times"></i>
                            <span>Reject</span>
                        </button>
                        <button
                            onClick={() => onView(id)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
                        >
                            <i className="fas fa-eye"></i>
                            <span>View</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileModal({ student, onClose, onApprove, onReject, isAccepted }) {
    if (!student) return null;

    return (
        <div className="profile-modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96">
                <h3 className="text-xl font-bold mb-4">{student.fullname}'s Profile</h3>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Student Number:</strong> {student.studentNumber}</p>
                <p><strong>Internship:</strong> {student.internship}</p>
                {!isAccepted && (
                    <div className="mt-4 flex justify-between">
                        <button onClick={onApprove} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
                        <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
                    </div>
                )}
                <div className="mt-2 flex justify-between">
                    <button onClick={() => alert(`Downloading CV for ${student.fullname}`)} className="text-blue-500 underline">Download CV</button>
                    <button onClick={() => alert(`Downloading NUST letter for ${student.fullname}`)} className="text-blue-500 underline">Download NUST Letter</button>
                </div>
                <button onClick={onClose} className="mt-4 block w-full text-center bg-gray-300 px-4 py-2 rounded">Close</button>
            </div>
        </div>
    );
}

export default function Dashboard({ auth, applications }) {
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [acceptedStudents, setAcceptedStudents] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    const handleView = (id) => setCurrentStudentId(id);
    const handleClose = () => setCurrentStudentId(null);

    const handleApprove = (id) => {
        const student = students[id];
        alert(`Approving student ${student.fullname}`);
        setAcceptedStudents(prev => [...prev, id]);
    };

    const handleReject = (id) => {
        const student = students[id];
        if (window.confirm(`Are you sure you want to reject ${student.fullname}?`)) {
            alert(`Rejected student ${student.fullname}`);
        }
    };

    const allStudentIds = Object.keys(students);
    const pendingStudentIds = allStudentIds.filter(id => !acceptedStudents.includes(id));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    All Students
                                </button>
                                <button
                                    onClick={() => setActiveTab('accepted')}
                                    className={`py-2 px-4 font-medium ${activeTab === 'accepted' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Accepted Students ({acceptedStudents.length})
                                </button>
                            </div>

                            {/* Student Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(activeTab === 'all' ? allStudentIds : acceptedStudents).map((id) => (
                                    <StudentCard
                                        key={id}
                                        id={id}
                                        onView={handleView}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        isAccepted={acceptedStudents.includes(id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {currentStudentId && (
                <ProfileModal
                    student={students[currentStudentId]}
                    onClose={handleClose}
                    onApprove={() => {
                        handleApprove(currentStudentId);
                        handleClose();
                    }}
                    onReject={() => {
                        handleReject(currentStudentId);
                        handleClose();
                    }}
                    isAccepted={acceptedStudents.includes(currentStudentId)}
                />
            )}
        </AuthenticatedLayout>
    );
}