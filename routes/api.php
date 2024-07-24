<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomChildController;
use App\Http\Controllers\Admin\BookingController;

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::resource('user', UserController::class);
// Route::resource('room', RoomController::class);


Route::prefix('admin')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/booked', [BookingController::class, 'status'])->name('booking.status');

        Route::apiResource('/user', UserController::class);
        Route::apiResource('/room', RoomController::class);
        Route::apiResource('/room-type', RoomChildController::class);
        Route::get('/booking', [BookingController::class, 'index'])->name('booking.index');
    });


    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('client')->group(function () {
    Route::post('/booking', [BookingController::class, 'book'])->name('booking.book');
});

Route::get('/', function(){
    return view('error');
});
