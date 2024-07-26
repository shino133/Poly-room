<?php

namespace App\Services;

use App\Models\RoomChild;

class RoomChildService implements CRUDSVInterface
{
    public function getAll($filters = [], $perPage = 20)
    {
        return RoomChild::paginate($perPage);
    }
    public function getById($id)
    {
        return RoomChild::findOrFail($id);
    }
    public function create(array $data)
    {
        return RoomChild::create($data);
    }
    public function update($id, array $data)
    {
        $roomChild = RoomChild::findOrFail($id);
        $roomChild->update($data);
        $roomChild->save();
        return $roomChild;
    }
    public function delete($id)
    {
        return RoomChild::destroy($id);
    }
}
