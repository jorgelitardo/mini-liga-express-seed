<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// === MINILIGA_ROUTES (auto) ===
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\StandingsController;
use App\Http\Controllers\Api\GameController;

Route::get('/teams', [TeamController::class, 'index']);
Route::post('/teams', [TeamController::class, 'store']);
Route::post('/matches/{id}/result', [MatchController::class, 'result']);
Route::get('/standings', [StandingsController::class, 'index']);
// === /MINILIGA_ROUTES ===
Route::get('/games', [GameController::class, 'index']);
Route::post('/games', [GameController::class, 'store']);