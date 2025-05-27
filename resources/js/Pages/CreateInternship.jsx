import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddInternship from "@/Components/AddInternship";

import { Head } from "@inertiajs/react";

export default function CreateInternship({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Internship
                </h2>
            }
        >
            <Head title="Create Internship" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <AddInternship />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
