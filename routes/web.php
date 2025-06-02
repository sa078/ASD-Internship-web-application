<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\StudentRequestController;

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



Route::get('/view-students-profile', function () {
    return Inertia::render('ViewStudentProfiles', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('view-student-profiles');


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
Route::get('/student-requests', [StudentRequestController::class, 'index']);
Route::post('/applications/{id}/accept', [StudentRequestController::class, 'accept'])->name('applications.accept');
require __DIR__ . '/auth.php';
