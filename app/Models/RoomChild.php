<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomChild extends Model
{
    use HasFactory;

    protected $table = 'rooms_child';

    protected $fillable = [
        'type'
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
}
