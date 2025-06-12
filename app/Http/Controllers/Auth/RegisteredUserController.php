<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Validation\Rules\Password;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z\s\'-]+$/i',
                'regex:/^(?:[A-Za-z\s\'-]{2,})(?:\s+[A-Za-z\s\'-]{2,}){1,3}$/'
            ],
            'email' => [
                'required',
                'string',
                'max:255',
                'unique:' . User::class,
                'email:rfc,dns',
                'regex:/@(gmail\.com|nust\.na|outlook\.com)$/'
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ], [
            'name.regex' => 'Name must consist of 2 to 4 names with at least 2 characters each',
            'email.regex' => 'Email must be from @gmail.com, @nust.na, or @outlook.com',
            'password.min' => 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
