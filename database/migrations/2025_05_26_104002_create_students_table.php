<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->integer('student_num')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('student_bio')->nullable();
            $table->rememberToken();
            $table->binary('cv')->nullable();
            $table->string('faculty'); // Add this
            $table->string('course');   // Keep this (was already in your form)
            $table->string('specialization'); // Correct cascade behavior
            $table->binary('nust_letter')->nullable(); // LONGBLOB equivalent
            $table->binary('profile_picture')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
