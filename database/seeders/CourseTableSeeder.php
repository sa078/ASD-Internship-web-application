<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         $courses = [
            // Computer Science specializations
            [
                'course_name' => 'Computer Science',
                'specialization' => 'Software Engineering'
            ],
            [
                'course_name' => 'Computer Science',
                'specialization' => 'Cyber Security'
            ],
            [
                'course_name' => 'Computer Science',
                'specialization' => 'Informatics'
            ],
            
            // Accounting specializations
            [
                'course_name' => 'Accounting',
                'specialization' => 'Financial Accounting'
            ],
            [
                'course_name' => 'Accounting',
                'specialization' => 'Management Accounting'
            ],
            [
                'course_name' => 'Accounting',
                'specialization' => 'Tax Accounting'
            ],
            
            // Engineering specializations
            [
                'course_name' => 'Engineering',
                'specialization' => 'Mechanical Engineering'
            ],
            [
                'course_name' => 'Engineering',
                'specialization' => 'Electrical Engineering'
            ],
            [
                'course_name' => 'Engineering',
                'specialization' => 'Civil Engineering'
            ]
        ];

        DB::table('courses')->insert($courses);
    }
}
