<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{

    protected $fillable = [
        'company_name',
        'position',
        'educational_requirements',
        'related_course',
        'work_description',
        'closing_date',
        'closing_time',
        'work_hours',
        'assumption_of_duties',
        'location',
        'enquirer_name',
        'enquirer_email',
        'enquirer_phone'
    ];
}