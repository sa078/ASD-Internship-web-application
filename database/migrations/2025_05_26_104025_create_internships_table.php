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
            $table->unsignedBigInteger('user_id'); // Add this line
<<<<<<< HEAD
            $table->string(column: 'related_course');

            $table->foreign('user_id')->references('id')->on(table: 'users')->onDelete('cascade'); // Add this line
            $table->string('company_name')->nullable(); 
=======
            $table->foreign(columns: 'user_id')->references('id')->on(table: 'users')->onDelete('cascade'); // Add this line
            $table->foreignId('course_id')
                ->nullable()
                ->constrained('courses')  // Explicit table name
                ->onDelete('set null');   // Proper cascade behavior
>>>>>>> origin/tobby
            $table->string(column: 'internship_name');
            $table->text('internship_description');
            $table->string(column: 'work_hours');
            $table->string(column: 'work_location');
            $table->dateTime('deadline')->nullable(); // Add this line

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
