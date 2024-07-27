<?php

namespace App\Services;

interface CRUDSVInterface
{
    public function getAll($filters = [], $perPage);

    public function getById($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
