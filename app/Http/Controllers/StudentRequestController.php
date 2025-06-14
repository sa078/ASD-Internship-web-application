<?php

namespace App\Http\Controllers;

use App\Models\AppliedInternship;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log as FacadesLog;

class StudentRequestController extends Controller
{
    //
    public function getStudentRequests()
    {
        try {
            $userId = Auth::id();

            $requests = AppliedInternship::where('application_status', 'submitted')
                ->whereHas('internship', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                })
                ->with([
                    'internship' => function ($q) {
                        $q->select('id', 'internship_name', 'internship_description');
                    },
                    'student' => function ($q) {
                        $q->select('id', 'student_num', 'name', 'email', 'student_bio', 'course', 'cv', 'nust_letter', 'profile_picture');
                    }
                ])
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'universityName' => 'NUST',
                        'dateOfApply' => $item->created_at->toDateTimeString(),
                        'application_status' => $item->application_status,
                        'internship' => $item->internship,
                        'student' => $item->student,
                        'profile_picture' => $item->student && $item->student->profile_picture
                            ? 'data:image/jpeg;base64,' . base64_encode($item->student->profile_picture)
                            : null,
                    ];
                });

            return $requests;
        } catch (\Exception $e) {
            Log::error('Error fetching student requests: ' . $e->getMessage());
            return [];
        }
    }

    public function updateStatus($id, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:accepted,rejected'
        ]);

        $applied = AppliedInternship::findOrFail($id);
        $applied->application_status = $validated['status'];
        $applied->save();

        return response()->json(['message' => 'Status updated']);
    }

    public function downloadDocument($id, $type)
    {
        $student = Student::findOrFail($id);

        $document = null;
        $filename = '';
        $contentType = 'application/pdf';

        if ($type === 'cv' && $student->cv) {
            $document = $student->cv;
            $filename = 'cv_' . $id . '.pdf';
        } elseif ($type === 'nust_letter' && $student->nust_letter) {
            $document = $student->nust_letter;
            $filename = 'nust_letter_' . $id . '.pdf';
        }

        if ($document) {
            return response($document)
                ->header('Content-Type', $contentType)
                ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
        }

        return response()->json(['error' => 'Document not found'], 404);
    }

    public function showAcceptedStudents()
    {
        return Inertia::render('AcceptedStudents', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
    public function accept($id)
    {
        $userId = auth()->id();
        if (!$userId) {
            return response()->json([], 401); // Or handle as you wish
        }
        DB::table('applied_internships')
            ->where('id', $id)
            ->update(['application_status' => 'accepted']);

        return response()->json(['message' => 'Application accepted']);
    }
    public function accepted()
    {
        $accepted = DB::table('applied_internships')
            ->join('internships', 'applied_internships.internship_id', '=', 'internships.id')
            ->join('students', 'applied_internships.student_id', '=', 'students.id')
            ->where('applied_internships.application_status', 'accepted')
            ->select(
                'applied_internships.id as application_id',
                'students.name as studentName',
                'students.email',
                'students.profile_picture',
                DB::raw("'NUST' as universityName"),
                'students.course as courseName',
                'internships.internship_name as appliedInternship'
            )
            ->get()
            ->map(function ($item) {
                if ($item->profile_picture) {
                    $item->profile_picture = 'data:image/jpeg;base64,' . base64_encode($item->profile_picture);
                }
                return $item;
            });

        return response()->json($accepted);
    }
}
