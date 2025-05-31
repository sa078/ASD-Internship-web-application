import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React, { useState } from "react";

import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            company_description: user.company_description || "",
            company_image: null,
        });
    const [preview, setPreview] = useState(
        user.company_image ? `/company-image/${user.id}` : null
    );

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>
            <div className="flex flex-col md:flex-row gap-8 mt-6 w-full">
                {/* Left: Form */}

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="company_description"
                            value="Company Description"
                        />
                        <textarea
                            id="company_description"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                            value={data.company_description}
                            onChange={(e) =>
                                setData("company_description", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.company_description}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </form>
                <div className="flex flex-col items-center md:w-64 ml-auto self-start">
                    <div className="w-40 h-40 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        {user.company_image ? (
                            <img
                                src={`/company-image/${user.id}`}
                                alt="Company"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span className="text-gray-400">No Image</span>
                        )}
                    </div>
                    <label
                        htmlFor="company_image"
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
                    >
                        Update Image
                        <input
                            id="company_image"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setData("company_image", file);
                                    setPreview(URL.createObjectURL(file));

                                    // Auto-submit image
                                    const formData = new FormData();
                                    formData.append("company_image", file);

                                    await fetch(
                                        route("profile.update-company-image"),
                                        {
                                            method: "POST",
                                            headers: {
                                                "X-CSRF-TOKEN":
                                                    document.querySelector(
                                                        'meta[name="csrf-token"]'
                                                    ).content,
                                            },
                                            body: formData,
                                        }
                                    );

                                    // Optionally, refresh the page or user data here if needed
                                }
                            }}
                        />
                    </label>
                    <InputError
                        className="mt-2"
                        message={errors.company_image}
                    />
                </div>
            </div>
        </section>
    );
}
