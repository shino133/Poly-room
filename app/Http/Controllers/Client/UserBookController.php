<?php

namespace App\Http\Controllers\Client;
use App\Http\Controllers\Controller;

use App\Http\Requests\BookRequest;
use App\Services\ControlHelper;
use Illuminate\Support\Facades\Auth;
use App\Enums\BookingStatusEnum;
use App\Services\ServiceFactory;

class UserBookController extends Controller
{
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
}
