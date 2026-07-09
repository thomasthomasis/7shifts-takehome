<?php

use App\Http\Controllers\StaffController;
use App\Http\Controllers\ShiftController;

Route::apiResource('staff', StaffController::class);
Route::apiResource('shift', ShiftController::class);

