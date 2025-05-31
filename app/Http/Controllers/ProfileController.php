<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        if ($request->hasFile('company_image')) {
            $user->company_image = file_get_contents($request->file('company_image')->getRealPath());
        }
        $user->company_description = $request->company_description;

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    public function updateCompanyImage(Request $request)
    {
        $request->validate([
            'company_image' => 'required|image|max:2048',
        ]);

        $user = \App\Models\User::find(auth()->id());

        if ($request->hasFile('company_image')) {
            $path = $request->file('company_image')->store('company_images', 'public');
            $user->company_image = $path;
            $user->save();
        }

        return back();
    }
    public function showCompanyImage($userId)
    {
        $user = \App\Models\User::findOrFail($userId);

        if (!$user->company_image) {
            abort(404);
        }

        return response()->file(storage_path('app/public/' . $user->company_image));
    }
}
