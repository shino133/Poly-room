<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingCrud;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use App\Http\Requests\BookRequest;
use App\Http\Requests\BookingStatusRequest;
use App\Http\Services\ControlHelper;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $res)
    {
        $query = Booking::query();


        if ($res->has('status')) {
            $search = $res->input('status');
            $query->where('status', 'like', '%' . $search . '%');
        }

        $list = $query->orderBy('created_at', 'DESC')->paginate(20);

        return response()->json(BookingCrud::collection($list));
    }

    public function book(BookRequest $res)
    {
        try {
            $validated = $res->validated();

            $validated['user_id'] = Auth::id();
            $validated['status'] = '0';

            Booking::create($validated);

            $response = response()->json(['message' => 'Room booked Successfully'], 201);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }

    public function status(BookingStatusRequest $res)
    {
        try {
            $validated = $res->validated();
            $booking = Booking::findOrFail($validated['id']);
            $booking->status = $validated['status'];
            $booking->save();
            $response = response()->json(['message' => 'Successful booking confirmation'], 200);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }
}
