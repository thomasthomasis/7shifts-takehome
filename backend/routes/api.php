<?php

use App\Http\Controllers\StaffController;
use App\Http\Controllers\ShiftController;

Route::apiResource('staff', StaffController::class)->only(['index', 'store']);

Route::apiResource('shifts', ShiftController::class)->only(['index', 'store']);
Route::patch('shifts/{shift}/assign', [ShiftController::class, 'assign']);

