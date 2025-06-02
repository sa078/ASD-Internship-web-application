import React, { useEffect, useState } from "react";

const StudentsList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("/api/accepted-students") // Or your correct API endpoint
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, []);

    if (students.length === 0) {
        return (
            <div className="text-center text-lg text-gray-500 dark:text-gray-400">
                No Accepted Students
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {students.map((student) => (
                <div
                    key={student.application_id}
                    className="flex items-center gap-8 p-6 border border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg shadow"
                >
                    <div className="flex-none w-32 h-32">
                        <img
                            src={student.profile_picture || "/placeholder.jpg"}
                            alt={student.studentName}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div>
                            <label className="text-sm font-medium font-bold text-gray-500 dark:text-gray-400">
                                Student Name
                            </label>
                            <p className="text-lg font-semibold dark:text-white">
                                {student.studentName}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium font-bold text-gray-500 dark:text-gray-400">
                                University Name
                            </label>
                            <p className="text-gray-700 dark:text-gray-300">
                                {student.universityName}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium font-bold text-gray-500 dark:text-gray-400">
                                Course Name
                            </label>
                            <p className="text-gray-700 dark:text-gray-300">
                                {student.courseName}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium font-bold text-gray-500 dark:text-gray-400">
                                Internship Name
                            </label>
                            <p className="text-gray-700 dark:text-gray-300">
                                {student.appliedInternship}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentsList;