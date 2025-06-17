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
                'regex:/^(?:[A-Za-z\'-]{2,})(?:\s+[A-Za-z\'-]{2,}){0,6}$/'
            ],
            'email' => [
                'required',
                'string',
                'email:rfc,dns', // This ensures valid email format
                'max:255',
                'unique:' . User::class,
                // Removed: 'regex:/@(gmail\.com|nust\.na|outlook\.com)$/'
            ],
            'password' => [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            'password_confirmation' => 'required|same:password',
            'contact_number' => [
                'required',
                'string',
                'max:20',
                'regex:/^((061\d{6})|(081\d{7})|(085\d{7})|(\+26461\d{6})|(\+26481\d{7})|(\+26485\d{7}))$/'
            ],
        ], [
            // Custom error messages
            'name.required' => 'The company name is required',
            'email.required' => 'The email address is required',
            'contact_number.required' => 'Contact number is required',
            'contact_number.regex' => 'Invalid format. Valid formats: 
    061XXXXXX (9 digits), 
    081XXXXXXX (10 digits), 
    085XXXXXXX (10 digits), 
    +26461XXXXXX (11 digits), 
    +26481XXXXXXX (12 digits), 
    +26485XXXXXXX (12 digits)',
            'password.required' => 'The password field is required',
            'password.min' => 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
            'password_confirmation.required' => 'Please confirm your password',
            'password_confirmation.same' => 'Passwords do not match',
            'email.regex' => 'Email must be from @gmail.com, @nust.na, or @outlook.com',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
