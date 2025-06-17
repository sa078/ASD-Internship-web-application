import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Add eye icons
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} noValidate>
                <div>
                    <InputLabel htmlFor="name" value="Company Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="e.g., ABC Company or John Doe Enterprises"
                        title="Name must consist of 1 to 7 words, each with at least 2 characters, containing only letters, apostrophes, or hyphens"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="e.g., yourname@example.com"
                        title="Enter a valid email address"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="contact_number"
                        value="Contact Number"
                    />
                    <TextInput
                        id="contact_number"
                        name="contact_number"
                        value={data.contact_number}
                        className="mt-1 block w-full"
                        onChange={(e) => {
                            let value = e.target.value;
                            // Auto-format based on prefix
                            if (value.startsWith("061") && value.length > 3) {
                                value = value.slice(0, 9);
                            } else if (
                                value.startsWith("081") &&
                                value.length > 3
                            ) {
                                value = value.slice(0, 10);
                            } else if (
                                value.startsWith("085") &&
                                value.length > 3
                            ) {
                                value = value.slice(0, 10);
                            } else if (
                                value.startsWith("+26461") &&
                                value.length > 6
                            ) {
                                value = value.slice(0, 12);
                            } else if (
                                value.startsWith("+26481") &&
                                value.length > 6
                            ) {
                                value = value.slice(0, 13);
                            } else if (
                                value.startsWith("+26485") &&
                                value.length > 6
                            ) {
                                value = value.slice(0, 13);
                            }
                            // Allow only numbers and plus at start
                            value = value.replace(/[^0-9+]/g, "");
                            setData("contact_number", value);
                        }}
                        placeholder="e.g., 061123456, 0811234567, +26461123456"
                        title="Valid formats: 
                061XXXXXX (9 digits), 
                081XXXXXXX (10 digits), 
                085XXXXXXX (10 digits), 
                +26461XXXXXX (11 digits), 
                +26481XXXXXXX (12 digits), 
                +26485XXXXXXX (12 digits)"
                    />
                    <InputError
                        message={errors.contact_number}
                        className="mt-2"
                    />
                </div>

                {/* Password Field */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="e.g., SecureP@ssw0rd123"
                            title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password Field */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full pr-10"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Re-enter your password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
