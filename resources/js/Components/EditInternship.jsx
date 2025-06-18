import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

const EditInternship = ({ internship }) => {
    // Split deadline into date and time components
    const deadlineDate = internship.deadline
        ? new Date(internship.deadline).toISOString().split("T")[0]
        : "";

    const deadlineTime = internship.deadline
        ? new Date(internship.deadline).toTimeString().substring(0, 5)
        : "23:59";

    // Determine work hours selection
    const isCustomHours = !["8 hours", "4 hours", "flexible"].includes(
        internship.work_hours
    );
    const initialWorkHours = isCustomHours ? "other" : internship.work_hours;

    const {
        data,
        setData,
        put,
        processing,
        errors,
        setError,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        position: internship.position || "",
        educationalRequirements: internship.educational_requirements || "",
        relatedCourse: internship.course || "",
        workDescription: internship.work_description || "",
        closingDate: deadlineDate,
        closingTime: deadlineTime,
        assumptionOfDuties: internship.assumption_of_duties || "",
        workHours: initialWorkHours,
        customWorkHours: isCustomHours ? internship.work_hours : "",
        location: internship.work_location || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        // Clear errors when user starts typing
        if (errors[name]) {
            clearErrors(name);
        }
    };

    useEffect(() => {
        const position = data.position.toLowerCase();

        if (
            position.includes("developer") ||
            position.includes("web") ||
            position.includes("mobile") ||
            position.includes("app") ||
            position.includes("software") ||
            position.includes("system administrator") ||
            position.includes("network specialist")
        ) {
            setData("relatedCourse", "Computer Science");
        } else if (
            position.includes("cyber security") ||
            position.includes("security software developer") ||
            position.includes("consultant") ||
            position.includes("cryptanalyst") ||
            position.includes("cyber security analyst") ||
            position.includes("cyber security administrator")
        ) {
            setData("relatedCourse", "Cyber Security");
        } else if (
            position.includes("informatics specialist") ||
            position.includes("analyst programmer") ||
            position.includes("systems analyst") ||
            position.includes("information architect") ||
            position.includes("web analyst") ||
            position.includes("data analyst")
        ) {
            setData("relatedCourse", "Informatics");
        } else if (
            position.includes("journalist") ||
            position.includes("public relations") ||
            position.includes("communication specialist") ||
            position.includes("media designer") ||
            position.includes("photographer") ||
            position.includes("videographer") ||
            position.includes("entrepreneur")
        ) {
            setData("relatedCourse", "Journalism and Media Technology");
        } else if (position.includes("design")) {
            setData("relatedCourse", "Graphic Design");
        } else if (position.includes("marketing")) {
            setData("relatedCourse", "Finance");
        }
    }, [data.position]);

    // Add validation functions
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

    // Update handleSubmit to include validation
    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors(); // Clear all existing errors

        // Frontend validation
        let hasErrors = false;

        if (!data.position.trim()) {
            setError("position", "Position is required");
            hasErrors = true;
        } else if (!isValidText(data.position)) {
            setError("position", "Please enter a valid position title");
            hasErrors = true;
        }

        if (!data.educationalRequirements.trim()) {
            setError(
                "educationalRequirements",
                "Educational requirements are required"
            );
            hasErrors = true;
        } else if (data.educationalRequirements.length < 10) {
            setError(
                "educationalRequirements",
                "Please provide more detailed requirements (at least 10 characters)"
            );
            hasErrors = true;
        } else if (!hasMinimumWords(data.educationalRequirements, 3)) {
            setError(
                "educationalRequirements",
                "Please enter at least 3 meaningful words"
            );
            hasErrors = true;
        } else if (!hasValidWords(data.educationalRequirements)) {
            setError(
                "educationalRequirements",
                "Contains too many invalid words. Please use meaningful text"
            );
            hasErrors = true;
        } else if (hasRepeatedCharacters(data.educationalRequirements)) {
            setError(
                "educationalRequirements",
                "Too many repeated characters. Please check your input"
            );
            hasErrors = true;
        }

        if (!data.workDescription.trim()) {
            setError("workDescription", "Work description is required");
            hasErrors = true;
        } else if (data.workDescription.length < 20) {
            setError(
                "workDescription",
                "Description should be at least 20 characters"
            );
            hasErrors = true;
        } else if (!hasMinimumWords(data.workDescription, 5)) {
            setError(
                "workDescription",
                "Please enter at least 5 meaningful words"
            );
            hasErrors = true;
        } else if (!hasValidWords(data.workDescription)) {
            setError(
                "workDescription",
                "Contains too many invalid words. Please use meaningful text"
            );
            hasErrors = true;
        } else if (hasRepeatedCharacters(data.workDescription)) {
            setError(
                "workDescription",
                "Too many repeated characters. Please check your input"
            );
            hasErrors = true;
        }

        if (!data.closingDate) {
            setError("closingDate", "Closing date is required");
            hasErrors = true;
        } else {
            const selectedDate = new Date(data.closingDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                setError("closingDate", "Closing date cannot be in the past");
                hasErrors = true;
            }
        }

        if (!data.location.trim()) {
            setError("location", "Location is required");
            hasErrors = true;
        } else if (!isValidText(data.location)) {
            setError("location", "Please enter a valid location");
            hasErrors = true;
        }

        if (data.workHours === "other" && !data.customWorkHours.trim()) {
            setError("customWorkHours", "Please specify work hours");
            hasErrors = true;
        }

        if (!data.assumptionOfDuties) {
            setError(
                "assumptionOfDuties",
                "Assumption of duties date not selected"
            );
            hasErrors = true;
        } else {
            const selectedDutyDate = new Date(data.assumptionOfDuties);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDutyDate < today) {
                setError("assumptionOfDuties", "Date cannot be in the past");
                hasErrors = true;
            }
        }

        if (!data.relatedCourse.trim()) {
            setError(
                "relatedCourse",
                "Please fill in an appropriate position name to populate related course"
            );
            hasErrors = true;
        }

        if (hasErrors) {
            // Show SweetAlert for validation errors
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Some inputs are incorrect. Correct the fields marked in red.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }
      

        // If validation passes, submit the form
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
                        htmlFor="position"
                    >
                        Position*
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={data.position}
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
                        value={data.educationalRequirements}
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
                        value={data.relatedCourse}
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
                        value={data.workDescription}
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
                            value={data.closingDate}
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
                            value={data.closingTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                            step="900"
                        />
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
                        value={data.assumptionOfDuties}
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
                        value={data.workHours}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option value="8 hours">8 hours (Full-time)</option>
                        <option value="4 hours">4 hours (Part-time)</option>
                        <option value="flexible">Flexible hours</option>
                        <option value="other">Other</option>
                    </select>
                    {data.workHours === "other" && (
                        <div className="mt-2">
                            <input
                                type="text"
                                name="customWorkHours"
                                value={data.customWorkHours}
                                onChange={handleChange}
                                placeholder="Specify work hours"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${
                                    errors.customWorkHours
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {errors.customWorkHours && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.customWorkHours}
                                </p>
                            )}
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
                        value={data.location}
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

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        disabled={processing}
                    >
                        {processing ? "Updating..." : "Update Internship"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInternship;
