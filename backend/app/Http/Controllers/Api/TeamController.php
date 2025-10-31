<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::select('teams.id', 'teams.name')
            ->leftJoin('games as home', 'teams.id', '=', 'home.home_team_id')
            ->leftJoin('games as away', 'teams.id', '=', 'away.away_team_id')
            ->selectRaw('
            teams.id,
            teams.name,
            COALESCE(SUM(
                CASE 
                    WHEN home.home_team_id = teams.id THEN home.home_score
                    WHEN away.away_team_id = teams.id THEN away.away_score
                    ELSE 0 
                END
            ), 0) as goals_for,
            COALESCE(SUM(
                CASE 
                    WHEN home.home_team_id = teams.id THEN home.away_score
                    WHEN away.away_team_id = teams.id THEN away.home_score
                    ELSE 0 
                END
            ), 0) as goals_against
        ')
            ->groupBy('teams.id', 'teams.name')
            ->orderBy('teams.name', 'asc')
            ->get();

        return response()->json($teams);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:teams,name|max:100',
        ]);

        $team = Team::create([
            'name' => $validated['name'],
            'goals_for' => 0,
            'goals_against' => 0,
        ]);

        return response()->json([
            'message' => 'Equipo creado correctamente',
            'team' => $team
        ]);
    }
}
