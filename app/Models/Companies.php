<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_name',
        'user_id',
        'company_motto',
        'password',
        'company_description',
        'company_documents',
        'company_image' // Added to fillable
    ];

    protected $casts = [
        'company_documents' => 'binary',
        'company_image' => 'binary', // New cast
    ];

    /**
     * Accessor for company image (base64 encoding)
     */
    public function getCompanyImageAttribute($value)
    {
        if ($value) {
            return 'data:image/jpeg;base64,' . base64_encode($value);
        }
        return null;
    }

    /**
     * Mutator for company image
     */
    public function setCompanyImageAttribute($value)
    {
        $this->attributes['company_image'] = base64_decode($value);
    }

}
