<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
// use PokePHP\PokeApi;


class HomeController extends Controller
{
    public function get_listing_api($listing)
    {
        return response()->json([]);
    }

    public function get_listing_web($listing, Request $request)
    {
        return view('app', ['data' => []]);
    }

    public function get_home_web(Request $request)
    {
        return view('app', [ 'data' => [] ]);
    }

    public function get_home_api()
    {
        return response()->json([]);
    }
}
