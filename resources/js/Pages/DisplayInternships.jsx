import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreatedInternships from "@/Components/CreatedInternships";
import { Head } from "@inertiajs/react";

export default function DisplayInternships({ auth, internships = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Created Internships
                </h2>
            }
        >
            <Head title="Created Internships" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <CreatedInternships initialInternships={internships} />
            </div>
        </AuthenticatedLayout>
    );
}