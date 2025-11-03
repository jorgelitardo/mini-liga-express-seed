<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StandingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'team' => $this->faker->company(),
            'played' => $this->faker->numberBetween(1, 5),
            'wins' => $this->faker->numberBetween(0, 5),
            'draws' => $this->faker->numberBetween(0, 5),
            'losses' => $this->faker->numberBetween(0, 5),
            'gf' => $this->faker->numberBetween(0, 10),
            'gc' => $this->faker->numberBetween(0, 10),
            'points' => $this->faker->numberBetween(0, 15),
        ];
    }
}
