<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Traits\Paginates;
use Illuminate\Http\Request;
use App\Http\Resources\UserCrud;
use App\Services\ServiceFactory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;


class UserController extends Controller
{
    use Paginates;

    protected $userServive;

    public function __construct(ServiceFactory $serviceFactory)
    {
        $this->userServive = $serviceFactory->make('user');
    }

    public function index(Request $res)
    {

        $perPage = $res->input('perPage', 10);
        $child = $this->userServive->getAll($filters = [], $perPage);
        $formattedRooms = UserCrud::collection($child->items());
        return $this->formatResponse($formattedRooms, $child);
    }
    public function create(Request $request)
    {
        //
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Create a new user
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User creation failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return new UserCrud($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function edit(string $id)
    {
        //
        $user = User::find($id);
        if ($user) {
            return new UserCrud($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Update user details
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            if ($request->filled('password')) {
                $user->password = bcrypt($request->input('password'));
            }
            $user->save();

            return response()->json(['message' => 'User updated successfully', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found or update failed', 'status' => 'error'], 404);
        }
    }

    public function destroy(string $id)
    {
        //
        DB::beginTransaction();
        try {

            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $user->delete();

            DB::commit();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            dd($e);
        }
    }
}
