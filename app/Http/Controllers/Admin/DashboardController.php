<?php

namespace App\Http\Controllers\Admin;
   
use App\Services\ControlHelper;
use App\Services\StatisticService;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    protected $statisticService;

    public function __construct(StatisticService $statisticService)
    {
        $this->statisticService = $statisticService;
    }

    public function total(){
        try{
            $data = [
                'total' => $this->statisticService->getOverviewStats()['total_bookings'],
                'today' => $this->statisticService->countBookingsToday(),
                'detail' => [
                    $this->statisticService->getBookingStatusCount()
                ],
                'booking_rate_by_month' => $this->statisticService->getPendingBookingRate(),
                'confirmed_rate_by_month' => $this->statisticService->getConfirmedBookingRate(),
                'cancelled_rate_by_month' => $this->statisticService->getCancelledBookingRate()
            ];
            $res = response()->json($data);
        }catch(\Exception $e){
            $res = ControlHelper::handleExc($e);
        }
        return $res;
    }
}
