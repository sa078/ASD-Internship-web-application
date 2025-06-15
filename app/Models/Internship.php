<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'internship_name',
        'internship_description',
        'work_hours',
        'work_location',
        'deadline'
    ];
    protected $dates = [
        'deadline' // Add this for Carbon instance
    ];

    // Relationships
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function appliedInternships(): HasMany
    {
        return $this->hasMany(AppliedInternship::class);
    }

    // Assuming you have a User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
