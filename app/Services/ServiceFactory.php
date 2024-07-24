<?php

namespace App\Services;

class ServiceFactory
{
    public function make($service)
    {
        switch ($service) {
            case 'room':
                return app(RoomService::class);
            case 'child':
                return app(RoomChildService::class);
            case 'booking':
                return app(BookingService::class);
            default:
                throw new \Exception("Service not found.");
        }
    }
}
