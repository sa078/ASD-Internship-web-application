<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppliedInternship extends Model
{
    use HasFactory;

    protected $fillable = [
        'internship_id',
        'student_id',
        'application_status'
    ];

    protected $attributes = [
        'application_status' => 'submitted'
    ];

    // Relationships
    public function internship(): BelongsTo
    {
        return $this->belongsTo(Internship::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
