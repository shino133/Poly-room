<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomCrud;
use App\Services\ControlHelper;
use App\Http\Requests\RoomRequest;
use App\Services\ServiceFactory;

class RoomController extends Controller
{
    protected $roomService;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->roomService = $serviceFactory->make('room');
    }


    public function index()
    {
        $room = RoomCrud::collection($this->roomService->getAll());
        return response()->json($room);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomRequest $request)
    {
        try {
            $this->roomService->create($request->validated());
            $res = response()->json(['message' => 'Room created successfully'], 201);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $room = $this->roomService->getById($id);
            return response()->json(new RoomCrud($room));
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomRequest $request, string $id)
    {
        try {
            $this->roomService->update($id, $request->validated());
            $res = response()->json(['message' => 'Room updated successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->roomService->delete($id);
            $res = response()->json(['message' => 'Room deleted successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }
}
