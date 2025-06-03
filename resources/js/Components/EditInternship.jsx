import React from "react";
import { useForm } from "@inertiajs/react";

const EditInternship = ({ internship }) => {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
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

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Edit Internship
            </h2>
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="internship_name">
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="internship_description">
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="related_course">
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="work_hours">
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="work_location">
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
