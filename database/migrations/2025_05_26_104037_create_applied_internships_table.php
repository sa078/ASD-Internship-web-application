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
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('student_id');
// Add foreign key constraints
            $table->foreign('company_id')
                ->references('id')
                ->on('internships')
                ->onDelete('cascade'); // Delete applied internship if internship is deleted

            $table->foreign('student_id')
                ->references('id')
                ->on('students')
                ->onDelete('cascade'); // Delete applied internship if student is deleted

            $table->enum('application_status', ['submitted', 'under_review', 'accepted', 'rejected'])
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
