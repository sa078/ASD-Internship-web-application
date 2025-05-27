import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AcceptedStudents({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2>Accepted Students</h2>}>
            <Head title="Accepted Students" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Your content here */}
                <p>This is the Accepted Students page.</p>
            </div>
        </AuthenticatedLayout>
    );
}