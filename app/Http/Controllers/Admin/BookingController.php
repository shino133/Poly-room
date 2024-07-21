<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Resources\BookingCrud;

use Illuminate\Support\Facades\Auth;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $list = Booking::query()
            ->where('status', 'pending')
            ->paginate(10);

        return response()->json(BookingCrud::collection($list));
    }

    public function book(Request $res)
    {
        try {
            $validated = $res->validate([
                'room_id' => 'required|exists:rooms,id',
                'time_start' => 'required|date',
                'time_end' => 'required|date|after:time_start',
            ]);

            $validated['user_id'] = Auth::id();
            $validated['status'] = 'pending';

            $booking = Booking::create($validated);

            return response()->json(['message' => 'Room booked successfully, please wait for confirmation'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function status(Request $res)
    {
        try {
            $validated = $res->validate([
                'id' => 'required|exists:bookings,id',
                'status' => 'required|in:pending,approved,rejected',
            ]);

            $booking = Booking::findOrFail($validated['id']);
            $booking->status = $validated['status'];
            $booking->save();

            return response()->json(['message' => 'Successful booking confirmation'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}
