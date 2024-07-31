<?php

namespace App\Services;

use App\Models\Room;
use App\Enums\RoomStatusEnum;

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
        $data = Room::findOrFail($id);

        if ($data['status'] == RoomStatusEnum::Available->value) {
            return Room::destroy($id);
        } else {
            throw new ModelNotFoundException('Room is using!');
        }
    }
}
