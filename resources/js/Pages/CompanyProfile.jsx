import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CompanyProfile({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2>Company Profile</h2>}>
            <Head title="Company Profile" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Your content here */}
                <p>This is the Company Profile page.</p>
            </div>
        </AuthenticatedLayout>
    );
}