<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RoomChild;

class RoomChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roomChilds = ['Conference Room', 'Office Room', 'Meeting Room', 'Lecture Room', 'Break Room'];

        foreach ($roomChilds as $roomChild) {
            RoomChild::create([
                'type' => $roomChild
            ]);
        }
    }
}
