<?php

use App\Http\Controllers\ProfileController;
use App\Models\Internships;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\StudentRequestController;
use App\Models\Internship;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/company-profile', function () {
    return Inertia::render('CompanyProfile', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('company-profile');





Route::get('/create-internship', function () {
    return Inertia::render('CreateInternship', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('create-internship');

Route::post('/internships', [InternshipController::class, 'store'])->middleware('auth');
Route::post('/profile/company-image', [ProfileController::class, 'updateCompanyImage'])
    ->name('profile.update-company-image');

Route::get('/company-image/{user}', [ProfileController::class, 'showCompanyImage']);

// routes/web.php or routes/api.php

// routes/web.php

Route::get('/accepted-students', [StudentRequestController::class, 'showAcceptedStudents'])
    ->middleware(['auth', 'verified'])
    ->name('accepted-students');


Route::post('/applications/{id}/accept', [StudentRequestController::class, 'accept'])->name('applications.accept');

Route::get('/created-internships', function () {
    return Inertia::render('DisplayInternships', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('created-internships');


Route::get('/created-internships', function () {
    $internships = Internships::where('user_id', Auth::id())
        ->get(['id', 'related_course', 'internship_name', 'internship_description', 'work_hours', 'work_location']);
    return Inertia::render('DisplayInternships', [
        'auth' => [
            'user' => Auth::user(),
        ],
        'internships' => $internships,
    ]);
})->middleware(['auth', 'verified'])->name('created-internships');

Route::get('/internships/{id}/edit', function ($id) {
    $internship = Internships::findOrFail($id);
    return Inertia::render('EditInternships', [
        'auth' => [
            'user' => Auth::user(),
        ],
        'internship' => $internship,
    ]);
})->middleware(['auth', 'verified'])->name('internships.edit');
Route::put('/internships/{id}', [InternshipController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('internships.update');

Route::delete('/internships/{id}', [InternshipController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('internships.destroy');

Route::get('/my-internships/applications', [InternshipController::class, 'applications'])
    ->middleware(['auth', 'verified']);

Route::get('/student-requests', function () {
    $controller = app(StudentRequestController::class);
    $applications = $controller->getStudentRequests(); // Remove getData()
    
    return Inertia::render('Dashboard', [
        'auth' => ['user' => auth()->user()],
        'applications' => $applications,
    ]);
})->middleware(['auth', 'verified'])->name('student-requests');
require __DIR__ . '/auth.php';
