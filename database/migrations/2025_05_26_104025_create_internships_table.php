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
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('course');
            $table->string('position'); // Renamed from internship_name
            $table->text('educational_requirements'); // New required field
            $table->text('work_description'); // Renamed from internship_description
            $table->string('work_hours')->nullable(); // Now nullable + handles custom values
            $table->string('work_location'); // Matches 'location' in form
            $table->dateTime('deadline')->nullable(); // Combined date + time
            $table->date('assumption_of_duties')->nullable(); // New optional field
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
