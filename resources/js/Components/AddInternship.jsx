import React, { useState } from "react";
import Swal from "sweetalert2";

const AddInternship = () => {
    const [form, setForm] = useState({
        internshipName: "",
        description: "",
        relatedCourse: "",
        workHours: "",
        location: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/internships", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify(form), // <-- FIXED
            });
            if (response.ok) {
                setMessage("Internship created successfully!");
                setForm({
                    internshipName: "",
                    description: "",
                    relatedCourse: "",
                    workHours: "",
                    location: "",
                });
            } else {
                setMessage("Failed to create internship.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        }
    };
    useEffect(() => {
        if (message === "Internship created successfully!") {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Internship posted successfully!",
                showConfirmButton: false,
                timer: 2000
            });

            // Reset form
            setForm({
                companyName: "",
                position: "",
                educationalRequirements: "",
                relatedCourses: "",
                workDescription: "",
                closingDate: null,
                workHours: "",
                contactPersonName: "",
                contactEmail: "",
                contactPhoneNumber: "",
                location: ""
            });

        } catch (error) {
            console.error("Submission error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "An error occurred while creating the internship",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internshipName"
                    >
                        Position Name
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="educationalRequirements"
                        name="educationalRequirements"
                        value={form.educationalRequirements}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internshipName"
                    >
                        Related Course
                    </label>
                    <input
                        type="text"
                        id="relatedCourses"
                        name="relatedCourses"
                        value={form.relatedCourses}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.relatedCourses ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                        placeholder="e.g. Computer Science, Information Technology"
                    />
                    {errors.relatedCourses && <p className="text-red-500 text-sm mt-1">{errors.relatedCourses}</p>}
                </div>

                {/* Work Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="workDescription">
                        Work Description*
                    </label>
                    <textarea
                        id="workDescription"
                        name="workDescription"
                        value={form.workDescription}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                    {errors.closingDate && <p className="text-red-500 text-sm mt-1">{errors.closingDate}</p>}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internshipName"
                    >
                        Work Hours
                    </label>
                    <select
                        id="workHours"
                        name="workHours"
                        value={form.workHours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? 'Posting Internship...' : 'Post Internship'}
                </button>

                {message && !message.includes("successfully") && (
                    <p className="text-red-500 text-center mt-4">{message}</p>
                )}
            </form>
        </div>
    );
};

export default AddInternship;