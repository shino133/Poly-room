<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Room;
use App\Enums\RoomStatusEnum;

class BookingService implements CRUDSVInterface
{
    public function getAll($filters = [], $perPage)
    {

        $query = Booking::query();

        if (isset($filters['status'])) {
            $search = $filters['status'];
            $query->where('status', 'like', '%' . $search . '%');
        }

        return $query->orderBy('created_at', 'DESC')->paginate($perPage);
    }

    public function getById($id)
    {
        return Booking::findOrFail($id);
    }

    public function create(array $data)
    {
        return Booking::create($data);
    }

    public function update($id, array $data)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($data);

        $booking->room->update(['status' => RoomStatusEnum::Occupied->value]);

        return $booking;
    }

    public function delete($id)
    {
        return Booking::destroy($id);
    }

    public function getBookingHistory($userId)
    {
        return Booking::where('user_id', $userId)->orderBy('created_at', 'DESC')->paginate(20);
    }
}
