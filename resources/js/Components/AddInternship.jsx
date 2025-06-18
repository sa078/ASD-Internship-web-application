import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const initialFormState = {
    position: "",
    educationalRequirements: "",
    relatedCourse: "",
    workDescription: "",
    closingDate: "",
    closingTime: "23:59",
    assumptionOfDuties: "",
    workHours: "8 hours",
    customWorkHours: "",
    location: "",
};

const AddInternship = () => {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Auto-populate related course based on position
    useEffect(() => {
        const position = form.position.toLowerCase();

        if (
            position.includes("developer") ||
            position.includes("web") ||
            position.includes("mobile") ||
            position.includes("app") ||
            position.includes("software") ||
            position.includes("system administrator") ||
            position.includes("network specialist")
        ) {
            setForm((prev) => ({ ...prev, relatedCourse: "Computer Science" }));
        } else if (
            position.includes("cyber security") ||
            position.includes("security software developer") ||
            position.includes("consultant") ||
            position.includes("cryptanalyst") ||
            position.includes("cyber security analyst") ||
            position.includes("cyber security administrator")
        ) {
            setForm((prev) => ({ ...prev, relatedCourse: "Cyber Security" }));
        } else if (
            position.includes("informatics specialist") ||
            position.includes("analyst programmer") ||
            position.includes("systems analyst") ||
            position.includes("information architect") ||
            position.includes("web analyst") ||
            position.includes("data analyst")
        ) {
            setForm((prev) => ({ ...prev, relatedCourse: "Informatics" }));
        } else if (
            position.includes("journalist") ||
            position.includes("public relations") ||
            position.includes("communication specialist") ||
            position.includes("media designer") ||
            position.includes("photographer") ||
            position.includes("videographer") ||
            position.includes("entrepreneur")
        ) {
            setForm((prev) => ({
                ...prev,
                relatedCourse: "Journalism and Media Technology",
            }));
        } else if (position.includes("design")) {
            setForm((prev) => ({ ...prev, relatedCourse: "Graphic Design" }));
        } else if (position.includes("marketing")) {
            setForm((prev) => ({ ...prev, relatedCourse: "Finance" }));
        }
    }, [form.position]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const isValidText = (text) => {
        if (text.length < 3) return false;
        if (!text.includes(" ")) return false;
        const specialChars = /[^a-zA-Z\s.,'-]/;
        if (specialChars.test(text)) return false;
        const repeatedChars = /(.)\1{3,}/;
        if (repeatedChars.test(text)) return false;
        return true;
    };
    const hasRepeatedCharacters = (text) => {
        return /(.)\1{3,}/.test(text);
    };
    const hasMinimumWords = (text, minWords) => {
        const words = text.trim().split(/\s+/);
        return words.length >= minWords;
    };

    const hasValidWords = (text) => {
        const words = text.trim().split(/\s+/);
        if (words.length === 0) return false;

        const validWords = words.filter((word) => {
            // Clean word by removing non-alphanumeric characters
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");

            // Skip empty strings after cleaning
            if (cleanWord.length === 0) return false;

            // Allow short technical terms (2-4 characters)
            if (cleanWord.length <= 4) return true;

            // Allow words that appear to be technical acronyms (all caps)
            if (/^[A-Z]{2,}$/.test(cleanWord)) return true;

            // Must have at least 3 characters for normal words
            if (cleanWord.length < 3) return false;

            // Must contain at least one vowel or 'y'
            if (!/[aeiouyAEIOUY]/.test(cleanWord)) return false;

            return true;
        });

        return validWords.length >= words.length * 0.7;
    };

    const validate = () => {
        const newErrors = {};

        if (!form.position.trim()) {
            newErrors.position = "Position is required";
        } else if (!isValidText(form.position)) {
            newErrors.position = "Please enter a valid position title";
        }

        if (!form.educationalRequirements.trim()) {
            newErrors.educationalRequirements =
                "Educational requirements are required";
        } else if (form.educationalRequirements.length < 10) {
            newErrors.educationalRequirements =
                "Please provide more detailed requirements (at least 10 characters)";
        } else if (!hasMinimumWords(form.educationalRequirements, 3)) {
            newErrors.educationalRequirements =
                "Please enter at least 3 meaningful words";
        } else if (!hasValidWords(form.educationalRequirements)) {
            newErrors.educationalRequirements =
                "Contains too many invalid words. Please use meaningful text";
        } else if (hasRepeatedCharacters(form.educationalRequirements)) {
            newErrors.educationalRequirements =
                "Too many repeated characters. Please check your input";
        }

        // Work Description validation
        if (!form.workDescription.trim()) {
            newErrors.workDescription = "Work description is required";
        } else if (form.workDescription.length < 20) {
            newErrors.workDescription =
                "Description should be at least 20 characters";
        } else if (!hasMinimumWords(form.workDescription, 5)) {
            newErrors.workDescription =
                "Please enter at least 5 meaningful words";
        } else if (!hasValidWords(form.workDescription)) {
            newErrors.workDescription =
                "Contains too many invalid words. Please use meaningful text";
        } else if (hasRepeatedCharacters(form.workDescription)) {
            newErrors.workDescription =
                "Too many repeated characters. Please check your input";
        }

        if (!form.closingDate) {
            newErrors.closingDate = "Closing date is required";
        } else {
            const selectedDate = new Date(form.closingDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.closingDate = "Closing date cannot be in the past";
            }
        }

        if (!form.location.trim()) {
            newErrors.location = "Location is required";
        } else if (!isValidText(form.location)) {
            newErrors.location = "Please enter a valid location";
        }

        if (form.workHours === "other" && !form.customWorkHours.trim()) {
            newErrors.customWorkHours = "Please specify work hours";
        }
        if (!form.assumptionOfDuties) {
            newErrors.assumptionOfDuties =
                "Assumption of duties date not selected";
        } else {
            const selectedDutyDate = new Date(form.assumptionOfDuties);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDutyDate < today) {
                newErrors.assumptionOfDuties = "Date cannot be in the past";
            }
        }
        if (!form.relatedCourse.trim()) {
            newErrors.relatedCourse =
                "Please fill in an appropriate position name to populate related course";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setErrors({});

        try {
            const response = await fetch("/internships", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
                body: JSON.stringify({
                    ...form,
                    customWorkHours:
                        form.workHours === "other" ? form.customWorkHours : "",
                }),
            });

            const contentType = response.headers.get("content-type");
            let data = {};

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                throw new Error("Non-JSON response received");
            }

            if (response.ok) {
                setMessage("Internship created successfully!");
                setForm(initialFormState);
            } else {
                if (data.errors) {
                    // Convert Laravel error format to match frontend
                    const formattedErrors = {};
                    Object.entries(data.errors).forEach(([key, messages]) => {
                        formattedErrors[key] = messages[0];
                    });
                    setErrors(formattedErrors);
                }
                setMessage(
                    data.message ||
                        "Validation failed. Please check your inputs."
                );
            }
        } catch (error) {
            console.error("Submission error:", error);
            setMessage("An unexpected error occurred. Please try again.");
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
                        htmlFor="position"
                    >
                        Position*
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.position ? "border-red-500" : ""
                        }`}
                    />
                    {errors.position && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.position}
                        </p>
                    )}
                </div>

                {/* Changed Educational Requirements to textarea */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="educationalRequirements"
                    >
                        Educational Requirements*
                    </label>
                    <textarea
                        id="educationalRequirements"
                        name="educationalRequirements"
                        value={form.educationalRequirements}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.educationalRequirements
                                ? "border-red-500"
                                : ""
                        }`}
                        rows="3"
                        placeholder="Example: Bachelor's degree required. Minimum 2 years experience. Knowledge of React preferred."
                    ></textarea>
                    {errors.educationalRequirements && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.educationalRequirements}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="relatedCourse"
                    >
                        Related Course
                    </label>
                    <input
                        type="text"
                        id="relatedCourse"
                        name="relatedCourse"
                        value={form.relatedCourse}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.relatedCourse ? "border-red-500" : ""
                        }`}
                        readOnly
                    />
                    {errors.relatedCourse && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.relatedCourse}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="workDescription"
                    >
                        Work Description*
                    </label>
                    <textarea
                        id="workDescription"
                        name="workDescription"
                        value={form.workDescription}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.workDescription ? "border-red-500" : ""
                        }`}
                        rows="4"
                    ></textarea>
                    {errors.workDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.workDescription}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label
                            className="block text-gray-700 dark:text-gray-300 mb-2"
                            htmlFor="closingDate"
                        >
                            Closing Date*
                        </label>
                        <input
                            type="date"
                            id="closingDate"
                            name="closingDate"
                            value={form.closingDate}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.closingDate ? "border-red-500" : ""
                            }`}
                        />
                        {errors.closingDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.closingDate}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 dark:text-gray-300 mb-2"
                            htmlFor="closingTime"
                        >
                            Closing Time (24h format)*
                        </label>
                        <input
                            type="time"
                            id="closingTime"
                            name="closingTime"
                            value={form.closingTime}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.closingTime ? "border-red-500" : ""
                            }`}
                            step="900"
                        />
                        {errors.closingTime && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.closingTime}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="assumptionOfDuties"
                    >
                        Assumption of Duties
                    </label>
                    <input
                        type="date"
                        id="assumptionOfDuties"
                        name="assumptionOfDuties"
                        value={form.assumptionOfDuties}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.assumptionOfDuties ? "border-red-500" : ""
                        }`}
                    />
                    {errors.assumptionOfDuties && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.assumptionOfDuties}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="workHours"
                    >
                        Work Hours
                    </label>
                    <select
                        id="workHours"
                        name="workHours"
                        value={form.workHours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option value="8 hours">8 hours (Full-time)</option>
                        <option value="4 hours">4 hours (Part-time)</option>
                        <option value="flexible">Flexible hours</option>
                        <option value="other">Other</option>
                    </select>
                    {form.workHours === "other" && (
                        <div className="mt-2">
                            <input
                                type="text"
                                name="customWorkHours"
                                value={form.customWorkHours}
                                onChange={handleChange}
                                placeholder="Specify work hours"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 mb-2"
                        htmlFor="location"
                    >
                        Location*
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                            errors.location ? "border-red-500" : ""
                        }`}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.location}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                >
                    Submit
                </button>

                {message && !message.includes("successfully") && (
                    <p className="text-red-500 text-center mt-4">{message}</p>
                )}
            </form>
        </div>
    );
};

export default AddInternship;
