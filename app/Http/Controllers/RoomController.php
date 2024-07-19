<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Room::query()->paginate(10);

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'code' => 'required|string|max:255',
                'room_child_id' => 'required|int|max:11',
                'status' => 'required|string|max:255',
            ]);

            $room = Room::create($validatedData);

            DB::commit();

            return response()->json(['message' => 'Room created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }

        return response()->json($room);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }

        return response()->json($room);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $room = Room::find($id);

            if (!$room) {
                DB::rollBack();
                return response()->json(['error' => 'Room not found'], 404);
            }

            $validatedData = $request->validate([
                'code' => 'required|string|max:255',
                'room_child_id' => 'required|int|max:11',
                'status' => 'required|string|max:255',
            ]);

            $room->update($validatedData);

            DB::commit();

            return response()->json(['message' => 'Room updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        DB::beginTransaction();

        try {

            $room = Room::find($id);

            if (!$room) {
                return response()->json(['error' => 'Room not found'], 404);
            }

            $room->delete();

            DB::commit();

            return response()->json(['success' => 'Room deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}
