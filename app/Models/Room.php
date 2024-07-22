<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $table = 'rooms';

    protected $fillable = [
        'code', 'room_child_id', 'status'
    ];

    public function roomChild(): BelongsTo
    {
        return $this->belongsTo(RoomChild::class);
    }

    // Một room có thể có nhiều booking
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
