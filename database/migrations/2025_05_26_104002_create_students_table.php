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
            $table->integer('studentNum')->unique();
            $table->binary('cv')->nullable();; // LONGBLOB equivalent
            $table->string('course', 255);
            $table->binary('nust_letter')->nullable(); // LONGBLOB equivalent
            $table->string('full_name', 255);
            $table->string('password');
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
