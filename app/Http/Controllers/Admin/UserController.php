<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserCrud;
use App\Traits\Paginates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        
        $perPage = $res->input('perPage', 20);
        $child = $this->userServive->getAll($filters = [], $perPage);
        $formattedRooms = UserCrud::collection($child->items());
        return $this->formatResponse($formattedRooms, $child);

    }
    public function create()
    {
        
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

    public function update(Request $request, string $id)
    {
        //
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
