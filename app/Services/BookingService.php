<?php

namespace App\Services;

use App\Services\CRUDSVInterface;
use App\Http\Resources\BookingCrud;
use App\Models\Booking;

class BookingService implements CRUDSVInterface{
    public function getAll($filters = []){

        $query = Booking::query();

        if (isset($filters['status'])) {
            $search = $filters['status'];
            $query->where('status', 'like', '%' . $search . '%');
        }

        return $query->orderBy('created_at', 'DESC')->paginate(20);
    }

    public function getById($id){
        return Booking::find($id);
    }

    public function create(array $data){
        return Booking::create($data);
    }

    public function update($id, array $data){
        $booking = Booking::find($id);
        $booking->update($data);
        return $booking;
    }

    public function delete($id){
        return Booking::destroy($id);
    }
}
