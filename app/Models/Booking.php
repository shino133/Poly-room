<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';

    protected $fillable = [
        'room_id', 'user_id', 'start_at', 'end_at', 'status', 'note'
    ];

    // Một booking thuộc về một user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Một booking thuộc về một room
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
