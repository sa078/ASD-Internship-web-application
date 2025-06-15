<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internship;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Course;
use Inertia\Inertia;


class InternshipController extends Controller
{
    //
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'position' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^(?:[A-Za-z\'-]{2,})(?:\s+[A-Za-z\'-]{2,}){0,6}$/'
                ],
                'educationalRequirements' => [
                    'required',
                    'string',
                    'min:10',
                    'max:500'
                ],
                'workDescription' => [
                    'required',
                    'string',
                    'min:20',
                    'max:1000'
                ],
                'closingDate' => [
                    'required',
                    'date',
                    'after_or_equal:today'
                ],
                'closingTime' => [
                    'required',
                    'date_format:H:i'
                ],
                'location' => [
                    'required',
                    'string',
                    'max:255'
                ],
                'workHours' => [
                    'required',
                    'in:8 hours,4 hours,flexible,other'
                ],
                'customWorkHours' => [
                    'nullable',
                    'string',
                    'max:255',
                    'required_if:workHours,other'
                ],
                'assumptionOfDuties' => [
                    'nullable',
                    'date',
                    'after_or_equal:today'
                ],
                'relatedCourse' => [
                    'nullable',
                    'string',
                    'max:255'
                ],
            ], [
                'position.required' => 'Position is required',
                'position.regex' => 'Position must be a valid job title (2-4 words, letters only)',
                'educationalRequirements.required' => 'Educational requirements are required',
                'educationalRequirements.min' => 'Requirements should be at least 10 characters',
                'workDescription.required' => 'Work description is required',
                'workDescription.min' => 'Description should be at least 20 characters',
                'closingDate.required' => 'Closing date is required',
                'closingDate.after_or_equal' => 'Date cannot be in the past',
                'closingTime.required' => 'Closing time is required',
                'location.required' => 'Location is required',
                'customWorkHours.required_if' => 'Please specify work hours',
                'assumptionOfDuties.after_or_equal' => 'Date cannot be in the past',
            ]);

            // Handle custom work hours
            $workHours = $validated['workHours'] === 'other'
                ? $validated['customWorkHours']
                : $validated['workHours'];

            // Combine closing date and time
            $deadline = Carbon::parse($validated['closingDate'] . ' ' . $validated['closingTime']);

            // Create internship
            Internship::create([
                'user_id' => Auth::id(),
                'course' => $validated['relatedCourse'] ?? null, // Store course name directly
                'position' => $validated['position'],
                'educational_requirements' => $validated['educationalRequirements'],
                'work_description' => $validated['workDescription'],
                'work_hours' => $workHours,
                'work_location' => $validated['location'],
                'deadline' => $deadline,
                'assumption_of_duties' => $validated['assumptionOfDuties'] ?? null,
            ]);

            return response()->json(['message' => 'Internship created successfully!'], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }
    public function update(Request $request, $id)
    {
        $internship = Internship::findOrFail($id);

        $validated = $request->validate([
            'position' => 'required|string|max:255',
            'educationalRequirements' => 'required|string',
            'workDescription' => 'required|string',
            'closingDate' => 'required|date',
            'closingTime' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
            'workHours' => 'required|string|in:8 hours,4 hours,flexible,other',
            'customWorkHours' => 'nullable|string|max:255|required_if:workHours,other',
            'assumptionOfDuties' => 'nullable|date',
            'relatedCourse' => 'nullable|string|max:255',
        ]);

        // Handle custom work hours
        $workHours = $validated['workHours'] === 'other'
            ? $validated['customWorkHours']
            : $validated['workHours'];

        // Combine closing date and time
        $deadline = Carbon::parse($validated['closingDate'] . ' ' . $validated['closingTime']);

        $internship->update([
            'position' => $validated['position'],
            'educational_requirements' => $validated['educationalRequirements'],
            'course' => $validated['relatedCourse'] ?? null,
            'work_description' => $validated['workDescription'],
            'work_hours' => $workHours,
            'work_location' => $validated['location'],
            'deadline' => $deadline,
            'assumption_of_duties' => $validated['assumptionOfDuties'] ?? null,
        ]);

        return back()->with('success', 'Internship updated successfully!');
    }
    public function destroy($id)
    {
        $internship = Internship::findOrFail($id);
        $internship->delete();

        return response()->json(['message' => 'Internship deleted successfully.'], 200);
    }
    public function userInternships(Request $request)
    {
        $user = $request->user();
        $internships = Internship::where('user_id', $user->id)
            ->get(['id', 'course', 'position', 'work_description', 'work_hours', 'work_location']);
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
