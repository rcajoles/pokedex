<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

class UserController extends Controller
{
    public function toggle_saved()
    {
        $id = Input::get('id');
        $user = Auth::user();
        $saved = $user->saved;
        $key = array_search($id, $saved);

        if ($key === FALSE) {
            array_push($saved, $id);
        } else {
            array_splice($saved, $key, 1);
        }

        $user->saved = $saved;
        $user->save();
        return response()->json();
    }

    public function toggle_disliked()
    {
        $id = Input::get('id');
        $user = Auth::user();
        $disliked = $user->disliked;
        $key = array_search($id, $disliked);

        if ($key === FALSE) {
            array_push($disliked, $id);
        } else {
            array_splice($disliked, $key, 1);
        }

        $user->disliked = $disliked;
        $user->save();

        return response()->json();
    }
}
