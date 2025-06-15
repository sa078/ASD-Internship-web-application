<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('internships', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('user_id');
        $table->string('company_name');
        $table->string('position');
        $table->text('educational_requirements');
        $table->string('related_courses');
        $table->text('work_description');
        $table->dateTime('closing_date');
        $table->string('work_hours');
        $table->string('contact_person_name');
        $table->string('contact_email');
        $table->string('contact_phone_number');
        $table->string('work_location');
        $table->timestamps();

        $table->foreign('user_id')
              ->references('id')
              ->on('users')
              ->onDelete('cascade');
    });
}
    

    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};