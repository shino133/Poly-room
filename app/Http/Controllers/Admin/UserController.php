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
use App\Http\Requests\RoleAndStatusUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;


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

    public function update(RoleAndStatusUserRequest $request, $id)
    {
        // Validate the request
        $validator = $request->validated();
        try {
            // Find the user by ID
            $user = User::findOrFail($id);
            // Update user details
            $user->status = $validator['status'];
            $user->role = $validator['role'];
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
            $res = response()->json(['message' => 'User deleted successfully', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }

    public function changePass(Request $req)
    {
        try {

            $validator = Validator::make($req->all(), [
                'current_password' => ['required'],
                'new_password' => [
                    'required',
                    Password::min(8)->mixedCase()->numbers()->symbols()
                ],
            ]);
    
            if ($validator->fails()) {
                throw new \Exception($validator->errors()->first(), 400);
            }
    
            $validatedData = $validator->validated();
            $currentPass = $validatedData['current_password'];
            $newPass = $validatedData['new_password'];

            if (!Hash::check($currentPass, Auth::user()->password)) {
                throw new \Exception('Current password is incorrect', 400);
            }

            $user = User::findOrFail(Auth::user()->id);
            $user->password = Hash::make($newPass);
            $user->save();

            $res = response()->json(['message' => 'Password changed successfully', 'status' => 'success'], 200);

        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }
        return $res;
    }
}
