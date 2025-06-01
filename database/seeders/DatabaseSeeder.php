<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AppliedInternships;
use Illuminate\Database\Seeder;
use Database\Seeders\StudentsSeeder;
use Database\Seeders\InternshipSeeder;
use Database\Seeders\AppliedInternshipsSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(StudentsSeeder::class);
        $this->call(InternshipSeeder::class);
        $this->call(AppliedIntershipSeeder::class);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
