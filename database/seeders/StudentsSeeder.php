<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         DB::table('students')->insert([
            [
                'studentNum' => 1001,
                'cv' => null,
                'course' => 'Computer Science',
                'nust_letter' => null,
                'full_name' => 'Alice Johnson',
                'password' => Hash::make('password1'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'studentNum' => 1002,
                'cv' => null,
                'course' => 'Information Technology',
                'nust_letter' => null,
                'full_name' => 'Bob Smith',
                'password' => Hash::make('password2'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'studentNum' => 1003,
                'cv' => null,
                'course' => 'Software Engineering',
                'nust_letter' => null,
                'full_name' => 'Carol White',
                'password' => Hash::make('password3'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'studentNum' => 1004,
                'cv' => null,
                'course' => 'Data Science',
                'nust_letter' => null,
                'full_name' => 'David Brown',
                'password' => Hash::make('password4'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'studentNum' => 1005,
                'cv' => null,
                'course' => 'Cyber Security',
                'nust_letter' => null,
                'full_name' => 'Eva Green',
                'password' => Hash::make('password5'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'studentNum' => 1006,
                'cv' => null,
                'course' => 'Artificial Intelligence',
                'nust_letter' => null,
                'full_name' => 'Frank Black',
                'password' => Hash::make('password6'),
                'profile_picture' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
