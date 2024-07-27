<?php


namespace App\Services;

use App\Models\User;

class UserService implements CRUDSVInterface
{
    public function getAll($filters = [], $perPage)
    {
        return User::orderBy('created_at', 'DESC')->paginate($perPage);
    }
    public function getById($id)
    {
        return User::findOrFail($id);
    }
    public function create(array $data)
    {
        return User::create($data);
    }
    public function update($id, array $data)
    {
        $roomChild = User::findOrFail($id);
        $roomChild->update($data);
        $roomChild->save();
        return $roomChild;
    }
    public function delete($id)
    {
        return User::destroy($id);
    }
}
