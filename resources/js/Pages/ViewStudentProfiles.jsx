import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ViewStudentsProfiles({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2>View Students Profiles</h2>}>
            <Head title="View Students Profiles" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Your content here */}
                <p>This is the View Students Profiles page.</p>
            </div>
        </AuthenticatedLayout>
    );
}