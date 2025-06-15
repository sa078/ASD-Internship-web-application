<?php

use App\Http\Controllers\InternshipController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentRequestController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/student-requests', [StudentRequestController::class, 'getStudentRequests']);
    Route::get('/accepted-students', [StudentRequestController::class, 'accepted']);
    Route::post('/application/{id}/status', [StudentRequestController::class, 'updateStatus']);
    Route::get('/student/{id}/document/{type}', [StudentRequestController::class, 'downloadDocument']);
    Route::get('/user-internships', [InternshipController::class, 'userInternships']);
    Route::post('/internships', [InternshipController::class, 'store']);
});
