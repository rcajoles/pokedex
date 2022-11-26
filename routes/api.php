<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', 'api\HomeController@get_home_api');
Route::post('/login', 'api\AuthController@api_login')->name('api.login');
Route::post('/logout', 'api\AuthController@api_logout')->name('api.logout');
Route::post('/register', 'api\AuthController@api_register')->name('api.register');
Route::get('/listing/{listing}', 'api\HomeController@get_listing_api');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function(Request $request){
        return response()->json(Auth::user(), 200);
    });
    Route::get('/saved', 'api\HomeController@get_home_api');
    Route::post('/user/toggle_saved', 'api\AuthController@toggle_saved');
    Route::post('/user/toggle_disliked', 'api\AuthController@toggle_disliked');
});