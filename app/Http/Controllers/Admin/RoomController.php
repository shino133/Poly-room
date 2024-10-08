<?php

namespace App\Http\Controllers\Admin;

use App\Traits\Paginates;
use App\Services\ControlHelper;
use App\Http\Resources\RoomCrud;
use App\Services\ServiceFactory;
use App\Http\Requests\RoomRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    use Paginates;
    protected $roomService;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->roomService = $serviceFactory->make('room');
    }


    public function index(Request $res)
    {
        $filters = $res->only(['status']);
        $perPage = $res->input('perPage', 20);

        $rooms = $this->roomService->getAll($filters, $perPage);

        $formattedRooms = RoomCrud::collection($rooms->items());

        return $this->formatResponse($formattedRooms, $rooms);
    }


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


    public function show(string $id)
    {
        try {
            $room = $this->roomService->getById($id);
            return response()->json(new RoomCrud($room));
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }


    public function update(RoomRequest $request, string $id)
    {
        try {
            $this->roomService->update($id, $request->validated());
            $res = response()->json(['message' => 'Room updated successfully', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }


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
