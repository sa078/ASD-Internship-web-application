import React, { useEffect, useState } from "react";

const StudentInternRequest = ({ applications = [], auth }) => {
    const [requests, setRequests] = useState(applications);
    const [error, setError] = useState(null);

    const handleApplication = (id, status) => {
        const csrfToken = document.querySelector(
            'meta[name="csrf-token"]'
        )?.content;

        if (!csrfToken) {
            console.error("CSRF token not found");
            return;
        }

        fetch(`/application/${id}/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ status }),
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the accepted/rejected application from the list
                    setRequests((prev) => prev.filter((req) => req.id !== id));
                } else {
                    throw new Error("Failed to update status");
                }
            })
            .catch((error) => {
                console.error("Status update error:", error);
                setError("Failed to update application status.");
            });
    };

    const downloadDocument = (studentId, type) => {
        window.open(`/student-document/${studentId}/${type}`, "_blank");
    };

    if (error) {
        return (
            <div className="p-6 text-red-500 dark:text-red-400">
                <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 text-gray-900 dark:text-gray-100">
            {requests.length === 0 ? (
                <div className="text-center text-lg text-gray-500 dark:text-gray-400">
                    No Applicants
                </div>
            ) : (
                requests.map((request) => (
                    <div
                        key={request.id}
                        className="flex flex-col md:flex-row items-start gap-8 mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                    >
                        {/* Image Section */}
                        <div className="flex-none w-full md:w-48 h-48">
                            <img
                                src={
                                    request.profile_picture ||
                                    "/placeholder.jpg"
                                }
                                alt={request.student_name}
                            />
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            {/* Student Information Section */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold mb-4">
                                    Student Information
                                </h2>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Student Name
                                    </label>
                                    <p>{request.student_name}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Student Bio
                                    </label>
                                    <p>{request.student_bio}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        University
                                    </label>
                                    <p>{request.universityName}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Course
                                    </label>
                                    <p>{request.course}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Student Number
                                    </label>
                                    <p>{request.student_num}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Email
                                    </label>
                                    <p>{request.student_email}</p>
                                </div>
                            </div>

                            {/* Application Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold mb-4">
                                    Application Details
                                </h2>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Applied Internship
                                    </label>
                                    <p>{request.internship_name}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Description
                                    </label>
                                    <p>{request.internship_description}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Date Applied
                                    </label>
                                    <p>
                                        {request.dateOfApply
                                            ? new Date(
                                                  request.dateOfApply
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Status
                                    </label>
                                    <p className="mt-1 capitalize">Submitted</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <button
                                onClick={() =>
                                    handleApplication(request.id, "accepted")
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm bg-green-600 text-white hover:bg-green-700"
                            >
                                Accept Application
                            </button>

                            <button
                                onClick={() =>
                                    handleApplication(request.id, "rejected")
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm bg-red-600 text-white hover:bg-red-700"
                            >
                                Reject Application
                            </button>

                            <button
                                onClick={() =>
                                    downloadDocument(request.student?.id, "cv")
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Download CV
                            </button>

                            <button
                                onClick={() =>
                                    downloadDocument(
                                        request.student?.id,
                                        "nust_letter"
                                    )
                                }
                                className="px-6 py-3 rounded-lg transition-colors shadow-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Download NUST Letter
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StudentInternRequest;
