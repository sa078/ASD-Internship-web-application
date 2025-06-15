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
        Schema::create('applied_internships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger(column: 'internship_id');

            $table->foreign('internship_id')->references('id')->on('internships')->onDelete('cascade'); // Add this line
            $table->unsignedBigInteger(column: 'student_id');
            // Add foreign key constraints
            $table->foreign('student_id')
                ->references('id')
                ->on('students')
                ->onDelete('cascade'); // Delete applied internship if student is deleted
            $table->enum('application_status', ['accepted', 'rejected', 'submitted'])
                ->nullable()
                ->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_internships');
    }
};
