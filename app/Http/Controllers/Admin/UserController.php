<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Traits\Paginates;
use Illuminate\Http\Request;
use App\Services\ControlHelper;
use App\Http\Resources\UserCrud;
use App\Services\ServiceFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignupRequest;

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
        $user = $this->userServive->getAll($filters = [], $perPage);
        $formattedRooms = UserCrud::collection($user->items());
        return $this->formatResponse($formattedRooms, $user);
    }

    public function store(SignupRequest $request)
    {
        try {
            $user = $this->userServive->create($request->validated());
            $res =  response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }


    public function show(string $id)
    {
        try {
            $user = $this->userServive->getById($id);
            $res = response()->json(new UserCrud($user));
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = $request->validate( [
            'status' => 'required|string|in:active,inactive',
            'role' => 'required|string|in:admin,user',
        ]);

        try {
            // Find the user by ID
            $user = User::findOrFail($id);
            // Update user details
            $user->status = $request->status;
            $user->role = $request->role;
            $user->save();

            return response()->json(['message' => 'User updated successfully', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return ControlHelper::handleExc($e);
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->userServive->delete($id);
            $res = response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }
}
