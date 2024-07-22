<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Random date for time_start
        $startDate = fake()->dateTimeBetween('-1 month', 'now');

        // time_end should be later than time_start, e.g., between 1 hour and 3 hours after
        $endDate = fake()->dateTimeBetween($startDate, (clone $startDate)->modify('+3 hours'));

        // time_created should be a few days before time_start, e.g., between 10 and 15 days
        $createdDate = fake()->dateTimeBetween('-2 months', $startDate->format('Y-m-d'));

        return [
            //
            'room_id' => fake()->numberBetween(1, 20),
            'user_id' => fake()->numberBetween(1, 300),
            'time_start' => $startDate,
            'time_end' => $endDate,
            'time_created' => $createdDate,
            'status' => fake()->randomElement(['Pending', 'Confirmed', 'Cancelled']),
            'note' => fake()->sentence(),
        ];
    }
}
