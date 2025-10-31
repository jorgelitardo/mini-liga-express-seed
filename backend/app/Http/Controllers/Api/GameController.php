<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Crear un nuevo partido (fixture)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'home_team_id' => 'required|exists:teams,id|different:away_team_id',
            'away_team_id' => 'required|exists:teams,id|different:home_team_id',
        ]);

        $game = Game::create([
            'home_team_id' => $validated['home_team_id'],
            'away_team_id' => $validated['away_team_id'],
        ]);

        return response()->json([
            'message' => 'Partido creado correctamente',
            'game' => $game
        ]);
    }

    /**
     * Listar todos los partidos
     */
    public function index()
    {
        $games = Game::with(['homeTeam', 'awayTeam'])->get();
        return response()->json($games);
    }
}
