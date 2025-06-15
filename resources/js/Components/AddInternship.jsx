import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddInternship = () => {
    const [form, setForm] = useState({
        companyName: "",
        position: "",
        educationalRequirements: "",
        relatedCourse: "",
        workDescription: "",
        closingDate: "",
        closingTime: "17:00",
        workHours: "8 hours",
        customWorkHours: "",
        assumptionOfDuties: "as soon as possible",
        location: "",
        enquirerName: "",
        enquirerEmail: "",
        enquirerPhone: ""
    });

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
        setForm(prev => ({ ...prev, relatedCourse: "Computer Science" }));
    } else if (
        position.includes("cyber security") ||
        position.includes("security software developer") ||
        position.includes("consultant") ||
        position.includes("cryptanalyst") ||
        position.includes("cyber security analyst") ||
        position.includes("cyber security administrator")
    ) {
        setForm(prev => ({ ...prev, relatedCourse: "Cyber Security" }));
    } else if (
        position.includes("informatics specialist") ||
        position.includes("analyst programmer") ||
        position.includes("systems analyst") ||
        position.includes("information architect") ||
        position.includes("web analyst") ||
        position.includes("data analyst")
    ) {
        setForm(prev => ({ ...prev, relatedCourse: "Informatics" }));
    } else if (
        position.includes("journalist") ||
        position.includes("public relations") ||
        position.includes("communication specialist") ||
        position.includes("media designer") ||
        position.includes("photographer") ||
        position.includes("videographer") ||
        position.includes("entrepreneur")
    ) {
        setForm(prev => ({ ...prev, relatedCourse: "Journalism and Media Technology" }));
    } else if (position.includes("design")) {
        setForm(prev => ({ ...prev, relatedCourse: "Graphic Design" }));
    } else if (position.includes("marketing")) {
        setForm(prev => ({ ...prev, relatedCourse: "Finance" }));
    }
}, [form.position]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "enquirerName") {
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            setForm({ ...form, [name]: capitalized });
            return;
        }

        setForm({ ...form, [name]: value });
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

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!form.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        } else if (!isValidText(form.companyName)) {
            newErrors.companyName = "Please enter a valid company name";
        }

        if (!form.position.trim()) {
            newErrors.position = "Position is required";
        } else if (!isValidText(form.position)) {
            newErrors.position = "Please enter a valid position title";
        }

        // Modified Educational Requirements validation
        if (!form.educationalRequirements.trim()) {
            newErrors.educationalRequirements = "Educational requirements are required";
        } else if (form.educationalRequirements.length < 10) {
            newErrors.educationalRequirements = "Please provide more detailed requirements";
        }

        if (!form.workDescription.trim()) {
            newErrors.workDescription = "Work description is required";
        } else if (form.workDescription.length < 20) {
            newErrors.workDescription = "Description should be at least 20 characters";
        } else if (!isValidText(form.workDescription)) {
            newErrors.workDescription = "Please enter a valid work description";
        }

        if (!form.closingDate) {
            newErrors.closingDate = "Closing date is required";
        } else {
            const selectedDate = new Date(form.closingDate);
            const today = new Date();
            if (selectedDate < today) {
                newErrors.closingDate = "Closing date cannot be in the past";
            }
        }

        if (!form.location.trim()) {
            newErrors.location = "Location is required";
        } else if (!isValidText(form.location)) {
            newErrors.location = "Please enter a valid location";
        }

        if (!form.enquirerName.trim()) {
            newErrors.enquirerName = "Name is required";
        } else if (!isValidText(form.enquirerName)) {
            newErrors.enquirerName = "Please enter a valid name";
        }

        if (!form.enquirerEmail) {
            newErrors.enquirerEmail = "Email is required";
        } else if (!emailRegex.test(form.enquirerEmail)) {
            newErrors.enquirerEmail = "Invalid email format";
        }

        if (!form.enquirerPhone) {
            newErrors.enquirerPhone = "Phone number is required";
        } else if (!phoneRegex.test(form.enquirerPhone)) {
            newErrors.enquirerPhone = "Invalid phone number (10-15 digits)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;

        try {
            const finalWorkHours = form.workHours === "other" 
                ? form.customWorkHours 
                : form.workHours;

            const submissionData = {
                ...form,
                workHours: finalWorkHours,
                closingDateTime: `${form.closingDate}T${form.closingTime}:00`
            };

            const response = await fetch("/internships", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                setMessage("Internship created successfully!");
                setForm({
                    companyName: "",
                    position: "",
                    educationalRequirements: "",
                    relatedCourse: "",
                    workDescription: "",
                    closingDate: "",
                    closingTime: "17:00",
                    workHours: "8 hours",
                    customWorkHours: "",
                    assumptionOfDuties: "as soon as possible",
                    location: "",
                    enquirerName: "",
                    enquirerEmail: "",
                    enquirerPhone: ""
                });
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Failed to create internship.");
            }
        } catch (error) {
            setMessage("An error occurred while submitting the form.");
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
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="companyName">
                        Company Name*
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.companyName ? "border-red-500" : ""}`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="position">
                        Position*
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.position ? "border-red-500" : ""}`}
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>

                {/* Changed Educational Requirements to textarea */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="educationalRequirements">
                        Educational Requirements*
                    </label>
                    <textarea
                        id="educationalRequirements"
                        name="educationalRequirements"
                        value={form.educationalRequirements}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.educationalRequirements ? "border-red-500" : ""}`}
                        rows="3"
                        placeholder="Example: Bachelor's degree required. Minimum 2 years experience. Knowledge of React preferred."
                    ></textarea>
                    {errors.educationalRequirements && <p className="text-red-500 text-sm mt-1">{errors.educationalRequirements}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="relatedCourse">
                        Related Course
                    </label>
                    <input
                        type="text"
                        id="relatedCourse"
                        name="relatedCourse"
                        value={form.relatedCourse}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="workDescription">
                        Work Description*
                    </label>
                    <textarea
                        id="workDescription"
                        name="workDescription"
                        value={form.workDescription}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.workDescription ? "border-red-500" : ""}`}
                        rows="4"
                    ></textarea>
                    {errors.workDescription && <p className="text-red-500 text-sm mt-1">{errors.workDescription}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="closingDate">
                            Closing Date*
                        </label>
                        <input
                            type="date"
                            id="closingDate"
                            name="closingDate"
                            value={form.closingDate}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.closingDate ? "border-red-500" : ""}`}
                        />
                        {errors.closingDate && <p className="text-red-500 text-sm mt-1">{errors.closingDate}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="closingTime">
                            Closing Time (24h format)*
                        </label>
                        <input
                            type="time"
                            id="closingTime"
                            name="closingTime"
                            value={form.closingTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                            step="900"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="assumptionOfDuties">
                        Assumption of Duties
                    </label>
                    <select
                        id="assumptionOfDuties"
                        name="assumptionOfDuties"
                        value={form.assumptionOfDuties}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option value="as soon as possible">As soon as possible</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="workHours">
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="location">
                        Location*
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.location ? "border-red-500" : ""}`}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div className="border-t pt-4 mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Enquiries</h3>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="enquirerName">
                            Contact Person Name*
                        </label>
                        <input
                            type="text"
                            id="enquirerName"
                            name="enquirerName"
                            value={form.enquirerName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.enquirerName ? "border-red-500" : ""}`}
                        />
                        {errors.enquirerName && <p className="text-red-500 text-sm mt-1">{errors.enquirerName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="enquirerEmail">
                            Email*
                        </label>
                        <input
                            type="email"
                            id="enquirerEmail"
                            name="enquirerEmail"
                            value={form.enquirerEmail}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.enquirerEmail ? "border-red-500" : ""}`}
                        />
                        {errors.enquirerEmail && <p className="text-red-500 text-sm mt-1">{errors.enquirerEmail}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="enquirerPhone">
                            Phone Number*
                        </label>
                        <input
                            type="tel"
                            id="enquirerPhone"
                            name="enquirerPhone"
                            value={form.enquirerPhone}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 ${errors.enquirerPhone ? "border-red-500" : ""}`}
                        />
                        {errors.enquirerPhone && <p className="text-red-500 text-sm mt-1">{errors.enquirerPhone}</p>}
                    </div>
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