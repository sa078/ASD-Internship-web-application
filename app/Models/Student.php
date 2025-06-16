<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_num',
        'name',
        'email',
        'password',
        'student_bio',
        'cv',
        'faculty',
        'course',
        'specialization',
        'nust_letter',
        'profile_picture'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    // Relationships


    public function appliedInternships(): HasMany
    {
        return $this->hasMany(AppliedInternship::class);
    }
}
