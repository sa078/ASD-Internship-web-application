<?php

namespace App\Http\Controllers;

use App\Models\internship;
use Illuminate\Http\Request;

class InternshipController extends Controller
{public function store(Request $request)
{
    $validated = $request->validate([
        'company_name' => 'required|string|max:255',
        'position' => 'required|string|max:255',
        'educational_requirements' => 'required|string',
        'related_course' => 'nullable|string|max:255',
        'work_description' => 'required|string',
        'closing_date' => 'required|date',
        'closing_time' => 'required|date_format:H:i',
        'work_hours' => 'required|string|max:255',
        'assumption_of_duties' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'enquirer_name' => 'required|string|max:255',
        'enquirer_email' => 'required|email|max:255',
        'enquirer_phone' => 'required|string|max:20'
    ]);

    // Create the internship
    $internship = Internship::create($validated);

    return response()->json([
        'message' => 'Internship created successfully',
        'data' => $internship
    ], 201);
}}