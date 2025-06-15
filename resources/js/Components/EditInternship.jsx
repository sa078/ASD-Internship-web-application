import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const EditInternship = ({ internship }) => {
    // Split deadline into date and time components
    const deadlineDate = internship.deadline 
        ? new Date(internship.deadline).toISOString().split('T')[0] 
        : '';
    
    const deadlineTime = internship.deadline 
        ? new Date(internship.deadline).toTimeString().substring(0, 5) 
        : '23:59';

    // Determine work hours selection
    const isCustomHours = !['8 hours', '4 hours', 'flexible'].includes(internship.work_hours);
    const initialWorkHours = isCustomHours ? 'other' : internship.work_hours;

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        position: internship.position || '',
        educationalRequirements: internship.educational_requirements || '',
        relatedCourse: internship.course || '',  // Now using 'course' field
        workDescription: internship.work_description || '',
        closingDate: deadlineDate,
        closingTime: deadlineTime,
        assumptionOfDuties: internship.assumption_of_duties || '',
        workHours: initialWorkHours,
        customWorkHours: isCustomHours ? internship.work_hours : '',
        location: internship.work_location || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('internships.update', internship.id));
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
                router.delete(route('internships.destroy', id), {
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
                            errors.educationalRequirements ? "border-red-500" : ""
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                        readOnly
                    />
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100"
                    />
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