<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    /**
     * Registra o actualiza el resultado de un partido.
     */
    public function result($id, Request $request)
    {
        $game = Game::findOrFail($id);

        $validated = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        $game->update([
            'home_score' => $validated['home_score'],
            'away_score' => $validated['away_score'],
            'played_at' => $game->played_at ?? now(),
        ]);

        return response()->json([
            'message' => 'Resultado actualizado correctamente',
            'game' => $game
        ]);
    }
}
