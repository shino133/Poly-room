<?php

namespace App\Http\Controllers\Admin;

use App\Traits\Paginates;
use Illuminate\Http\Request;
use App\Http\Resources\UserCrud;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignupRequest;
use App\Services\ServiceFactory;

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
        try{
            $user = $this->userServive->getById($id);
            return response()->json(new UserCrud($user));
        }catch(\Exception $e){
            return ControlHelper::handleExc($e);
        }
        
    }

    public function update(SignupRequest $request, $id)
    {
        try {
            $this->userServive->update($id, $request->validated());
            $res = response()->json(['message' => 'Room Type updated successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }

    public function destroy(string $id)
    {
        try {
            $this->userServive->delete($id);
            $res = response()->json(['message' => 'Room Type deleted successfully'], 200);
        } catch (\Exception $e) {
            $res = ControlHelper::handleExc($e);
        }

        return $res;
    }
}
