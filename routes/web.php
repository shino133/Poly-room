<?php

use Illuminate\Support\Facades\Route;

/*
|---------------------------------------------------------------------
| Web Routes
|---------------------------------------------------------------------

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

*/

Route::get('/', function () {
    return view('welcome');
});
