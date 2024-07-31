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
use Illuminate\Support\Facades\DB;
use App\Models\Booking;

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
            $user_id = Auth::id(); // Lấy user_id từ Auth
            $validated['user_id'] = $user_id; // Gán user_id vào validated data
            $validated['status'] = BookingStatusEnum::PENDING;

            $room_id = $validated['room_id'];
            $start_at = $validated['start_at'];

            DB::beginTransaction();

            $check = Booking::where('user_id', $user_id)
                ->where('room_id', $room_id)
                ->where('start_at', $start_at)
                ->lockForUpdate()
                ->first();

            if ($check) {
                throw new \Exception('You have already booked this room for this time.');
            }

            $this->bookingService->create($validated);

            DB::commit();

            $response = response()->json(['message' => 'Room booked successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }

    public function history()
    {
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
