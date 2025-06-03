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
    public function update(Request $request, $id)
    {
        $internship = Internships::findOrFail($id);

        $validated = $request->validate([
            'related_course' => 'required|string|max:255',
            'internship_name' => 'required|string|max:255',
            'internship_description' => 'required|string',
            'work_hours' => 'required|string|max:255',
            'work_location' => 'required|string|max:255',
        ]);

        $internship->update($validated);

        return redirect()->back()->with('success', 'Internship updated successfully!');
    }
    public function destroy($id)
    {
        $internship = Internships::findOrFail($id);
        $internship->delete();
        return redirect()->back()->with('success', 'Internship deleted successfully!');
    }
    public function userInternships(Request $request)
    {
        $user = $request->user();
        $internships = Internships::where('user_id', $user->id)
            ->get(['id', 'related_course', 'internship_name', 'internship_description', 'work_hours', 'work_location']);
        return response()->json($internships);
    }
}
