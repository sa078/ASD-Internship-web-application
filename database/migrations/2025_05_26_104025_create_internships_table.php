<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {

        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('position');
            $table->text('educational_requirements');
            $table->string('related_course')->nullable();
            $table->text('work_description');
            $table->date('closing_date');
            $table->time('closing_time');
            $table->string('work_hours');
            $table->string('assumption_of_duties',50);
            $table->string('location');
            $table->string('enquirer_name');
            $table->string('enquirer_email');
            $table->string('enquirer_phone');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('internships');
    }
};