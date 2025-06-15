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
        'course',
        'position',                   // Renamed from internship_name
        'educational_requirements',   // New field
        'work_description',           // Renamed from internship_description
        'work_hours',                 // Now nullable
        'work_location',
        'deadline',
        'assumption_of_duties'       // New field
    ];

    protected $dates = [
        'deadline',
        'assumption_of_duties'       // Added new date field
    ];

    // Relationships
    

    public function appliedInternships(): HasMany
    {
        return $this->hasMany(AppliedInternship::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
