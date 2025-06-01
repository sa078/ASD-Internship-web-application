<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InternshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the ID of the first user in the users table
        $userId = DB::table('users')->first()->id;

        for ($i = 1; $i <= 10; $i++) {
            DB::table('internships')->insert([
                'user_id' => $userId, // Assign the user ID
                'related_course' => "Course $i",
                'internship_name' => "Internship Position $i",
                'internship_description' => "Description for internship $i.",
                'work_hours' => rand(20, 40) . " hours/week", // Random work hours
                'work_location' => "City $i",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
