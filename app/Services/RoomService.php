<?php

namespace App\Services;

use App\Models\Room;

use App\Services\CRUDSVInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoomService implements CRUDSVInterface
{
    public function getAll($filters = [], $perPage)
    {
        $query = Room::query();

        if (isset($filters['status'])) {
            $search = $filters['status'];
            $query->where('status', 'like', '%' . $search . '%');
        }

        return $query->orderBy('created_at', 'DESC')->paginate($perPage);
    }

    public function getById($id)
    {
        return Room::findOrFail($id);
    }
    public function create(array $data)
    {
        return Room::create($data);
    }
    public function update($id, array $data)
    {
        $room = Room::findOrFail($id);
        $room->update($data);
        return $room;
    }

    public function delete($id)
    {
        return Room::destroy($id);
    }
}
