<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public $success = 200;

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

    public function api_login(Request $request) {
        if($request->has(['email', 'password']) && !empty($request->email) && !empty($request->password)) {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = User::where('email', $request->email)->first();
                $result['user'] = $user;
                $token = $user->createToken('login');
                $result['token'] = $token->plainTextToken;
                $result['status'] = $this->success;

                return response()->json($result, $this->success);
            }
            else {
                return response()->json([
                    'status' => 401,
                    'message'=>'Either email or password is incorrect.'
                ], 401);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message'=>'Please input all fields'
            ], 400);
        }
    }

    public function api_logout(Request $request) {
        $user = User::where(Auth::user()->email);
        $user->tokens()->delete();
        return response()->json([
            'message' => 'successfully logged-out!',
            'status' => 200,
        ], $this->success);
    }

    public function api_register(Request $request) {
        if($request->has(['email', 'password']) && !empty($request->email) && !empty($request->password)) {
            $payload = $request->all();

            return User::create([
                'name' => $payload['name'],
                'email' => $payload['email'],
                'password' => Hash::make($payload['password']),
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message'=>'Please input all fields'
            ], 400);
        }
    }
}
