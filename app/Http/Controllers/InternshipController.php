<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internships;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


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

        return response()->json(['message' => 'Internship deleted successfully.'], 200);
    }
    public function userInternships(Request $request)
    {
        $user = $request->user();
        $internships = Internships::where('user_id', $user->id)
            ->get(['id', 'related_course', 'internship_name', 'internship_description', 'work_hours', 'work_location']);
        return response()->json($internships);
    }


    public function applications()
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        $applications = DB::table('applied_internships')
            ->join('internships', 'applied_internships.internship_id', '=', 'internships.id')
            ->join('students', 'applied_internships.student_id', '=', 'students.id')
            ->where('internships.user_id', $user->id)
            ->select(
                'applied_internships.id',
                'applied_internships.created_at as dateOfApply',
                'applied_internships.application_status',

                // Student info
                'students.id as student_id',
                'students.name as student_name',
                'students.email as student_email',
                'students.profile_picture',
                'students.student_bio',
                'students.course',
                'students.student_num',

                // Internship info
                'internships.id as internship_id',
                'internships.related_course',
                'internships.internship_name',
                'internships.internship_description',
                'internships.work_hours',
                'internships.work_location'
            )
            ->get();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'applications' => $applications,
        ]);
    }
}
