<?php

namespace App\Enums;

enum BookingStatusEnum: string
{
    case PENDING = '1';
    case CONFIRMED = '2';
    case CANCELLED = '3';

    public function getLabel(): string
    {
        return match($this) {
            self::PENDING => 'Pending',
            self::CONFIRMED => 'Confirmed',
            self::CANCELLED => 'Cancelled',
        };
    }
}
