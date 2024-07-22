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
            'room' => $this->room->code,
            'created_by' => [
                'username' => $this->user->name,
                'email' => $this->user->email
            ],
            'time_start' => (new Carbon($this->time_start))->format('Y-m-d H:i:s'),
            'time_end' => (new Carbon($this->time_end))->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'note' => $this->note,
        ];
    }
}
