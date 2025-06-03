<?php

namespace App\Http\Controllers;

use App\Models\AppliedInternships;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentRequestController extends Controller
{
    //
    public function getStudentRequests()
    {
        try {
            $userId = Auth::id();

            $requests = AppliedInternships::where('application_status', 'submitted')
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
                    // Add missing fields
                    $item->universityName = 'NUST';
                    $item->dateOfApply = $item->created_at;
                    $item->application_id = $item->id;

                    // Convert profile picture to base64
                    if ($item->student && $item->student->profile_picture) {
                        $item->student->profile_picture = 'data:image/jpeg;base64,' . base64_encode($item->student->profile_picture);
                    }

                    return $item;
                });

            return response()->json($requests);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus($id, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:accepted,rejected'
        ]);

        $applied = AppliedInternships::findOrFail($id);
        $applied->application_status = $validated['status'];
        $applied->save();

        return response()->json(['message' => 'Status updated']);
    }

    public function downloadDocument($id, $type)
    {
        $student = Students::findOrFail($id);

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
