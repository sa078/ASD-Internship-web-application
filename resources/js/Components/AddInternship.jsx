import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddInternship = () => {
    const [form, setForm] = useState({
        internship_name: "",
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
        setMessage("");
        try {
            const response = await fetch("/internships", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify(form),
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
                title: "Successfully Created Internship",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }, [message]);

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internshipName"
                    >
                        Internship Name
                    </label>
                    <input
                        type="text"
                        id="internshipName"
                        name="internshipName"
                        value={form.internshipName}
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
                        id="description"
                        name="description"
                        value={form.description}
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
                        id="relatedCourse"
                        name="relatedCourse"
                        value={form.relatedCourse}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="internshipName"
                    >
                        Work Hours
                    </label>
                    <input
                        type="text"
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddInternship;
