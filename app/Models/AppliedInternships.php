<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedInternships extends Model
{
    use HasFactory;

    protected $table = 'applied_internships';

    protected $fillable = [
        'internship_id',
        'student_id',
        'application_status',
    ];

    // Relationship to Internship
    public function internship()
    {
        return $this->belongsTo(Internships::class, 'internship_id');
    }

    // Relationship to Student
    public function student()
    {
        return $this->belongsTo(Students::class, 'student_id');
    }
}
