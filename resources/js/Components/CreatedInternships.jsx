import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreatedInternships = ({ initialInternships = [] }) => {
    const [internships, setInternships] = useState(initialInternships);
    const [loading, setLoading] = useState(initialInternships.length === 0);

    useEffect(() => {
        if (initialInternships.length === 0) {
            axios
                .get("/user-internships", { withCredentials: true })
                .then((response) => {
                    setInternships(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching internships:", error);
                    setLoading(false);
                });
        }
    }, [initialInternships]);

    const handleEdit = (id) => {
        window.location.href = `/internships/${id}/edit`;
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/internships/${id}`, {
                        headers: {
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content"),
                        },
                        withCredentials: true,
                    })
                    .then(() => {
                        setInternships((prev) =>
                            prev.filter((i) => i.id !== id)
                        );
                        Swal.fire({
                            icon: "success",
                            title: "Successfully Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to delete internship.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
            }
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="overflow-x-auto">
            {internships.length === 0 ? (
                <p>No internships found.</p>
            ) : (
                <table className="table-auto w-full text-left border-collapse rounded-lg shadow-md bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Related Course
                            </th>
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Internship Name
                            </th>
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Description
                            </th>
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Work Hours
                            </th>
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Work Location
                            </th>
                            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {internships.map((internship, idx) => (
                            <tr
                                key={internship.id}
                                className={
                                    idx % 2 === 0
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-gray-50 dark:bg-gray-900"
                                }
                            >
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    {internship.related_course}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    {internship.internship_name}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    {internship.internship_description}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    {internship.work_hours}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    {internship.work_location}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition-colors duration-150"
                                        onClick={() =>
                                            handleEdit(internship.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-150"
                                        onClick={() =>
                                            handleDelete(internship.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CreatedInternships;
