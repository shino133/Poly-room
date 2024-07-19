<?php

namespace App\Http\Controllers;

use App\Models\RoomChild;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class RoomChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $list = RoomChild::query()->paginate(10);

        return response()->json($list);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'type' => 'required|string|max:255',
            ]);

            $result = RoomChild::create($validate);

            if (!$result) {
                return response()->json(['message' => 'Create Failed'], 500);
            }

            return response()->json(['message' => 'Create Successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $child = RoomChild::find($id);

        if (!$child) {
            return response()->json(['error' => 'Room not found'], 404);
        }

        return response()->json($child);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $child = RoomChild::find($id);

            if (!$child) {
                DB::rollBack();
                return response()->json(['error' => 'Room Type not found'], 404);
            }

            $validatedData = $request->validate([
                'type' => 'required|string|max:255',
            ]);

            $child->update($validatedData);

            DB::commit();

            return response()->json(['message' => 'Room Type updated successfully'], 200);
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
        DB::beginTransaction();

        try {

            $child = RoomChild::find($id);

            if (!$child) {
                return response()->json(['error' => 'Room Type not found'], 404);
            }

            $child->delete();

            DB::commit();

            return response()->json(['success' => 'Room Type deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}
