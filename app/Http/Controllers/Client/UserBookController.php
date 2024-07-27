<?php

namespace App\Http\Controllers\Client;
use App\Http\Controllers\Controller;

use App\Http\Requests\BookRequest;
use App\Services\ControlHelper;
use Illuminate\Support\Facades\Auth;
use App\Enums\BookingStatusEnum;
use App\Services\ServiceFactory;
use App\Http\Resources\BookingCrud;
use App\Traits\Paginates;

class UserBookController extends Controller
{
    use Paginates;
    protected $bookingService;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->bookingService = $serviceFactory->make('booking');
    }
    public function book(BookRequest $res)
    {
        try {
            $validated = $res->validated();

            $validated['user_id'] = Auth::id();
            $validated['status'] = BookingStatusEnum::PENDING;

            $this->bookingService->create($validated);

            $response = response()->json(['message' => 'Room booked Successfully'], 201);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }

    public function history(){
        try {
            
            $data = $this->bookingService->getBookingHistory(Auth::id());
            $formattedRooms = BookingCrud::collection($data->items());
            $response = $this->formatResponse($formattedRooms, $data);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }
}
