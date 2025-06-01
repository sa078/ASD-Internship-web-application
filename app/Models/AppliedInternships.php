<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedInternships extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'internships';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'internship_id',
        'student_id',
        'application_status',
        
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'expiry_date' => 'date',
    ];

    /**
     * Get the company that offers this internship
     */
    public function company()
    {
        return $this->belongsTo(Companies::class);
    }

    /**
     * Get all applications for this internship
     */
    public function applications()
    {
        return $this->hasMany(AppliedInternships::class);
    }
}
