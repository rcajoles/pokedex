<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Jane Doe',
            'email' => 'test@gmail.com',
            'password' => Hash::make('test'),
            'saved' => [1, 5, 7, 8],
            'disliked' => [2,11,22],
        ]);
        
        User::create([
            'name'      => 'John Doe',
            'email'     => 'test2@gmail.com',
            'password'  => Hash::make('test'),
            'saved'     => [2,11,22],
            'disliked'     => [1, 5, 7, 8],
        ]);
    }
}
