<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return response()->json(RoomChild::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'type' => 'required|string|max:255',
        ]);

        try {
            $result = RoomChild::create($validate);

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

        if ($child) {
            return response()->json($child);
        } else {
            return response()->json(['error' => 'Room not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'type' => 'required|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $child = RoomChild::find($id);

            if (!$child) {
                DB::rollBack();
                return response()->json(['error' => 'Room Type not found'], 404);
            }

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
                DB::rollBack();
                return response()->json(['error' => 'Room Type not found'], 404);
            }

            $child->delete();
            DB::commit();

            return response()->json(['message' => 'Room Type deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}