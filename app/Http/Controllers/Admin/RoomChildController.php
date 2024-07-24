<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomTypeRequest;
use App\Services\ControlHelper;
use App\Services\ServiceFactory;
use App\Http\Resources\RoomChildResource;
use App\Traits\Paginates;

class RoomChildController extends Controller
{
    use Paginates;
    protected $roomChildService;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->roomChildService = $serviceFactory->make('child');
    }


    public function index()
    {
        $child = $this->roomChildService->getAll();
        $formattedRooms = RoomChildResource::collection($child->items());
        return $this->formatResponse($formattedRooms, $child);
    }


    public function store(RoomTypeRequest $res)
    {
        try {
            $this->roomChildService->create($res->validated());
            $response = response()->json(['message' => 'Create Successfully'], 201);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }


    public function show(string $id)
    {

        try {
            $child = $this->roomChildService->getById($id);
            return response()->json(new RoomChildResource($child));
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }


    public function update(RoomTypeRequest $request, string $id)
    {
        try {
            $this->roomChildService->update($id, $request->validated());
            $res = response()->json(['message' => 'Room Type updated successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }


    public function destroy(string $id)
    {
        try {
            $this->roomChildService->delete($id);
            $res = response()->json(['message' => 'Room Type deleted successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }
}
