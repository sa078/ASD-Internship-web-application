import React, { useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const EditInternship = ({ internship }) => {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            internship_name: internship.internship_name || "",
            internship_description: internship.internship_description || "",
            related_course: internship.related_course || "",
            work_hours: internship.work_hours || "",
            work_location: internship.work_location || "",
        });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("internships.update", internship.id));
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
                router.delete(route("internships.destroy", id), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to delete internship.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    },
                });
            }
        });
    };
    useEffect(() => {
        if (recentlySuccessful) {
            Swal.fire({
                icon: "success",
                title: "Successfully Updated Internship",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }, [recentlySuccessful]);

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                {recentlySuccessful && (
                    <div className="text-green-500 mb-2">
                        Internship updated successfully!
                    </div>
                )}
                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500 mb-2">
                        {Object.values(errors).map((err, i) => (
                            <div key={i}>{err}</div>
                        ))}
                    </div>
                )}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internship_name"
                    >
                        Internship Name
                    </label>
                    <input
                        type="text"
                        id="internship_name"
                        name="internship_name"
                        value={data.internship_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internship_description"
                    >
                        Description
                    </label>
                    <textarea
                        id="internship_description"
                        name="internship_description"
                        value={data.internship_description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="related_course"
                    >
                        Related Course
                    </label>
                    <input
                        type="text"
                        id="related_course"
                        name="related_course"
                        value={data.related_course}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="work_hours"
                    >
                        Work Hours
                    </label>
                    <input
                        type="text"
                        id="work_hours"
                        name="work_hours"
                        value={data.work_hours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="work_location"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="work_location"
                        name="work_location"
                        value={data.work_location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={processing}
                >
                    {processing ? "Updating..." : "Update Internship"}
                </button>
            </form>
            
        </div>
    );
};

export default EditInternship;
