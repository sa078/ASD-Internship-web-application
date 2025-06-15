import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditInternship from "@/Components/EditInternship";

export default function EditInternships({ auth, internship }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Internship
                </h2>
            }
        >
            <Head title="Edit Internship" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <EditInternship internship={internship} />
            </div>
        </AuthenticatedLayout>
    );
}