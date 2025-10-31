<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Team;

class StandingsController extends Controller
{
    public function index()
    {
        $teams = Team::all()->map(function ($team) {
            $gamesHome = Game::where('home_team_id', $team->id)->whereNotNull('home_score')->get();
            $gamesAway = Game::where('away_team_id', $team->id)->whereNotNull('away_score')->get();

            $played = $gamesHome->count() + $gamesAway->count();
            $wins = $draws = $losses = $points = $goalsFor = $goalsAgainst = 0;

            foreach ($gamesHome as $g) {
                $goalsFor += $g->home_score;
                $goalsAgainst += $g->away_score;
                if ($g->home_score > $g->away_score) $wins++;
                elseif ($g->home_score == $g->away_score) $draws++;
                else $losses++;
            }

            foreach ($gamesAway as $g) {
                $goalsFor += $g->away_score;
                $goalsAgainst += $g->home_score;
                if ($g->away_score > $g->home_score) $wins++;
                elseif ($g->away_score == $g->home_score) $draws++;
                else $losses++;
            }

            $points = ($wins * 3) + $draws;

            return [
                'team' => $team->name,
                'played' => $played,
                'wins' => $wins,
                'draws' => $draws,
                'losses' => $losses,
                'goals_for' => $goalsFor,
                'goals_against' => $goalsAgainst,
                'points' => $points,
            ];
        });

        // ordenar por puntos (y diferencia de goles)
        $standings = $teams->sortByDesc(function ($t) {
            return [$t['points'], $t['goals_for'] - $t['goals_against']];
        })->values();

        return response()->json($standings);
    }
}
