<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Fixed prefixes for room codes
        $prefixes = ['CONF', 'OFF', 'LECT', 'MEET', 'BREAK'];

        // Pick a random prefix from the array
        $prefix = $this->faker->randomElement($prefixes);

        // Generate a random floor number between 1 and 9
        $floor = $this->faker->numberBetween(1, 5);

        // Ensure the room number is between 1 and 30, with leading zero if necessary
        $roomNumber = str_pad($this->faker->numberBetween(1, 30), 2, '0', STR_PAD_LEFT);

        // Combine floor number and room number to form the room code
        $number = $floor . $roomNumber;

        // Combine prefix and number to form the room code
        $roomCode = $prefix . $number;

        return [
            //
            'code' => $roomCode,
            'room_child_id' => fake()->numberBetween(1, 5),
            'status' => fake()->randomElement(['Available', 'Occupied', 'Maintenance']),
        ];
    }
}
