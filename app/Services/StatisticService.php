<?php

namespace App\Services;

use App\Models\User;
use App\Models\Room;
use App\Models\Booking;
use Carbon\Carbon;

class StatisticService
{
    public function getOverviewStats()
    {
        return [
            'total_users' => User::count(),
            'total_rooms' => Room::count(),
            'total_bookings' => Booking::count(),
        ];
    }

    public function getRecentUsers($limit = 5)
    {
        return User::latest()->limit($limit)->get();
    }

    public function getRecentRooms($limit = 5)
    {
        return Room::latest()->limit($limit)->get();
    }

    public function getRecentBookings($limit = 5)
    {
        return Booking::latest()->limit($limit)->get();
    }

    public function getBookingStatusCount()
    {
        return [
            'pending' => $this->countBookingsByStatus(1),
            'confirmed' => $this->countBookingsByStatus(2),
            'cancelled' => $this->countBookingsByStatus(3),
        ];
    }

    public function countBookingsByStatus($status)
    {
        return Booking::where('status', $status)->count();
    }

    public function countBookingsToday()
    {
        return Booking::whereDate('created_at', Carbon::today())->count();
    }

    public function countBookingsCurrentMonth()
    {
        return $this->countBookingsByMonth(Carbon::now());
    }

    public function countBookingsPreviousMonth()
    {
        return $this->countBookingsByMonth(Carbon::now()->subMonth());
    }

    private function countBookingsByMonth($date)
    {
        return Booking::whereMonth('created_at', $date->month)
                      ->whereYear('created_at', $date->year)
                      ->count();
    }

    public function getMonthlyBookingRate()
    {
        $current = $this->countBookingsCurrentMonth();
        $previous = $this->countBookingsPreviousMonth();

        return $this->calculateRate($current, $previous);
    }

    public function getBookingStatusRate()
    {
        $total = Booking::count();
        $statusCount = $this->getBookingStatusCount();

        return [
            'confirmed' => $this->calculatePercentage($statusCount['confirmed'], $total),
            'cancelled' => $this->calculatePercentage($statusCount['cancelled'], $total),
            'pending' => $this->calculatePercentage($statusCount['pending'], $total),
        ];
    }

    public function getStatusRateByMonth()
    {
        $confirmed = $this->countBookingsByStatusAndMonth(2, Carbon::now());
        $cancelled = $this->countBookingsByStatusAndMonth(3, Carbon::now());
        $pending = $this->countBookingsByStatusAndMonth(1, Carbon::now());

        $total = $confirmed + $cancelled + $pending;

        return [
            'confirmed' => $this->calculatePercentage($confirmed, $total),
            'cancelled' => $this->calculatePercentage($cancelled, $total),
            'pending' => $this->calculatePercentage($pending, $total),
        ];
    }

    public function getConfirmedBookingRate()
    {
        return $this->getBookingRateByStatus(2);
    }

    public function getCancelledBookingRate()
    {
        return $this->getBookingRateByStatus(3);
    }

    public function getPendingBookingRate()
    {
        return $this->getBookingRateByStatus(1);
    }

    private function getBookingRateByStatus($status)
    {
        $current = $this->countBookingsByStatusAndMonth($status, Carbon::now());
        $previous = $this->countBookingsByStatusAndMonth($status, Carbon::now()->subMonth());

        return $this->calculateRate($current, $previous);
    }

    private function countBookingsByStatusAndMonth($status, $date)
    {
        return Booking::where('status', $status)
                      ->whereMonth('created_at', $date->month)
                      ->whereYear('created_at', $date->year)
                      ->count();
    }

    private function calculateRate($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }

        return (($current - $previous) / $previous) * 100;
    }

    private function calculatePercentage($count, $total)
    {
        return $total > 0 ? ($count / $total) * 100 : 0;
    }
}
