import React, { useEffect, useState } from "react";

const StudentInternRequest = ({
    imageSrc,
    imageAlt,
    studentName,
    universityName,
    courseName,
    appliedInternship,
    dateOfApply,
    interest,
    studentNum,
    email,
    cv,
    nustLetter,
}) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("/student-requests")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setRequests(data))
            .catch((error) => {
                console.error("Fetch error:", error);
                // Optionally set an error state here
            });
    }, []);
    // Buttons defined INSIDE the component
    const buttons = [
        {
            label: "Accept",
            styleType: "primary",
            onClick: () => console.log("Primary button clicked"),
        },
        {
            label: "View Profile",
            styleType: "secondary",
            onClick: () =>
                (window.location.href = route("view-student-profiles")),
        },
        {
            label: "Reject",
            styleType: "danger",
            onClick: () => console.log("Delete button clicked"),
        },
    ];

    return (
        <div className="p-6 text-gray-900 dark:text-gray-100">
            {requests.length === 0 ? (
                <div className="text-center text-lg text-gray-500 dark:text-gray-400">
                    No Applicants
                </div>
            ) : (
                requests.map((request) => (
                    <div
                        key={request.application_id}
                        className="flex items-center gap-8 mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                    >
                        {/* Image Section */}
                        <div className="flex-none w-48 h-48">
                            <img
                                src={
                                    request.profile_picture ||
                                    "/placeholder.jpg"
                                }
                                alt={request.studentName}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                        </div>

                        {/* Student Information Section */}
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex-1 space-y-2">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Student Name
                                </label>
                                <p className="text-lg font-semibold dark:text-white">
                                    {request.studentName}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    University Name
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {request.universityName}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Course Name
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {request.courseName}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Student Number
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {request.studentNum}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Email
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {request.email}
                                </p>
                            </div>
                        </div>

                        {/* Application Information */}
                        <div className="flex-1 space-y-2">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Applied Internship
                                </label>
                                <p className="text-lg font-semibold dark:text-white">
                                    {request.appliedInternship}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Date of Apply
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {new Date(
                                        request.dateOfApply
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Interest
                                </label>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {request.interest}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 ml-auto min-w-[200px]">
                            <button
                                onClick={() =>
                                    handleApplication(
                                        request.application_id,
                                        "accepted"
                                    )
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Accept Application
                            </button>
                            <button
                                onClick={() =>
                                    handleApplication(
                                        request.application_id,
                                        "rejected"
                                    )
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                                Reject Application
                            </button>
                            <button
                                onClick={() =>
                                    downloadDocument(request.student_id, "cv")
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Download CV
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StudentInternRequest;
