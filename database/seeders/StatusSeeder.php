<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roomChilds = ['Pending', 'Confirmed', 'Cancelled'];

        foreach ($roomChilds as $roomChild) {
            Status::create([
                'status' => $roomChild
            ]);
        }
    }
}
