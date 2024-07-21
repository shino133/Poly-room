<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingCrud extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'room_id' => $this->room_id,
            'user_id' => $this->user_id,
            'time_start' => (new Carbon($this->time_start))->format('Y-m-d H:i:s'),
            'time_end' => (new Carbon($this->time_end))->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'time_created' => (new Carbon($this->time_created))->format('Y-m-d H:i:s'),
            'note' => $this->note,
        ];
    }
}
