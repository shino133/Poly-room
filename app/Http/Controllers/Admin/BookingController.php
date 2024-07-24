<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingCrud;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookRequest;
use App\Http\Requests\BookingStatusRequest;
use App\Services\ControlHelper;
use Illuminate\Http\Request;
use App\Services\ServiceFactory;
use App\Enums\BookingStatus;
use App\Traits\Paginates;

class BookingController extends Controller
{
    use Paginates;
    protected $bookingService;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->bookingService = $serviceFactory->make('booking');
    }


    public function index(Request $res)
    {
        $filters = $res->only(['status']);

        $booking = $this->bookingService->getAll($filters);

        $formattedRooms = BookingCrud::collection($booking->items());

        return $this->formatResponse($formattedRooms, $booking);
    }

    public function book(BookRequest $res)
    {
        try {
            $validated = $res->validated();

            $validated['user_id'] = Auth::id();
            $validated['status'] = BookingStatus::PENDING;

            $this->bookingService->create($validated);

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
            $this->bookingService->update($validated['id'], $validated);
            $response = response()->json(['message' => 'Successful booking confirmation'], 200);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }
}
