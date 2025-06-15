import React, { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePage } from "@inertiajs/react";

const AddInternship = () => {
    const { csrfToken } = usePage().props;
    const [form, setForm] = useState({
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
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?264|0)[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        // Validation checks (same as before)
        if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
        else if (!nameRegex.test(form.companyName)) newErrors.companyName = "Company name should only contain letters";

        if (!form.position.trim()) newErrors.position = "Position is required";

        if (!form.educationalRequirements.trim()) newErrors.educationalRequirements = "Educational requirements are required";
        else if (form.educationalRequirements.length < 20) newErrors.educationalRequirements = "Should be at least 20 characters";

        if (!form.relatedCourses.trim()) newErrors.relatedCourses = "Related courses are required";

        if (!form.workDescription.trim()) newErrors.workDescription = "Work description is required";
        else if (form.workDescription.length < 50) newErrors.workDescription = "Should be at least 50 characters";

        if (!form.closingDate) newErrors.closingDate = "Closing date is required";
        else if (new Date(form.closingDate) < new Date()) newErrors.closingDate = "Closing date cannot be in the past";

        if (!form.workHours.trim()) newErrors.workHours = "Work hours are required";

        if (!form.contactPersonName.trim()) newErrors.contactPersonName = "Contact person name is required";
        else if (!nameRegex.test(form.contactPersonName)) newErrors.contactPersonName = "Name should only contain letters";

        if (!form.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
        else if (!emailRegex.test(form.contactEmail)) newErrors.contactEmail = "Please enter a valid email address";

        if (!form.contactPhoneNumber.trim()) newErrors.contactPhoneNumber = "Contact phone number is required";
        else if (!phoneRegex.test(form.contactPhoneNumber)) newErrors.contactPhoneNumber = "Please enter a valid Namibian phone number";

        if (!form.location.trim()) newErrors.location = "Location is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDateChange = (date) => {
        setForm({ ...form, closingDate: date });
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
                body: JSON.stringify({
                    ...form,
                    closingDate: form.closingDate.toISOString()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors from server
                if (data.errors) {
                    setErrors(data.errors);
                    throw new Error("Please correct the highlighted errors");
                }
                throw new Error(data.message || "Failed to create internship");
            }

            // Success handling
            await Swal.fire({
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
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Post New Internship
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields remain exactly the same as in your original code */}
                {/* Company Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="companyName">
                        Company Name*
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.companyName ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                {/* Position */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="position">
                        Position*
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.position ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>

                {/* Educational Requirements */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="educationalRequirements">
                        Educational Requirements*
                    </label>
                    <textarea
                        id="educationalRequirements"
                        name="educationalRequirements"
                        value={form.educationalRequirements}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.educationalRequirements ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.educationalRequirements && <p className="text-red-500 text-sm mt-1">{errors.educationalRequirements}</p>}
                </div>

                {/* Related Courses */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="relatedCourses">
                        Related Courses*
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
                        rows={5}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.workDescription ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.workDescription && <p className="text-red-500 text-sm mt-1">{errors.workDescription}</p>}
                </div>

                {/* Closing Date */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="closingDate">
                        Closing Date*
                    </label>
                    <DatePicker
                        selected={form.closingDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.closingDate ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                        placeholderText="Select closing date"
                    />
                    {errors.closingDate && <p className="text-red-500 text-sm mt-1">{errors.closingDate}</p>}
                </div>

                {/* Work Hours */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="workHours">
                        Work Hours*
                    </label>
                    <input
                        type="text"
                        id="workHours"
                        name="workHours"
                        value={form.workHours}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.workHours ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                        placeholder="e.g. 8:00 AM - 5:00 PM"
                    />
                    {errors.workHours && <p className="text-red-500 text-sm mt-1">{errors.workHours}</p>}
                </div>

                {/* Contact Person Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="contactPersonName">
                        Contact Person Name*
                    </label>
                    <input
                        type="text"
                        id="contactPersonName"
                        name="contactPersonName"
                        value={form.contactPersonName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.contactPersonName ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.contactPersonName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonName}</p>}
                </div>

                {/* Contact Email */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="contactEmail">
                        Contact Email*
                    </label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={form.contactEmail}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.contactEmail ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                </div>

                {/* Contact Phone Number */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="contactPhoneNumber">
                        Contact Phone Number*
                    </label>
                    <input
                        type="tel"
                        id="contactPhoneNumber"
                        name="contactPhoneNumber"
                        value={form.contactPhoneNumber}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.contactPhoneNumber ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                        placeholder="e.g. +264 81 123 4567"
                    />
                    {errors.contactPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.contactPhoneNumber}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="location">
                        Location*
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.location ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-300'} dark:bg-gray-700 dark:text-gray-100`}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Posting Internship...' : 'Post Internship'}
                </button>
            </form>
        </div>
    );
};

export default AddInternship;