<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        return response()->json(Team::all());
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
