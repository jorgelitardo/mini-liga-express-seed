<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Team;
use App\Models\Game;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StandingsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function el_endpoint_de_standings_responde_con_lista_ordenada()
    {
        // Crear equipos
        $barcelona = Team::factory()->create(['name' => 'Barcelona SC']);
        $idv = Team::factory()->create(['name' => 'Independiente del Valle']);
        $emelec = Team::factory()->create(['name' => 'Emelec SC']);

        // Crear partidos (resultados simulados)
        Game::factory()->create([
            'home_team_id' => $barcelona->id,
            'away_team_id' => $emelec->id,
            'home_score' => 3,
            'away_score' => 1
        ]);

        Game::factory()->create([
            'home_team_id' => $idv->id,
            'away_team_id' => $barcelona->id,
            'home_score' => 1,
            'away_score' => 2
        ]);

        Game::factory()->create([
            'home_team_id' => $emelec->id,
            'away_team_id' => $idv->id,
            'home_score' => 1,
            'away_score' => 1
        ]);

        // Llamar al endpoint real
        $response = $this->getJson('/api/standings');

        // Validar respuesta
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     '*' => ['team', 'played', 'wins', 'draws', 'losses', 'goals_for', 'goals_against', 'points']
                 ]);

        $data = $response->json();

        // Verificar que esté ordenado por puntos
        $this->assertEquals('Barcelona SC', $data[0]['team']);
    }
}
