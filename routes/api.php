<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::resource('user', UserController::class);
// Route::resource('room', RoomController::class);


Route::prefix('admin')->group(function () {
    Route::resource('user', UserController::class);
    Route::resource('room', RoomController::class);
});
