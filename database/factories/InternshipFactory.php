<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class InternshipFactory extends Factory
{
    public function definition()
    {
        return [
            'company_name' => $this->faker->company,
            'position' => $this->faker->jobTitle,
            'educational_requirements' => $this->faker->sentence(10),
            'related_course' => $this->faker->randomElement(['Computer Science', 'Business', 'Engineering', null]),
            'work_description' => $this->faker->paragraph(3),
            'closing_date' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'closing_time' => $this->faker->time('H:i'),
            'work_hours' => $this->faker->randomElement(['8 hours', '4 hours', 'Flexible']),
            'assumption_of_duties' => $this->faker->randomElement(['as soon as possible', '1 week', '2 weeks', '1 month']),
            'location' => $this->faker->city,
            'enquirer_name' => $this->faker->name,
            'enquirer_email' => $this->faker->unique()->safeEmail,
            'enquirer_phone' => $this->faker->phoneNumber,
        ];
    }
}