<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internships extends Model
{
    use HasFactory;
     protected $fillable = [
        'user_id',
        'internship_name',
        'internship_description',
        'related_course',
        'work_hours',
        'expiry_date',
        'work_location',
    ];

}
