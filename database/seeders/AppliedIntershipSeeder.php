<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppliedIntershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Get all internships and students
        $internships = DB::table('internships')->pluck('id');
        $students = DB::table('students')->pluck('id');

        foreach ($internships as $internshipId) {
            foreach ($students as $studentId) {
                DB::table('applied_internships')->insert([
                    'internship_id' => $internshipId, // Foreign key from internships table
                    'student_id' => $studentId, // Foreign key from students table
                    'application_status' => collect(['accepted', 'rejected','submitted'])->random(), // Only allowed values
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
