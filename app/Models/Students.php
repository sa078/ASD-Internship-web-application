<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;
    protected $fillable = [
        'studentNum',
        'cv',
        'course',
        'nust_letter',
        'full_name',
        'password',
        'profile_picture'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'cv' => 'binary',
        'nust_letter' => 'binary',
        'profile_picture' => 'binary',
    ];

    /**
     * Accessor for profile picture (base64 encoding)
     */
    public function getProfilePictureAttribute($value)
    {
        if ($value) {
            return 'data:image/jpeg;base64,' . base64_encode($value);
        }
        return null;
    }

    /**
     * Accessor for CV document
     */
    public function getCvAttribute($value)
    {
        return $value ? base64_encode($value) : null;
    }

    /**
     * Accessor for NUST letter
     */
    public function getNustLetterAttribute($value)
    {
        return $value ? base64_encode($value) : null;
    }

    /**
     * Mutator for password hashing
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
