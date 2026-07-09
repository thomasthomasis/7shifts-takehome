<?php

namespace App\Models;

use App\Role;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shift extends Model
{
    use HasFactory;

    protected $fillable = ['day', 'start_time', 'end_time', 'role', 'staff_id'];

    protected $casts = [
        'role' => Role::class,
        'day' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function setStartTimeAttribute($value): void
    {
        $this->attributes['start_time'] = $value;
        $this->attributes['day'] = Carbon::parse($value)->toDateString();
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
