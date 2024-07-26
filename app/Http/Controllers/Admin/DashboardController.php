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
                'total' => $this->statisticService->countTotal(),
                'today' => $this->statisticService->countToday(),
                'detail' => [
                    $this->statisticService->countStatus()
                ]
            ];
            $res = response()->json($data);
        }catch(\Exception $e){
            $res = ControlHelper::handleExc($e);
        }
        return $res;
    }
}
