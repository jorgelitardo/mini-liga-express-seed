<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    public function definition(): array
    {
        return [
            'home_team_id' => 1,
            'away_team_id' => 2,
            'home_score' => null,
            'away_score' => null,
        ];
    }
}
