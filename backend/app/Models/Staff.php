<?php

namespace App\Models;

use App\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'role', 'phone'];

    protected $casts = [
        'role' => Role::class,
    ];

    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
}
