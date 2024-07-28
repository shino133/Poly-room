<?php

namespace App\Enums;

enum RoomStatusEnum: string
{
    case Available = 'Available';
    case Occupied = 'Occupied';
    case Maintenance = 'Maintenance';
    case Cleanning = 'Cleanning';
}
