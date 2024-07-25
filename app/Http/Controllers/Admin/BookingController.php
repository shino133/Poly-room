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
use App\Services\MailService;
use App\Enums\BookingStatusEnum;
use App\Traits\Paginates;
use App\Mail\BookRoomMail;
use App\Models\User;

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
            $validated['status'] = BookingStatusEnum::PENDING;

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
            // switch status of booking
            $validated = $res->validated();
            $this->bookingService->update($validated['id'], $validated);

            //send mail to user
            $data = new BookingCrud($this->bookingService->getById($validated['id']));

            $mailData = [
                'roomNumber' => $data['room']['code'] ?? 'N/A',
                'status' => BookingStatusEnum::from($data['status'])->getLabel() ?? 'N/A',
                'checkInDate' => $data['start_at'] ?? 'N/A',
                'checkOutDate' => $data['end_at'] ?? 'N/A',
                'note' => $data['note'] ?? 'N/A',
                'name' => User::find($data['user_id'])->name ?? 'N/A',
            ];

            $email = User::find($data['user_id'])->email;

            $mailable = new BookRoomMail($mailData);

            $result = MailService::sendMail($email, $mailable);

            if(!$result){
                return response()->json(['error' => 'Failed to send email'], 500);
            }
            
            $response = response()->json(['message' => 'Successful booking confirmation'], 200);
        } catch (\Exception $e) {
            $response = ControlHelper::handleExc($e);
        }

        return $response;
    }

    public function show(string $id){
        try {
            $booking = $this->bookingService->getById($id);
            return response()->json(new BookingCrud($booking));
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }
}
