<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomChildController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Client\UserBookController;
use App\Http\Controllers\Admin\DashboardController;
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

        Route::middleware(['auth', 'admin'])->group(function () {

            Route::post('/booked', [BookingController::class, 'status'])->name('booking.status');

            Route::apiResource('/user', UserController::class);
            Route::apiResource('/room', RoomController::class);
            Route::apiResource('/room-type', RoomChildController::class);
            Route::get('/booking', [BookingController::class, 'index'])->name('booking.index');
            Route::get('/booking/{id}', [BookingController::class, 'show'])->name('booking.show');

            Route::get('/statistic', [DashboardController::class, 'total']);
            Route::post('/booking', [UserBookController::class, 'book'])->name('booking.book');
        });
        
    });


    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('client')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        Route::get('/room', [RoomController::class, 'index'])->name('room.index');
        Route::post('/booking', [UserBookController::class, 'book'])->name('booking.book');
        Route::get('/history', [UserBookController::class, 'history'])->name('booking.history');
    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('/', function () {
    return view('error');
});
