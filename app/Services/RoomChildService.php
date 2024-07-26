<?php

namespace App\Services;

use App\Models\RoomChild;

class RoomChildService implements CRUDSVInterface
{
    public function getAll($filters = [], $perPage)
    {
        return RoomChild::orderBy('created_at', 'DESC')->paginate($perPage);
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
