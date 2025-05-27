<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internships;
use Illuminate\Support\Facades\Auth;


class InternshipController extends Controller
{
    //
     public function store(Request $request)
    {
        $validated = $request->validate([
            'internshipName' => 'required|string|max:255',
            'description' => 'required|string',
            'relatedCourse' => 'required|string|max:255',
            'workHours' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        Internships::create([
            'user_id' => Auth::id(),
            'internship_name' => $validated['internshipName'],
            'internship_description' => $validated['description'],
            'related_course' => $validated['relatedCourse'],
            'work_hours' => $validated['workHours'],
            'work_location' => $validated['location'],
        ]);

        return response()->json(['message' => 'Internship created successfully!'], 201);
    }
}
