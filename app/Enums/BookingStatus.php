<?php

namespace App\Enums;

enum BookingStatus: string
{
    case PENDING = '0';
    case PROCESSING = '1';
    case COMPLETED = '2';
    case CANCELLED = '3';
}
