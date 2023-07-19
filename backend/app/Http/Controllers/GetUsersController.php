<?php

namespace App\Http\Controllers;

use App\Models\User;

class GetUsersController extends Controller
{
    public function __invoke(): array
    {
        return User::all()->sortBy('name')->toArray();
    }
}
