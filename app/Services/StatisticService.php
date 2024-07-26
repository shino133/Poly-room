<?php

namespace App\Services;

use App\Models\User;
use App\Models\Room;
use App\Models\Booking;
use Carbon\Carbon;

class StatisticService
{
    public function getStatistic()
    {
        return [
            'total_users' => 100,
            'total_rooms' => 50,
            'total_bookings' => 200,
        ];
    }

    public function getTopUsers()
    {
        return User::orderBy('created_at', 'desc')->limit(5)->get();
    }

    public function getTopRooms()
    {
        return Room::orderBy('created_at', 'desc')->limit(5)->get();
    }

    public function getTopBookings()
    {
        return Booking::orderBy('created_at', 'desc')->limit(5)->get();
    }

    public function countStatus()
    {
        return [
            'total_pending' => Booking::where('status', '1')->count(),
            'total_confirmed' => Booking::where('status', '2')->count(),
            'total_cancelled' => Booking::where('status', '3')->count(),
        ];
    }

    public function countTotal()
    {
        return Booking::count();
    }

    public function countToday()
    {
        return Booking::whereDate('created_at', Carbon::today())->count();
    }

    public function countCurrentMonth()
    {
        return Booking::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();
    }

    public function countPreviousMonth()
    {
        return Booking::whereMonth('created_at', Carbon::now()->subMonth()->month)
            ->whereYear('created_at', Carbon::now()->subMonth()->year)
            ->count();
    }

    public function getRateByMonth()
    {
        $current = $this->countCurrentMonth();
        $previous = $this->countPreviousMonth();

        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }

        $rate = (($current - $previous) / $previous) * 100;

        return $rate;
    }
}
