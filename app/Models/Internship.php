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
        'company_name',
        'position',
        'educational_requirements',
        'related_courses',
        'work_description',
        'closing_date',
        'work_hours',
        'contact_person_name',
        'contact_email',
        'contact_phone_number',
        'work_location'
    ];

    protected $dates = [
        'closing_date'
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}