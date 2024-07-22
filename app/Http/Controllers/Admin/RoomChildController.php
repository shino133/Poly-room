<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoomChild;
use App\Http\Resources\RoomChildResource;
use App\Http\Requests\RoomType;
use App\Http\Services\ControlHelper;

class RoomChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(RoomChildResource::collection(RoomChild::paginate(10)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomType $res)
    {
        try {
            RoomChild::create($res->validated());
            $response = response()->json(['message' => 'Create Successfully'], 201);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        try {
            $type = RoomChild::findOrFail($id);
            return response()->json($type);
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomType $request, string $id)
    {
        try {
            $child = RoomChild::findOrFail($id);
            $child->update($request->validated());
            $child->save();
            $res = response()->json(['message' => 'Room Type updated successfully'], 200);
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
            $child = RoomChild::findOrFail($id);
            $child->delete();
            $res = response()->json(['message' => 'Room Type deleted successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }
}
