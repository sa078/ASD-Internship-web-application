<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('students')->insert([
                'student_num' => 1000 + $i,
                'name' => "Student $i",
                'email' => "student$i@example.com",
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'student_bio' => "Bio for student $i",
                'cv' => null,
                'course' => "Course $i",
                'nust_letter' => null,
                'profile_picture' => null,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
