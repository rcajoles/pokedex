<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'api\HomeController@get_home_web');

Route::get('/listing/{listing}', 'api\HomeController@get_listing_web');

Route::get('/saved', 'api\HomeController@get_home_web')->middleware('auth');

Auth::routes();

Route::get('/register', 'Auth\RegisterController@showRegistrationForm')->name('register');