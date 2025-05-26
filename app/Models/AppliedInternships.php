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
        'company_id',
        'internship_name',
        'internship_description',
        'related_course',
        'work_hours',
        'expiry_date',
        'work_location'
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
