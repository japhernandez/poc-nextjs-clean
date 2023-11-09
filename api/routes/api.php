<?php

use App\Http\Infrastructure\EntryPoints\Controllers\MovieController;
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

Route::middleware('api')->group(function () {
   Route::get('/movie-popular-list', [MovieController::class, 'getPopularMovies']);
   Route::get('/movie-search', [MovieController::class, 'getSearchMovies']);
   Route::get('/movie-guest-session', [MovieController::class, 'getGuestSessionMovies']);
   Route::post('/movie-rating', [MovieController::class, 'postRatingMovies']);
});
