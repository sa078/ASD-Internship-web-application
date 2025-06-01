<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentRequestController extends Controller
{
    //
    public function index(Request $request)
    {
        $userId = auth()->id();
        $requests = DB::table('applied_internships')
            ->join('internships', 'applied_internships.internship_id', '=', 'internships.id')
            ->join('students', 'applied_internships.student_id', '=', 'students.id')
            ->where('internships.user_id', $userId)
            ->select(
                'applied_internships.id as application_id',
                'applied_internships.created_at as dateOfApply',
                'applied_internships.application_status',
                'students.id as student_id',
                'students.name as studentName',
                'students.email',
                'students.student_bio as interest',
                'students.studentNum',
                'students.course as courseName',
                'students.profile_picture',
                // Add this if you have university_name column, else use a static value or remove
                DB::raw("'NUST' as universityName"),
                'internships.internship_name as appliedInternship'
            )
            ->get()
            ->map(function ($item) {
                // Convert binary profile picture to base64 for frontend
                if ($item->profile_picture) {
                    $item->profile_picture = 'data:image/jpeg;base64,' . base64_encode($item->profile_picture);
                }
                return $item;
            });

        return response()->json($requests);
    }
}
