<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InternshipController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'companyName' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'position' => 'required|string|max:255',
            'educationalRequirements' => 'required|string|min:20',
            'relatedCourses' => 'required|string|max:255',
            'workDescription' => 'required|string|min:50',
            'closingDate' => 'required|date|after:today',
            'workHours' => 'required|string|max:255',
            'contactPersonName' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'contactEmail' => 'required|email|max:255',
            'contactPhoneNumber' => 'required|string|regex:/^(\+?264|0)[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/',
            'location' => 'required|string|max:255',
        ], [
            'companyName.regex' => 'The company name should only contain letters and spaces.',
            'contactPersonName.regex' => 'The contact person name should only contain letters and spaces.',
            'contactPhoneNumber.regex' => 'Please enter a valid Namibian phone number.',
            'closingDate.after' => 'The closing date must be in the future.',
            'workDescription.min' => 'The work description should be at least 50 characters.',
            'educationalRequirements.min' => 'The educational requirements should be at least 20 characters.',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $internship = new Internship();
            $internship->user_id = Auth::id();
            $internship->company_name = $request->companyName;
            $internship->position = $request->position;
            $internship->educational_requirements = $request->educationalRequirements;
            $internship->related_courses = $request->relatedCourses;
            $internship->work_description = $request->workDescription;
            $internship->closing_date = $request->closingDate;
            $internship->work_hours = $request->workHours;
            $internship->contact_person_name = $request->contactPersonName;
            $internship->contact_email = $request->contactEmail;
            $internship->contact_phone_number = $request->contactPhoneNumber;
            $internship->work_location = $request->location;
            
            $internship->save();

            DB::commit();

            Log::info('Internship created successfully', ['internship_id' => $internship->id]);
            
            return response()->json([
                'message' => 'Internship created successfully!',
                'internship' => $internship
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Internship creation failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all()
            ]);
            return response()->json([
                'message' => 'Failed to create internship',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $internship = Internship::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'position' => 'required|string|max:255',
            'educational_requirements' => 'required|string|min:20',
            'related_courses' => 'required|string|max:255',
            'work_description' => 'required|string|min:50',
            'closing_date' => 'required|date|after:today',
            'work_hours' => 'required|string|max:255',
            'contact_person_name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'contact_email' => 'required|email|max:255',
            'contact_phone_number' => 'required|string|regex:/^(\+?264|0)[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/',
            'work_location' => 'required|string|max:255',
        ], [
            'company_name.regex' => 'The company name should only contain letters and spaces.',
            'contact_person_name.regex' => 'The contact person name should only contain letters and spaces.',
            'contact_phone_number.regex' => 'Please enter a valid Namibian phone number.',
            'closing_date.after' => 'The closing date must be in the future.',
            'work_description.min' => 'The work description should be at least 50 characters.',
            'educational_requirements.min' => 'The educational requirements should be at least 20 characters.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $internship->update($request->all());
            DB::commit();
            return redirect()->back()->with('success', 'Internship updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Internship update failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update internship');
        }
    }

    public function destroy($id)
    {
        $internship = Internship::findOrFail($id);
        
        DB::beginTransaction();
        try {
            $internship->delete();
            DB::commit();
            return response()->json(['message' => 'Internship deleted successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Internship deletion failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete internship'], 500);
        }
    }

    public function userInternships(Request $request)
    {
        $user = $request->user();
        $internships = Internship::where('user_id', $user->id)
            ->get([
                'id', 
                'company_name',
                'position',
                'educational_requirements',
                'related_courses',
                'work_description',
                'closing_date',
                'work_hours',
                'contact_person_name',
                'contact_email',
                'contact_phone_number',
                'work_location'
            ]);
            
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
                'internships.company_name',
                'internships.position',
                'internships.educational_requirements',
                'internships.related_courses',
                'internships.work_description',
                'internships.closing_date',
                'internships.work_hours',
                'internships.contact_person_name',
                'internships.contact_email',
                'internships.contact_phone_number',
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