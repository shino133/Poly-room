<?php

namespace App\Services;

use App\Models\Room;

use App\Services\CRUDSVInterface;

class RoomService implements CRUDSVInterface{
    public function getAll($filters = []){
        return Room::paginate(20);
    }

    public function getById($id){
        return Room::findOrFail($id);
    }
    public function create(array $data){
        return Room::create($data);
    }
    public function update($id, array $data){
        $room = Room::find($id);
        $room->update($data);
        return $room;
    }

    public function delete($id){
        return Room::destroy($id);
    }
}
