<?php

namespace Database\Seeders;

use App\Models\Companies;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// Company Factory (database/factories/CompanyFactory.php)
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class CompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 test companies
        Companies::factory()->count(20)->create();
    }
}
// Company Factory (database/factories/CompanyFactory.php)

class CompanyFactory extends Factory
{
    public function definition()
    {
        return [
            'company_name' => $this->faker->unique()->company,
            'company_motto' => $this->faker->catchPhrase,
            'password' => Hash::make('password'),
            'company_description' => $this->faker->paragraph(3),
            'company_documents' => null,
            'company_image' => null,
        ];
    }
}